// ============
// animanimSprite STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "animanimSprite" from the given `image`,
//
function animSprite(image, frameWidth, frameHeight, numCols, numRows) {
    this.image = image;
	
	//this.frameDuration = frameDuration;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.numCols = numCols || 16;
	this.numRows = numRows || 7;
	
	this.currentCol = 0;
	this.currentRow = numRows || 7;

    this.scale = 1;
}

animSprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, this.currentCol*this.frameWidth, this.currentRow*this.frameHeight, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
};

animSprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our animSprite centred at the origin
    ctx.drawImage(this.image, this.currentCol*this.frameWidth, this.currentRow*this.frameHeight, this.frameWidth, this.frameHeight, cx - (this.frameWidth/2), cy - (this.frameHeight/2), this.frameWidth, this.frameHeight);

};  

animSprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

animSprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};