function drawJumpingLeft(){
    //head
    fill(250, 128, 114);
    ellipse(gameChar_x, gameChar_y - 40, 25, 25);
    //hat
    fill(220, 20, 60);
    rect(gameChar_x - 9, gameChar_y - 55, 18, 5);
    //body
    fill(255, 0, 255);
    rect(gameChar_x - 7, gameChar_y - 29, 15, 20);
    //left hand
    fill(250, 128, 114);
    rect(gameChar_x - 12, gameChar_y - 29, 5, 12);
    //right hand
    fill(250, 128, 114);
    rect(gameChar_x + 8, gameChar_y - 29, 5, 12);
    //left foot
    fill(0, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 14, 5, 5);
    //right foot
    fill(0, 0, 0);
    rect(gameChar_x + 3, gameChar_y - 10, 5, 5);
    //shadow
    fill(192, 192, 192)
    ellipse(gameChar_x + 1, gameChar_y, 30, 5)
}

function drawJumpingRight(){  
    fill(250, 128, 114);
    ellipse(gameChar_x, gameChar_y - 40, 25, 25);
    //hat
    fill(220, 20, 60);
    rect(gameChar_x - 9, gameChar_y - 55, 18, 5);
    //body
    fill(255, 0, 255);
    rect(gameChar_x - 7, gameChar_y - 29, 15, 20);
    //left hand
    fill(250, 128, 114);
    rect(gameChar_x - 12, gameChar_y - 29, 5, 12);
    //right hand
    fill(250, 128, 114);
    rect(gameChar_x + 8, gameChar_y - 29, 5, 12);
    //left foot
    fill(0, 0, 0);
    rect(gameChar_x - 7, gameChar_y - 10, 5, 5);
    //right foot
    fill(0, 0, 0);
    rect(gameChar_x + 6, gameChar_y - 14, 5, 5);
    //shadow
    fill(192, 192, 192)
    ellipse(gameChar_x + 1, gameChar_y, 30, 5)
}

function drawWalkingLeft(){
    //head
    fill(250, 128, 114);
    ellipse(gameChar_x, gameChar_y - 30, 25, 25);
    //hat
    fill(220, 20, 60);
    rect(gameChar_x - 9, gameChar_y - 45, 18, 5);
    //body
    fill(255, 0, 255);
    rect(gameChar_x - 7, gameChar_y - 19, 15, 20);
    //left hand
    fill(250, 128, 114);
    rect(gameChar_x - 12, gameChar_y - 19, 5, 12);
    //right hand
    fill(250, 128, 114);
    rect(gameChar_x + 8, gameChar_y - 19, 5, 12);
    //left foot
    fill(0, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 4, 5, 5);
    //right foot
    fill(0, 0, 0);
    rect(gameChar_x + 3, gameChar_y, 5, 5);
}

function drawWalkingRight(){
    //head
    fill(250, 128, 114);
    ellipse(gameChar_x, gameChar_y - 30, 25, 25);
    //hat
    fill(220, 20, 60);
    rect(gameChar_x - 9, gameChar_y - 45, 18, 5);
    //body
    fill(255, 0, 255);
    rect(gameChar_x - 7, gameChar_y - 19, 15, 20);
    //left hand
    fill(250, 128, 114);
    rect(gameChar_x - 12, gameChar_y - 19, 5, 12);
    //right hand
    fill(250, 128, 114);
    rect(gameChar_x + 8, gameChar_y - 19, 5, 12);
    //left foot
    fill(0, 0, 0);
    rect(gameChar_x - 7, gameChar_y, 5, 5);
    //right foot
    fill(0, 0, 0);
    rect(gameChar_x + 6, gameChar_y - 4, 5, 5);
}

function drawJumpingFacingForwards(){
    //head
    fill(250, 128, 114);
    ellipse(gameChar_x, gameChar_y - 40, 25, 25);
    //hat
    fill(220, 20, 60);
    rect(gameChar_x - 9, gameChar_y - 55, 18, 5);
    //body
    fill(255, 0, 255);
    rect(gameChar_x - 7, gameChar_y - 29, 15, 20);
    //left hand
    fill(250, 128, 114);
    rect(gameChar_x - 12, gameChar_y - 29, 5, 12);
    //right hand
    fill(250, 128, 114);
    rect(gameChar_x + 8, gameChar_y - 29, 5, 12);
    //left foot
    fill(0, 0, 0);
    rect(gameChar_x - 7, gameChar_y - 10, 5, 5);
    //right foot
    fill(0, 0, 0);
    rect(gameChar_x + 3, gameChar_y - 10, 5, 5);
    //shadow
    fill(192, 192, 192)
    ellipse(gameChar_x + 1, gameChar_y, 30, 5)
}

function drawStandingFrontFacing(){
    //head
    fill(250, 128, 114);
    ellipse(gameChar_x, gameChar_y - 30, 25, 25);
    //hat
    fill(220, 20, 60);
    rect(gameChar_x - 9, gameChar_y - 45, 18, 5);
    //body
    fill(255, 0, 255);
    rect(gameChar_x - 7, gameChar_y - 19, 15, 20);
    //left hand
    fill(250, 128, 114);
    rect(gameChar_x - 12, gameChar_y - 19, 5, 12);
    //right hand
    fill(250, 128, 114);
    rect(gameChar_x + 8, gameChar_y - 19, 5, 12);
    //left foot
    fill(0, 0, 0);
    rect(gameChar_x - 7, gameChar_y, 5, 5);
    //right foot
    fill(0, 0, 0);
    rect(gameChar_x + 3, gameChar_y, 5, 5);
}
