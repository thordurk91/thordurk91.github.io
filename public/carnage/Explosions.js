// ==========
// Explosions
// ==========

"use strict";

function Explosions(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);
      
	this.frameWidth = this.frameWidth || 64;
	this.frameHeight = this.frameHeight || 64;
	this.numCols = this.numCols-1 || 16;
	this.numRows = this.numRows || 7;

	//function animSprite(image, frameWidth, frameHeight, numCols, numRows)
	this.sprite = new animSprite(this.image, this.frameWidth, this.frameHeight, this.numCols, this.numRows);

  this.scale  = this.scale || 1;
	
	this.velX = this.velX || 0;
	this.velY = this.velY || 0;
	
	this.frameDuration = this.frameDuration || 3;
	this.elapsedTime = 0;
	this.loop = this.loop || false;
	this.loopRow = this.loopRow || 0;

/*
    // Diagnostics to check inheritance stuff
    this._ExplosionsProperty = true;
    console.dir(this);
*/

};

Explosions.prototype = new Entity();

Explosions.prototype.update = function (du) {
	
	this.elapsedTime += du;

  if (this._isDeadNow ) return entityManager.KILL_ME_NOW;

	this.sprite.currentCol = Math.floor(this.elapsedTime / this.frameDuration);
	
	if(this.sprite.currentCol > this.sprite.numCols) {
		this.sprite.currentCol = 0; 
		if(!this.loop)
			this.sprite.currentRow++;
		
		this.elapsedTime = 0;
	}
	
	if(!this.loop) {
		if(this.sprite.currentRow > this.sprite.numRows) 
			return entityManager.KILL_ME_NOW;
	}
	else 
		this.sprite.currentRow = this.loopRow;
			
	this.cx += this.velX * du;
  this.cy += this.velY * du;
};

Explosions.prototype.getRadius = function () {
    return 0;
};


Explosions.prototype.render = function (ctx) {

    var origScale = this.sprite.scale;

    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);

};
