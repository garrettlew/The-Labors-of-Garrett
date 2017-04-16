
// FOUNTAIN MAP

	var floorHeight = 100;

	//image dimensions
	var ftnWidth = 500;
	var ftnHeight = 476;
	var ftnCanvasEdgeHeight = canvas.height - floorHeight;
	var ftnX = canvas.width-ftnWidth;
	var ftnY = ftnCanvasEdgeHeight-ftnHeight;

	//fountain hitbox
	var teleWidth = 320;
	var teleHeight = 100;
	var teleX = 650;
	var teleY = 376;

	function instructions() {
		ctx.fillStyle = "#fff";
		ctx.font="20px Verdana";
		ctx.beginPath();
		ctx.fillText("WASD or Arrow keys to move. Space to restart.", canvas.width*.05, canvas.height*.6);
		ctx.fillText("Jump in the inverted fountain for good luck", canvas.width*.57, canvas.height*.55);
		ctx.closePath();
	}

	function drawFloor() {
		ctx.fillStyle = "#b8b2ad";
		ctx.beginPath();
		ctx.fillRect(0, ftnCanvasEdgeHeight, canvas.width, floorHeight); 
		ctx.closePath();

	}

	function drawFtnMap() {


		ctx.drawImage(uclaBackground, 0, 0);
		ctx.drawImage(invertedFountain, ftnX, ftnY);
		instructions();
		champion1.draw();
		drawFloor();

	
	}

	function checkFtnZone(champ) {

		if (champ.x < teleX + teleWidth  && champ.x + champ.width  > teleX &&
			champ.y < teleY + teleHeight && champ.y + champ.height > teleY) {
			nextLevel();	
		}
	}


// Ocean Map

	var oceanHeight = 276;
	var oceanCanvasEdgeHeight = canvas.height - oceanHeight;

	function oceanDirections() {
		ctx.fillStyle = "#fff";
		ctx.font="20px Verdana";
		ctx.beginPath();
		ctx.fillText("I'll sail the ocean blue.", canvas.width*.05, canvas.height*.1);
		ctx.fillText("Avoid rocks. Garrett is not the Titanic.", canvas.width*.1, canvas.height*.25);
		ctx.fillText("2nd Labor -->", canvas.width*.85, oceanCanvasEdgeHeight-20);
		ctx.closePath();
	}

	function drawOcean() {
		ctx.fillStyle = "#0066cc";
		ctx.beginPath();
		ctx.fillRect(0, oceanCanvasEdgeHeight, canvas.width, oceanHeight); 
		ctx.closePath();

	}

	function drawOceanMap() {

		oceanDirections();
		champion2.draw();
		drawOcean();


	
	}

	function checkOceanEnd(champ) {

		if (champ.x+champ.width > canvas.width) {
			nextLevel();	
		}
	}









