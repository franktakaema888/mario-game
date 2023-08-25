/*
Mark Cheong - GAME PROJECT FINAL SUBMISSON
Admissions Number - KJ0488

(1) Sound Extensions
- What i found difficult?
I had trouble implementing the sounds for the various actions. At the start the game over sound and the dying sound kept on going in a loop, which was pretty annoying. I also had another problem of the game win sound being played continuously even though my game had already restarted. Lastly, this was an amateur mistake but i didn't link my sound file properly at the start which is why it didn't load. 

- Skills i learnt 
I learnt to resolve this by honing on my debugging skills. I mostly used console.log to figure out where the problem lied. I also used the help of the internet and found some documentation which helped me solve the current problem that I had. I used the p5js reference library to solve for issues that we currently on hand and tried and tested functions that I have read about in the documentation to see if they have worked out. 

I feel that it really is trial and error, which trains my coding skills. I also feel that the more I spend time on the problem the easier it is for me to understand it in the future. Patience is also one of the things that improved over the course of this project because you really need it when encountering a problem.

*/




var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var characterDead

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

var platforms;

var game_score;
var flagpole;
var lives;

var enemies;

var stage = 0;
//multimedia
var sounds;
var gameOverPlayed;
var marioFont;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    sounds =
    {
        jump: loadSound('assets/jump.wav'),
        collect: loadSound('assets/collectable.mp3'),
        plummet: loadSound('assets/plummet.wav'),
        menu: loadSound('assets/menu1.wav'),
        gameOver: loadSound('assets/game_over.wav'),
        gameWon: loadSound('assets/game_won.wav')
    }
    
	//set sound volume
	sounds.jump.setVolume(0.1);
    sounds.collect.setVolume(0.1);
    sounds.plummet.setVolume(0.1);
    sounds.menu.setVolume(0.1);
	sounds.gameOver.setVolume(0.3);

	gameOverPlayed = false;

	marioFont = loadFont('assets/smbfont.ttf');
}

'use strict'
function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
	lives = 3;

	startGame();
}


function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	gameChar_width = 50;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	characterDead = false;

	// Initialise arrays of scenery objects.
	clouds =[
		{pos_x: 200,pos_y: 150,size: 80},
		{pos_x: 500,pos_y: 70,size: 80},
		{pos_x: 800,pos_y: 100,size: 80},
		{pos_x: 1200,pos_y: 150,size: 80}];
	mountains =[
		{pos_x: 150,pos_y: floorPos_y,height: 250,width: 300},
		{pos_x: 250,pos_y: floorPos_y,height: 200,width: 200},
		{pos_x: 1000,pos_y: floorPos_y,height: 200,width: 200}];
	trees_x =[
		100, 300, 500, 900];
	canyons =[
		{pos_x:-500, pos_y:floorPos_y, height:width - floorPos_y, width:500, size: 10},
		{pos_x:576, pos_y:floorPos_y, height:width - floorPos_y, width:300,size: 10},
		{pos_x:1300, pos_y:floorPos_y, height:width - floorPos_y, width:800,size: 10}];
	collectables =[
		{pos_x:-800, pos_y:floorPos_y - 20, height:30, width:50, isFound: false},
		{pos_x:120, pos_y:floorPos_y - 20, height:30, width:50, isFound: false},
		{pos_x:380, pos_y:floorPos_y - 20, height:30, width:50, isFound: false},
		{pos_x:1100, pos_y:floorPos_y - 20, height:30, width:50, isFound: false},
		{pos_x:2200, pos_y:floorPos_y - 20, height:30, width:50, isFound: false}];

	platforms =[];

	platforms.push(createPlatforms(-460,floorPos_y - 50,70));
	platforms.push(createPlatforms(-280,floorPos_y - 50,70));
	platforms.push(createPlatforms(-150,floorPos_y - 50,70));
	platforms.push(createPlatforms(100,floorPos_y - 60,100));
	platforms.push(createPlatforms(650,floorPos_y - 40,150));
	platforms.push(createPlatforms(1400,floorPos_y - 30,80));
	platforms.push(createPlatforms(1500,floorPos_y - 70,90));
	platforms.push(createPlatforms(1650,floorPos_y - 90,100));
	platforms.push(createPlatforms(1850,floorPos_y - 75,80));

	game_score = 0;

	// End Point of game
	flagpole = {pos_x:2500, pos_y:floorPos_y, height:floorPos_y - 250, isReached: false}; 

	//Enemies
	enemies = [];
	enemies.push(new Enemy(-770, floorPos_y - 10, 100));
	enemies.push(new Enemy(100, floorPos_y - 10, 100));
	enemies.push(new Enemy(1100, floorPos_y - 10, 100));
	enemies.push(new Enemy(2200, floorPos_y - 10, 100));
	
}

