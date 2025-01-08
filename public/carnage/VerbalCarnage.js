
"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

	entityManager.render(ctx);

	if (g_renderSpatialDebug) 
		spatialManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============
// GAME MODES
var g_profanity = false;
var g_fallout = false;

// WORD ARRAYS
var g_words3, g_words4, g_words5, g_words6, g_words7, g_words8, g_words_fallout, g_words_fuck;

var g_images = {};

function requestPreloads() {

	var requiredImages = {
		ship   : "images/new_base.png",
		ship_fuck   : "images/fuck_base.png",
		ship_vault  : "images/vault_base.png",
		rockSmall   : "images/rockSmall.png",
		rockBig   :  "images/rockBig.png",
		bullet : "images/dot.png",
		space : "images/space.jpg",
		background :"images/background3.png",
		powerup: "images/Powerup.png",
		powerup2: "images/Powerup2.png",
		heart: "images/heart.png",
		heart_low: "images/heart_low.png",
		heart_critical: "images/heart_critical.png",
		shield: "images/shield2.png",
		explosions : "images/explosions.png",
		logo : "images/logo_big.png",
		crosshair: "images/crosshair.png",
		logo_splash: "images/logo_splash.png",
		level_up: "images/levelup.png",
		pause_logo: "images/pause.png",
		game_over: "images/gameover.png",
		start_text: "images/starttext.png",
		start_text2: "images/starttext2.png",
		sound: "images/soundon.png",
		sound_off: "images/soundoff.png"
  };
	//TODO WORD PRELOAD FROM TEXT

	imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

  g_sprites.ship = new Sprite(g_images.ship);
  g_sprites.ship_fuck = new Sprite(g_images.ship_fuck);
  g_sprites.ship_vault = new Sprite(g_images.ship_vault);
  g_sprites.space = new Sprite(g_images.space);
  g_sprites.bullet = new Sprite(g_images.bullet);
  g_sprites.rockSmall = new Sprite(g_images.rockSmall);
  g_sprites.rockBig = new Sprite(g_images.rockBig);
	g_sprites.powerup = new Sprite(g_images.powerup);
	g_sprites.powerup2 = new Sprite(g_images.powerup2);
	g_sprites.shield = new Sprite(g_images.shield);
	g_sprites.heart = new Sprite(g_images.heart);
	g_sprites.heart.scale = 0.2;
	g_sprites.heart_low = new Sprite(g_images.heart_low);
	g_sprites.heart_low.scale = 0.2;
	g_sprites.heart_critical = new Sprite(g_images.heart_critical);
	g_sprites.heart_critical.scale = 0.2;
	//g_sprites.explosion = new Sprite(g_images.explosion);
	g_sprites.logo = new Sprite(g_images.logo);
	g_sprites.logo.scale = 0.4;
	g_sprites.crosshair = new Sprite(g_images.crosshair);
	g_sprites.logo_s = new Sprite(g_images.logo_splash);
	g_sprites.level_up = new Sprite(g_images.level_up);
	g_sprites.pause_logo = new Sprite(g_images.pause_logo);
	g_sprites.game_over = new Sprite(g_images.game_over);
	g_sprites.start_text = new Sprite(g_images.start_text);
	g_sprites.start_text2 = new Sprite(g_images.start_text2);
	g_sprites.sound = new Sprite(g_images.sound);
	g_sprites.sound_off = new Sprite(g_images.sound_off);


	g_sprites.sound.scale = 2;
	g_sprites.pause_logo.scale = 0.75;
	g_sprites.game_over.scale = 0.7;
	g_sprites.level_up.scale = 0.45;
	g_sprites.start_text.scale = 0.45;
	g_sprites.start_text2.scale = 0.45;
  //g_sprites.bullet = new Sprite(g_images.ship);
  //g_sprites.bullet.scale = 0.25;

  main.init();
  createInitialBase();
}

// Kick it off!
requestPreloads();


// CREATE BASE
function createInitialBase() {

	entityManager.generateBase({
		cx : 400,
		cy : 525
	});
}

// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    entityManager.update(du);

    // Prevent perpetual firing!
    eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_CLEARBUFFER = keyCode(' ');

function processDiagnostics() {

	
	if (eatKey(KEY_CLEARBUFFER)) 
		g_buffer = [];	
}

