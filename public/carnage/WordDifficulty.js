var diffBtn = new Array(3);
var diffBtnSelected;
var dbsInt = 0;

assignRockWord = function() {

	//Assign word to rock depending on level and difficulty
	var word;
	var r = 5*Math.random()

	// DIFFICULTY 1
	if(DIFFICULTY == 1) {
		if(r < 5-LVL.get())
			word = g_words3[Math.floor(g_words3.length * Math.random())];
		else if(r < 7-LVL.get())
			word = g_words4[Math.floor(g_words4.length * Math.random())];
		else if(r < 10-LVL.get())
			word = g_words5[Math.floor(g_words5.length * Math.random())];
		else if(r < 12-LVL.get())
			word = g_words6[Math.floor(g_words6.length * Math.random())];
		else if(r < 14-LVL.get())
			word = g_words7[Math.floor(g_words7.length * Math.random())];
		else 
			word = g_words8[Math.floor(g_words8.length * Math.random())];
	}

	// DIFFICULTY 2
	if(DIFFICULTY == 2) {
		if(r < 4-LVL.get())
			word = g_words3[Math.floor(g_words3.length * Math.random())];
		else if(r < 6-LVL.get())
			word = g_words4[Math.floor(g_words4.length * Math.random())];
		else if(r < 8-LVL.get())
			word = g_words5[Math.floor(g_words5.length * Math.random())];
		else if(r < 10-LVL.get())
			word = g_words6[Math.floor(g_words6.length * Math.random())];
		else if(r < 12-LVL.get())
			word = g_words7[Math.floor(g_words7.length * Math.random())];
		else
			word = g_words8[Math.floor(g_words8.length * Math.random())];
	}

	// DIFFICULTY 3
	if(DIFFICULTY == 3) {
		if(r < 0.75)
			word = g_words3[Math.floor(g_words3.length * Math.random())];
		else if(r < 5-LVL.get())
			word = g_words4[Math.floor(g_words4.length * Math.random())];
		else if(r < 6-LVL.get())
			word = g_words5[Math.floor(g_words5.length * Math.random())];
		else if(r < 8-LVL.get())
			word = g_words6[Math.floor(g_words6.length * Math.random())];
		else if(r < 10-LVL.get())
			word = g_words7[Math.floor(g_words7.length * Math.random())];
		else
			word = g_words8[Math.floor(g_words8.length * Math.random())];
	}

	if(g_profanity)
		word = g_words_fuck[Math.floor(g_words_fuck.length * Math.random())];
	if(g_fallout)
		word = g_words_fallout[Math.floor(g_words_fallout.length * Math.random())];

	return word;

}

