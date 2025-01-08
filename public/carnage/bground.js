"use strict";

	var posX = 0; //g_canvas.width/2;
	var posY = 0; //g_canvas.height/2;
	var rot = 0;

var bground = {


	draw: function(ctx){

		//g_sprites.space.drawCentredAt(ctx, posX, posY ,rot);	
		//g_sprites.space.drawCentredAt(ctx, posX-g_canvas.width, posY, rot);

		ctx.drawImage(g_images.space, posX, posY, g_canvas.width, g_canvas.height);
		ctx.drawImage(g_images.space, posX-g_canvas.width, posY, g_canvas.width, g_canvas.height);

		if(posX>=g_canvas.width) posX=0;
		else posX += 0.3;
	}
};