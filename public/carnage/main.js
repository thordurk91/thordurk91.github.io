// ========
// MAINLOOP
// ========

"use strict";

var main = { 
    // "Frame Time" is a (potentially high-precision) frame-clock for animations
    _frameTime_ms : null,
    _frameTimeDelta_ms : null,
};

// Perform one iteration of the mainloop
main.iter = function (frameTime) { 

    // Use the given frameTime to update all of our game-clocks
    this._updateClocks(frameTime); 
    // Perform the iteration core to do all the "real" work
    this._iterCore(this._frameTimeDelta_ms);
    // Diagnostics, such as showing current timer values etc.
    this._debugRender(g_ctx);
    // Request the next iteration if needed
    if (!this._quit) this._requestNextIteration();
};

main._updateClocks = function (frameTime) {
    
    // First-time initialisation
    if (this._frameTime_ms === null) this._frameTime_ms = frameTime;
    
    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};

main._iterCore = function (dt) {
    // Handle QUIT
    if (requestedQuit()) {
        this.quit();
        return;
    }
		if(!PAUSE) update(dt);
    render(g_ctx);
};

main._quit = false;

main.toggleMenu = function() {
	if(MAINMENU) MAINMENU = false
	else MAINMENU = true;
};

main.gameOver = function () {
		
		entityManager.killAll();
    this.toggleMenu();
		btnBox.hidden=false;
		GAMEOVER = true;
    console.log("GAME OVER");
};

//To reimplement a quit uncomment this and
//the text in the requestedquit function
main.quit = function () {
	//this._quit = true;
	//SONG.pause();
    //console.log("Quitting...");
};

// Simple voluntary quit mechanism
var KEY_QUIT = '0'.charCodeAt(0);
function requestedQuit() {
    //return keys[KEY_QUIT];
}

// Annoying shim for Firefox and Safari
window.requestAnimationFrame = 
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
    main.iter(frameTime);
}

main._requestNextIteration = function () {
    window.requestAnimationFrame(mainIterFrame);
};

// Mainloop-level debug-rendering

//var TOGGLE_TIMER_SHOW = '9'.charCodeAt(0);

main._doTimerShow = false;

main._debugRender = function (ctx) {
    
    //if (eatKey(TOGGLE_TIMER_SHOW)) this._doTimerShow = !this._doTimerShow;
    
    if (!this._doTimerShow) return;
    
    var y = 350;
    ctx.fillText('FT ' + this._frameTime_ms, 50, y+10);
    ctx.fillText('FD ' + this._frameTimeDelta_ms, 50, y+20);
    ctx.fillText('UU ' + g_prevUpdateDu, 50, y+30); 
    ctx.fillText('FrameSync ON', 50, y+40);
};

main.mute = function () {
	
    MUTE=!MUTE;
    if(MUTE) SONG.pause();
    else SONG.play();
}
main.toggleProfanity = function() {
			g_fallout = false;
			g_profanity = !g_profanity;
			console.log("profanity mode : " + g_profanity);
	};
main.toggleFallout = function() {
			g_profanity = false;
			g_fallout = !g_fallout;
			console.log("fallout mode : " + g_fallout);
	};

main.init = function () {

	SONG.addEventListener('ended', function() {
		if(!MUTE) {
			SONG.currentTime = 0;
			SONG.play();
		}
	}, false);

  SONG.play();

  GAMEOVERSOUND.volume=0.6;

	diffBtn[0] = document.getElementById('btn1');
	diffBtn[1] = document.getElementById('btn2');
	diffBtn[2] = document.getElementById('btn3');

	diffBtnSelected = diffBtn[dbsInt];
	diffBtnSelected.className = 'selected';

	muteBtn.onclick = main.mute;

	window.focus(true);

  this._requestNextIteration();

};
