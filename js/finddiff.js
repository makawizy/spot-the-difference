// Find the Difference!
// Bas de Reuver (c)2014

// -------------------------------------
// get offset position of element within document
// -------------------------------------
function findPos(el) {
	var curleft = 0, curtop = 0;
	if (el.offsetParent) {
		do {
			curleft += el.offsetLeft;
			curtop += el.offsetTop;
		} while (el = el.offsetParent); // assign (not compare!) parent element
		return { x: curleft, y: curtop };
	}
	return undefined;
}

// constants
var VERSION_NUMBER = "v1.0";
var PHOTO_ASPECT = 480/512;
var HIGHSCORE_LENGTH = 5;
var AREA_MARGIN = 8; // margin around actual difference in canvas pixels, allow user some slack else tapping on small screen too frustrating
var AREA_MINIMUM = 40; // area can be too small to tap on, set width and height to 40px minimum
//var ELLIPSE_LARGER_PX = 8; // slightly larger so it better surrounds difference

var STATE_LEVELSTART = 0;
var STATE_PLAYING = 1;
var STATE_TIMEBONUS = 2;
var STATE_LEVELWIN = 3;
var STATE_GAMEEND = 4;
var STATE_ENTERNAME = 5;
var STATE_GAMEOVER = 6;

var savedgame = null;

