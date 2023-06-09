let tank;
let tank2;
let gun;
let gun2;
let wood;
let barriers;
let barrierCollider;
let explosive;
let explosiveCollider;
let tankPointer;
let red;
let green;
let gameStarted;
let startButton;
let startScreen;
let title;
let selectedArena;
let interval = 1000;

let bullets;

let gunType = 'miniGun';

function preload(){
	soundFormats('wav');
	tankImg = loadImage('assets/Green Tank.png');
	gunImg = loadImage('assets/Green Gun.png');
	tankImg2 = loadImage('assets/Blue Tank.png');
	gunImg2 = loadImage('assets/Blue Gun.png');
	barrierImg = loadImage('assets/barrier.png');
	woodImg = loadImage('assets/Wood.png');
	explosiveImg = loadImage('assets/Explosive.png');
	bulletImg = loadImage('assets/bullet.png');
	titleScreenImg = loadImage('assets/Start Screen.png');
	titleImg = loadImage('assets/title.png');
	buttonImg = loadImage('assets/button.png');
	blueWin = loadImage('assets/blue.png');
	greenWin = loadImage('assets/green.png');

	shootSound = loadSound('assets/shoot.wav');
	hitSound = loadSound('assets/hit.wav');
	explosionSound = loadSound('assets/explosion.wav');
	beepSound = loadSound('assets/beep.wav');
}

function setup() {
	let canvas = createCanvas(550, 550);
	canvas.parent("Game");
	frameRate(60);

	startTime = millis();
	//tankImg.resize(40,0);

	tank = new Sprite(275, 275, 40, 40);
	tank.color = 'green';
	tank.health = 50;
	tank.img = tankImg;
	

	tank2 = new Sprite(500, 275, 40, 40);
	tank2.color = 'blue';
	tank2.health = 50;
	tank2.img = tankImg2

	gun = new Sprite(275, 275, 40, 13, 'k');
	//gun.offset.x = 23;
	gun.rotationSpeed = 0;
	gun.overlaps(tank);
	gun.overlaps(tank2);
	gun.color = 'lightgreen';
	gun.img = gunImg;

	gun2 = new Sprite(275, 275, 40, 13, 'k');
	//gun2.offset.x = 23;
	gun2.rotationSpeed = 0;
	gun2.overlaps(tank2);
	gun2.overlaps(tank);
	gun2.color = 'lightblue';
	gun2.img = gunImg2;

	wood = new Group();
	wood.visible = false;
	woodCollider = new Group();
	//woodHealths
	woodCollider.color = color(99, 67, 16);
	woodCollider.img = woodImg;
	wood.layer = -2;
	woodCollider.layer = -1;
	//woodCollider.overlaps(wood);

	barriers = new Group();
	barriers.visible = false;
	barrierCollider = new Group();
	barrierCollider.color = 'gray';
	barrierCollider.img = barrierImg;
	barriers.layer = -2;
	barrierCollider.layer = -1;
	//barrierCollider.overlaps(barriers);
	//new barriers.Sprite(600, 600, 60, 60, 'k');
	//new barrierCollider.Sprite(600, 600);

	explosive = new Group();
	explosive.visible = false;
	explosiveCollider = new Group();
	explosiveCollider.color = 'red';
	explosiveCollider.img = explosiveImg;
	explosive.layer = -2;
	explosiveCollider.layer = -1;

	bullets = new Group();
	bullets.overlaps(tank);
	bullets.overlaps(wood);
	bullets.overlaps(tank2);
	bullets.layer = 100;
	bullets.img = bulletImg;

	tankPointer = new Sprite(0, 0, 20, 20, 'none');
	tankPointer.visible = false;

	tankPointer2 = new Sprite(0, 0, 20, 20, 'none');
	tankPointer2.visible = false;

	startButton = new Sprite(265, 180, 130, 50, 'none');
	startButton.layer = 101;
	startButton.img = buttonImg;

	startScreen = new Sprite(275, 275, 550, 550, 'none');
	startScreen.layer = 100;
	startScreen.img = titleScreenImg;
	startScreen.overlaps(allSprites);
	title = new Sprite(275, 100, 10, 10, 'none');
	title.layer = 101;
	title.img = titleImg;

}

