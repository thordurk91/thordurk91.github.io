// ==============
// Entity Manager
// ==============

var entityManager = {

	// "PRIVATE" DATA

	_rocks   : [],
	_bullets : [],
	_base   : [],
	_powerup : [],
	_explosions : [],
// old and new rock time
	_orTime : new Date(),
	_nrTime : new Date(),
// old and new powerup time
	_opTime : new Date(),
	_npTime : new Date(),
	_levelupTime : 60,
	_levelupPos : 180,
	_slowtime : false,

	_bShowRocks : true,

	// PUBLIC DATA

	KILL_ME_NOW : -1,
	rockSpeed : null,
	spawnTime : 1500,
	powerup : false,
	powerupspeed : 30,
	spawnTime2 : 10000,
	slowtimeCount : 500,
	levelSpeed : null, 
	xplodeLaserTime : 0,

	// PUBLIC METHODS

	// Some things must be deferred until after initial construction
	// i.e. thing which need `this` to be defined.
	deferredSetup : function () {
		this._categories = [this._rocks, this._bullets, this._powerup, this._explosions];
	},

	// INIT
	init: function() {
		
		btnBox.hidden=true;
		SONG.volume = 0.6;
		GAMEOVER = false;
		TOGGLESTART = false;
		main.toggleMenu();
		spawnTime2 = 13000;
		lives.reset();
		score.reset();
		this.LVL1();
		this.generateRock();
		
		
	},

	LVL1 : function() {
		// level attributes
		rockSpeed = 40;
		levelSpeed = rockSpeed;
		spawnTime = 1500;
		LVL.update(1);
		g_buffer =[];
	},

	LVL2 : function() {
		// kill all rocks
		for(var i = 0; i < this._rocks.length; i++)
			this._rocks[i].kill();
		// level attributes
		rockSpeed = 50;
		levelSpeed = rockSpeed;
		spawnTime = 1450;
		LVL.update(2);
		g_buffer =[];
	},

	LVL3 : function() {
		// kill all rocks
		for(var i = 0; i < this._rocks.length; i++)
			this._rocks[i].kill();
		// level attributes
		rockSpeed = 60;
		levelSpeed = rockSpeed;
		spawnTime = 1420;
		LVL.update(3);
		g_buffer =[];
	},
	LVL4 : function() {
		// kill all rocks
		for(var i = 0; i < this._rocks.length; i++)
			this._rocks[i].kill();
		// level attributes
		rockSpeed = 60;
		levelSpeed = rockSpeed;
		spawnTime = 1400;
		LVL.update(4);
		g_buffer =[];
	},
	LVL5 : function() {
		// kill all rocks
		for(var i = 0; i < this._rocks.length; i++)
			this._rocks[i].kill();
		// level attributes
		rockSpeed = 65;
		levelSpeed = rockSpeed;
		spawnTime = 1380;
		LVL.update(5);
		g_buffer =[];
	},
	haltRocks: function() {
		console.log(g_buffer);
		this._forEachOf(this._rocks, Rock.prototype.halt);
	},	

	generatePowerup: function(descr) {
			powerupspeed = 50;
		  this._powerup.push(new Powerup(descr, powerupspeed));
	},

	fireBullet: function(cx, cy, velX, velY, rotation) {
		  this._bullets.push(new Bullet({
		      cx   : cx,
		      cy   : cy,
		      velX : velX,
		      velY : velY,

		      rotation : rotation
		  }));
	},

	generateBase : function(descr) {
		  this._base.push(new Ship(descr));
	},
	generateRock : function(descr) {
		this._rocks.push(new Rock(descr, rockSpeed));
	},
	generateExplosions : function(descr) {
		this._explosions.push(new Explosions(descr));
	},

	Wordcheck: function() {
		//goes through the words on the rocks and runs
		//internal wordcheck versus the buffer
		//the wordcheck returns true if you are 
		var check = 0;
		for (var i = 0; i < this._rocks.length; i++)
			if(!this._rocks[i].checkWord()) check++;
		
		for (var i = 0; i < this._powerup.length;i++)
			if(!this._powerup[i].checkWord()) check++;
		
		return check === this._rocks.length + this._powerup.length;
	},

	killAll : function() {

		for(var i = 0; i < this._rocks.length; i++)
			this._rocks[i].kill();
		for(var i = 0; i < this._powerup.length; i++)
			this._powerup[i].kill();
		for(var i = 0; i < this._explosions.length; i++)
			this._explosions[i].kill();
	},

	explodeRocks : function() {

		for(var i = 0; i < this._rocks.length; i++){
			score.update(1);
			this._rocks[i].kill();
			var rngXplosion = Math.floor(util.randRange(1,7));
			entityManager.generateExplosions({
				cx : this._rocks[i].cx,
				cy : this._rocks[i].cy,
				velX : this._rocks[i].velX,
				velY : this._rocks[i].velY,
				numRows: rngXplosion,
				image : g_images.explosions
			});
		}
	},

	slowTime : function() {

		for(var i = 0; i < this._rocks.length; i++) {
			this._rocks[i].velY = this._rocks[i].velY/4;
			this._rocks[i].velX = this._rocks[i].velX/6;
		}
		rockSpeed= rockSpeed/4;
		SLOMO = true;
		this.slowtimeCount = 500;
	},

	// UPDATE
	update: function(du) {
	
		//IF MENU
		if(!MAINMENU && !PAUSE && !GAMEOVER) { 

			for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;
        while (i < aCategory.length) {

          var status = aCategory[i].update(du);

          if (status === this.KILL_ME_NOW) {
            aCategory.splice(i,1);
					}
          else ++i;
      	}
			}
			
			// generate rocks and powerups over time
			this._nrTime = new Date();
	    if ((this._nrTime - this._orTime) > spawnTime) { 
	    	this.generateRock();
	      this._orTime = this._nrTime;
	    }
			this._npTime = new Date();
	    if ((this._npTime - this._opTime) > spawnTime2) { 
	    	if(this._powerup.length < 1) this.generatePowerup();
	      this._opTime = this._npTime;
	    }
	
			if(LEVELUP) {
				if (0 < this._levelupTime) { 
					this._levelupTime--;
					this._levelupPos++;
				}
	    	else {
					LEVELUP = false;
					this._levelupTime = 60;
					this._levelupPos = 180;
				}
			}

			if(SLOMO) {
				if (0 < this.slowtimeCount) 
					this.slowtimeCount--;
	    	else {	
					for(var i = 0; i < this._rocks.length; i++) {
						this._rocks[i].velY *= 2; 
						this._rocks[i].velX *= 2; 
					}
					rockSpeed=levelSpeed;
					SLOMO = false;
				}
			}

		}

	},

	// RENDER
	render: function(ctx) {

	  if(MAINMENU) this.renderMenu(ctx);
		else if(PAUSE) {
			g_sprites.pause_logo.drawCentredAt(ctx,g_canvas.width/2, 260);
			score.render(ctx);
			LVL.render(ctx);
			lives.render(ctx);
			this._base[0].render(ctx);
		    //g_sprites.logo.drawCentredAt(ctx,g_canvas.width-90, g_canvas.height-45);
			
	  }

		// MAIN GAMEPLAY RENDER
	  else {

		this._base[0].render(ctx);

		if (SLOMO) {
			Powerup.slomoEffect(this.slowtimeCount);
		}

      for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        if (!this._bShowRocks && aCategory == this._rocks)
        	continue;
        for (var i = 0; i < aCategory.length; ++i) {
            aCategory[i].render(ctx);
        }
	}

		for(var i = 0; i<this._rocks.length; ++i)
			this._rocks[i].renderText(ctx);

		if(this.xplodeLaserTime>0){
			Powerup.explodeRocksEffect(this.xplodeLaserTime);
			this.xplodeLaserTime-=3;
			if(this.xplodeLaserTime<=0) this.explodeRocks();
		}

		g_sprites.logo.drawCentredAt(ctx,g_canvas.width-90, g_canvas.height-50);
		score.render(ctx);
		LVL.render(ctx);
		lives.render(ctx);
		if(LEVELUP)
			g_sprites.level_up.drawCentredAt(ctx,g_canvas.width/2, this._levelupPos);

		} 
		
		//g_ctx.drawImage(g_images.sound, 750, 20);
	},

	renderMenu: function(ctx) {

		if(GAMEOVER) {
			g_sprites.game_over.drawCentredAt(ctx,g_canvas.width/2,200);
			g_sprites.start_text.drawCentredAt(ctx,g_canvas.width/2, 300);
			if(TOGGLESTART)
	    		g_sprites.start_text2.drawCentredAt(ctx,g_canvas.width/2-2, 300+3);
			score.render(ctx);
			LVL.render(ctx);
		}
		else {
	    g_sprites.start_text.drawCentredAt(ctx,g_canvas.width/2, 320);
	    if(TOGGLESTART)
	    	g_sprites.start_text2.drawCentredAt(ctx,g_canvas.width/2-2, 320+3);
		g_sprites.logo_s.drawCentredAt(ctx,400,170);
		}
	}			

} // entityManager ends

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