var finddiff = {
	// general
	bIsTouch: true,
	timerId: null,

	// game variables
	state: 0, // 0=intro, 1=playing, 2=level win, 3=game lost
	level: 1,
	score: 0,
	hints: 3,
	timecount: 0, // time at start of level
	timeleft: 0, // time left in seconds
	diffscount: 0,
	diffsfound: 0,
	photoorder: [], // shuffled indexes

	// photo vars
	context1: null,
	context2: null,
	image1: null,
	image2: null,
	orderindex: 0,
	photoindex: 0,
	imgloaded: 0,
	selecteddiffs: [],
	
	// css resize vars
	basesize: 32,
	zoomfactor: 0,
	
	// settings and highscores
	userrate: "",
	highscores: [],
	mostrecentname: "",

	// secret code for debug menu
	secretcode: "",
	debugcheat: false,
	debugorder: false,
	debug_winwidth: 0,
	debug_winheight: 0,

	// -------------------------------------
	// initialise app
	// -------------------------------------
	appinit: function () {
		// listen player input
		finddiff.bIsTouch = platspec.is_touch_device();
		//if (finddiff.bIsTouch == true) {alert('touch device!');} else {alert('click device!');};

		// attach resize event
		$(window).resize(finddiff.resize);

		// initialise variables
		var canvas1 = document.getElementById('myCanvas1');
		var canvas2 = document.getElementById('myCanvas2');
		finddiff.context1 = canvas1.getContext('2d');
		finddiff.context2 = canvas2.getContext('2d');
		finddiff.image1 = new Image();
		finddiff.image2 = new Image();

		$(finddiff.image1).on('load', function(e) {
			finddiff.onimageloaded();
		});
		$(finddiff.image2).on('load', function(e) {
			finddiff.onimageloaded();
		});

		//finddiff.image1.onload = function() {
		//	finddiff.onimageloaded();
		//};
		//finddiff.image2.onload = function() {
		//	finddiff.onimageloaded();
		//};		
		
		$('#myCanvas1').on(finddiff.bIsTouch?'touchstart':'mousedown', function (e) {
			finddiff.ongametouch(this, e);
		});
		$('#myCanvas2').on(finddiff.bIsTouch?'touchstart':'mousedown', function (e) {
			finddiff.ongametouch(this, e);
		});
		
		// all buttons
		$('.diffbutton, #hintbtn, #pausebtn').on(finddiff.bIsTouch?'touchstart':'mousedown', function (e) {
			finddiff.ondiffbuttonpress(this.id);
		});
		// debug menu buttons
		$('#dbgprev, #dbgnext, #dbgorder, #dbgcheat').on(finddiff.bIsTouch?'touchstart':'mousedown', function (e) {
			finddiff.ondebugbuttonpress(this.id);
		});
		// touch logo to open debug menu
		$('#logo img').on(finddiff.bIsTouch?'touchstart':'mousedown', function (e) {
			finddiff.onlogotouch(this, e);
		});
		// back button 
		document.addEventListener("backbutton", finddiff.onbackbutton, false);
		// save and quit when app is paused by Android OS
		document.addEventListener("pause", function(){clearInterval(finddiff.timerId);finddiff.quitfromgame(1);}, false);

		// game setting
		finddiff.diffscount = 1;

		// trigger resize once at startup
		$(window).trigger('resize');
		
		// load highscores
		finddiff.highscoreload();
		finddiff.highscoredisplay();

		// enable/disable hints button
		finddiff.inithintsbutton();

		// preload media files
		finddiff.preload();
		
		// shuffled photo order
		finddiff.shufflephotoorder(-1);
		
		// display version number
		$("#versioninfo").html(VERSION_NUMBER);
		
		// initialise banner
		//platspec.initAd();
	},

	// -------------------------------------
	// preload media files 
	// -------------------------------------
	preload: function () {
		platspec.preloadFX('input',     'snd/input.mp3');
		platspec.preloadFX('forward',   'snd/forward.mp3');
		platspec.preloadFX('back',      'snd/back.mp3');

		platspec.preloadFX('correct',   'snd/correct.mp3');
		platspec.preloadFX('incorrect', 'snd/incorrect.mp3');
		platspec.preloadFX('lose',      'snd/lose.mp3');
		platspec.preloadFX('win',       'snd/win.mp3');
		platspec.preloadFX('levelup',   'snd/levelup.mp3');
		platspec.preloadFX('time',      'snd/time.mp3');
		
	},

	// -------------------------------------
	// android back button
	// -------------------------------------
	onbackbutton: function () {
		if ($('#mainmenu').is(':visible'))   { navigator.app.exitApp() }; // quit app

		if ($('#instructions').is(':visible')) { finddiff.ondiffbuttonpress('insok') };
		if ($('#highscores').is(':visible'))   { finddiff.ondiffbuttonpress('hisok') };
		if ($('#aboutmenu').is(':visible') )   { finddiff.ondiffbuttonpress('infok') };
		if ($('#debugmenu').is(':visible') )   { finddiff.ondiffbuttonpress('dbgok') };
		if ($('#gamearea').is(':visible'))     {
			// first pause game
			//alert('now what?!');
			// if () {};
			// press quit button
			// finddiff.ondiffbuttonpress('gameback')
			switch (finddiff.state) {
			//	case STATE_LEVELSTART:
			//		break; // do nothing
				case STATE_PLAYING:
					// first pause if needed
					if ($('.gamepause').is(':hidden')) {
						finddiff.pausegame(true);
					};
					// press pausemenu quit button
					finddiff.ondiffbuttonpress('pausequit');
					break;
			//	case STATE_TIMEBONUS:
			//		break; // do nothing
				case STATE_LEVELWIN:
					finddiff.ondiffbuttonpress('gameok');
					break;
			//	case STATE_GAMEEND:
			//		break; // do nothing
				case STATE_ENTERNAME:
					finddiff.ondiffbuttonpress('gameok');
					break;
				case STATE_GAMEOVER:
					finddiff.ondiffbuttonpress('gameback');
					break;
			};
		};
	},

	// -------------------------------------
	// preload media files
	// iStartIndex = start with this photoindex
	// -------------------------------------
	shufflephotoorder: function (iStartIndex) {
		// initialise array of photo indexes
		var photocount = photodata.length;
		for (var i = 0; i < photocount; i++) {
			finddiff.photoorder[i] = i;
		};

		// shuffle array in random order
		if (finddiff.debugorder == false) {
			var idx1=0, idx2=0, tmp=0;
			for (var i = 0; i < (10 * photocount); i++) {
				// select random index
				idx1 = Math.floor(Math.random() * photocount);
				idx2 = Math.floor(Math.random() * photocount);
				// switch
				tmp = finddiff.photoorder[idx1];
				finddiff.photoorder[idx1] = finddiff.photoorder[idx2];
				finddiff.photoorder[idx2] = tmp;
			};
		};

		// shuffle array in random order
		if (iStartIndex == -1) {
			finddiff.orderindex = 0; // just start with first, so photoorder[0]
		} else {
			// force select a photo index
			finddiff.gotophotoindex(iStartIndex);
		};

		var str = "";
		for (var i = 0; i < photocount; i++) {
			str = str + "[" + i + "]=" + finddiff.photoorder[i] + ", ";
		};
	},

	// -------------------------------------
	// setup the orderindex so that the photo with iIndex is next
	// -------------------------------------
	gotophotoindex: function (iIndex) {
		// wrap around
		if (iIndex <  0)                {iIndex = photodata.length-1};
		if (iIndex >= photodata.length) {iIndex = 0};

		// find photodata index in photoorder array
		for (var i = 0; i < photodata.length; i++) {
			if (parseInt(finddiff.photoorder[i]) == iIndex) {
				finddiff.orderindex = i-1; // force this photo as next photo (-1 because +1 at game start)
				break;
			};
		};
	},

	// -------------------------------------
	// start a new game
	// -------------------------------------
	newgame: function () {
		// switch to intro
		finddiff.level = 0;
		finddiff.score = 0;
		
		if (finddiff.userrate == "") {
			finddiff.hints = -1; // hints disabled
		} else {
			// to cheat or not to cheat
			if (finddiff.debugcheat == true) {
				finddiff.hints = 99;
			} else {
				finddiff.hints = 3;
			};
			$('#hintbtn').text(finddiff.hints);
		};
		
		// reset score onscreen
		$('#scorebar').text(finddiff.score);

		// start first level
		finddiff.nextlevel();
	},

	// -------------------------------------
	// org and edit picture loaded, apply selected differences
	// -------------------------------------
	onimageloaded: function (){
		// org and edit photos are loaded asynchronously
		finddiff.imgloaded++;

		// either org and edit is loaded last, only continue when BOTH images are ready loading
		if (finddiff.imgloaded == 2) {
			var w1, h1, w2, h2;
			w1 = finddiff.context1.canvas.width; // actual image size 480x512
			h1 = finddiff.context1.canvas.height;
			w2 = finddiff.context1.canvas.clientWidth; // actual size on screen, varies depending on device
			h2 = finddiff.context1.canvas.clientHeight;

			// remember zoom factor, needed to determine position in ongametouch
			finddiff.zoomfactor = $('.photocanvas').width() / finddiff.image1.width;

			// draw original photo twice
			finddiff.context1.clearRect(0, 0, w2, h2);
			finddiff.context1.drawImage(finddiff.image1, 0, 0);

			finddiff.context2.clearRect(0, 0, w2, h2);
			finddiff.context2.drawImage(finddiff.image1, 0, 0);

			// draw differences from edited photo
			for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
				var x, y, w, h;

				x = finddiff.selecteddiffs[i].x;
				y = finddiff.selecteddiffs[i].y;
				w = finddiff.selecteddiffs[i].w;
				h = finddiff.selecteddiffs[i].h;

				//context1.drawImage(finddiff.image2, x, y, w, h, x, y, w, h);
				// copy selected difference onto canvas1 or canvas2
				if (finddiff.selecteddiffs[i].drawside == 0) {
					finddiff.context1.drawImage(finddiff.image2, x, y, w, h, x, y, w, h); // on left
				} else {
					finddiff.context2.drawImage(finddiff.image2, x, y, w, h, x, y, w, h); // on right
				};

				// add default margin for all diffs
				x = x - AREA_MARGIN;
				y = y - AREA_MARGIN;
				w = w + (2 * AREA_MARGIN);
				h = h + (2 * AREA_MARGIN);
				
				// area can be too small to tap on, set width and height to 40px minimum
				if (w < AREA_MINIMUM) {
					x = x - Math.floor((AREA_MINIMUM-w) / 2);
					w = AREA_MINIMUM
				};
				if (h < AREA_MINIMUM) {
					y = y - Math.floor((AREA_MINIMUM-h) / 2);
					h = AREA_MINIMUM;
				};
				// keep adjusted values
				finddiff.selecteddiffs[i].x = x;
				finddiff.selecteddiffs[i].y = y;
				finddiff.selecteddiffs[i].w = w;
				finddiff.selecteddiffs[i].h = h;
			};

			// images are loaded, start the level
			finddiff.onlevelstart();
		};
	},

	// -------------------------------------
	// next level
	// -------------------------------------
	nextlevel: function () {
		// reset variables
		finddiff.level++;
		if(finddiff.level <= 63){
				// next photo in random order
		finddiff.orderindex = parseInt((finddiff.orderindex+1) % photodata.length);
		finddiff.photoindex = finddiff.photoorder[finddiff.orderindex];

		// copy all differences into temporary array
		var preselect = [];
		for (var i = 0; i < photodata[finddiff.photoindex].differences.length; i++) {
			preselect[i] = 0;
		}
		var iMax = finddiff.diffscount;
		if (iMax > preselect.length) {iMax = preselect.length};

		// mark random differences in temporary array, no doubles
		var iCount = 0;
		while (iCount < iMax) {
			var i = Math.floor((Math.random() * preselect.length));
			if (preselect[i] == 0) {
				preselect[i] = 1;
				iCount++;
			}
		}

		// select random differences from that picture
		iCount = 0;
		for (var i = 0; i < photodata[finddiff.photoindex].differences.length; i++) {
			if (preselect[i] == 1){
				finddiff.selecteddiffs[iCount] = [];
				// force copy by value, not by reference
				finddiff.selecteddiffs[iCount] = {
					x: photodata[finddiff.photoindex].differences[i].x,
					y: photodata[finddiff.photoindex].differences[i].y,
					w: photodata[finddiff.photoindex].differences[i].w,
					h: photodata[finddiff.photoindex].differences[i].h
				};
				
				// add vars for gameplay bookkeeping
				finddiff.selecteddiffs[iCount].index = i;
				finddiff.selecteddiffs[iCount].found = false;
				if (Math.floor((Math.random() * 2)) == 1) {
					finddiff.selecteddiffs[iCount].drawside = 0; // left
				} else {
					finddiff.selecteddiffs[iCount].drawside = 1; // right
				};
				iCount++;
			}
		}

		// Android webview, rare: when load exact same image again, clear src else onload event doesn't get called
		finddiff.image1.src = '';
		finddiff.image2.src = '';

		// load both org/edit images, either image will trigger onimageloaded
		finddiff.imgloaded = 0;
		finddiff.image1.src = 'photos/' + photodata[finddiff.photoindex].fileorg;
		finddiff.image2.src = 'photos/' + photodata[finddiff.photoindex].fileedit;
		}else{
			//game over and enter name to save highest score
		// highscore enter name
					$('.gamemessage h1').text('YOU HAVE REACHED THE END OF THE GAME!!');
					finddiff.mostrecentname = $('#nameinput').val();
					finddiff.hiscoreinsert();
					// go to game over part
					
					finddiff.state = STATE_ENTERNAME;
					finddiff.ongametimer();
		}
	
	},

	// -------------------------------------
	// restore game from previously saved game
	// -------------------------------------
	restoregame: function () {

		// restore values
		finddiff.level      = savedgame.level;
		finddiff.score      = savedgame.score;
		finddiff.timeleft   = savedgame.timeleft;
		finddiff.hints      = savedgame.hints;
		finddiff.photoindex = savedgame.photoindex;

		// show values on screen
		$('#scorebar').text(finddiff.score);
		if (finddiff.hints != -1) {
			$('#hintbtn').text(finddiff.hints);
		};

		// lookup photoindex in current random order list
		for (var i; i < finddiff.photoorder.length; i++) {
			if (finddiff.photoindex == finddiff.photoorder[i]) {
				finddiff.orderindex = i;
			};
		};

		// select the same differences from that picture as previous game
		for (var i = 0; i < savedgame.selecteddiffs.length; i++) {
			var index = savedgame.selecteddiffs[i].index;
			
			finddiff.selecteddiffs[i] = [];

			// force copy by value, not by reference
			finddiff.selecteddiffs[i] = {
				x: photodata[finddiff.photoindex].differences[index].x,
				y: photodata[finddiff.photoindex].differences[index].y,
				w: photodata[finddiff.photoindex].differences[index].w,
				h: photodata[finddiff.photoindex].differences[index].h,
				index: index,   // add vars for gameplay bookkeeping
				found: savedgame.selecteddiffs[i].found,
				drawside: savedgame.selecteddiffs[i].drawside // left or right
			};
		};

		// Android webview, rare: when load exact same image again, clear src else onload event doesn't get called
		finddiff.image1.src = '';
		finddiff.image2.src = '';

		// load both org/edit images, either image will trigger onimageloaded
		finddiff.imgloaded = 0;
		finddiff.image1.src = 'photos/' + photodata[finddiff.photoindex].fileorg;
		finddiff.image2.src = 'photos/' + photodata[finddiff.photoindex].fileedit;
	},
	// -------------------------------------
	// start a level
	// -------------------------------------
	onlevelstart: function () {
		// reset variables
		finddiff.state = STATE_LEVELSTART; // switch to intro
		finddiff.diffsfound = 0;
		finddiff.timecount = 100; // 100 seconds

		// reset coins
		$('#diffsfound > div ').removeClass("diffscoin1").addClass("diffscoin0");
		// hide any message from previous game/level
		$('.gamemessage').hide();
		
		platspec.play('levelup');
		
		// when restore game
		if (savedgame != null) {
			// mark any differences already found in previous game
			for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
				if (finddiff.selecteddiffs[i].found == true) {
					finddiff.markdifference(i, 1); // 1=found
					finddiff.diffsfound++;
					$('#diffsfound .diffscoin0:first').removeClass("diffscoin0").addClass("diffscoin1");
				};
			};
			savedgame = null;
		} else {
			// not restore, new level
			finddiff.timeleft = finddiff.timecount;
		};

		// display full timer bar and (re)set color to blue
		finddiff.timerbarupdate();

		// show level, create new div
		var xpos = ( ($(window).width()) / 2) - (finddiff.basesize * 1.5);
		var ypos = ($(window).height()) / 2;
		
		var $animlevel = $('<div class="levelindicator" style="left:' + xpos + 'px; top:' + ypos + 'px;width: ' + (finddiff.basesize*3) + 'px;">LEVEL ' + finddiff.level + '</div>');
		$('#gamearea').append($animlevel);
		// add animation
		$animlevel.animate(
			{
				top : '-='+finddiff.basesize
			},
			1500,
			function(){
				$(this).remove();
			}
		);

		// start timer
		finddiff.timerId = setInterval(finddiff.ongametimer, 1000);
	},

	// -------------------------------------
	// game timer called every second
	// -------------------------------------
	ongametimer: function () {
		switch (finddiff.state) {
			case STATE_LEVELSTART:
				// intro ready, start playing game
				finddiff.state = STATE_PLAYING;
				break;
			case STATE_PLAYING:
				finddiff.timercountdown(1);
				break;
			case STATE_TIMEBONUS:
				if (finddiff.timeleft > 0) {
					// remove remaining time seconds
					finddiff.timeleft = finddiff.timeleft - 1;
					finddiff.timerbarupdate();
					// add to score
					//finddiff.score = finddiff.score + 5;
					//$('#scorebar').text(finddiff.score);
				} else {
					// all seconds added, goto "next level" screen
					clearInterval(finddiff.timerId);
					finddiff.state = STATE_LEVELWIN;
					finddiff.timerId = setInterval(finddiff.ongametimer, 1000);
					finddiff.ongametimer(); // go immediately, don't wait for timer
				};
				break;
			case STATE_LEVELWIN:
				clearInterval(finddiff.timerId);
				$('.gamemessage h1').text('Level completed!');
				$('#nameinput').hide();
				$('.gamemessage .diffbutton:first').hide();
				$('.gamemessage .diffbutton:last').text('next level!');
				$('.gamemessage').show();
				break;
			case STATE_GAMEEND: // game outro
				// check remaining differences
				var iRemain = -1;
				for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
					// check if not already found
					if (finddiff.selecteddiffs[i].found == false) {
						iRemain++;
						if (iRemain == 0) {
							// mark unfound differences
							platspec.play('incorrect');
							finddiff.markdifference(i, 0); // 0=not found
						};
					};
				};
				// all remaining differences are revealed
				if (iRemain <= 0) {
					// check for highscore
					if (finddiff.hiscorecheck()) {
						if (finddiff.debugcheat == true) {
							finddiff.state = STATE_GAMEOVER; // game over
							platspec.dialoginfo("New highscore!", "You may not enter your name because you cheated..", "Ok");
						} else {
							finddiff.state = STATE_ENTERNAME; // highscore enter name
						};
					} else {
						finddiff.state = STATE_GAMEOVER; // game over
					};
				};
				break;
			case STATE_ENTERNAME:
				clearInterval(finddiff.timerId);
				$('.gamemessage h1').text('New highscore!');
				$('#nameinput').val(finddiff.mostrecentname);
				$('#nameinput').show();
				$('.gamemessage .diffbutton:first').hide();
				$('.gamemessage .diffbutton:last').text('Ok');
				$('.gamemessage').show();
				
				$('#nameinput').focus();
				break;
			case STATE_GAMEOVER:
				clearInterval(finddiff.timerId);
				$('.gamemessage h1').text('Time up, game over!');
				$('#nameinput').hide();
				$('.gamemessage .diffbutton:first').show();
				$('.gamemessage .diffbutton:last').text('Restart!');
				$('.gamemessage').show();
				platspec.play('lose');
				break;
		};
	},

	// -------------------------------------
	// game timer count down, called every second
	// -------------------------------------
	timercountdown: function (countsec) {
		// a second passed
		finddiff.timeleft = finddiff.timeleft - countsec;

		finddiff.timerbarupdate();

		// check if time is up
		if (finddiff.timeleft <= 0) {
			
			// cancel timer
			finddiff.state = STATE_GAMEEND; // outro
			finddiff.ongametimer(); // go immediately, don't wait for timer
		};

		// sound effect when passing 15-seconds-left threshold
		if ( (finddiff.timeleft <= 15) && (finddiff.timeleft+countsec > 15) ) {
			platspec.play('time');
		}
	},

	// -------------------------------------
	// game timer update bar on screen
	// -------------------------------------
	timerbarupdate: function () {
		// update timer bar on screen
		var percleft = 100.0 * (finddiff.timeleft / finddiff.timecount);
		var strcolor = "#36bbce";

		// red when less than 15 sec left
		if (finddiff.timeleft <= 15) {
			strcolor = "#db0058";
		} else {
			// yellow when less than 50 sec left
			if (finddiff.timeleft <= 50) {
				strcolor = "#ffcf00";
			};
		};
		// set timer bar value and color
		$('#timebar > div').css({
			width:percleft+"%",
			"background-color": strcolor
		});
	},

	// -------------------------------------
	// during game touch canvas
	// -------------------------------------
	ongametouch: function (el, e){

		// only when playing a level, not when game over
		if (finddiff.state == STATE_PLAYING) {

			// assume player guess was incorrect
			var bCorrectGuess = false;

			// determine x,y position within entire document
			var xscr = e.pageX;
			var yscr = e.pageY;
			// event object for event TOUCHSTART is different to event MOUSEDOWN (!?)
			if (typeof xscr === 'undefined') {
				xscr = e.originalEvent.touches[0].pageX;
				yscr = e.originalEvent.touches[0].pageY;
			}
			// determine x,y position in canvas image
			var pos = findPos(el);
			var xpix = Math.floor((xscr - pos.x) / finddiff.zoomfactor); // correction for scaling/zoom of canvas
			var ypix = Math.floor((yscr - pos.y) / finddiff.zoomfactor);

			// check if there is a difference at position x,y
			for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
				// check if not already found
				if (finddiff.selecteddiffs[i].found == false) {
					var x, y, w, h;

					x = finddiff.selecteddiffs[i].x;
					y = finddiff.selecteddiffs[i].y;
					w = finddiff.selecteddiffs[i].w;
					h = finddiff.selecteddiffs[i].h;
					// check if correct
					if ( (ypix >= y) && (ypix <= y+h) && (xpix >= x) && (xpix <= x+w) ) {
						// user found a difference!
						finddiff.markdifference(i, 1); // 1=player found it

						// player guess was correct
						bCorrectGuess = true;
						break;
					};
				};
			};

			// correct or incorrect
			if (bCorrectGuess == true) {
				// center of difference area
				x = (x + (w / 2)) * finddiff.zoomfactor; // zoomfactor=correction for scaling/zoom of canvas
				y = (y + (h / 2)) * finddiff.zoomfactor;
				// add score
				finddiff.score = finddiff.score + 100;
				$('#scorebar').text(finddiff.score);
				finddiff.animateicon(x, y, 'correcticon');
				finddiff.oncorrectguess();
			} else {
				// center position within canvas (without offset pos within document)
				xscr = xscr - pos.x;
				yscr = yscr - pos.y;
				platspec.play('incorrect');
				finddiff.animateicon(xscr, yscr, 'incorrecticon');
				finddiff.animateicon(xscr, yscr, 'penaltyicon');
				// incorrect guess; 10 penalty seconds
				finddiff.timercountdown(10);
			};
		};
	},

	// -------------------------------------
	// enable/disable hints button
	// -------------------------------------
	inithintsbutton: function (){

		// to be safe, remove all previous 
		$("#hintbtn").removeClass("hinticon0");
		$("#hintbtn").removeClass("hinticon1");
		$("#hintbtn").removeClass("hinticon2");
	
		// only when playing a level, not when game over
		if (finddiff.userrate == "") {
			$("#hintbtn").addClass("hinticon2"); // disabled
			$('#hintbtn').text('');
		} else {
			$("#hintbtn").addClass("hinticon0"); // normal enabled
			$('#hintbtn').text(finddiff.hints);
		};
	},
	
	// -------------------------------------
	// during game touch canvas
	// -------------------------------------
	onhintuse: function (){

		// only when playing a level, not when game over
		if (finddiff.hints > 0) {
			var x, y;
			// check all current differences
			for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
				// find the first difference that has not been found yet
				if (finddiff.selecteddiffs[i].found == false) {
					finddiff.markdifference(i, 1); // 1=found
					finddiff.hints--;
					$('#hintbtn').text(finddiff.hints);
					// position for animation
					x = (finddiff.selecteddiffs[i].x + (finddiff.selecteddiffs[i].w / 2) ) * finddiff.zoomfactor; // zoomfactor=correction for scaling/zoom of canvas
					y = (finddiff.selecteddiffs[i].y + (finddiff.selecteddiffs[i].h / 2) ) * finddiff.zoomfactor;
					break;
				};
			};
			// for the rest, handle as if user found this difference
			finddiff.animateicon(x, y, 'correcticon');
			finddiff.oncorrectguess();				
		} else if (finddiff.hints == 0) {
			// no more hints available
			platspec.play('incorrect');
		} else {
			// user has not rated this app yet
			// pause game and show "enable hints" panel
			platspec.play('input');
			finddiff.rategame(true);
		};
	},

	// -------------------------------------
	// circle difference in green or red
	// -------------------------------------
	markdifference: function(index, found) {
			
		finddiff.selecteddiffs[index].found = true;

		var x, y, w, h, color;

		x = finddiff.selecteddiffs[index].x;
		y = finddiff.selecteddiffs[index].y;
		w = finddiff.selecteddiffs[index].w;
		h = finddiff.selecteddiffs[index].h;

		if (found == 1) {
			color = "#0f0" // green, player found it
		} else { // 0
			color = "#db0058" // red, at gameover player did not find it
		};

		// IMPORTANT NOTE:
		// due to an unexplained canvas feature (perhaps combined with Phonegap?),
		// just doing a .rect will not display the rectangles entirely, but cut off to a 480x512 viewport(?)
		// By first doing a .rect() on the entire canvas area this is somehow fixed,
		// not clue why this is.
		finddiff.context1.beginPath();
		finddiff.context1.fillStyle = 'rgba(0,0,0,0)'; // invisible
		finddiff.context1.rect(0, 0, 1000, 1000); // 400,426
		finddiff.context1.fill();
		finddiff.context1.closePath();
		
		finddiff.context2.beginPath();
		finddiff.context2.fillStyle = 'rgba(0,0,0,0)';
		finddiff.context2.rect(0, 0, 1000, 1000); // 400,426
		finddiff.context2.fill();
		finddiff.context2.closePath();
			
		// now draw the green or red rectangle
		finddiff.drawEllipse(finddiff.context1, x, y, w, h, color);
		finddiff.drawEllipse(finddiff.context2, x, y, w, h, color);

	},

	// -------------------------------------
	// draw ellipse within bounding rectangle
	// -------------------------------------
	drawEllipse: function(ctx, x, y, w, h, color) {
		// draw ellipse within bounding rectangle, by Steve Tranby
		// http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
		
		// slightly larger so it better surrounds difference
		//x = x - ELLIPSE_LARGER_PX;
		//y = y - ELLIPSE_LARGER_PX;
		//w = w + (2 * ELLIPSE_LARGER_PX);
		//h = h + (2 * ELLIPSE_LARGER_PX);
		
		// calculate positions
		var kappa = .5522848, // 4 * ((√(2) - 1) / 3)
		ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2;       // y-middle

		// draw ellipse
		ctx.beginPath();
		ctx.moveTo(x, ym); // start center left
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y); // top-left arc
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym); // top-right arc
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye); // bottom-right arc
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym); // bottom-left arc
		ctx.closePath();
		ctx.lineWidth = "3";
		ctx.strokeStyle = color;
		ctx.stroke();
	},
	
	// -------------------------------------
	// player found a difference
	// -------------------------------------
	oncorrectguess: function() {

		// sound and animation
		platspec.play('correct');
				
		// add coin
		$('#diffsfound .diffscoin0:first').removeClass("diffscoin0").addClass("diffscoin1");
		
		// check if all differences found
		var iFound = 0;
		for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
			// count all differences found
			if (finddiff.selecteddiffs[i].found == true) {
				iFound++;
			};
		};

		// player wins
		if (iFound == finddiff.selecteddiffs.length) {
			clearInterval(finddiff.timerId);
			finddiff.state = STATE_TIMEBONUS;
			finddiff.timerId = setInterval(finddiff.ongametimer, 20); // faster for time bonus
			finddiff.ongametimer(); // go immediately, don't wait for timer
			// level win sound effect, short delay to wait for last 'correct' sound effect to finish
			setTimeout(function() {
				platspec.play('win');
			}, 250);
		};
	},

	// -------------------------------------
	// correct/incorrect animation icon
	// -------------------------------------
	animateicon: function (xpos, ypos, iconclass) {
	
		// correction for center of icon
		xpos = xpos - (finddiff.basesize / 4);
		ypos = ypos - (finddiff.basesize / 4);

		var xoffset = 0;
		var yoffset = 0;

		// display icon on both left and right photo
		for (var i = 0; i < 2; i++) {
		
			// left or right
			if (i == 0) {
				// left
				var pos = findPos(document.getElementById('myCanvas1'));
				xoffset = pos.x;
				yoffset = pos.y;
			} else {
				//right
				var pos = findPos(document.getElementById('myCanvas2'));
				xoffset = pos.x;
				yoffset = pos.y;
			};

			// create new div
			var $animicon = $('<div class="' + iconclass + '" style="left:' + (xpos + xoffset) + 'px; top:' + (ypos + yoffset) + 'px; width: ' + (finddiff.basesize/2) + 'px; height: ' + (finddiff.basesize/2) + 'px;"></div>');

			// add to gamearea
			$('#gamearea').append($animicon);

			// movement, except for incorrect icon, so player can clearly see in both photos where he touched incorrectly
			var yMove = finddiff.basesize;
			if (iconclass == 'incorrecticon') {yMove = 0};

			// add animation
			$animicon.animate(
				{
					top : '-='+yMove
				},
				1000,
				function(){
					$(this).remove();
				}
			);
		};
	},

	// -------------------------------------
	// after user goes to play store then back to game
	// sometimes canvas is empty, fix by refreshing canvas.
	// -------------------------------------
	refreshcanvas: function () {
		// IMPORTANT NOTE:
		// due to an unexplained canvas feature (perhaps combined with Phonegap?),
		// just doing a .rect will not display the rectangles entirely, but cut off to a 480x512 viewport(?)
		// By first doing a .rect() on the entire canvas area this is somehow fixed,
		// not clue why this is.
		finddiff.context1.beginPath();
		finddiff.context1.fillStyle = 'rgba(0,0,0,0)'; // invisible
		finddiff.context1.rect(0, 0, 1000, 1000); // 400,426
		finddiff.context1.fill();
		finddiff.context1.closePath();
		
		finddiff.context2.beginPath();
		finddiff.context2.fillStyle = 'rgba(0,0,0,0)';
		finddiff.context2.rect(0, 0, 1000, 1000); // 400,426
		finddiff.context2.fill();
		finddiff.context2.closePath();
	},

	// -------------------------------------
	// game pause (b=true) or continue game(b=false)
	// -------------------------------------
	pausegame: function (b) {
		if (b) {
			$('#pausepanel').show();
			clearInterval(finddiff.timerId);
		} else {
			finddiff.refreshcanvas(); // to fix bug in Android? after rate game...??!
			$('#pausepanel').hide();
			finddiff.timerId = setInterval(finddiff.ongametimer, 1000);
		};
	},

	// -------------------------------------
	// show rate-this-game panel, game pause (b=true) or continue game(b=false)
	// -------------------------------------
	rategame: function (b) {
		if (b) {
			$('#ratepanel').show();
			clearInterval(finddiff.timerId);
		} else {
			$('#ratepanel').hide();
			finddiff.timerId = setInterval(finddiff.ongametimer, 1000);
		};
	},
	dialogconfirm: function (title, msg, btn1, btn2, functionconfirm) {
		navigator.notification.confirm(
			msg,                // message
			functionconfirm,    // callback to invoke with index of button pressed
			title,              // title
			(btn1 + ',' + btn2) // buttonLabels
		);
	},
	// -------------------------------------
	// in-game menu button pressed
	// -------------------------------------
	ondiffbuttonpress: function (id) {
		switch (id)
		{
			// main menu
			case "mmsta": // game start
				// load any previous game
				finddiff.loadgame();
				platspec.play('forward');
				$('#menuarea').hide();
				$('#gamearea').show();
				// restore previous game?
				if (savedgame != null) {
					//platspec.dialogconfirm('Continue game', 'Continue previous game or start a new game?', 'Continue', 'New', finddiff.continuegame);
					finddiff.dialogconfirm('Continue game', 'Continue previous game or start a new game?', 'Continue', 'New', finddiff.continuegame);
					
				} else {
					finddiff.newgame();
				}
				break;
			case "mmins": // instructions
				platspec.play('input');
				finddiff.menudisplay('instructions');
				break;
			case "mmhis": // highscores
				platspec.play('input');
				finddiff.menudisplay('highscores');
				break;
			case "mminf": // about screen
				platspec.play('input');
				finddiff.menudisplay('aboutmenu');
				break;
			case "insok": // from instructions back to main menu
				platspec.play('input');
				finddiff.menudisplay('mainmenu');
				break;
			case "hisok": // from highscores back to main menu
				platspec.play('input');
				finddiff.menudisplay('mainmenu');
				break;
			case "infok": // from about back to main menu
				platspec.play('input');
				finddiff.menudisplay('mainmenu');
				break;
			case "dbgok": // from about back to main menu
				platspec.play('input');
				finddiff.menudisplay('mainmenu');
				break;
			case "gameok":
				platspec.play('forward');
				if (finddiff.state == STATE_LEVELWIN) {
					finddiff.nextlevel();
				} else if (finddiff.state == STATE_ENTERNAME) {
					// highscore enter name
					finddiff.mostrecentname = $('#nameinput').val();
					finddiff.hiscoreinsert();
					// go to game over part
					finddiff.state = STATE_GAMEOVER;
					finddiff.ongametimer();
				} else {
					finddiff.newgame();
				};
				break;
			case "gameback":
				platspec.play('back');
				finddiff.quitfromgame(1);
				break;
			case "hintbtn":
				// can only use hints while playing
				if (finddiff.state <= 1) {
					finddiff.onhintuse();
				};
				break;
			case "pausebtn":
				// can only pause while playing
				if (finddiff.state <= STATE_PLAYING) { // playying or level start
					platspec.play('input');
					finddiff.pausegame(true);
				};
				break;
			case "pausecont":
				platspec.play('input');
				finddiff.pausegame(false);
				break;
			case "pausequit":
				platspec.play('back');
				//platspec.dialogconfirm('Leave game', 'Leave this game, are you sure?', 'Yes', 'No', finddiff.quitfromgame);
				
				//finddiff.dialogconfirm('Leave game', 'Leave this game, are you sure?', 'Yes', 'No', finddiff.quitfromgame(1));
				finddiff.quitfromgame(1);
				break;
			case "rateback":
				platspec.play('input');
				finddiff.rategame(false);
				break;
			case "rateok":
				platspec.play('forward');

				// YES! user rates app, remember this!
				window.localStorage.setItem("finddiff_userrate", VERSION_NUMBER);
				finddiff.userrate = VERSION_NUMBER;
				window.open(platspec.urlrateapp, "_system"); // open app store
				
				// hints enabled immediately
				finddiff.hints = 3;
				finddiff.inithintsbutton();
				finddiff.rategame(false); // hide rate panel
				// weird Android bug: when going to Play Store panel and then after a while back to game
				// the phonegap app/game will somehow be messed up, canvas image is cleared etc.
				// so, just quit game and saved game will allow player to continue later (=full reset of game+images)
				clearInterval(finddiff.timerId);
				finddiff.quitfromgame(1); 
				break;
			//default:
				//?
		};
	},

	// -------------------------------------
	// debug menu 'button' (=table cell) pressed
	// -------------------------------------
	ondebugbuttonpress: function (id) {
		var nextindex = parseInt((finddiff.orderindex+1) % photodata.length);
		nextindex = finddiff.photoorder[nextindex];
		
		// determine which debug button was pressed
		switch (id)
		{
			case "dbgprev": // next
				platspec.play('input');
				finddiff.gotophotoindex((nextindex-1));
				break;
			case "dbgnext": // next
				platspec.play('input');
				finddiff.gotophotoindex((nextindex+1));
				break;
			case "dbgcheat": // next
				platspec.play('input');
				finddiff.debugcheat = !finddiff.debugcheat;
				break;
			case "dbgorder": // next
				platspec.play('input');
				finddiff.debugorder = !finddiff.debugorder;
				finddiff.shufflephotoorder(nextindex);
				break;
		};
		
		// refresh values
		this.debugmenurefresh();
	},

	// -------------------------------------
	// debug menu refresh all values
	// -------------------------------------
	debugmenurefresh: function () {
		var str = "";

		// next photo
		var nextindex = parseInt((finddiff.orderindex+1) % photodata.length);
		nextindex = finddiff.photoorder[nextindex];
		str = "" + (nextindex+1) + ") " + photodata[nextindex].caption;
		$('#debugmenu tr:nth-child(2) td:nth-child(1)').text(str);

		// random order or ordered
		str = "Ordered";
		if (finddiff.debugorder == false) {str = "Random";};
		$('#debugmenu tr:nth-child(3) td:nth-child(2)').text(str);
		
		// number of hints
		str = "No";
		if (finddiff.debugcheat == true) {str = "Yes";};
		$('#debugmenu tr:nth-child(4) td:nth-child(2)').text(str);

		// resolution info
		str = "Resolution: " + finddiff.debug_winwidth +  " x "+ finddiff.debug_winheight + ". Window: " + $(window).width() + " x " + $(window).height();
		$('#debugmenu tr:nth-child(5) td:nth-child(1)').text(str);

		// browser info
		str = "Platform: "+navigator.platform + ". Language: " + navigator.language;
		$('#debugmenu tr:nth-child(6) td:nth-child(1)').text(str);

		// NOTE: don't replace html as this screws up the layout because of the updated CSS
		//$('#debugmenu table').html(html);
	},

	onlogotouch: function (el, e){
	
		// only works from the about menu
		if ($('#aboutmenu').is(':visible')) {
			var xscr = e.pageX;
			var yscr = e.pageY;
			// event object for event TOUCHSTART is different to event MOUSEDOWN (!?)
			if (typeof xscr === 'undefined') {
				xscr = e.originalEvent.touches[0].pageX;
				yscr = e.originalEvent.touches[0].pageY;
			};
			
			// determine if user tapped touched top or bottom of logo
			if ( (yscr - el.offsetTop) > (el.height / 2) ) {
				this.secretcode += 'B';
			} else {
				this.secretcode += 'T'
			};

			// cut off secret code to max 6 characters
			if (this.secretcode.length > 6) {this.secretcode = this.secretcode.substring(this.secretcode.length - 6)};

			// check if secret code
			if (this.secretcode == "TBTTBB") {
				this.secretcode = "";
				platspec.play('levelup'); // platspec.play('correct')
				finddiff.menudisplay('debugmenu');
			};
		};
	},

	// -------------------------------------
	// user answered continue game? dialog
	// -------------------------------------
	continuegame: function(btnindex) {
		if ( (btnindex == 1) || (btnindex == true) ) // values 1 and true are the same?
		{
			finddiff.restoregame();
		} else {
			savedgame = null;
			finddiff.newgame();
		};
	},
	
	// -------------------------------------
	// from in-game back to main menu
	// -------------------------------------
	quitfromgame: function(btnindex) {
		if ( (btnindex == 1) || (btnindex == true) ) // values 1 and true are the same?
		{
			// save current game if needed
			finddiff.savegame();
			// back to main menu
			$('.gamepause').hide();
			$('#gamearea').hide();
			$('#menuarea').show();
			// not playing anymore
			finddiff.state = STATE_GAMEOVER
		}
	},
	
	// -------------------------------------
	// resize layout for device screen
	// -------------------------------------
	resize: function() {
		// resize menu area and game area to full screen
		var windowwidth = $(window).width();
		var windowheight = $(window).height();
		
		// save width and height at startup for debug info
		if (finddiff.debug_winwidth == 0) {
			finddiff.debug_winwidth = windowwidth;
			finddiff.debug_winheight = windowheight;
		};
		
		$('#menuarea').css({
			width: windowwidth+"px",
			height: windowheight+"px"
		});
		$('#gamearea').css({
			width: windowwidth+"px",
			height: windowheight+"px"
		});

		// game area layout
		$('#gamestatus').css({
			height: (windowheight*0.1111)+"px"
		});
		$('.photoarea').css({
			height: (windowheight*0.8888)+"px"
		});
		$('.photocontainer').css({
			width: (windowwidth/2)+"px",
			height: (windowheight*0.8888)+"px"
		});
		// resize photo canvas
		var canvaswidth = windowwidth/2;
		var canvasheight = (windowheight*0.8888);
		if (canvaswidth/canvasheight >= PHOTO_ASPECT) {
			// height is bottleneck
			canvaswidth = canvasheight * PHOTO_ASPECT;
		} else {
			// width is bottleneck
			canvasheight = canvaswidth / PHOTO_ASPECT;
		};
		
		 
		// set photo canvas size
		$('.photocanvas').css({
			height: canvasheight+"px",
			width: canvaswidth+"px"
		});
		
		// resize all game elements
		var scrwidth = $(window).width();
		//if (scrwidth > $(window).height()) {scrwidth = $(window).height()}; // landscape mode..
		var basesize = $('#gamestatus').height(); // base=32px
		if (basesize > scrwidth/15) {basesize = scrwidth/15}; // landscape mode..

		// remember zoomfactor
		finddiff.basesize = basesize;
		finddiff.zoomfactor = canvaswidth / finddiff.image1.width;
		
		// resize icons
		$('.diffscoin0, .diffscoin1, .hinticon0, .hinticon1, .hinticon2, .pauseicon0, .pauseicon1').css({
			height: basesize+"px",
			width: basesize+"px"
		});		
		$('.diffscoin0, .diffscoin1, .hinticon0, .hinticon1, .hinticon2, .pauseicon0, .pauseicon1').css({
			"line-height": basesize+"px",
			"font-size": (basesize*0.4)+"px"
		});
		$('.correcticon, .incorrecticon, .penaltyicon').css({
			height: basesize+"px",
			width: basesize+"px"
		});
		$('.bdrlogo').css({
			height: (basesize*2)+"px",
			width: (basesize*2)+"px"
		});	
		// resize in-game status bars
		var restwidth = (scrwidth - (basesize*(5+2)) ) / 2; // 2 icons+5 diffcoins, divide leftover space between scorebar and timebar
		$('#gamestatus #scorebar').css({
			//width: restwidth+"px",
			width: (restwidth)+"px", // hints temporary disabled, add hint-width to scorebar with for now
			"font-size": (basesize*0.75)+"px"
		});
		//$('#gamestatus #diffsfound').css({
		//	width: (basesize*5)+"px"
		//});
		$('#gamestatus #timeleft').css({
			width: restwidth+"px"
		});

		// timer count down bar
		$('#timebar').css({
			"margin-top": (basesize/3.2)+"px",
			"border-radius": (basesize/2.66)+"px",
			"padding": (basesize/32)+"px"
		});
		$('#timebar > div').css({
			height: (basesize/4)+"px",
			"border-radius": (basesize/8)+"px"
		});

		// resize all menu elements
		basesize = $(window).height() / 20; // base=32px
		
		$('body, html').css({
			"font-size": basesize+"px"
		});
		$('.diffbutton').css({
			"margin-top": (basesize/2)+"px",
			"border-radius": (basesize/4)+"px",
			"border-width": (basesize/8)+"px",
			"padding-top": (basesize/4)+"px",
			"padding-bottom": (basesize/4)+"px"
		});
		
		$('.btnnormal').css({
			width: (basesize*8)+"px",
			height: (basesize*1.5)+"px"
		});
		$('.btnsmall').css({
			width: (basesize*1.5)+"px",
			height: (basesize*1)+"px"
		});
		$('.diffpanel').css({
			"margin-top": (basesize/2)+"px",
			"border": (basesize/4)+ "px #5fc0ce solid",
			"-webkit-border-radius": (basesize/2)+"px",
			"-moz-border-radius": (basesize/2)+"px",
			"border-radius": (basesize/2)+"px"
		});
		$('#logo img').css({
			height: (basesize*2)+"px",
			"margin-top": (basesize/2)+"px"
		});
		$('#mainmenu').css({
			"margin-top": (basesize*1.5)+"px"
		});
		$('#mainmenuabout').css({
			"bottom":(basesize*0.5)+"px",
			"right":(basesize*0.5)+"px"
		});
		// highscore table
		$('.difftable td').css({
			"padding": (basesize/6)+"px"
		});
		// in-game message
		$('.gamemessage').css({
			"padding-bottom": basesize+"px"
		});
		$('.gamemessage input').css({
			"font-size": basesize+"px"
		});			
	},
	
	// -------------------------------------
	// main menu, display a menu area and hide the others
	// -------------------------------------
	menudisplay: function (id) {
		switch (id) {
			case 'mainmenu':
				$('#mainmenu').show();
				$('#copyrightnotice, #mainmenuabout').show();				

				$('#instructions').hide();
				$('#highscores').hide();
				$('#aboutmenu').hide();
				$('#debugmenu').hide();
				break;
			case 'instructions':
				$('#mainmenu').hide();
				$('#copyrightnotice, #mainmenuabout').hide();

				$('#instructions').show();
				break;
			case 'highscores':
				$('#mainmenu').hide();
				$('#copyrightnotice, #mainmenuabout').hide();

				$('#highscores').show();
				break;
			case 'aboutmenu':
				$('#mainmenu').hide();
				$('#copyrightnotice, #mainmenuabout').hide();

				$('#aboutmenu').show();
				break;
			case 'debugmenu':
				finddiff.debugmenurefresh();
				$('#aboutmenu').hide();
				$('#debugmenu').show();
				break;
		}
	},

	// -------------------------------------
	// show highscores on screen
	// -------------------------------------
	highscoredisplay: function () {
		// update names and scores in highscore table
		for (var i = 0; i < HIGHSCORE_LENGTH; i++) {
			$('#highscores tr:nth-child('+(i+2)+') td:nth-child(2)').text(finddiff.highscores[i].name);
			$('#highscores tr:nth-child('+(i+2)+') td:nth-child(3)').text(finddiff.highscores[i].score);
		};
		// NOTE: don't replace html as this screws up the layout because of the updated CSS
		//$('#highscores table').html(html);
	},

	// -------------------------------------
	// check if new highscore, return true/false
	// -------------------------------------
	hiscorecheck: function () {
		if (finddiff.score > finddiff.highscores[4].score) {
			return true;
		} else {
			return false;
		};
	},

	// -------------------------------------
	// insert highscores to list
	// returns new rank nr or -1 for no new highscore
	// -------------------------------------
	hiscoreinsert: function () {
		// determine at which place in list the new score goes
		// (assumes list is sorted with [0] highest score and [4] lowest score)
		var place = -1;
		for (var i = HIGHSCORE_LENGTH-1; i >= 0; i--) {
			if (finddiff.score > finddiff.highscores[i].score) {
				place = i;
			};
		};
		// if place found
		if (place != -1) {
			// build JSON object
			var his = {name: finddiff.mostrecentname, score: finddiff.score};
			// drop last score and insert new score
			finddiff.highscores.splice((HIGHSCORE_LENGTH-1), 1);
			finddiff.highscores.splice(place, 0, his);
			// save and refresh htmltable
			finddiff.highscoresave();
			finddiff.highscoredisplay();
		};
		return place;
	},

	// -------------------------------------
	// save highscores from local storage
	// -------------------------------------
	highscoresave: function () {
		// note: just using "localStorage" breaks compatibility on Android 2.x, must use window.localStorage
		window.localStorage.setItem("finddiff_highscores", JSON.stringify(finddiff.highscores));
		window.localStorage.setItem("finddiff_mostrecentname", finddiff.mostrecentname);
	},

	// -------------------------------------
	// load highscores from local storage
	// -------------------------------------
	highscoreload: function () {
	
		// load settings
		// note: bug with localstorage, for now user not required to rateapp and always allow hints
		finddiff.userrate = "v1.0"; //window.localStorage.getItem("finddiff_userrate") || "";

		// load highscores
		var strload = window.localStorage.getItem("finddiff_highscores");
		finddiff.highscores = JSON.parse(strload);

		// add default values when highscores is null
		if (!finddiff.highscores) {
			// backwards compatible with old localstore item name
			var strload = window.localStorage.getItem("photospot_highscores");
			finddiff.highscores = JSON.parse(strload);

			if (!finddiff.highscores) {
				finddiff.highscores = [];
				for (var i = 0; i < HIGHSCORE_LENGTH; i++) {
					finddiff.highscores[i] = { name: "XXX", date:"2018-08-08", level: 1, score:100};
				};
			};
		};
		// make it easy for player to enter name
		finddiff.mostrecentname = window.localStorage.getItem("finddiff_mostrecentname");
		if (!finddiff.mostrecentname) {
			// backwards compatible with old localstore item name
			finddiff.mostrecentname = window.localStorage.getItem("photospot_mostrecentname");
			if (!finddiff.mostrecentname) {
				finddiff.mostrecentname = "Enter name";
			};
		};
	},
	
	// -------------------------------------
	// save current game
	// -------------------------------------
	savegame: function () {
		// only save when playing
		if (finddiff.state < STATE_GAMEEND) {

			// only need to save diff index and found y/n
			var diffs = [];
			for (var i = 0; i < finddiff.selecteddiffs.length; i++) {
				diffs[i] = {"index": finddiff.selecteddiffs[i].index, "drawside": finddiff.selecteddiffs[i].drawside,"found": finddiff.selecteddiffs[i].found};
			}

			// save in local storage
			savedgame = {level: finddiff.level,
						score: finddiff.score,
						timeleft: finddiff.timeleft,
						hints: finddiff.hints,
						photoindex: finddiff.photoindex,
						selecteddiffs: diffs
						};
			window.localStorage.setItem("finddiff_savedgame", JSON.stringify(savedgame));
		}
	},

	// -------------------------------------
	// load previous game
	// -------------------------------------
	loadgame: function () {
		// load previous game, if any
		var strload = window.localStorage.getItem("finddiff_savedgame");
		savedgame = JSON.parse(strload);
		// remove previous game from storage
		window.localStorage.removeItem("finddiff_savedgame");
	}
};

// on page finished loading; see finddiff_extra.js
