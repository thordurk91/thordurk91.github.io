// =================
// KEYBOARD HANDLING
// =================

var keys = [];
var g_buffer = [];

function handleKeydown(evt) {
    keys[evt.keyCode] = true;

	if(!PAUSE) {
		
		if(MAINMENU) {
			//SPACEBAR
			if (evt.keyCode == 32) {
				evt.preventDefault();
				TOGGLESTART=true;
				return false;
			}
			//ENTER
			if (evt.keyCode == 18) {
				evt.preventDefault();
				TOGGLESTART=true;
				return false;
			}
			//2
			if (evt.keyCode == 50){
				g_buffer=[];
				main.toggleProfanity();
				return false;
			}
			//3
			if (evt.keyCode == 51){
				g_buffer=[];
				main.toggleFallout();
				return false;
			}
		}
	
		//BACKSPACE
		if (evt.keyCode == 8) {
		  evt.preventDefault();
			g_buffer.pop();
			entityManager.Wordcheck();
		  return false;
		}
		if (evt.keyCode == 32) {
				evt.preventDefault();
				g_buffer=[];
				entityManager.Wordcheck();
				return false;
		}
		if (evt.keyCode == 50){
				g_buffer=[];
				main.toggleProfanity();
				return false;
		}
			//3
		if (evt.keyCode == 51){
				g_buffer=[];
				main.toggleFallout();
				return false;
		}
	}


}

function handleKeyup(evt) {

	if(!PAUSE) {
		
		if(MAINMENU) {
			//SPACEBAR
			if (evt.keyCode == 32) {
				evt.preventDefault();
				if (!MUTE) {
					new Audio("sounds/ding2.ogg").play();
				}
				g_buffer=[];
				entityManager.init();
				return false;
			}
		}
	}

	//if evt.keyCode === esc && gamestarted
    keys[evt.keyCode] = false;


// Difficulty buttons
	if(evt.keyCode == 40) {
		if(dbsInt<2) {
      diffBtnSelected.className = 'normal';
			diffBtnSelected = diffBtn[++dbsInt];	
			diffBtnSelected.className = 'selected';
			DIFFICULTY = dbsInt+1;
     }
  } 
	else if(evt.keyCode  == 38) {
		if(dbsInt>0) {
      diffBtnSelected.className = 'normal';
			diffBtnSelected = diffBtn[--dbsInt];	
			diffBtnSelected.className = 'selected';
			DIFFICULTY = dbsInt+1;
		}
  }

}

function handleKeypress(evt) {

	if(!PAUSE) {
		var temp = String.fromCharCode(evt.keyCode);
		temp = temp.toLowerCase();
		g_buffer.push(temp);
		//EF Wordcheck gefur true þá er vitlaus stafur
		if (entityManager.Wordcheck()) {
			g_buffer.pop();
			entityManager.Wordcheck();
		}
	}
	// 5-MUTE
	if (evt.keyCode == 53){
		MUTE=!MUTE;
		if(MUTE) SONG.pause();
		else SONG.play();
	}	

	// 4 - PAUSE
	if (evt.keyCode == 52 && !GAMEOVER && !MAINMENU) {
		evt.preventDefault();

		if(PAUSE) {
			PAUSE=false;
			SONG.play();
		}
		else {
			PAUSE = true;
			console.log('PAUSE')
			SONG.pause();
		}
		if (!MUTE) {
			new Audio("sounds/ding1.ogg").play();
		}
		return false;
	}
	//TEST DISPLAY CODE
	//document.getElementById("output").textContent = g_buffer;
}


// Inspects, and then clears, a key's state
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
function eatKey(keyCode) {
    var isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
    return keyChar.charCodeAt(0);
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
window.addEventListener("keypress", handleKeypress);
