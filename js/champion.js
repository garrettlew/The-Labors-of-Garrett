

function champion (x, y, canvasEdgeHeight, jumpForce) {
	this.x = x;
	this.y =y;
	this.canvasEdgeHeight = canvasEdgeHeight;
	this.width = 50;
	this.height = 50;
	this.speed = 3;
	this.velocity = 0;
	this.jumpForce = jumpForce;
	this.grounded = false;
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

var champion1 = new champion(50, ftnCanvasEdgeHeight - 100, ftnCanvasEdgeHeight, 20);

var champion2 = new champion(50, oceanCanvasEdgeHeight - 100, oceanCanvasEdgeHeight, 15);

