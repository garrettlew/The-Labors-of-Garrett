
var miniGameOver = false;

var miniGameOverTimer = 70;

var heart = {
	size: 20,
	maxSize: 300,
	growthAmount: 5,
	heartBeatTimer: 50,

	draw: function() {

		var heartX = (canvas.width/2)-(heart.size/2);
		var heartY = (canvas.height/2)-(heart.size/2);

		ctx.beginPath();
		this.heartBeatTimer--;
		if (this.heartBeatTimer >= 0) {
			ctx.fillStyle = "#e60000";
		} else if (this.heartBeatTimer >= -5) {	
			ctx.fillStyle = "#ff6666";	
		} else {
			this.heartBeatTimer=50;
		}
		ctx.fillRect(heartX,heartY,this.size,this.size); 
		ctx.closePath();
	},

	grow: function() {

		if (KeyPressed) {

			if (this.size < this.maxSize) {
				this.size += this.growthAmount;
				this.growthAmount = (this.growthAmount * 1.5);
			} 
			if (this.size > this.maxSize) {
				this.size = 300;
				miniGameOver = true;
			}
			KeyPressed = false;
		}
	},
};

function redoubleDirections() {
	ctx.fillStyle = "#fff";
	ctx.font="20px Verdana";
	ctx.beginPath();
	ctx.fillText("Garrett's been set back. Mash keys to redouble Garrett's efforts.", canvas.width*.1,canvas.height*.15);
	ctx.closePath();
}

function resetRedoubleMap() {
	miniGameOver = false;
	heart.size = 20;
	heart.growthAmount = 5;
	miniGameOverTimer = 30;
}

function checkMiniGameOver() {


	if (miniGameOver === true) {
		//end message
		ctx.fillStyle = "#fff";
		ctx.font="30px Verdana";
		ctx.beginPath();
		ctx.fillText("His heart fills with determination.", canvas.width*.27,canvas.height*.5);
		ctx.closePath();

		if (miniGameOverTimer <= 0) {
			currentLevel = previousLevel;
			resetRedoubleMap();
		} else {
			miniGameOverTimer--;
		}
	}
}

function runRedouble() {

	ctx.drawImage(redoubleBackground, 0, 0);
	redoubleDirections();

	heart.grow();
	heart.draw();

	//heart border
	ctx.lineWidth="3";
	ctx.strokeStyle="#000";
	ctx.strokeRect((canvas.width/2)-(heart.maxSize/2), (canvas.height/2)-(heart.maxSize/2), heart.maxSize, heart.maxSize);

	checkMiniGameOver();

}

$('body').keyup(function(event) {
	KeyPressed = true;
});




