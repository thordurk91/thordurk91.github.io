// ======================
// SCORE & LEVELS & LIVES
// ======================

//  SCORE
var score = {
	 points : 0
};

score.update = function (newPoints) {
    
  this.points += newPoints;

	this.check();
};

score.check = function () {
    
  if(this.points>=50 && LVL.get()==1) entityManager.LVL2();

	if(this.points>=100 && LVL.get()==2) entityManager.LVL3();

  if(this.points>=200 && LVL.get()==3) entityManager.LVL4();

	if(this.points>=300 && LVL.get()==4) entityManager.LVL5();

};

score.render = function (ctx) {

	ctx.save();
  ctx.font = "18px pix";
	ctx.fillStyle = 'yellow';
  ctx.fillText('score: ',9,52);
  //g_sprites.score.drawCentredAt(ctx,50,45);

	ctx.save();
  ctx.font = "18px pix";
	ctx.fillStyle = 'yellow';
  ctx.fillText(score.points,80,52);

};

score.reset = function() {

	this.points = 0;

}

// LEVELS
var LVL= {
	current : 1,
	sound : new Audio("sounds/levelup.ogg")
};

LVL.update = function (newLVL) {

  this.current = newLVL;
  g_level = newLVL;

	SLOMO = false;
	if(this.current > 1) {
		if(!MUTE)
			this.sound.play(); 
		LEVELUP = true;	
	}

	
};

LVL.render = function (ctx) {
    if (g_profanity){
		ctx.save();
		ctx.font = "18px pix";
		ctx.fillStyle = 'White';
		ctx.fillText('Profanity mode',620,590);
		ctx.save();
	}
	if (g_fallout){
		ctx.save();
		ctx.font = "18px pix";
		ctx.fillStyle = 'White';
		ctx.fillText('Fallout mode',630,590);
		ctx.save();
	}
	
	ctx.save();
  ctx.font = "24px pix";
	ctx.fillStyle = 'orange';
  ctx.fillText('Level ' + this.current,9,26);
};

LVL.get = function(){
	return this.current;
}

// LIVES
var lives= {
	amount :  5,
	full : true
};

lives.update = function (newAmount) {
    
  this.amount = newAmount;

	if(this.amount==0) {
		if(!MUTE)
			GAMEOVERSOUND.play();
		main.gameOver();
	}

	if(this.amount==5) this.full = true;
	else this.full = false;
	
};

lives.render = function(ctx) {
	

	for(var i = 0; i < this.amount; i++) {
	
		if(lives.get() > 3) g_sprites.heart.drawCentredAt(ctx,i*35 + 20,g_canvas.height-20);
		else if(lives.get() > 1)g_sprites.heart_low.drawCentredAt(ctx,i*35 + 20,g_canvas.height-20);
		else if(lives.get() > 0)g_sprites.heart_critical.drawCentredAt(ctx,i*35 + 20,g_canvas.height-20);
		
	}

}

lives.get = function(){
	return this.amount;
}

lives.reset = function() {

	this.amount = 5;
}