function draw()
{
	if (stage == 0)
        {
            splash();
			
        }		
		if(stage == 1)
        {
            gamePlaying();
        }
		if(mouseIsPressed == true)
		{
			stage = 1;
		}
}

function gamePlaying()
{
	drawSkyGround();

	//saving current program state
	push();

	//scrolling slowly through background
	translate(scrollPos/4,0);
	// Draw clouds.
	drawClouds();
	// Draw mountains.
	drawMountains();
	
	//saving current program state
	pop();

	//saving current program state
	push();

	//scrolling foreground faster than background
	translate(scrollPos,0);
	// Draw trees.
	drawTrees();
	// Draw canyons.
	for(var i = 0; i < canyons.length; i++)
	{
		drawCanyon(canyons[i]);
	}
	// Canyon isFalling
	for(var i = 0; i < canyons.length; i++)
	{
		checkCanyon(canyons[i]);
	}
	// Draw Platforms.
	for(var i=0; i < platforms.length; i++)
	{
		platforms[i].draw();
	} 

	// Draw and Check collectable items.
	for(var i=0; i < collectables.length; i++)
	{
		if(collectables[i].isFound == false)
		{
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}
	// Check Flag Pole
	drawFlagpole();

	// Drawing and Checking for enemies 
	for(var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw();

		var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

		if(isContact)
		{
			if(lives > 0)
			{
				startGame();
				lives -= 1;
				sounds.plummet.play();
				break;
			}
		}
	}
	// saving current program state
	pop();
	
	///////////INTERACTION CODE//////////
	//check if Game Over
	var isGameOver = checkIsGameOver()
	if(isGameOver == true)
	{
		drawGameOver();	
	}
	
	// Draw game character and let move if game is not over/won
	if(isGameOver == false)
	{
		drawGameChar();
		drawCharLiveStatus();
		movement();		
	}
	// Logic to make the game character rise and fall.	
	gravity();

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	//check if Flagpole has been reached
	if(flagpole.isReached == false)
	{
		checkFlagpole();
	}

	//check if character is dead
	if(characterDead == false)
    {
        checkPlayerDie();
    }
}

// ---------------------
// Game logic functions
// ---------------------

// Logic to make the game character move in the background
function movement()
{
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}
	else if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}
}

