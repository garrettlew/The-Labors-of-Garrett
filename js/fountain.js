

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

	var player1 = {
		x: 50,
		y: ftnCanvasEdgeHeight - 100,
		width: 50,
		height: 50,
		speed: 3,
		velocity: 0,
		velocityX: 0,
		grounded: false,

		move: function() {
			if (UpPressed && player1.grounded) {
				player1.grounded = false;
				player1.velocity = -20;
				player1.velocityX = 0;
			}
			if (LeftPressed && player1.x >= 0) {
				player1.x -= player1.speed;
			}
			if (RightPressed && player1EdgeX <= canvas.width) {
				player1.x += player1.speed;
			}
			player1.x += player1.velocityX;
			if (player1.grounded === false && player1.y <= 0){
				player1.y = 0;
				player1.velocity +=2;
			}
		},

		update: function() {
			if (!this.grounded) {
				if (this.y <= ftnCanvasEdgeHeight - this.velocity) {
					this.y += this.velocity;
					this.velocity++;
				} else {
					this.grounded = true;
					this.y = ftnCanvasEdgeHeight - this.height;
				}
			}
		},
		draw: function() {
			ctx.beginPath();
			ctx.fillStyle = "#e60000"
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.closePath();
		}
	};

	var player1EdgeX = player1.x+player1.width, player1EdgeY = player1.y+player1.height;

	function checkEndZone() {

		if (player1.x < teleX + teleWidth  && player1.x + player1.width  > teleX &&
			player1.y < teleY + teleHeight && player1.y + player1.height > teleY) {
			nextLevel();	
		}
	}

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
		player1.draw();
		drawFloor();

	
	}









