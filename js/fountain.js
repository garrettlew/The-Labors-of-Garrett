

	var floorHeight = 100;

	var ftnCanvasEdgeHeight = canvas.height - floorHeight;

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

	function instructions() {
		ctx.fillStyle = "#000";
		ctx.font="20px Arial";
		ctx.beginPath();
		ctx.fillText("WASD or Arrow keys to move. Space to restart. P to pause",canvas.width/4,canvas.height/4);
		ctx.fillText("Jump in the inverted fountain for good luck", canvas.width*.55, canvas.height*.75);
		ctx.closePath();
	}

	function drawFloor() {
		ctx.fillStyle = "#ffff99";
		ctx.beginPath();
		ctx.fillRect(0, ftnCanvasEdgeHeight, canvas.width, floorHeight); 
		ctx.closePath();

	}

	function drawFtnMap() {

		player1.draw();
		drawFloor();
		instructions();
	
	}

	function checkEndZone() {

		if (player1.x+player1.width >= canvas.width) {
			nextLevel();
		}
	}

	$('body').keydown(function(event) {
		if (event.keyCode === KEY_UP && player1.grounded || event.keyCode === KEY_W && player1.grounded) {
			UpPressed = true;
		}
		if (event.keyCode === KEY_LEFT && player1.x >= 0 || event.keyCode === KEY_A && player1.x >= 0) {
			LeftPressed = true;
		}
		if (event.keyCode === KEY_RIGHT && player1EdgeX <= canvas.width || event.keyCode === KEY_D && player1EdgeX <= canvas.width ) {
			RightPressed = true;
		}
		if (event.keyCode === KEY_DOWN && player1EdgeY <= canvasEdgeHeight || event.keyCode === KEY_S && player1EdgeY <= canvasEdgeHeight ) {
			DownPressed = true;
		}
	});







