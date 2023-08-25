// ---------------------------
// Background render functions
// ---------------------------
function drawSkyGround()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
}
// Function to draw cloud objects.
function drawClouds() 
{
	for(var i = 0; i < clouds.length; i++)
	{
		fill(255);
        ellipse(clouds[i].pos_x,clouds[i].pos_y,clouds[i].size,clouds[i].size - 10);
        ellipse(clouds[i].pos_x - 40,clouds[i].pos_y + 20,clouds[i].size - 20,clouds[i].size - 40);
        ellipse(clouds[i].pos_x + 40,clouds[i].pos_y - 20,clouds[i].size - 20,clouds[i].size - 40);
	}
}
// Function to draw mountains objects.
function drawMountains()
{
	for( var i = 0; i < mountains.length; i++)
	{
		//mountain shadows
		mountain_x1 = mountains[i].pos_x;
		mountain_y1 = mountains[i].pos_y;
		mountain_x2 = mountains[i].width+mountain_x1;
		mountain_y2 = mountain_y1;
		mountain_x3 = mountains[i].width/2+mountain_x1;
		mountain_y3 = mountain_y1 - mountains[i].height;
		fill(105, 105, 105);
		//mountain
		triangle(mountain_x1 - 50, mountain_y1, mountain_x2, mountain_y2, mountain_x3, mountain_y3);
		
		//mountain
		mountain_x1 = mountains[i].pos_x;
        mountain_y1 = mountains[i].pos_y;
        mountain_x2 = mountains[i].width+mountain_x1;
        mountain_y2 = mountain_y1;
        mountain_x3 = mountains[i].width/2+mountain_x1;
        mountain_y3 = mountain_y1 - mountains[i].height;
        fill(169, 169, 169);
        //mountain
	    triangle(mountain_x1, mountain_y1, mountain_x2, mountain_y2, mountain_x3, mountain_y3);
	}
}
// Function to draw trees objects.
function drawTrees()
{
	for(var i = 0; i < trees_x.length; i++)
	{
		//draw tree
	    //trunk
	    fill(120, 100, 40);
        rect(trees_x[i], floorPos_y - 89, 10, 90);
    
        //branches
        fill(85, 107, 47);
	    var tree = {x:trees_x[i] + 5, y:floorPos_y - 89, position:40};
        ellipse(tree.x, tree.y, tree.position, tree.position);
	    ellipse(tree.x, tree.y - 30, tree.position, tree.position);
	    ellipse(tree.x - 25, tree.y - 15, tree.position, tree.position);
	    ellipse(tree.x + 25, tree.y - 5, tree.position, tree.position);
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon)
{
	//canyon
	fill(244, 164, 96);
	rect(t_canyon.pos_x, t_canyon.pos_y, t_canyon.width, t_canyon.height);
	//canyon left side
	fill(160, 82, 45);
	rect(t_canyon.pos_x, t_canyon.pos_y, t_canyon.size, t_canyon.height);
	//canyon right side
	fill(160, 82, 45);
	rect(t_canyon.pos_x + t_canyon.width, t_canyon.pos_y, t_canyon.size, t_canyon.height);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon)
{
	var limit_x1_canyon= t_canyon.pos_x;
	var limit_x2_canyon= t_canyon.pos_x + t_canyon.width;
	if((gameChar_world_x > limit_x1_canyon + gameChar_width/2 && gameChar_y == floorPos_y)
		&& 
		(gameChar_world_x < limit_x2_canyon - gameChar_width/2 && gameChar_y == floorPos_y)) 
	{
		isPlummeting = true;
		lives -= 1;
		sounds.plummet.play();
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable)
{
	//chest bottom
	fill(160, 82, 45);
	rect(t_collectable.pos_x, t_collectable.pos_y, t_collectable.width, t_collectable.height);
	//chest top
	fill(218, 165, 32);
	rect(t_collectable.pos_x, t_collectable.pos_y, t_collectable.width, t_collectable.height - 40);
	text("$", t_collectable.pos_x + 23, t_collectable.pos_y + 20);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable)
{	
		if(dist(gameChar_x - scrollPos, gameChar_y, t_collectable.pos_x + 15, t_collectable.pos_y) < 30) 
		{
			t_collectable.isFound = true;
			game_score += 1;
			sounds.collect.play();
		}	
}

// ----------------------------------
// Factory Pattern for Platforms render
// ----------------------------------

function createPlatforms(x, y, length)
{
	var p = 
	{
		x: x,
		y: y,
		length: length,
		draw: function()
		{
			var thickness = 10
            var roundness = 10

			fill(131, 137, 150);
			rect(this.x, this.y - thickness * 0.1, this.length, 20, thickness + thickness * 0.1, roundness);
		},
		checkContact: function(gc_x, gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length) 
			{
				var d = this.y - gc_y;
				if( d >= 0 && d < 5)
				{
					return true;
				}
			}
			return false;
		}
	}
	return p;
}