function drawHealthBar(maxHealth, currentHealth) {
	let healthRatio = currentHealth / maxHealth;
	let barWidth = 200;
	let greenWidth = barWidth * healthRatio;
	//let redWidth = barWidth;

	red = new Sprite(100, 100, barWidth, 20, 'none');
	red.color = 'red';

	green = new Sprite(100, 100, greenWidth, 20, 'none');
	green.color = 'green';
  }

function draw() {

	if(startButton.mouse.pressing()){
		selectedArena = Math.floor(Math.random() * 4);
		gameStarted = true;
		startButton.remove();
		startScreen.visible = false;
		title.remove();
		if(selectedArena == 0){
			BuildLevel(
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,9,9,9,9,9,9,9,9,9,9,0],
				[0,9,9,9,9,9,9,9,9,9,9,0],
			100
			)
			BuildLevel(
				[0,9,9,9,9,9,9,9,9,9,9,0],
				[0,9,9,9,9,9,9,9,9,9,9,0],
				[0,9,9,9,9,9,9,9,9,9,9,0],
			280
			)
			BuildLevel(
				[0,9,9,9,9,9,9,9,9,9,9,0],
				[0,9,9,9,9,9,9,9,9,9,9,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
			460
			)	
		} else if(selectedArena == 1){
			BuildLevel(
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,9,1,9,1,9,9,1,9,9,9,0],
				[0,1,1,9,1,9,9,1,9,9,9,0],
			100
			)
			BuildLevel(
				[0,2,9,9,1,1,1,1,9,9,9,0],
				[0,9,9,9,1,2,2,1,9,9,9,0],
				[0,9,9,9,1,1,1,1,9,9,2,0],
			280
			)
			BuildLevel(
				[0,9,9,9,1,9,9,1,9,1,1,0],
				[0,9,9,9,1,9,9,1,9,1,9,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
			460
			)	
		} else if(selectedArena == 2){
			BuildLevel(
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,9,0,9,0,9,9,9,9,1,9,0],
				[0,1,1,2,1,9,9,1,9,9,2,0],
			100
			)
			BuildLevel(
				[0,2,9,9,1,1,2,1,9,2,9,0],
				[0,9,1,9,2,0,2,0,9,9,9,0],
				[0,9,9,9,1,0,1,1,9,9,2,0],
			280
			)
			BuildLevel(
				[0,0,9,0,1,9,9,9,9,0,1,0],
				[0,9,9,9,1,9,2,1,9,9,9,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
			460
			)	
		} else if(selectedArena == 3){
			BuildLevel(
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,9,0,9,0,2,2,0,9,0,9,0],
				[0,9,0,9,0,9,9,0,9,0,9,0],
			100
			)
			BuildLevel(
				[0,9,1,9,1,9,9,1,9,1,9,0],
				[0,9,1,9,1,9,9,1,9,1,9,0],
				[0,9,1,9,1,9,9,1,9,1,9,0],
			280
			)
			BuildLevel(
				[0,9,0,9,0,9,9,0,9,0,9,0],
				[0,9,0,9,0,2,2,0,9,0,9,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
			460
			)	
		}

		tank.x = 263;
		tank.y = 165;
		tank2.x = 800
		tank2.y = 518;
		for (let i = 0; i < woodCollider.length; i++) {
			wood[i].health = 10;
			//console.log(wood[i2].health);
		}
		for (let i = 0; i < explosiveCollider.length; i++) {
			explosive[i].health = 10;
			//console.log(wood[i2].health);
		}
	}

	if(gameStarted){
		game();
		console.log(tank.x, tank.y, tank2.x, tank2.y);
	}else{
		startScreen.layer = 100;
		drawSprites();
		if(mouse.pressing() && (startScreen.img == greenWin || startScreen.img == blueWin)){
			document.location.reload();
		}
	}
}

