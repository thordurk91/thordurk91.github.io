// ====
// ROCK
// ====

function Rock(descr, speed) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  this.randomisePosition();
  this.randomiseVelocity(speed);
    
	this.laserlife = 0;
	this.mark = false;
	
	this.word = assignRockWord();

	this.marker = "";

  // Default sprite and scale, if not otherwise specified
  var r=2+5*Math.random();
  if(this.word.length <= r) {
    this.sprite = this.sprite || g_sprites.rockSmall;
    this.scale  = this.scale  || 0.8+0.05*(this.word.length-3);
  }
  else {
    this.sprite = this.sprite || g_sprites.rockBig;
    this.scale  = this.scale  || 0.40+0.05*(this.word.length-3);
  }

	/*
  // Diagnostics to check inheritance stuff
  this._rockProperty = true;
  console.dir(this);
	*/
	this.chars = 0;
};

Rock.prototype = new Entity();

// POSITION
Rock.prototype.randomisePosition = function () {
		// Rock randomisation defaults (if nothing otherwise specified)
		this.cx = this.cx || 30+Math.random() * (g_canvas.width-60);
		this.cy = 0; //this.cy || Math.random() * g_canvas.height;

		this.rotation = this.rotation || Math.random()*2000-1000;
};

// SPEED
Rock.prototype.randomiseVelocity = function (speed) {
		var MIN_SPEED = speed,
        MAX_SPEED = speed + 40;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    var r = Math.random();
    if (SLOMO)
    	this.velX = this.velX || r*(g_canvas.width/2-this.cx)/800;
    else
    	this.velX = this.velX || r*(g_canvas.width/2-this.cx)/400; 
    this.velY = this.velY || speed;

    var MIN_ROT_SPEED = -1.25,
        MAX_ROT_SPEED = 1.25;

    this.velRot = this.velRot ||
    util.randRange(MIN_ROT_SPEED, MAX_ROT_SPEED) / SECS_TO_NOMINALS;

};

// UPDATE
Rock.prototype.update = function (du) {

	spatialManager.unregister(this);
  if (this._isDeadNow ) return entityManager.KILL_ME_NOW;

	if(this.cy + this.getRadius() + 50 > g_canvas.height) {
		this.kill();
		if (!MUTE)
			new Audio("sounds/explosion.ogg").play();

		entityManager.generateExplosions({
			cx : this.cx,
			cy : this.cy,
			velX : this.velX/2,
			velY : this.velY/2,
			image : g_images.explosions,
			scale: 2
		});

		if(lives.get() > 2){

			entityManager.generateExplosions({
				cx : 400,
				cy : 520,
				frameWidth : 480,
				frameHeight: 120,
				image : g_images.shield,
				numRows: 1,
				frameDuration: 5
			});
		}
		else {

			entityManager.generateExplosions({
				cx : 400,
				cy : 520,
				frameWidth : 480,
				frameHeight: 120,
				image : g_images.shield,
				numRows: 2,
				frameDuration: 5
			});
		}
		lives.update(--lives.amount);
		var boom = 0;
		for(var i =0; i > entityManager._rocks.length;++i){
			if(entityManager._rocks[i].chars >0) ++boom;
		}
		if(boom === 1) g_buffer=[];
	}
	if(this.mark&&(this.laserlife==0)) {

		this._isDeadNow = true;


		score.update(1 + this.word.length);		

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
  this.rotation = util.wrapRange(this.rotation, 0, consts.FULL_CIRCLE);

  this.wrapPosition();
  spatialManager.register(this);
};

Rock.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

// HACKED-IN AUDIO (no preloading)
/*Rock.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Rock.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");*/

Rock.prototype.takeBulletHit = function () {

  var rngXplosion = Math.floor(util.randRange(1,7));
	entityManager.generateExplosions({
		cx : this.cx,
		cy : this.cy,
		velX : this.velX,
		velY : this.velY,
		numRows: rngXplosion,
		image : g_images.explosions
	});
	
	this.kill();
};

//LEGACY - UNUSED
Rock.prototype._spawnFragment = function () {
    entityManager.generateRock({
        cx : this.cx,
        cy : this.cy,
        scale : this.scale /2
    });
};

// CHECK WORD
Rock.prototype.checkWord = function () {

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

Rock.prototype.renderLaser = function(ctx) {

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

Rock.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

// RENDER
Rock.prototype.render = function (ctx) {

	//draw lazers
	this.renderLaser(ctx);

  var origScale = this.sprite.scale;
  
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);



};

Rock.prototype.renderText = function(ctx){
		var Ytext = 27 + this.word.length;
		
	ctx.font = 'bold 16px Courier';

	ctx.save();
	ctx.fillStyle = 'white';//'#FFC6C6';
    ctx.strokestyle = 'black';
    ctx.lineWidth = 0.3;
	ctx.fillText(this.word,
	this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
	ctx.strokeText(this.word,
	this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
	//ctx.fillText(this.word,this.cx-17,this.cy-30);

    //ctx.strokeText(this.word,this.cx-17,this.cy-30);
    ctx.restore(); 

    if(this.mark) {
		ctx.save();
		ctx.fillStyle = 'lime';//'#FFC6C6';
    	ctx.strokestyle = 'white';
    	ctx.lineWidth = 2;
    	ctx.strokeText(this.word,
		this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
		ctx.fillText(this.word,
		this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
		//ctx.fillText(this.word,this.cx-17,this.cy-30);

   	//ctx.strokeText(this.word,this.cx-17,this.cy-30);
  		ctx.restore(); 
	}
	else if(this.chars > 0) {

		g_sprites.crosshair.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
		ctx.save();

		var temp = this.word.substr(0,this.chars);
		this.marker = temp;

		ctx.strokestyle = 'white';
		ctx.lineWidth = 2;
		ctx.strokeText(this.marker,
		this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
		//ctx.strokeText(this.marker,this.cx-17,this.cy-30);
		ctx.fillStyle = 'red';
		ctx.fillText(this.marker,
		this.cx-ctx.measureText(this.word).width/2,this.cy-Ytext);
		//ctx.fillText(this.marker,this.cx-17,this.cy-30);
		//console.log('red loop');
		ctx.restore();
	}

}

