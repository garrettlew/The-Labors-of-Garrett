

function champion (x, y, canvasEdgeHeight, jumpForce, speed) {
	this.x = x;
	this.y =y;
	this.canvasEdgeHeight = canvasEdgeHeight;
	this.width = 50;
	this.height = 50;
	this.speed = speed;
	this.velocity = 0;
	this.jumpForce = jumpForce;
	this.grounded = false;
	this.hitPoints = 2;
	this.invincible = false;
	this.timeInvicible = 20;
	this.move = function() {

		if (UpPressed && this.grounded) {
			this.grounded = false;
			this.velocity = -this.jumpForce;
		}
		if (LeftPressed && this.x >= 0) {
			this.x -= this.speed;
		}
		if (RightPressed && this.x+this.width <= canvas.width) {
			this.x += this.speed;
		}
		if (this.grounded === false && this.y <= 0){
			this.y = 0;
			this.velocity +=2;
		}
	};
	this.checkIfDonezo = function() {
		if (this.hitPoints <= 0) {
			currentLevel = levelSelector.level0;
			this.hitPoints = 2;
		}
	};
	this.playerInviciblility = function() {

		if (this.invincible === true) {
			if (this.timeInvicible === 0) {
				this.invincible = false;
				this.timeInvicible = 20;
				damage = 1;
			} else {
				damage = 0;
				this.timeInvicible--;
			}
		}
	};
	this.update = function() {
		if (!this.grounded) {
			if (this.y <= this.canvasEdgeHeight - this.velocity) {
				this.y += this.velocity;
				this.velocity++;
			} else {
				this.grounded = true;
				this.y = this.canvasEdgeHeight - this.height;
			}
		}
	};
	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = "#e60000"
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}

var champion1 = new champion(50, ftnCanvasEdgeHeight - 100, ftnCanvasEdgeHeight, 20, 4);

var champion2 = new champion(50, oceanCanvasEdgeHeight - 100, oceanCanvasEdgeHeight, 18, 6);

champion2.draw = function() {

		if (!this.invincible) {
			ctx.fillStyle = "#e60000";
		} else {	
			ctx.fillStyle = "#ff6666";
		}
		ctx.beginPath();
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(boat, this.x-5, this.y+(this.height/2));
		ctx.closePath();
}

