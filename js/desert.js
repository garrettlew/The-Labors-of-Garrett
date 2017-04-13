
	//KeyCodes
	var KEY_LEFT=37, KEY_UP=38, KEY_RIGHT=39, KEY_DOWN=40, SPACE=32, KEY_P=80;
	//WASD
	var KEY_A=65, KEY_D=68, KEY_S=83, KEY_W=87;

	//booleans to hold the state of keys
	var UpPressed = false, LeftPressed = false, RightPressed = false, DownPressed = false;

	var spawnTimer = 100;

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	var groundHeight = 100;

	var canvasEdgeHeight = canvas.height - groundHeight;

	var player = {
		x: 50,
		y: 50,
		width: 50,
		height: 50,
		speed: 8,
		velocity: 0,
		velocityX: 0,
		grounded: false,
		hitPoints: 4,
		invincible: false,
	
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
			// if (this.hitPoints === 4) { 	
			// 	ctx.fillStyle = "#e60000";
			// } else if (this.hitPoints === 3) {
			// 	ctx.fillStyle = " #ff3333";  
			// } else if (this.hitPoints === 2) {
			// 	ctx.fillStyle = "#ff6666";
			// } else {	
			// 	ctx.fillStyle = "#ff9999";
			// }

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

	var timeInvicible = 20;

	var playerInviciblility = function(){

		if (player.invincible === true) {
			if (timeInvicible === 0) {
				player.invincible = false;
				timeInvicible = 20;
				damage = 1;
			} else {
				damage = 0;
				timeInvicible--;
			}
		}
	}

	var playerEdgeX = player.x+player.width, playerEdgeY = player.y+player.height;

	<!-- OBSTACLES -->

	var damage = 1;

	var createObstacle = function(x, y, width, height) {
		var obstacle = {
			x: x,
			y: y,
			width: width,
			height: height,
			speed: 10,
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
		console.log("obstacle delted");
	};

	var detectObstacle = function(obstacle) {
		if (player.x < obstacle.x + obstacle.width  && player.x + player.width  > obstacle.x &&
			player.y < obstacle.y + obstacle.height && player.y + player.height > obstacle.y) {	
			console.log(player.invincible + " b4");
			if (player.invincible === false) {
				player.hitPoints -= damage;
				player.invincible = true;
				console.log(player.invincible);
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
			var obstacleHeight = Math.random() * 100 + 100;
			obstacles.push(createObstacle(canvas.width, canvasEdgeHeight - obstacleHeight, 50, obstacleHeight));
			spawnTimer = 70;
		} else {
			spawnTimer--;
		}		
	}

	function directions() {
		ctx.fillStyle = "#000";
		ctx.font="20px Arial";
		ctx.beginPath();
		ctx.fillText("WASD or Arrow keys to move. Space to restart. P to pause",canvas.width/4,canvas.height/4);
		ctx.fillText("This way for Determination -->", canvas.width*.75, canvas.height*.75);
		ctx.closePath();
	}

	function ground() {
		ctx.fillStyle = "#ffff99";
		ctx.beginPath();
		ctx.fillRect(0,canvasEdgeHeight,canvas.width, groundHeight); 
		ctx.closePath();

	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ground();
		player.draw();
		//draw all obstacles in the array
		for (var i=0; i<obstacles.length; i++) {
			obstacles[i].draw();
		}
		directions();
	
	}

	var move = function() {
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

	}

	$('body').keydown(function(event) {
		if (event.keyCode === KEY_UP && player.grounded || event.keyCode === KEY_W && player.grounded) {
			UpPressed = true;
		}
		if (event.keyCode === KEY_LEFT && player.x >= 0 || event.keyCode === KEY_A && player.x >= 0) {
			LeftPressed = true;
		}
		if (event.keyCode === KEY_RIGHT && playerEdgeX <= canvas.width || event.keyCode === KEY_D && playerEdgeX <= canvas.width ) {
			RightPressed = true;
		}
		if (event.keyCode === KEY_DOWN && playerEdgeY <= canvasEdgeHeight || event.keyCode === KEY_S && playerEdgeY <= canvasEdgeHeight ) {
			DownPressed = true;
		}
	});

	$('body').keyup(function(event) {
		if (event.keyCode === KEY_UP || event.keyCode === KEY_W) {
			UpPressed = false;
		}
		if (event.keyCode === KEY_LEFT || event.keyCode === KEY_A) {
			LeftPressed = false;
		}
		if (event.keyCode === KEY_RIGHT || event.keyCode === KEY_D) {
			RightPressed = false;
		}

		//pause
		if (event.keyCode === KEY_P) {
			alert("You have paused the game.");
		}
		//restart the game
		if (event.keyCode === SPACE) {
			location.reload();
		}
	});

	var gameLoop = function() {

		move();
		player.update();
		playerInviciblility();
		spawnObstacle();
		obstacleChecks();
		draw();
		console.log(player.hitPoints);


	}

	//dont need () after gameLoop
	setInterval(gameLoop, 30);

