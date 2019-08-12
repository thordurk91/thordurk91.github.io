// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

var PAUSE = false;
var MAINMENU = true;
var GAMEOVER = false;
var TOGGLESTART = false;
var LEVELUP = false;
var SLOMO = false;
var MUTE = false;
var SONG = new Audio("sounds/VerbalCarnageTheme.ogg");
var GAMEOVERSOUND = new Audio("sounds/gameOver.ogg");
var DIFFICULTY = 1;

var muteBtn = document.getElementById("muteBtn");
//var easyBtn = document.getElementById("easyBtn");
//var hardBtn = document.getElementById("hardBtn");
var btnBox = document.getElementById("btnBox");

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
