filesLoaded = true;


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
		ctx.fillText("WASD or Arrow keys to move. 'P' to pause.", canvas.width*.07, canvas.height*.6);
		ctx.fillText("Jump in the inverted fountain for good luck.", canvas.width*.57, canvas.height*.55);
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

// OCEAN MAP

	var mapInitialized = false;

	var oceanHeight = 276;
	var oceanCanvasEdgeHeight = canvas.height - oceanHeight;


	function oceanDirections() {
		ctx.fillStyle = "#fff";
		ctx.font="30px Verdana";
		ctx.beginPath();
		ctx.fillText("I'll sail the ocean blue.", canvas.width*.05, canvas.height*.1);
		ctx.font="20px Verdana";
		ctx.fillText("Avoid the glaciers. Garrett is not the Titanic.", canvas.width*.1, canvas.height*.25);
		ctx.fillText("2nd Labor -->", canvas.width*.85, oceanCanvasEdgeHeight-20);
		ctx.closePath();
	}

	function drawOcean() {
		ctx.fillStyle = "#0066cc";
		ctx.beginPath();
		ctx.fillRect(0, oceanCanvasEdgeHeight, canvas.width, oceanHeight); 
		ctx.fillStyle = "#e6f2ff";
		ctx.fillRect(250, 420, 78, 72);	
		ctx.fillRect(650, 390, 78, 72);		
		ctx.closePath();	

	}

	//GLACIERS

	var createGlacier = function(x, y) {
		var glacier = {
			x: x,
			y: y,
			width: 78,
			height: 72,
			draw: function(){
				ctx.beginPath();
				//ctx.drawImage(glacier, this.x, this.y);
				ctx.fillStyle = "#e6f2ff";
				ctx.fillRect(this.x, this.y, this.width, this.height);	
				ctx.closePath();	
			}
		}
		return glacier;
	};

	//the array for glaciers
	var glaciers = [];

	var detectGlacier = function(champ, glacier) {

		if (champ.x < glacier.x + glacier.width  && champ.x + champ.width  > glacier.x &&
			champ.y < glacier.y + glacier.height && champ.y + champ.height > glacier.y) {	
			if (champ.invincible === false) {
				champ.hitPoints -= damage;
				champ.invincible = true;
				console.log(champ.hitPoints);
			}
		}		
	}

	var glacierChecks = function(champ) {
		for (var i=0; i<glaciers.length; i++) {
			glaciers[i].draw();
			detectGlacier(champ, glaciers[i]);
		}
	}

	var spawnGlacier = function() {

		if (mapInitialized===false) {	
			glaciers.push(createGlacier(500, oceanCanvasEdgeHeight-72));		
			glaciers.push(createGlacier(800, oceanCanvasEdgeHeight-72));			
			// for (var i=0;i<3;i++) {			

			// }
			mapInitialized = true;
		}

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

//ZOMBIE MAP

	function zombieDirections() {
		ctx.fillStyle = "#fff";
		ctx.font="30px Verdana";
		ctx.beginPath();
		ctx.fillText("I'll fight off a horde of zombies.", canvas.width*.05, canvas.height*.1);
		ctx.font="20px Verdana";
		ctx.fillText("Get to the chopper!", canvas.width*.8, canvas.height*.8);
		ctx.fillText("Use space to fire your weapon.", canvas.width*.2, canvas.height*.4);
		
		ctx.closePath();
	}

	<!-- ZOMBIE -->

	var zombieSpawnTimer = 20;

	var createZombie = function(x, y, width, height) {
		var zombie = {
			x: x,
			y: y,
			width: width,
			height: height,
			speed: 3,
			move: function() {
				this.x -= this.speed;
			},
			draw: function(){
				ctx.fillStyle = "green";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		return zombie;
	};

	//the array for zombie
	var zombies = [];

	//remove zombie from array
	var removeZombie = function(obj) {
		var i = zombies.indexOf(obj);	//gets index number of the zombie
		zombies.splice(i, 1);	//removes that zombie
	};

	var detectZombie = function(champ, zombie) {
		if (champ.x < zombie.x + zombie.width  && champ.x + champ.width  > zombie.x &&
		champ.y < zombie.y + zombie.height && champ.y + champ.height > zombie.y) {	
			if (champ.invincible === false) {
				champ.hitPoints -= damage;
				champ.invincible = true;
				console.log("hitpoints: " + champ.hitPoints);
			}
		}		
	}

	var zombieChecks = function(champ) {
		for (var i=0; i<zombies.length; i++) {
			zombies[i].move();
			zombies[i].draw();
			detectZombie(champ, zombies[i]);
			//chooses the enemy outside the screen then removes that one
			if (zombies[i].x < -50) {
				removeZombie(zombies[i]);
				i--;	//subtracts one because it would skip drawing the next enemy
			}
		}
	}

	var spawnZombie = function() {
		if (zombieSpawnTimer <= 0) {
			zombies.push(createZombie(canvas.width, canvasEdgeHeight - 80, 40, 80));
			zombieSpawnTimer = 40 + Math.random() * 30;
		} else {
			zombieSpawnTimer--;
		}	
	}

	//Pistol

	var createBullet = function(x, y, width, height) {
		var bullet = {
			x: x,
			y: y,
			width: width,
			height: height,
			speed: 10,
			move: function() {
				this.x += this.speed;
			},
			draw: function() {
				ctx.fillStyle = "red";
				ctx.fillRect(this.x, this.y, this.width, this.height);
			},
		}
		return bullet;
	};

	//array for bullets
	var bullets = [];

	//remove bullet from array
	var removeBullet = function(obj) {
		var i = bullets.indexOf(obj);	//gets index number of the bullet
		bullets.splice(i, 1);	//removes that bullet
	};

	var bulletChecks = function() {
		for (var i=0; i<bullets.length; i++) {
			bullets[i].move();
			bullets[i].draw();
			//chooses the bullet outside the screen then removes that one
			if (bullets[i].x < -50 || bullets[i] > canvas.width) {
				removeBullet(bullets[i]);
				i--;	//subtracts one because it would skip drawing the next bullet
			}
			for (var j=0; j<zombies.length; j++) {
				if (bullets[i].x < zombies[j].x + zombies[j].width  && bullets[i].x + bullets[i].width  > zombies[j].x &&
					bullets[i].y < zombies[j].y + zombies[j].height && bullets[i].y + bullets[i].height > zombies[j].y) {
					removeBullet(bullets[i]);
					i--;
					removeZombie(zombies[j]);
					j--;
					console.log(zombies.length);	
				}
			}
		}
	};

	var spawnBullet = function(champ) {
		bullets.push(createBullet(champ.x+(champ.width/2), champ.y+(champ.height/2), 10, 10));
	}

	function runZombieMap() {

		champion4.checkIfDonezo();
		zombieDirections();
		champion4.move();
		champion4.update();
		champion4.draw();
		champion4.playerInviciblility();
		champion4.firePistol();
		spawnZombie();
		zombieChecks(champion4);
		bulletChecks();
		drawFloor();

	};











