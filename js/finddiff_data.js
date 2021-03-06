// Find the Difference!
// Bas de Reuver (c)2014
var photodata = [
	{
		fileorg: "people01_org.jpg",
		fileedit: "people01_edit.jpg",
		location: "Rome, Italy",
		date: "2011-09-01",
		caption: "Piazza Navona street artist",
		photoby: "Bas de Reuver",
		geoloc: "41.8994357,12.4729958", // http://mygeoposition.com/
		differences: [
			{x:  38, y:   6, w: 50, h: 76},
			{x: 352, y:  32, w: 62, h: 72},
			{x: 414, y:   8, w: 66, h:248},
			{x:  50, y: 116, w: 96, h:110},
			{x: 332, y: 208, w: 82, h: 42},
			{x: 256, y: 208, w: 64, h: 44},
			{x: 200, y: 260, w: 44, h: 32},
			{x: 346, y: 288, w:112, h: 30},
			{x: 124, y: 312, w: 56, h: 52},
			{x:   2, y: 336, w:114, h: 46},
			{x: 186, y: 342, w: 28, h: 50},
			{x: 288, y: 356, w:132, h: 40},
			{x: 122, y: 376, w: 36, h: 76},
			{x: 396, y: 404, w: 84, h: 64},
			{x: 296, y: 406, w:102, h: 76}
		]
	},
	{
		fileorg: "things01_org.jpg",
		fileedit: "things01_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-03-29",
		caption: "Flower Stand, Vismarkt",
		photoby: "Bas de Reuver",
		geoloc: "53.2172917,6.5642747",
		differences: [
			{x: 320, y:   0, w: 34, h: 36},
			{x: 174, y:   8, w: 42, h: 32},
			{x:  96, y:  34, w: 72, h: 52},
			{x: 264, y:  36, w:118, h: 80},
			{x:   2, y:  50, w: 80, h: 54},
			{x: 222, y:  98, w: 40, h: 34},
			{x: 320, y: 126, w: 38, h: 78},
			{x: 188, y: 132, w:132, h: 68},
			{x:  84, y: 144, w: 70, h: 62},
			{x: 404, y: 146, w: 70, h: 64},
			{x:   0, y: 178, w: 76, h: 80},
			{x: 204, y: 252, w:126, h: 88},
			{x: 336, y: 258, w: 98, h: 80},
			{x:  72, y: 308, w:100, h:102},
			{x: 180, y: 352, w: 54, h: 48},
			{x: 274, y: 354, w: 58, h: 54},
			{x: 358, y: 404, w: 78, h: 48},
			{x: 258, y: 406, w: 40, h: 46}
		]
	},
	{
		fileorg: "things02_org.jpg",
		fileedit: "things02_edit.jpg",
		location: "Venice, Italy",
		date: "2006-08-23",
		caption: "Masks, Venice",
		photoby: "Bas de Reuver",
		geoloc: "45.4345465,12.3369840",
		differences: [
			{x: 326, y:  34, w: 36, h: 46},
			{x:  72, y:  44, w: 38, h: 34},
			{x: 258, y:  18, w: 54, h: 90},
			{x: 344, y: 114, w: 40, h: 46},
			{x:  47, y: 163, w: 84, h: 34},
			{x: 200, y: 164, w: 66, h: 48},
			{x: 375, y: 188, w: 50, h: 29},
			{x:  38, y: 206, w:100, h: 34},
			{x: 166, y: 250, w: 74, h: 46},
			{x: 404, y: 304, w: 48, h: 54},
			{x: 136, y: 328, w: 50, h: 46},
			{x: 360, y: 370, w: 54, h: 54},
			{x: 192, y: 434, w: 31, h: 34},
			{x:  84, y: 437, w: 41, h: 34}
		]
	},
	{
		fileorg: "things03_org.jpg",
		fileedit: "things03_edit.jpg",
		location: "Groningen, Netherlands",
		date: "2014-04-18",
		caption: "Scrabble board",
		photoby: "Bas de Reuver",
		geoloc: "53.2517467,6.5880505",
		differences: [
			{x: 114, y:  12, w: 34, h: 22},
			{x: 324, y:  24, w: 60, h: 34},
			{x: 272, y:  32, w: 48, h: 30},
			{x:  76, y:  58, w: 74, h: 32},
			{x: 318, y:  90, w: 42, h: 28},
			{x:   0, y:  86, w: 58, h: 44},
			{x: 168, y: 100, w: 68, h: 40},
			{x: 274, y: 128, w: 52, h: 38},
			{x: 364, y: 134, w: 50, h: 30},
			{x: 130, y: 144, w: 28, h: 16},
			{x:   6, y: 190, w: 72, h: 50},
			{x: 254, y: 252, w: 32, h: 24},
			{x: 352, y: 290, w: 46, h: 28},
			{x: 108, y: 296, w: 30, h: 24},
			{x: 332, y: 376, w: 88, h: 86},
			{x: 176, y: 386, w:104, h: 88},
			{x: 126, y: 416, w: 38, h: 42},
			{x:  88, y: 444, w: 14, h: 16}
		]
	},
	{
		fileorg: "things04_org.jpg",
		fileedit: "things04_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-20",
		caption: "Jigsaw puzzle",
		photoby: "Bas de Reuver",
		geoloc: "53.2517467,6.5880505",
		differences: [
			{x:  64, y:   0, w: 76, h: 30},
			{x: 224, y:  10, w:188, h:104},
			{x: 192, y:  98, w: 40, h: 46},
			{x:  54, y: 128, w: 60, h: 34},
			{x: 150, y: 150, w: 58, h: 18},
			{x:  10, y: 148, w: 24, h: 56},
			{x: 254, y: 130, w:160, h:140},
			{x: 120, y: 178, w: 86, h: 58},
			{x:   0, y: 204, w: 36, h: 60},
			{x:  64, y: 206, w: 42, h: 58},
			{x: 294, y: 282, w: 56, h: 62},
			{x: 174, y: 274, w: 76, h: 94},
			{x: 352, y: 326, w:128, h: 90},
			{x:   0, y: 336, w: 82, h: 92},
			{x: 258, y: 374, w: 64, h: 72},
			{x:  16, y: 440, w: 84, h: 58},
			{x: 380, y: 438, w: 68, h: 72},
			{x: 226, y: 452, w: 72, h: 54}
		]
	},
	{
		fileorg: "places01_org.jpg",
		fileedit: "places01_edit.jpg",
		location: "Ten Boer, Netherlands",
		date: "2014-04-12",
		caption: "De Widde Meuln",
		photoby: "Bas de Reuver",
		geoloc: "53.2728485,6.6981217",
		differences: [
			{x:  14, y:   0, w:182, h: 58},
			{x: 232, y:   6, w: 42, h: 56},
			{x: 368, y:   2, w:112, h: 68},
			{x: 300, y: 102, w: 58, h: 38},
			{x: 418, y: 164, w: 28, h: 20},
			{x: 210, y: 150, w: 14, h: 68},
			{x: 256, y: 152, w: 16, h: 70},
			{x:   0, y: 206, w: 48, h: 54},
			{x: 236, y: 226, w: 22, h: 46},
			{x: 432, y: 230, w: 26, h: 46},
			{x: 116, y: 206, w: 44, h:100},
			{x: 286, y: 240, w: 54, h: 38},
			{x:   4, y: 352, w: 96, h: 58},
			{x: 390, y: 414, w: 90, h: 98},
			{x: 200, y: 446, w:126, h: 66},
			{x:   0, y: 448, w:104, h: 64}
		]
	},
	{
		fileorg: "food01_org.jpg",
		fileedit: "food01_edit.jpg",
		location: "Groningen, Netherlands",
		date: "2014-04-16",
		caption: "Pastery shop",
		photoby: "Bas de Reuver",
		geoloc: "53.2206246,6.5660408",
		differences: [
			{x: 390, y:   8, w: 62, h: 40},
			{x: 378, y:  66, w:102, h: 54},
			{x:  96, y:  52, w: 56, h:100},
			{x: 206, y:  82, w: 78, h: 82},
			{x: 270, y: 164, w: 64, h:110},
			{x:  38, y: 172, w:110, h: 98},
			{x: 374, y: 198, w: 90, h: 66},
			{x: 414, y: 278, w: 66, h: 54},
			{x:  12, y: 292, w: 76, h: 62},
			{x:  98, y: 328, w: 72, h: 64},
			{x: 296, y: 342, w:100, h:120},
			{x:   0, y: 432, w: 98, h: 80},
			{x: 230, y: 470, w: 82, h: 42}
		]
	},
	{
		fileorg: "food02_org.jpg",
		fileedit: "food02_edit.jpg",
		location: "Groningen, Netherlands",
		date: "2014-04-17",
		caption: "Various candy",
		photoby: "Bas de Reuver",
		geoloc: "53.2332923,6.5380508",
		differences: [
			{x: 128, y:   0, w: 84, h: 54},
			{x: 228, y:  12, w: 94, h: 94},
			{x:  62, y:  50, w: 72, h: 56},
			{x: 344, y:  36, w:116, h:110},
			{x:   0, y: 106, w: 48, h: 92},
			{x: 366, y: 212, w: 92, h: 88},
			{x:  56, y: 174, w:176, h:190},
			{x: 266, y: 284, w:110, h: 82},
			{x:  36, y: 364, w: 76, h: 60},
			{x: 152, y: 368, w:118, h: 70},
			{x:  70, y: 434, w: 76, h: 78},
			{x: 198, y: 448, w: 42, h: 54},
			{x: 260, y: 444, w:136, h: 68}
		]
	},
	{
		fileorg: "food03_org.jpg",
		fileedit: "food03_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-19",
		caption: "Vegetable stand",
		photoby: "Bas de Reuver",
		geoloc: "53.2174194,6.5653905",
		differences: [
			{x: 114, y:   0, w: 16, h: 76},
			{x:  28, y:  20, w: 60, h: 70},
			{x: 364, y:  34, w: 50, h: 50},
			{x: 200, y:  62, w: 58, h: 80},
			{x: 340, y:  84, w:106, h: 74},
			{x: 296, y: 104, w: 36, h: 84},
			{x: 114, y: 132, w: 54, h: 42},
			{x:  20, y: 204, w: 76, h: 58},
			{x: 224, y: 214, w: 58, h: 56},
			{x: 354, y: 296, w:108, h: 50},
			{x:   2, y: 280, w:132, h: 96},
			{x: 224, y: 340, w: 80, h: 72},
			{x:  40, y: 384, w:106, h: 98},
			{x: 402, y: 424, w: 78, h: 82},
			{x: 204, y: 434, w:122, h: 78}
		]
	},
	{
		fileorg: "food04_org.jpg",
		fileedit: "food04_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-19",
		caption: "Pastery shop",
		photoby: "Bas de Reuver",
		geoloc: "53.2141927,6.5690424",
		differences: [
			{x: 228, y:   8, w: 50, h: 32},
			{x:  16, y:  18, w: 50, h: 32},
			{x: 376, y:  46, w: 34, h: 26},
			{x: 260, y:  48, w: 80, h: 64},
			{x:  50, y:  76, w: 44, h: 56},
			{x: 106, y: 138, w: 18, h: 20},
			{x: 226, y: 148, w: 20, h: 16},
			{x: 314, y: 134, w: 92, h: 76},
			{x:  26, y: 214, w: 28, h: 28},
			{x:  60, y: 242, w: 44, h: 28},
			{x: 134, y: 238, w: 60, h: 48},
			{x: 362, y: 244, w: 34, h: 36},
			{x: 168, y: 298, w: 50, h: 50},
			{x: 352, y: 300, w: 70, h: 60},
			{x:   0, y: 368, w: 48, h: 54},
			{x: 362, y: 388, w:118, h:124},
			{x: 164, y: 430, w: 78, h: 70},
			{x:   4, y: 438, w: 42, h: 64}
		]
	},
	{
		fileorg: "food05_org.jpg",
		fileedit: "food05_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-20",
		caption: "Various candy",
		photoby: "Bas de Reuver",
		geoloc: "53.2332923,6.5380508",
		differences: [
			{x: 290, y:   0, w:106, h: 62},
			{x: 398, y:   0, w: 82, h: 82},
			{x:  12, y:   2, w: 86, h:106},
			{x: 142, y:   0, w:130, h:110},
			{x: 288, y:  92, w:110, h: 88},
			{x: 404, y: 110, w: 76, h: 84},
			{x: 176, y: 114, w: 96, h:138},
			{x:  24, y: 142, w:150, h: 90},
			{x: 322, y: 184, w: 78, h: 64},
			{x: 120, y: 232, w: 52, h: 56},
			{x: 174, y: 254, w:104, h: 80},
			{x:   2, y: 270, w: 82, h: 80},
			{x: 366, y: 292, w:114, h: 98},
			{x:  24, y: 398, w: 66, h: 60},
			{x: 162, y: 434, w:124, h: 78},
			{x: 306, y: 434, w:126, h: 78},
			{x:  26, y: 466, w: 94, h: 46}
		]
	},
	{
		fileorg: "building01_org.jpg",
		fileedit: "building01_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-19",
		caption: "White villa",
		photoby: "Bas de Reuver",
		geoloc: "53.2296959,6.5569201",
		differences: [
			{x: 122, y:   2, w: 22, h: 30},
			{x: 282, y:  24, w: 94, h: 56},
			{x: 180, y:  76, w: 24, h: 40},
			{x: 226, y:  86, w: 36, h: 28},
			{x: 286, y:  94, w: 74, h: 32},
			{x: 140, y: 120, w: 80, h: 34},
			{x: 238, y: 150, w: 78, h: 22},
			{x: 436, y: 166, w: 34, h: 26},
			{x: 364, y: 174, w: 42, h: 22},
			{x: 332, y: 166, w: 18, h:110},
			{x: 438, y: 228, w: 44, h: 28},
			{x: 360, y: 248, w: 58, h: 28},
			{x: 122, y: 258, w: 92, h: 18},
			{x: 240, y: 264, w: 78, h: 38},
			{x: 148, y: 282, w: 34, h: 30},
			{x:  62, y: 308, w: 60, h: 12},
			{x:  22, y: 280, w: 22, h: 88},
			{x: 340, y: 342, w: 42, h: 40},
			{x: 168, y: 356, w:126, h:114},
			{x: 330, y: 490, w:150, h: 18}
		]
	},
	{
		fileorg: "animals01_org.jpg",
		fileedit: "animals01_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-20",
		caption: "Horses in the meadow",
		photoby: "Bas de Reuver",
		geoloc: "53.2493727,6.5248194",
		differences: [
			{x: 246, y:  10, w: 54, h: 42},
			{x:   0, y:  60, w: 80, h: 48},
			{x: 120, y:  62, w:104, h: 46},
			{x:   0, y: 138, w: 72, h: 34},
			{x: 222, y: 126, w: 68, h: 64},
			{x: 412, y: 130, w: 38, h: 58},
			{x: 106, y: 166, w:104, h:106},
			{x: 264, y: 240, w: 80, h: 54},
			{x: 420, y: 226, w: 18, h:112},
			{x:  74, y: 260, w: 18, h: 62},
			{x: 234, y: 298, w:104, h:130},
			{x:  96, y: 354, w: 40, h: 60},
			{x:   6, y: 442, w:206, h: 70},
			{x: 330, y: 454, w:134, h: 58}
		]
	},
	{
		fileorg: "things05_org.jpg",
		fileedit: "things05_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-21",
		caption: "A game of Rummicub",
		photoby: "Bas de Reuver",
		geoloc: "53.2517467,6.5880505",
		differences: [
			{x: 288, y:   4, w: 94, h: 32},
			{x:  14, y:  14, w:136, h: 52},
			{x: 400, y:  70, w: 32, h: 72},
			{x: 272, y:  84, w: 86, h: 58},
			{x: 214, y: 104, w: 42, h: 28},
			{x: 126, y: 124, w: 70, h: 42},
			{x:   6, y: 126, w: 58, h: 44},
			{x: 212, y: 138, w: 38, h: 38},
			{x: 316, y: 148, w: 52, h: 28},
			{x:  56, y: 186, w: 62, h: 52},
			{x: 162, y: 208, w: 48, h: 44},
			{x:  68, y: 250, w: 24, h: 18},
			{x: 126, y: 250, w: 72, h: 54},
			{x: 254, y: 274, w: 48, h: 50},
			{x:  76, y: 324, w: 30, h: 28},
			{x:   0, y: 300, w: 68, h: 78},
			{x: 372, y: 274, w:108, h:158},
			{x: 206, y: 332, w: 64, h: 76},
			{x:   0, y: 464, w:146, h: 48}
		]
	},
	{
		fileorg: "animals02_org.jpg",
		fileedit: "animals02_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-20",
		caption: "Sheep in a meadow",
		photoby: "Bas de Reuver",
		geoloc: "53.2445410,6.5266272",
		differences: [
			{x: 192, y:  38, w:138, h: 52},
			{x: 408, y:  54, w: 72, h: 36},
			{x:   0, y:  56, w: 80, h: 34},
			{x:  96, y:  90, w: 54, h: 52},
			{x: 172, y:  90, w: 52, h: 52},
			{x: 368, y:  90, w: 28, h: 54},
			{x: 194, y: 144, w: 54, h: 36},
			{x: 274, y: 160, w: 56, h: 26},
			{x: 378, y: 162, w: 64, h: 24},
			{x:   0, y: 174, w:112, h: 60},
			{x: 194, y: 202, w: 78, h: 58},
			{x: 164, y: 266, w: 62, h: 54},
			{x: 412, y: 300, w: 68, h: 72},
			{x:   0, y: 304, w: 80, h: 68},
			{x: 256, y: 310, w: 68, h: 64},
			{x:   0, y: 382, w:120, h:130}
		]
	},
	{
		fileorg: "building02_org.jpg",
		fileedit: "building02_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-22",
		caption: "LifeLines building",
		photoby: "Bas de Reuver",
		geoloc: "53.2238351,6.5702453",
		differences: [
			{x: 384, y:   2, w: 96, h: 64},
			{x: 124, y:  36, w: 40, h: 54},
			{x: 244, y:  16, w: 60, h:148},
			{x:  50, y:  68, w: 38, h: 48},
			{x: 308, y: 128, w: 60, h: 52},
			{x:  80, y: 102, w: 70, h:106},
			{x: 186, y: 112, w: 64, h: 92},
			{x:   0, y: 130, w: 72, h: 98},
			{x: 394, y: 182, w: 40, h: 36},
			{x: 300, y: 184, w: 46, h: 74},
			{x:  64, y: 228, w: 82, h:108},
			{x: 206, y: 240, w: 42, h: 94},
			{x: 298, y: 272, w: 96, h: 78},
			{x: 138, y: 316, w: 52, h: 50},
			{x: 366, y: 370, w: 30, h: 62},
			{x:   0, y: 350, w:100, h:124},
			{x: 266, y: 362, w: 76, h:132}
		]
	},
	{
		fileorg: "building03_org.jpg",
		fileedit: "building03_edit.jpg",
		location: "Noorderhoogebrug, The Netherlands",
		date: "2014-04-26",
		caption: "Wilhelmina flour mill",
		photoby: "Bas de Reuver",
		geoloc: "53.2421182,6.5689337",
		differences: [
			{x:  76, y:  18, w: 74, h: 18},
			{x:   0, y:   2, w: 58, h: 88},
			{x: 262, y:  32, w:108, h:106},
			{x: 234, y:  84, w: 28, h: 38},
			{x: 102, y: 106, w:116, h: 28},
			{x: 366, y: 164, w: 18, h: 24},
			{x: 268, y: 158, w: 40, h: 58},
			{x: 156, y: 150, w: 48, h: 76},
			{x: 212, y: 212, w: 18, h: 18},
			{x: 382, y: 222, w: 86, h: 82},
			{x: 222, y: 278, w: 42, h: 40},
			{x: 164, y: 284, w: 46, h: 74},
			{x: 306, y: 290, w: 26, h: 68},
			{x: 260, y: 336, w: 16, h: 22},
			{x:  40, y: 368, w: 66, h: 30},
			{x: 134, y: 380, w: 64, h: 30},
			{x: 328, y: 426, w: 52, h: 30}
		]
	},
	{
		fileorg: "building04_org.jpg",
		fileedit: "building04_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-25",
		caption: "Academiegebouw university",
		photoby: "Bas de Reuver",
		geoloc: "53.2189981,6.5629846",
		differences: [
			{x: 244, y:  10, w: 44, h: 62},
			{x:  72, y:  32, w: 38, h: 78},
			{x: 128, y:  54, w: 84, h: 88},
			{x: 248, y: 106, w: 44, h: 60},
			{x:  24, y: 120, w: 26, h: 52},
			{x: 314, y: 114, w: 62, h: 90},
			{x: 124, y: 154, w: 62, h: 50},
			{x: 346, y: 214, w: 34, h: 44},
			{x: 394, y: 234, w: 50, h: 40},
			{x: 254, y: 264, w: 44, h: 50},
			{x:   4, y: 242, w: 46, h: 98},
			{x: 100, y: 274, w:100, h: 88},
			{x: 404, y: 320, w: 58, h: 56},
			{x: 360, y: 364, w: 32, h: 68},
			{x: 272, y: 410, w: 20, h: 44},
			{x: 118, y: 412, w: 46, h: 48},
			{x: 198, y: 432, w: 46, h: 54},
			{x: 346, y: 448, w: 46, h: 46}
		]
	},
	{
		fileorg: "people02_org.jpg",
		fileedit: "people02_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-04-28",
		caption: "Fitness instructor",
		photoby: "Bas de Reuver",
		geoloc: "53.2237371,6.5762897",
		differences: [
			{x:   0, y:   0, w: 50, h: 60},
			{x: 334, y:   2, w:146, h: 82},
			{x: 206, y:  32, w: 38, h: 34},
			{x: 230, y:  78, w: 50, h: 42},
			{x: 120, y:  78, w: 78, h: 88},
			{x: 304, y: 124, w: 30, h: 32},
			{x: 200, y: 130, w: 42, h: 30},
			{x:   0, y:  76, w: 76, h:144},
			{x: 196, y: 172, w:108, h: 88},
			{x: 150, y: 204, w: 46, h: 26},
			{x:  82, y: 138, w: 34, h:178},
			{x: 134, y: 242, w: 58, h: 70},
			{x: 420, y: 158, w: 60, h:276},
			{x: 154, y: 314, w: 38, h: 78},
			{x: 190, y: 312, w: 78, h:118},
			{x: 284, y: 282, w:102, h:204},
			{x:   0, y: 368, w: 42, h: 72},
			{x: 106, y: 386, w: 68, h: 62},
			{x:  56, y: 454, w: 36, h: 24}
		]
	},
	{
		fileorg: "places02_org.jpg",
		fileedit: "places02_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-05-02",
		caption: "Boat at Reitdiep haven",
		photoby: "Bas de Reuver",
		geoloc: "53.2355045,6.5245083",
		differences: [
			{x: 326, y:   0, w:154, h: 56},
			{x: 238, y: 110, w: 16, h: 16},
			{x: 368, y: 100, w: 36, h: 40},
			{x: 210, y: 108, w:  8, h: 40},
			{x: 302, y: 114, w: 40, h: 32},
			{x:  32, y: 110, w: 38, h: 60},
			{x: 452, y: 122, w: 22, h: 38},
			{x: 228, y: 200, w: 48, h: 30},
			{x: 148, y: 202, w: 30, h: 44},
			{x:  58, y: 238, w: 18, h: 22},
			{x: 228, y: 266, w: 48, h: 68},
			{x: 394, y: 276, w: 58, h: 54},
			{x: 206, y: 338, w: 22, h: 42},
			{x: 242, y: 346, w: 36, h: 70},
			{x:  64, y: 372, w: 52, h: 52},
			{x:   0, y: 426, w:140, h: 86}
		]
	},
	{
		fileorg: "people03_org.jpg",
		fileedit: "people03_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-05-02",
		caption: "DNA lab analyst",
		photoby: "Bas de Reuver",
		geoloc: "53.2240992,6.5696821",
		differences: [
			{x:  61, y:   4, w: 15, h: 39},
			{x: 178, y:  28, w: 12, h: 49},
			{x: 256, y:  45, w: 67, h: 43},
			{x:  84, y:  81, w: 40, h: 18},
			{x: 399, y:  81, w: 81, h: 69},
			{x:  23, y: 126, w: 33, h: 46},
			{x: 213, y: 126, w:123, h: 48},
			{x:  86, y: 126, w: 20, h: 49},
			{x: 392, y: 225, w: 64, h: 22},
			{x:  56, y: 231, w: 92, h: 52},
			{x:  38, y: 313, w: 60, h: 68},
			{x: 189, y: 316, w: 17, h: 68},
			{x: 396, y: 347, w: 63, h: 47},
			{x: 234, y: 333, w: 52, h: 84},
			{x: 341, y: 489, w: 51, h: 23}
		]
	},
	{
		fileorg: "things06_org.jpg",
		fileedit: "things06_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-05-02",
		caption: "Title screen remix",
		photoby: "Bas de Reuver",
		geoloc: "53.2332923,6.5380508",
		differences: [
			{x: 303, y:  16, w:129, h: 73},
			{x:  57, y:  37, w: 96, h: 56},
			{x:   0, y:  56, w: 53, h: 63},
			{x: 214, y:  71, w: 89, h: 59},
			{x:  59, y: 105, w: 37, h: 16},
			{x: 328, y: 106, w: 73, h: 48},
			{x:  96, y: 155, w: 41, h: 27},
			{x:  44, y: 162, w: 52, h: 71},
			{x: 157, y: 171, w:129, h:108},
			{x: 348, y: 161, w:132, h:128},
			{x:  12, y: 319, w: 67, h: 55},
			{x: 209, y: 407, w: 71, h: 41},
			{x: 355, y: 423, w: 73, h: 53},
			{x:  53, y: 434, w: 43, h: 45},
			{x: 141, y: 427, w: 59, h: 70}
		]
	},
	{
		fileorg: "places03_org.jpg",
		fileedit: "places03_edit.jpg",
		location: "Saint Jean d'Arves, France",
		date: "2014-06-06",
		caption: "House with garden",
		photoby: "Bas de Reuver",
		geoloc: "45.2116053,6.2680972",
		differences: [
			{x: 153, y:  52, w: 39, h: 42},
			{x: 294, y:  46, w:153, h: 65},
			{x:   0, y:  66, w: 93, h: 89},
			{x: 200, y: 122, w: 90, h: 18},
			{x: 327, y: 149, w: 78, h: 52},
			{x: 237, y: 156, w: 39, h: 50},
			{x: 434, y: 167, w: 46, h: 51},
			{x: 175, y: 182, w: 39, h: 26},
			{x: 291, y: 179, w: 21, h: 36},
			{x: 294, y: 264, w: 46, h: 41},
			{x:   4, y: 263, w: 85, h: 54},
			{x: 183, y: 261, w: 41, h: 69},
			{x: 227, y: 277, w: 35, h: 45},
			{x: 380, y: 329, w:100, h: 87},
			{x: 187, y: 346, w: 65, h: 54},
			{x: 261, y: 353, w: 72, h: 61},
			{x:  78, y: 402, w: 49, h: 36},
			{x:   0, y: 370, w: 67, h:136},
			{x: 204, y: 443, w: 73, h: 48}
		]
	},
	{
		fileorg: "places04_org.jpg",
		fileedit: "places04_edit.jpg",
		location: "Saint Sorlin d'Arves, France",
		date: "2014-06-09",
		caption: "Peugeot 201 oldtimer",
		photoby: "Bas de Reuver",
		geoloc: "45.2208843,6.2363693",
		differences: [
			{x: 167, y:  11, w: 41, h: 76},
			{x: 293, y:  37, w: 85, h:113},
			{x: 101, y:  79, w: 66, h:129},
			{x: 255, y: 156, w: 16, h: 51},
			{x: 197, y: 151, w: 42, h: 86},
			{x: 342, y: 173, w: 63, h: 78},
			{x: 305, y: 201, w: 29, h: 51},
			{x: 137, y: 226, w: 34, h: 35},
			{x:   0, y: 220, w: 56, h:105},
			{x: 304, y: 260, w: 35, h: 32},
			{x: 429, y: 280, w: 51, h: 63},
			{x: 145, y: 317, w: 37, h: 38},
			{x: 315, y: 332, w: 16, h: 12},
			{x:  87, y: 324, w: 33, h: 35},
			{x: 440, y: 374, w: 24, h: 41},
			{x: 109, y: 406, w: 49, h: 22},
			{x: 188, y: 372, w: 64, h: 96},
			{x:  37, y: 389, w: 46, h: 85},
			{x: 294, y: 488, w:176, h: 24}
		]
	},
	{
		fileorg: "animals03_org.jpg",
		fileedit: "animals03_edit.jpg",
		location: "Saint Jean d'Arves, France",
		date: "2014-06-09",
		caption: "Sheep herder with dogs",
		photoby: "Bas de Reuver",
		geoloc: "45.2129166,6.2673783",
		differences: [
			{x: 130, y:   0, w:145, h: 72},
			{x: 413, y:  13, w: 67, h:110},
			{x: 236, y:  90, w: 62, h: 91},
			{x: 407, y: 127, w: 73, h: 56},
			{x: 149, y: 121, w: 77, h:134},
			{x: 434, y: 240, w: 46, h: 56},
			{x: 394, y: 246, w: 27, h: 46},
			{x: 233, y: 256, w: 26, h: 34},
			{x: 110, y: 284, w: 75, h: 80},
			{x: 192, y: 316, w: 55, h: 52},
			{x:  22, y: 339, w: 38, h: 47},
			{x: 274, y: 365, w: 18, h: 28},
			{x:  47, y: 384, w: 52, h: 58},
			{x: 223, y: 423, w:153, h: 88}
		]
	},
	{
		fileorg: "building05_org.jpg",
		fileedit: "building05_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-06-11",
		caption: "Red villa",
		photoby: "Bas de Reuver",
		geoloc: "53.2294412,6.5576553",
		differences: [
			{x: 233, y:   5, w: 58, h: 67},
			{x:   0, y:   0, w: 96, h: 97},
			{x: 395, y:   1, w: 85, h:143},
			{x: 106, y:  94, w: 28, h: 46},
			{x: 204, y: 117, w: 44, h: 43},
			{x: 266, y: 122, w: 23, h: 55},
			{x: 310, y: 157, w: 29, h: 19},
			{x: 156, y: 210, w: 35, h: 64},
			{x: 424, y: 231, w: 45, h: 34},
			{x: 374, y: 216, w: 21, h: 95},
			{x: 253, y: 264, w: 51, h: 25},
			{x:  65, y: 213, w: 22, h:179},
			{x:   0, y: 276, w: 44, h: 61},
			{x: 404, y: 283, w: 32, h: 61},
			{x: 203, y: 298, w: 34, h: 32},
			{x: 277, y: 299, w: 28, h: 32},
			{x: 332, y: 308, w: 47, h: 30},
			{x: 146, y: 328, w: 37, h: 59},
			{x: 195, y: 388, w: 47, h: 27},
			{x: 379, y: 398, w: 36, h: 67},
			{x:  64, y: 411, w: 96, h: 67},
			{x: 264, y: 414, w: 99, h: 96}
		]
	},
	{
		fileorg: "people04_org.jpg",
		fileedit: "people04_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-06-11",
		caption: "Hairdresser",
		photoby: "Bas de Reuver",
		geoloc: "53.2325714,6.5734284",
		differences: [
			{x: 195, y:   6, w: 66, h: 67},
			{x:   0, y:   1, w: 50, h: 79},
			{x: 332, y:  36, w: 23, h: 45},
			{x: 423, y:  64, w: 31, h: 35},
			{x:  81, y:  42, w: 97, h: 95},
			{x: 353, y:  71, w: 44, h: 65},
			{x: 191, y:  93, w: 57, h: 63},
			{x: 308, y: 131, w: 68, h: 76},
			{x:  23, y: 140, w: 20, h: 80},
			{x: 386, y: 169, w: 93, h: 75},
			{x:  41, y: 263, w: 32, h: 42},
			{x: 161, y: 303, w: 54, h: 40},
			{x: 238, y: 307, w: 57, h: 69},
			{x:  74, y: 339, w: 26, h: 43},
			{x: 353, y: 352, w: 57, h: 19},
			{x:   0, y: 235, w: 40, h:270},
			{x: 276, y: 384, w: 52, h: 57},
			{x:  69, y: 407, w: 75, h: 48}
		]
	},
	{
		fileorg: "places05_org.jpg",
		fileedit: "places05_edit.jpg",
		location: "Groningen, Netherlands",
		date: "2014-06-11",
		caption: "Construction site",
		photoby: "Bas de Reuver",
		geoloc: "53.2360825,6.5650606",
		differences: [
			{x: 192, y:  37, w: 15, h: 42},
			{x: 275, y:  39, w: 66, h: 65},
			{x:   0, y:  34, w: 95, h:110},
			{x: 426, y:  98, w: 54, h: 44},
			{x: 391, y: 145, w: 39, h: 41},
			{x: 161, y: 130, w: 43, h:115},
			{x: 410, y: 204, w: 70, h: 27},
			{x:  62, y: 173, w: 26, h:185},
			{x: 399, y: 236, w: 52, h: 98},
			{x: 265, y: 276, w: 25, h: 23},
			{x:  95, y: 300, w: 26, h: 41},
			{x: 194, y: 306, w: 51, h: 45},
			{x: 250, y: 347, w: 52, h: 34},
			{x: 143, y: 352, w: 24, h: 55},
			{x: 284, y: 367, w: 38, h: 61},
			{x: 358, y: 345, w: 38, h:110},
			{x: 429, y: 347, w: 49, h:107},
			{x: 202, y: 412, w: 66, h: 24},
			{x:  61, y: 382, w: 41, h: 87}
		]
	},
	{
		fileorg: "places06_org.jpg",
		fileedit: "places06_edit.jpg",
		location: "Groningen, Netherlands",
		date: "2014-06-25",
		caption: "Train and bicycle bridge",
		photoby: "Bas de Reuver",
		geoloc: "53.2419468,6.5570950",
		differences: [
			{x:  53, y:  35, w: 39, h: 29},
			{x: 257, y:  28, w:157, h: 57},
			{x: 205, y:  79, w: 29, h: 91},
			{x: 309, y: 142, w: 26, h: 19},
			{x: 155, y: 121, w: 24, h: 76},
			{x: 118, y: 146, w: 37, h: 55},
			{x:  90, y: 179, w: 25, h: 63},
			{x: 236, y: 199, w: 32, h: 61},
			{x: 292, y: 212, w: 75, h: 40},
			{x: 147, y: 220, w: 36, h: 47},
			{x: 357, y: 256, w: 27, h: 20},
			{x: 271, y: 254, w: 37, h: 32},
			{x: 398, y: 256, w: 63, h: 62},
			{x:  17, y: 263, w: 76, h: 61},
			{x:   1, y: 353, w: 39, h: 73},
			{x: 355, y: 365, w:125, h: 56},
			{x: 139, y: 357, w: 98, h:155},
			{x: 324, y: 424, w:110, h: 64}
		]
	},
	{
		fileorg: "people05_org.jpg",
		fileedit: "people05_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-06-28",
		caption: "Parent and kids on bicycle",
		photoby: "Bas de Reuver",
		geoloc: "53.2345068,6.5431195",
		differences: [
			{x:  36, y:  15, w: 50, h: 56},
			{x: 199, y:  51, w: 38, h: 42},
			{x: 257, y:  39, w: 61, h:118},
			{x: 196, y: 112, w: 38, h: 40},
			{x:  69, y: 156, w: 42, h: 59},
			{x: 256, y: 183, w: 63, h: 62},
			{x:   0, y: 185, w: 51, h: 74},
			{x: 189, y: 205, w: 46, h: 43},
			{x: 371, y: 210, w: 34, h: 38},
			{x: 244, y: 309, w: 53, h: 29},
			{x: 121, y: 340, w: 66, h: 28},
			{x: 216, y: 324, w: 19, h: 66},
			{x:  53, y: 367, w: 97, h: 41},
			{x: 210, y: 391, w:113, h: 44}
		]
	},
	{
		fileorg: "people06_org.jpg",
		fileedit: "people06_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-06-30",
		caption: "Woodshop tool cabinet",
		photoby: "Bas de Reuver",
		geoloc: "53.2351080,6.5862554",
		differences: [
			{x: 351, y:  10, w:118, h: 32},
			{x: 198, y:  27, w:113, h: 33},
			{x: 134, y:  49, w: 36, h: 96},
			{x: 307, y:  87, w: 20, h: 35},
			{x:  65, y:  83, w: 67, h: 47},
			{x: 212, y:  86, w: 14, h: 44},
			{x: 233, y:  95, w: 37, h: 33},
			{x: 375, y: 107, w: 67, h: 65},
			{x:  37, y: 128, w: 37, h: 37},
			{x: 252, y: 139, w: 22, h: 40},
			{x: 340, y: 154, w: 32, h: 61},
			{x: 135, y: 193, w: 23, h: 55},
			{x: 376, y: 202, w: 37, h: 37},
			{x: 171, y: 203, w: 49, h: 59},
			{x:  32, y: 210, w: 77, h: 51},
			{x: 135, y: 270, w: 33, h:125},
			{x: 230, y: 354, w: 37, h: 33},
			{x:   5, y: 350, w: 39, h:102},
			{x: 378, y: 374, w: 67, h: 63},
			{x:  46, y: 362, w: 74, h:110},
			{x: 174, y: 416, w: 57, h: 29}
		]
	},
	{
		fileorg: "people07_org.jpg",
		fileedit: "people07_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-07-05",
		caption: "Pet shop fish tanks",
		photoby: "Bas de Reuver",
		geoloc: "53.2309394,6.6186525",
		differences: [
			{x:  37, y:   0, w:125, h: 75},
			{x: 163, y:   0, w:169, h: 94},
			{x: 388, y:  47, w: 45, h: 69},
			{x: 281, y: 104, w: 65, h: 30},
			{x:  44, y: 114, w: 65, h: 42},
			{x: 351, y: 112, w:105, h: 49},
			{x: 207, y: 125, w: 71, h: 49},
			{x: 130, y: 173, w: 53, h: 22},
			{x: 389, y: 184, w: 50, h: 41},
			{x:  36, y: 196, w: 80, h: 50},
			{x: 125, y: 257, w: 37, h: 24},
			{x:  41, y: 291, w: 42, h: 40},
			{x: 204, y: 288, w: 68, h: 46},
			{x: 403, y: 297, w: 77, h: 59},
			{x: 113, y: 341, w: 80, h: 27},
			{x: 201, y: 369, w:138, h: 47},
			{x:   4, y: 375, w:103, h:106},
			{x: 341, y: 376, w:115, h:119}
		]
	},
	{
		fileorg: "places07_org.jpg",
		fileedit: "places07_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-09-20",
		caption: "Hot air balloons",
		photoby: "Bas de Reuver",
		geoloc: "53.2012257,6.5412748",
		differences: [
			{x: 346, y:  25, w: 83, h:110},
			{x: 191, y:  87, w: 16, h: 16},
			{x:  65, y:  96, w: 40, h: 16},
			{x: 304, y:  92, w: 21, h: 54},
			{x: 261, y: 141, w: 31, h: 35},
			{x:   0, y: 217, w: 48, h:115},
			{x:  61, y: 245, w:100, h:123},
			{x: 253, y: 246, w: 89, h:123},
			{x:   0, y: 334, w: 62, h: 56},
			{x: 173, y: 351, w: 31, h: 69},
			{x: 231, y: 361, w: 22, h: 63},
			{x: 278, y: 367, w: 17, h: 56},
			{x:  62, y: 384, w: 35, h: 86},
			{x: 325, y: 423, w: 24, h: 33},
			{x: 405, y: 424, w: 36, h: 77},
			{x: 251, y: 473, w: 63, h: 24}
		]
	},
	{
		fileorg: "animals04_org.jpg",
		fileedit: "animals04_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-09-20",
		caption: "Geese in a pond",
		photoby: "Bas de Reuver",
		geoloc: "53.2008947,6.5423450",
		differences: [
			{x: 300, y:  21, w: 47, h: 31},
			{x: 257, y:  75, w: 38, h: 24},
			{x: 408, y:  45, w: 71, h: 88},
			{x: 175, y:  76, w: 27, h: 33},
			{x:  23, y:  85, w: 32, h: 45},
			{x: 177, y: 123, w: 33, h: 56},
			{x:  77, y: 127, w: 34, h: 72},
			{x: 103, y: 199, w: 57, h: 56},
			{x: 209, y: 203, w: 45, h: 48},
			{x: 352, y: 207, w: 64, h: 52},
			{x:  43, y: 214, w: 60, h: 61},
			{x: 263, y: 225, w: 79, h: 75},
			{x: 169, y: 285, w: 52, h: 30},
			{x: 343, y: 271, w:127, h:119},
			{x: 210, y: 326, w: 48, h: 62},
			{x:   1, y: 384, w:153, h:127},
			{x: 371, y: 402, w: 75, h:109}
		]
	},
	{
		fileorg: "people08_org.jpg",
		fileedit: "people08_edit.jpg",
		location: "Groningen, The Netherlands",
		date: "2014-05-17",
		caption: "Bumper cars at the may fair",
		photoby: "Bas de Reuver",
		geoloc: "53.2170516,6.5643659",
		differences: [
			{x: 251, y:   0, w: 25, h: 40},
			{x: 153, y:   5, w: 31, h: 35},
			{x:   0, y:  37, w: 56, h: 49},
			{x: 361, y:  43, w: 35, h: 36},
			{x: 165, y:  61, w: 48, h: 48},
			{x: 404, y:  63, w: 56, h: 55},
			{x: 216, y:  57, w: 39, h: 86},
			{x: 111, y:  95, w: 37, h: 54},
			{x:   0, y: 104, w: 97, h:109},
			{x: 249, y: 159, w: 46, h: 19},
			{x: 137, y: 172, w: 57, h: 33},
			{x: 274, y: 202, w: 65, h: 50},
			{x: 426, y: 263, w: 30, h: 27},
			{x: 352, y: 268, w: 46, h: 28},
			{x:  50, y: 221, w: 85, h:146},
			{x: 134, y: 271, w:130, h:137},
			{x: 370, y: 351, w:110, h:161}
		]
	}
]