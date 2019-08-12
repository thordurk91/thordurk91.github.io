// ====
// POWERUPS
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Powerup(descr, speed) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();
    this.randomiseVelocity(speed);
	this.laserlife = 0;
	this.mark = false;
	this.marker = "";
	this.chars = 0;
      
    // Default sprite and scale, if not otherwise specified
    var rng = Math.random();
	if(rng > 0.5)this.sprite = g_sprites.powerup;
	else this.sprite = g_sprites.powerup2;
	this.scale = 0.2;
	
	this.word = g_words_powerup[Math.floor(g_words_powerup.length * Math.random())];


};

Powerup.prototype = new Entity();

Powerup.prototype.randomisePosition = function () {
		this.cx = 0;
		this.cy = util.randRange(90,110);
		this.rotation = this.rotation || 0;
};

Powerup.prototype.randomiseVelocity = function (speed) {
		var MIN_SPEED = speed,
				MAX_SPEED = speed + 20;
		
		var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
		var dirn = Math.random() * consts.FULL_CIRCLE;

		var r = Math.random();
		this.velX = this.velX || speed;
		this.velY = 0;

		var MIN_ROT_SPEED = 0, //0.5
				MAX_ROT_SPEED = 1; //1.5
		this.velRot = this.velRot || 
		util.randRange(MIN_ROT_SPEED, MAX_ROT_SPEED) / SECS_TO_NOMINALS;
};

//Powerup.prototype.lifeSpan = 9000 / NOMINAL_UPDATE_INTERVAL;
Powerup.prototype.update = function (du) {

	spatialManager.unregister(this);
    if (this._isDeadNow ) return entityManager.KILL_ME_NOW;
	
	if(this.mark&&(this.laserlife==0)) {

		this._isDeadNow = true;

		Powerup.generatePowerup();

		if (!MUTE) 
			new Audio("sounds/explosion.ogg").play();
		
		var rngXplosion = Math.floor(util.randRange(1,7));
		entityManager.generateExplosions({
			cx : this.cx,
			cy : this.cy,
			velX : this.velX,
			velY : this.velY,
			numRows: rngXplosion,
			image : g_images.explosions
		});
	//g_buffer=[];
	}
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 1 * this.velRot;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);

    this.wrapPosition();
    spatialManager.register(this);
    // TODO: YOUR STUFF HERE! --- (Re-)Register

};




Powerup.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};



Powerup.prototype.takeBulletHit = function () {
    this.kill();
};

//C and P from Rock
Powerup.prototype.checkWord = function () {

	this.chars = 0;

	if(g_buffer.length <= this.word.length) {

		var temp = "";
		//Checks the content of the buffer vs contents of words, 
		//letter for letter, find a correct prefix letter and adds it to the
		//temp "word", fx. for the rock word "mom" you type ""amom"" and the loop
		//ignores the first a, but starts storing m, o and m. then killing the rock.
		for( var i = 0; i < g_buffer.length; i++) {

			if(g_buffer[i] === this.word[i]) {
				temp = temp + g_buffer[i];
				this.chars++;
				//prefix found
			}
			else {
				this.chars = 0;
				return false;
				//not a prefix
			}
		}
		//if you typed the word make it boom
		if(temp === this.word){
			g_buffer = [];
			this.mark = true;
			this.laserlife = 10;
			//new Audio("sounds/laser.ogg").play();
		}
	}
	else { 
		//you just typed something longer than the word in the rock
		this.chars = 0;
		return false;
	}
	return true;
};

Powerup.prototype.renderLaser = function(ctx) {

	if(this.laserlife > 0) {

		this.laserlife--;
		ctx.save();
		ctx.strokeStyle = "red";
		ctx.lineWidth = "4";
		ctx.beginPath();
		ctx.moveTo(376,512);
		ctx.lineTo(397,495);
		ctx.lineTo(415,512);
		ctx.moveTo(370,505);
		ctx.lineTo(397,495);
		ctx.lineTo(430,505);
		ctx.strokeStyle = "white";
		ctx.lineWidth = "1";
		ctx.beginPath();
		ctx.moveTo(376,512);
		ctx.lineTo(397,495);
		ctx.lineTo(415,512);
		ctx.moveTo(370,505);
		ctx.lineTo(397,495);
		ctx.lineTo(430,505);
		ctx.stroke();

		if(this.laserlife < 7) {

			ctx.save();
			ctx.strokeStyle = "red";
			ctx.lineWidth = "6";
			ctx.beginPath();
			ctx.moveTo(397,495);
			ctx.lineTo(this.cx,this.cy);
			ctx.stroke();
			ctx.restore();
			ctx.save();
			ctx.strokeStyle = "white";
			ctx.lineWidth = "2";
			ctx.beginPath();
			ctx.moveTo(397,495);
			ctx.lineTo(this.cx,this.cy);
			ctx.stroke();
			ctx.restore();
			//entityManager.fireBullet(400,500,xVel,yVel,0);
	  }
	  ctx.restore();
	}
};

