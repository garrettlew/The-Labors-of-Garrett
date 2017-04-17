

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
	this.bulletCoolDown = 0;
	this.facingForward = true;
	this.died = false;
	this.move = function() {

		if (UpPressed && this.grounded) {
			this.grounded = false;
			this.velocity = -this.jumpForce;
		}
		if (LeftPressed && this.x >= 0) {
			this.x -= this.speed;
			this.facingForward = false;
		}
		if (RightPressed && this.x+this.width <= canvas.width) {
			this.x += this.speed;
			this.facingForward = true;
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
		if (!this.invincible) {
			ctx.fillStyle = "#e60000";
		} else {	
			ctx.fillStyle = "#ff6666";
		}
		ctx.beginPath();
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}

var champion1 = new champion(50, ftnCanvasEdgeHeight - 100, ftnCanvasEdgeHeight, 20, 4);

var champion2 = new champion(50, oceanCanvasEdgeHeight - 100, oceanCanvasEdgeHeight, 18, 6);

var champion4 = new champion(canvas.width/2, ftnCanvasEdgeHeight - 200, ftnCanvasEdgeHeight, 20, 6);

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
};

champion4.draw = function() {
	if (!this.invincible) {
		ctx.fillStyle = "#e60000";
	} else {	
		ctx.fillStyle = "#ff6666";
	}
	ctx.beginPath();
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "#2A2A2A";
	if (this.facingForward) {
		ctx.fillRect(this.x+this.width-10, this.y+(this.height/2)-10, 30, 10);
	} else {
		ctx.fillRect(this.x-20, this.y+(this.height/2)-10, 30, 10);
	}
	ctx.closePath();
};

champion4.firePistol = function() {

	if (SpacePressed) {
		if (this.bulletCoolDown === 0) {
			spawnBullet(this);		
			this.bulletCoolDown = 20;
		} else {
			this.bulletCoolDown--;
		}	
	}

};

champion4.playerInviciblility = function() {

	if (this.invincible === true) {
		if (this.timeInvicible === 0) {
			this.invincible = false;
			this.timeInvicible = 20;
			damage = 1;
			this.died = false;
		} else {
			damage = 0;
			this.timeInvicible--;
			if (this.died) {
				spawnBullet(this);
			}	
		}
	}
};
champion4.checkIfDonezo = function() {
	if (this.hitPoints <= 0) {
		this.died = true;
		currentLevel = levelSelector.level0;
		this.hitPoints = 2;
	}
};

