// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Ship(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    
	this.sprite = this.sprite || g_sprites.ship;

    
    // Set normal drawing scale, and warp state off
    this._scale = 0.60;
	//this._scale = 1;
};

Ship.prototype = new Entity();

Ship.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};



// Initial, inheritable, default values
Ship.prototype.cx = 400;
Ship.prototype.cy = 720;
    
Ship.prototype.update = function (du) {

	
    spatialManager.unregister(this);
    //this.cx = g_mouseX;

    // Handle firing
    if (this._isDeadNow ) return entityManager.KILL_ME_NOW;
	else{spatialManager.register(this);}
};


Ship.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Ship.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Ship.prototype.render = function (ctx) {
	if(g_profanity) {
		this.sprite = g_sprites.ship_fuck;
	}
	else if(g_fallout){
		this.sprite = g_sprites.ship_vault;
	}
	else{
		this.sprite = g_sprites.ship;
	}

    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};
