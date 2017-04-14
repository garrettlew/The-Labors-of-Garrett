	
	var groundHeight = 100;

	var canvasEdgeHeight = canvas.height - groundHeight;

	var player = {
		x: 50,
		y: canvasEdgeHeight - 100,
		width: 50,
		height: 50,
		speed: 3,
		velocity: 0,
		velocityX: 0,
		grounded: false,
		hitPoints: 2,
		invincible: false,
		timeInvicible: 20,

		move: function() {

			if (UpPressed && player.grounded) {
				player.grounded = false;
				player.velocity = -20;
				player.velocityX = 0;
			}
			if (LeftPressed && player.x >= 0) {
				player.x -= player.speed;
			}
			if (RightPressed && playerEdgeX <= canvas.width) {
				player.x += player.speed;
			}
			player.x += player.velocityX;
			if (player.grounded === false && player.y <= 0){
				player.y = 0;
				player.velocity +=2;
			}
		},

		checkIfDonezo: function() {
			if (this.hitPoints <= 0) {
				currentLevel = levelSelector.level0;
				this.hitPoints = 2;
			}
		},

		playerInviciblility: function() {

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
		},
	
		update: function() {
			if (!this.grounded) {
				if (this.y <= canvasEdgeHeight - this.velocity) {
					this.y += this.velocity;
					this.velocity++;
				} else {
					this.grounded = true;
					this.y = canvasEdgeHeight - this.height;
				}
			}
		},
		draw: function() {

			if (!player.invincible) {
				ctx.fillStyle = "#e60000";
			} else {	
				ctx.fillStyle = "#ff6666";
			}
			ctx.beginPath();
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.closePath();
		}
	};

	var playerEdgeX = player.x+player.width, playerEdgeY = player.y+player.height;

	<!-- OBSTACLES -->

	var damage = 1;
	var spawnTimer = 50;

	var createObstacle = function(x, y, width, height) {
		var obstacle = {
			x: x,
			y: y,
			width: width,
			height: height,
			speed: 8,
			move: function() {
				this.x -= this.speed;
			},
			draw: function(){
				ctx.fillStyle = "green";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		return obstacle;
	};

	//the array for obstacle
	var obstacles = [];

	//remove obstacle from array
	var removeObstacle = function(obj) {
		var i = obstacles.indexOf(obj);	//gets index number of the obstacles
		obstacles.splice(i, 1);	//removes that obstacle
	};

	var detectObstacle = function(obstacle) {
		if (player.x < obstacle.x + obstacle.width  && player.x + player.width  > obstacle.x &&
			player.y < obstacle.y + obstacle.height && player.y + player.height > obstacle.y) {	
			if (player.invincible === false) {
				player.hitPoints -= damage;
				player.invincible = true;
				console.log(player.hitPoints);
			}
		}		
	}

	var obstacleChecks = function() {
		for (var i=0; i<obstacles.length; i++) {
			obstacles[i].move();
			obstacles[i].draw();
			detectObstacle(obstacles[i]);
			//chooses the enemy outside the screen then removes that one
			if (obstacles[i].x < -50) {
				removeObstacle(obstacles[i]);
				i--;	//subtracts one because it would skip drawing the next enemy
			}
		}
	}

	var spawnObstacle = function() {
		if (spawnTimer === 0) {
			var obstacleHeight = Math.random() * 100 + 85;
			obstacles.push(createObstacle(canvas.width, canvasEdgeHeight - obstacleHeight, 50, obstacleHeight));
			spawnTimer = 70;
		} else {
			spawnTimer--;
		}		
	}

	function desertDirections() {
		ctx.fillStyle = "#fff";
		ctx.font="20px Verdana";
		ctx.beginPath();
		ctx.fillText("I will trek the mighty Sahara.",canvas.width*.2,canvas.height*.3);
		ctx.fillText("2nd Labor -->", canvas.width*.85, canvas.height*.75);
		ctx.closePath();
	}

	function ground() {
		ctx.fillStyle = "#ffff99";
		ctx.beginPath();
		ctx.fillRect(0,canvasEdgeHeight,canvas.width, groundHeight); 
		ctx.closePath();
	}

	function drawDesert() {
		player.draw();
		ground();
		//draw all obstacles in the array
		for (var i=0; i<obstacles.length; i++) {
			obstacles[i].draw();
		}
		desertDirections();
	}



