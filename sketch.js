//declare variables
var scene, sceneImg;
var gameOver, gameOverImg;
var rocket, rocketImg;
var alien, alienImg;
var alienGroup;
var saturn, saturnImg;
var saturnGroup;
var venus, venusImg;
var venusGroup;
var jupiter, jupiterImg;
var jupiterGroup
var planetGroup;
var gameState = "play";
var score;
var backgroundSound;
var gameOverSound;
var winSound;

//preload images
function preload(){
sceneImg = loadImage("nasa-galaxy_9pu4.jpg");
rocketImg = loadImage("main_spaceship.png");
alienImg = loadImage("alien_spaceship.png");
saturnImg = loadImage("saturn.png");
venusImg = loadImage("venus.png");
jupiterImg = loadImage("jupiter.png");
gameOverImg = loadImage("gameover.jpg");
backgroundSound = loadSound("Sci-Fi-Dramatic-Theme.mp3");
gameOverSound = loadSound("gameover.wav");
winSound = loadSound("win.wav");


}

//create groups and sprites
function setup() {
 createCanvas(windowWidth, windowHeight);


 scene = createSprite(windowWidth/2, windowHeight/2);
 scene.addImage(sceneImg);
 scene.velocityY = 1;

 rocket = createSprite(windowWidth/2, windowHeight/1.25);
 rocket.addImage(rocketImg);
 rocket.scale = 0.3;
 rocket.rotation = 270;
 rocket.setCollider('circle',0,0,90)
 //rocket.debug = true;

 backgroundSound.loop();

 score = 0;

 alienGroup = new Group();
 planetGroup = new Group();
 venusGroup = new Group();
 saturnGroup = new Group();
 jupiterGroup = new Group();
}


function draw() {



if (gameState == "play"){


    if(scene.y > 420){
    scene.y = 320
    }


    if (keyDown("LEFT_ARROW")){
      rocket.x = rocket.x - 4;
    }
    if (keyDown("RIGHT_ARROW")){
      rocket.x = rocket.x + 4;
    }
    if (keyDown("UP_ARROW")){
      rocket.y = rocket.y - 4;
    }

    if (keyDown("DOWN_ARROW")){
        rocket.y = rocket.y + 4;
    }

    rocket.velocityY = rocket.velocityY + 0.002;

    spawn();
    drawScore();

drawSprites();
}

if (gameState == "end"){
    alienGroup.velocityYEach = 0;
    planetGroup.velocityYEach = 0;
    textSize(40);
    fill("white");
    text("Press SPACE to restart", windowWidth/3, windowHeight/4);

    if (keyWentDown("SPACE")){
        gameState = "play";
        score = 0;
        rocket.x = windowWidth/2
        rocket.y = windowHeight/1.25
    }

    drawScore();
}

    drawScore();
}

function spawn(){

    if (frameCount%150 == 0){
        var alien = createSprite(300, -50);
        alien.addImage(alienImg);
        alien.velocityY = 3;
        alien.scale = 0.27;
        alien.lifetime = 215;
        alien.x = Math.round(random(windowWidth/5, windowWidth-100));

        alienGroup.add(alien);
    }

    if(frameCount%130 == 0){
        var saturn = createSprite(300, -50);
        saturn.addImage(saturnImg);
        saturn.velocityY = 7.5;
        saturn.scale = 0.3;
        saturn.lifetime = 215;
        saturn.x = Math.round(random(windowWidth/5, windowWidth-100));

        saturnGroup.add(saturn);
    }

    if(frameCount%170 == 0){
        var jupiter = createSprite(300, -50);
        jupiter.addImage(jupiterImg);
        jupiter.velocityY = 8.1;
        jupiter.scale = 0.3;
        jupiter.lifetime = 215;
        jupiter.x = Math.round(random(windowWidth/5, windowWidth-100));

        jupiterGroup.add(jupiter);
    }

    if(frameCount%150 == 0){
        var venus = createSprite(300, -50);
        venus.addImage(venusImg);
        venus.velocityY = 6;
        venus.scale = 0.3;
        venus.lifetime = 215;
        venus.x = Math.round(random(windowWidth/5, windowWidth-100));

        venusGroup.add(venus);
    }

    if (venusGroup.isTouching(rocket)){
        venusGroup.destroyEach();
        score = score + 25;
        winSound.play();
    }
    if (saturnGroup.isTouching(rocket)){
        saturnGroup.destroyEach();
        score = score + 50;
        winSound.play();
    }
    if (jupiterGroup.isTouching(rocket)){
        jupiterGroup.destroyEach();
        score = score + 75;
        winSound.play();
    }
    if (alienGroup.isTouching(rocket)||rocket.y>windowHeight){
        gameOver = createSprite(windowWidth/2, windowHeight/2);
        gameOver.addImage(gameOverImg);
        gameOver.lifetime = 4;
        gameOverSound.play();
        gameState = "end";
    }
}

function drawScore() {
    textSize(30);
    fill("white");
    text("Score: "+score, windowWidth/25, windowHeight/6);
}

//Sci-Fi Dramatic Theme by Twisterium | https://www.twisterium.com/
//Music promoted by https://www.chosic.com/
//Licensed under Creative Commons: Attribution 3.0 Unported (CC BY 3.0)
//https://creativecommons.org/licenses/by/3.0/