Powerup.prototype.render = function (ctx) {
	this.renderLaser(ctx);

    var origScale = this.sprite.scale;
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

	if(this.word.length <= 4) {
		var Xtext = 10 + this.word.length;
		var Ytext = 27 + this.word.length;
	}
	else {
		var Xtext = 20 + this.word.length;
		var Ytext = 27 + this.word.length;
	}
		
	ctx.font = 'bold 16px Courier';

	ctx.save();
	ctx.fillStyle = 'white';
	ctx.strokestyle = 'black';
	ctx.lineWidth = 0.3;
	ctx.fillText(this.word,this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
	ctx.strokeText(this.word,this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);

  ctx.restore(); 

  if(this.mark) {
		ctx.save();
		ctx.fillStyle = 'lime';
		ctx.strokestyle = 'white';
		ctx.lineWidth = 2;
		ctx.strokeText(this.word,this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
		ctx.fillText(this.word,this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);

  	ctx.restore(); 
	}
	else if(this.chars > 0) {

		g_sprites.crosshair.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
		ctx.save();

		var temp = this.word.substr(0,this.chars);
		this.marker = temp;

		ctx.strokestyle = 'white';
		ctx.lineWidth = 2;
		ctx.strokeText(this.marker,this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
		
		ctx.fillStyle = 'red';
		ctx.fillText(this.marker,this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);

		ctx.restore();
	}
};

Powerup.generatePowerup = function() {


    var r;
    if(lives.amount==5) r=2*Math.random();
    else r=4*Math.random();    
    if(r<=1)
        entityManager.xplodeLaserTime=100;
    else if(r<=2)
        entityManager.slowTime();
    else
        Powerup.liveUp();
};

Powerup.explodeRocksEffect= function(time) {
    ctx.save();
    ctx.strokeStyle = "green";
        ctx.lineWidth = "4";
        ctx.beginPath();
        ctx.moveTo(376,512);
        ctx.lineTo(397,495);
        ctx.lineTo(415,512);
        ctx.moveTo(370,505);
        ctx.lineTo(397,495);
        ctx.lineTo(430,505);
        ctx.strokeStyle = "white";
        ctx.lineWidth = "1";
        ctx.beginPath();
        ctx.moveTo(376,512);
        ctx.lineTo(397,495);
        ctx.lineTo(415,512);
        ctx.moveTo(370,505);
        ctx.lineTo(397,495);
        ctx.lineTo(430,505);
        ctx.stroke();
        ctx.strokeStyle = "green";
        ctx.lineWidth = "6";
        ctx.beginPath();
        ctx.moveTo(397,495);
        ctx.lineTo(700*Math.cos(-Math.PI*time/100)+495,700*Math.sin(-Math.PI*time/100)+397);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.beginPath();
        ctx.moveTo(397,495);
        ctx.lineTo(700*Math.cos(-Math.PI*time/100)+495,700*Math.sin(-Math.PI*time/100)+397);
        ctx.stroke();
        //entityManager.fireBullet(400,500,xVel,yVel,0)
    ctx.restore();
	g_buffer = [];
};

Powerup.slomoEffect = function(time) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.lineWidth="7";
    ctx.arc(397, 495, 5000-time*10, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle="white";
    ctx.lineWidth="2";
    ctx.arc(397, 495, 6000-time*12, Math.PI, 0);
    ctx.stroke();
    ctx.restore();
}

Powerup.liveUp = function(){
    if(lives.amount==5) return;
    else{
    lives.update(++lives.amount);
            entityManager.generateExplosions({
            cx : 400,
            cy : 520,
            frameWidth : 480,
            frameHeight: 120,
            image : g_images.shield,
            numRows: 3,
            frameDuration: 5
        });
    }
}