// Logic to make the game character rise and fall.
function gravity()
{
	if(gameChar_y < floorPos_y)
	{ 
		// detecting platforms
		var isContact = false;
		for(var i = 0; i < platforms.length; i++)
		{
			if(platforms[i].checkContact(gameChar_world_x,gameChar_y))
			{
				isFalling = false;
				isContact = true;
				break;
			}
		}
		// make character stay on the platforms
		if(!isContact)
		{
			gameChar_y += 2;  
			isFalling = true;
		}
	} 
	else
	{		
		isFalling = false;
	}

	if(isPlummeting)
    {
        gameChar_y += 10;
		isLeft = false;
		isRight = false;
    }
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{

	if(keyCode == 37)
	{
		isLeft = true;
	}
	if(keyCode == 39)
	{
		isRight = true;
	}
	if(keyCode == 32 || key == " ")
	{
		//character only jump when it is touching the ground
		if(!isFalling && !isPlummeting && !checkIsGameOver())
		{
            gameChar_y -= 70;
            sounds.jump.play(); 
        }
		else if(checkIsGameOver()) 
		{ 
			restartGame();
		}
	}
}

function keyReleased()
{
	if(keyCode == 37)
	{
		isLeft = false;
	}
	if(keyCode == 39)
	{
		isRight = false;
	}
	if(keyCode == 32)
	{
		isFalling = false;
	}
}
// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
function drawGameChar()
{
	// draw game character
    if(isLeft && isFalling)
	{
	   //jumping-left code
	   drawJumpingLeft();
	}
	else if(isRight && isFalling) 
	{
	    //jumping-right code
		drawJumpingRight();
	}
	else if(isLeft)
	{
		//walking left code
		drawWalkingLeft();
	}
	else if(isRight)
	{
		//walking right code
		drawWalkingRight();
	}
	else if(isFalling || isPlummeting)
	{
		//jumping facing forwards code
		drawJumpingFacingForwards();
	}
	else
	{
		//standing front facing code
		drawStandingFrontFacing();
	}
}

// ----------------------------------
// Game State
// ----------------------------------

// Function to Draw Game Score Lives at the Top Left of the Screen 
function drawCharLiveStatus()
{
	drawLives();
	drawGameScore();
}
function drawLives()
{
	for(var i=0;i<lives;i++)
	{
		fill(255, 127, 255);
      	heart(40*i+20, 40, 20);
	}
}
function heart(x, y, size) 
{
	beginShape();
	vertex(x, y);
	bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
	bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
	endShape(CLOSE);
}
function drawGameScore()
{
	fill(255);
	noStroke();
	textSize(20);
	text("score:" + game_score, 12,25);
}

// Function for Flag Pole endgame
function drawFlagpole()
{
	push();
	strokeWeight(5);
	stroke(180);
	line(flagpole.pos_x, flagpole.pos_y, flagpole.pos_x, flagpole.height);
	fill(255, 99, 99);
	noStroke();

	if(flagpole.isReached)
	{
		rect(flagpole.pos_x, flagpole.height, 50, 50);
	}
	else
	{
		rect(flagpole.pos_x, flagpole.height + 200, 50, 50);
	}
	pop();
}
function checkFlagpole()
{
	var d = abs(gameChar_world_x - flagpole.pos_x);

	if(d<15)
	{
		flagpole.isReached = true;
		sounds.gameWon.play();
	}
}

//function for enemies
function Enemy(x, y, range)
{
	this.x = x; 
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
		}
		else if(this.currentX < this.x)
		{
			this.inc = 1;
		}
	}

	this.draw = function()
	{
		this.update();
		fill(22, 96, 125);
		// body
		ellipse(this.currentX, this.y, 30, 30);
		// eyes
		fill(255);
        ellipse(this.currentX - 6, this.y - 15, 14, 14);
        ellipse(this.currentX + 6, this.y - 15, 14, 14);
        fill(0);
        ellipse(this.currentX - 5, this.y - 15, 3, 3);
        ellipse(this.currentX + 5, this.y - 15, 3, 3);
        
	}

	this.checkContact = function(gc_x, gc_y)
	{
		var d = dist(gc_x, gc_y, this.currentX, this.y)

		if(d < 20)
		{
			return true;
		}

		return false;
	}
}

// ----------------------------------
// Check Character Status
// ----------------------------------

//function to check if the character dies
function checkPlayerDie()
{   
    if(gameChar_y > height)
    {
		characterDead = true;

		if(lives > 0)
		{
			startGame();
		}
    }    
}

//function to check is game is over and return back gameOver status
function checkIsGameOver()
{
	var gameOver = false;

	if(flagpole.isReached || lives < 1)
	{
		gameOver = true; 
	}
	return gameOver;
}

function drawGameOver()
{	
	if(gameOverPlayed == false)
    {
        sounds.gameOver.play();
		gameOverPlayed = true;
    }

	push();
	fill(0);
	textStyle(BOLD);
    textAlign(CENTER);
	textSize(50);
	text("Game Over Press space to replay", width/2 ,height/2-100);

	if(lives>0)
	{	
		text("You Win", width/2 ,height/2);
	}
	else
	{	
		text("You Lose", width/2 ,height/2);
	}
	pop();
}

function restartGame()
{   
    //stops any sounds that are playing
    for (var halt in sounds) 
    {
        sounds[halt].stop();
    }

	sounds.menu.play();
	lives = 3;
    startGame();
}
// Splash Screen
function splash()
{
    background(100, 155, 255); // fill the sky blue
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

    //title 
    textFont(marioFont);
    fill(255,255,255);
    stroke(0);
    strokeWeight(10);
    textSize(100);
    text('Treasure Hunt', width/3, 150);

	//instructions
	textSize(40);
	text('HOW TO PLAY:', width/3, 270);
	text('USE ARROW KEYS TO MOVE LEFT AND RIGHT', width/3, 330);
	text('PRESS SPACE TO JUMP', width/3, 380);	
	text('CLICK THE SCREEN TO START', width/3, 490);
}