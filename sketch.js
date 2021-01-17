var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, spawnbanana, spawnObstacles
var score = 0;
var forestimg, forest , gameover , gameoverimg
var servivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  forestimg = loadImage("forest.jpg")
  gameoverimg = loadImage("gameover.png")
}



function setup() {
  forest = createSprite(400,400)
  forest.addAnimation("forest" , forestimg)
  forest.scale = 1.2
 
  //GROUPS
 FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  //MONKEY
  monkey = createSprite(80, 314, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //GROUND
  ground = createSprite(80, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
}


function draw() {
 
 
  
  monkey.collide(ground);

  if (gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);

    servivalTime = Math.ceil(frameCount / frameRate());

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //SPACE 
    if (keyDown("space")) {
    monkey.velocityY = -10
    
  }
    //IF MONKEY IS TOUNCH THE BANANA
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
    
    Obstacles();
    food();
    
  //GRAVITY FOR MONKEY
  monkey.velocityY = monkey.velocityY + 0.8;

    obstacleGroup.setLifetimeEach(-1);
       FoodGroup.setLifetimeEach(-1);

    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }  
    }
   
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     monkey.destroy();
   if(monkey.isTouching(obstacle)){
     servivalTime.visible = false;
     
   }
    
          
      if (ground.x < 0) {
      ground.x = ground.width / 2;
        
    }
   }
 



 
  drawSprites();
  
  stroke("yellow");
  textSize(20);
  fill("yellow");

  stroke("yellow");
  textSize(20);
  fill("yellow");
   text("Surival Time: " + servivalTime, 20, 50);
  
  //displaying score
  stroke("yellow");
    fill("yellow");
      textSize(20);
  text("Score:"+  score, 300, 50);
if (gameState === END) {
  
  gameover = createSprite(200 , 200)
  gameover.scale = 0.5;
  gameover.addAnimation("gameover",gameoverimg);
  
}
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -(6 + score/100);
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}


function Obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -(6 + score/100);
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }

}