function game(){
	clear();
	background(color(50, 70, 50));
	//tank controls

	tankPointer.y = tank.y;
	tankPointer.x = tank.x;
	WasdControl(tank, tankPointer);
	tank.rotateTo(tankPointer, 5, 0);

	tankPointer2.y = tank2.y;
	tankPointer2.x = tank2.x;
	ArrowKeyControl(tank2, tankPointer2);
	tank2.rotateTo(tankPointer2, 5, 0);

	GunClickControl(bullets, tank);

	woodCollider.x = wood.x;
	woodCollider.y = wood.y;
	woodCollider.rotation = wood.rotation;

	calculateCollisions();
	for (let i = 0; i < bullets.length; i++) {
		if(bullets[i].overlaps(tank) && bullets[i].from == 1){
			bullets[i].remove();
			tank.health-=1;
			if(tank.health <= 0){
				explosionSound.play();
				tank.remove();
				gun.remove();
				gameStarted = false;
				drawSprites();
				startScreen.visible = true;
				startScreen.img = blueWin;
			}
		}		
	}
	for (let i = 0; i < bullets.length; i++) {
		if(bullets[i].overlaps(tank2) && bullets[i].from == 0){
			bullets[i].remove();
			tank2.health -= 1;
			if(tank2.health <= 0){
				explosionSound.play();
				gun2.remove();
				tank2.remove();
				gameStarted = false;
				drawSprites();
				startScreen.visible = true;
				startScreen.img = greenWin;
			}
		}		
	}
	  
	for (let i = 0; i < barriers.length; i++) {
		barrierCollider[i].x = barriers[i].x;
		barrierCollider[i].y = barriers[i].y;
		barrierCollider[i].rotation = barriers[i].rotation;
	}
	for (let i = 0; i < wood.length; i++) {
		woodCollider[i].x = wood[i].x;
		woodCollider[i].y = wood[i].y;
		woodCollider[i].rotation = wood[i].rotation;
	}
	for (let i = 0; i < explosive.length; i++) {
		explosiveCollider[i].x = explosive[i].x;
		explosiveCollider[i].y = explosive[i].y;
		explosiveCollider[i].rotation = explosive[i].rotation;
	}


	gun.y = tank.y;
	gun.x = tank.x;
	//gun.rotateTo(mouse, 100, 0);
	if(kb.pressing('f')){
		gun.rotationSpeed = -5;
	}else if(kb.pressing('h')){
		gun.rotationSpeed = 5;
	}else {
		gun.rotationSpeed = 0;
	}

	gun2.y = tank2.y;
	gun2.x = tank2.x;
	//gun2.rotateTo(mouse, 100, 0);
	if(kb.pressing('i')){
		gun2.rotationSpeed = -5;
	}else if(kb.pressing('p')){
		gun2.rotationSpeed = 5;
	}else {
		gun2.rotationSpeed = 0;
	}


	if (millis() - startTime >= interval) {
		beepSound.play();
		interval *= 0.984;
		startTime = millis();
	}
	if (abs(millis() - 60000) <= 10){
		beepSound.stop();
		explosionSound.play();
		setTimeout(() => {
			document.location.reload();
		}, 1000);
		//alert('yo');
	}
	camera.x = (tank.x + tank2.x) / 2;
	camera.y = (tank.y + tank2.y) / 2;


	let distanceIsh = Math.pow((tank.x - tank2.x) * (tank.x - tank2.x) + (tank.y - tank2.y) * (tank.y - tank2.y), 0.5);

	camera.zoom = 1.4 - distanceIsh * 1/1000;
	//alert(camera.zoom)
	/*if (kb.pressing("space")) {
		camera.zoom += 0.5;
	}*/
	//red.remove();
	//green.remove();

	//drawHealthBar(50, tank.health);	
}