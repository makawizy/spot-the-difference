// Find the Difference!
// Bas de Reuver (c)2014
// separate the platform specific stuff
// PLATFORM: ANDROID + PHONEGAP

var platspec = {
	urlrateapp: "market://details?id=com.bdrgames.finddifferences.ads",
	urlmoreapps: "market://search?q=pub:BdR%20Games",
	
	// -------------------------------------
	// check if touch device
	// -------------------------------------
	is_touch_device: function() {
		try {	
			document.createEvent("TouchEvent");
			return true;	
		} catch (e) {
			return false;	
		}
	},

	// -------------------------------------
	// show a message dialog
	// -------------------------------------
	dialoginfo: function (title, msg, btn) {
		navigator.notification.alert(
			msg,   // message
			null,  // callback function
			title, // title
			btn    // buttonName
		);
	},
	
	// -------------------------------------
	// show a message dialog
	// -------------------------------------
	dialogconfirm: function (title, msg, btn1, btn2, functionconfirm) {
		navigator.notification.confirm(
			msg,                // message
			functionconfirm,    // callback to invoke with index of button pressed
			title,              // title
			(btn1 + ',' + btn2) // buttonLabels
		);
	},

	// PGLowLatencyAudio functions for PhoneGap
	preloadFX: function ( id, assetPath, success, fail) {
		return cordova.exec(success, fail, "LowLatencyAudio", "preloadFX", [id, assetPath]);
	},
	preloadAudio: function ( id, assetPath, voices, success, fail) {
		return cordova.exec(success, fail, "LowLatencyAudio", "preloadAudio", [id, assetPath, voices]);
	},
	play: function (id, success, fail) {
		return cordova.exec(success, fail, "LowLatencyAudio", "play", [id]);
	},
	stop: function (id, success, fail) {
		return cordova.exec(success, fail, "LowLatencyAudio", "stop", [id]);
	},
	loop: function (id, success, fail) {
		return cordova.exec(success, fail, "LowLatencyAudio", "loop", [id]);
	},
	unload: function (id, success, fail) {
		return cordova.exec(success, fail, "LowLatencyAudio", "unload", [id]);
	},

	// -------------------------------------
	// AdMob ads and banner
	// -------------------------------------
	/*initAd: function () {
		if ( window.plugins && window.plugins.AdMob ) {
			var ad_units = {
				ios : {
					banner: 'ca-app-pub-7753677466233378/8873586247',
					interstitial: 'ca-app-pub-7753677466233378/8873586247'
				},
				android : {
					banner: 'ca-app-pub-7753677466233378/8873586247',
					interstitial: 'ca-app-pub-7753677466233378/8873586247'
				},
				wp8 : {
					banner: 'ca-app-pub-7753677466233378/8873586247',
					interstitial: 'ca-app-pub-7753677466233378/8873586247'
				}
			};
			var admobid = "";
			if( /(android)/i.test(navigator.userAgent) ) {
				admobid = ad_units.android;
			} else if(/(iphone|ipad)/i.test(navigator.userAgent)) {
				admobid = ad_units.ios;
			} else {
				admobid = ad_units.wp8;
			}

			window.plugins.AdMob.setOptions( {
				publisherId: admobid.banner,
				interstitialAdId: admobid.interstitial,
				bannerAtTop: false, // set to true, to put banner at top
				overlap: false, // set to true, to allow banner overlap webview
				offsetTopBar: false, // set to true to avoid ios7 status bar overlap
				isTesting: false, // receiving test ad
				autoShow: true // auto show interstitial ad when loaded
			});

			this.registerAdEvents();
			window.plugins.AdMob.createBannerView();
		}
	}, */

	// optional, in case respond to events
	/*registerAdEvents: function () {
		document.addEventListener('onReceiveAd', function(){});
		document.addEventListener('onFailedToReceiveAd', function(data){});
		document.addEventListener('onPresentAd', function(){});
		document.addEventListener('onDismissAd', function(){ });
		document.addEventListener('onLeaveToAd', function(){ });
		document.addEventListener('onReceiveInterstitialAd', function(){ });
		document.addEventListener('onPresentInterstitialAd', function(){ });
		document.addEventListener('onDismissInterstitialAd', function(){ });
	}*/

};

// on page finished loading
document.addEventListener("deviceready", function() {
	finddiff.appinit();
}, false)