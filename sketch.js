var WAIT = 1;
var PLAY = 2;
var END = 0;
var gameState = "wait"

var canvas
var boatRower
var sharks
var woodenPlanks, metalSheets
var boatRowerImg 
var sharksImg
var woodenPlanksImg, metalSheetsImg
var backgroundImg
var obstaclesGroup
var plastic, plasticsGroup, plasticImg, plasticBagImg

var score = 0

function preload(){
  boatRowerLeftImg = loadImage("195-1951053_canoe-paddle-clipart-cartoon-rowing-boat-clipart-hd-removebg-preview.png")
  boatRowerRightImg = loadImage("final_61f085c5e94ba700fdaf673f_506066-removebg-preview.png")
  sharksImg = loadImage("shark-47634_960_720.png")
  woodenPlanksImg = loadImage("plank-36736_640.png")
  metalSheetsImg = loadImage("corrugated-roof.png")
  backgroundImg = loadImage("R.jfif")
  plasticImg = loadImage("R.png")
  plasticBagImg = loadImage("grocery-clipart-plastic-shopping-bag-13.png")
}

function setup(){
canvas = createCanvas(1000,1000)

bg = createSprite(400,200, width, height)
bg.addImage("background", backgroundImg)
bg.scale = 5
bg.visible = false

boatRower = createSprite(500, 900, 50, 50)
boatRower.addImage("left",boatRowerLeftImg)
boatRower.addImage("right",boatRowerRightImg)
boatRower.scale = 0.4

obstaclesGroup = new Group()
plasticsGroup = new Group()


}

function draw(){
  background("white")
  
  

  bg.velocityY = 2

  if(gameState === "wait"){
    console.log("hello")
    fill("black")
    textSize(30)
    text("KEEP YOUR OCEANS CLEAN!!!",400,250)
    text("Objective:Clean the ocean and avoid dangerous obstacles",200,500)
    text("Press space to start",450,750)

  }

  if(keyDown("space")){
    gameState = "play"
  }

  if (bg.y > 1000){
    bg.y = bg.height/2;
    }


  if(gameState=="play"){
      
    bg.visible=true
    bg.velocityY = 2

    boatRower.setCollider("rectangle",0,0,boatRower.width,boatRower.height)
    
      
    if(keyDown("RIGHT_ARROW")){
    boatRower.x += 5
    }

    if(keyDown("LEFT_ARROW")){
    boatRower.x-=5
    }
    
    if(boatRower.x>=1000){
    boatRower.x -=10
    }
    
    if(boatRower.x<=0){
    boatRower.x += 10
    }
    
    if(boatRower.x>=500){
    boatRower.changeImage("right",boatRowerRightImg)
    }
    else{
    boatRower.changeImage("left",boatRowerLeftImg)    
    }
    
    if(plasticsGroup.isTouching(boatRower)){
      score+=1
      plasticsGroup.destroyEach()
      if(boatRower.x>=500){
        boatRower.x -=5
      }
      else{
        boatRower.x += 5
      }
    }

    if(obstaclesGroup.isTouching(boatRower)){
      gameState="end"
    }

    spawnObstacles();
    spawnPlastics()

  }

  if(gameState=="end"){
    bg.visible=false
    fill("black")
    textSize(30)
    text("THANKS FOR PLAYING!!!",500,250)
    text("REFRESH TO PLAY AGAIN",500,500)

    obstaclesGroup.setVelocityYEach(0);
    plasticsGroup.setVelocityYEach(0); 

    obstaclesGroup.setLifetimeEach(0)
    plasticsGroup.setLifetimeEach(0);

  }
  
    drawSprites()

    fill("black")
    textSize(20)
    text("Score:"+score,100,100)
}

function spawnObstacles(){
  if (frameCount % 92 === 0){
    var obstacle = createSprite(Math.round(random(100,900)),0,10,40);
    obstacle.velocityY = 4
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(sharksImg);
       obstacle.scale=0.2
               break;
       case 2: obstacle.addImage(woodenPlanksImg);
       obstacle.scale=0.5
               break;
       case 3: obstacle.addImage(metalSheetsImg);
       obstacle.scale=0.5
               break;
       default: break;
     }
     obstaclesGroup.add(obstacle)
     obstacle.lifetime = 250

     obstacle.depth = boatRower.depth;
     boatRower.depth = boatRower.depth + 1

     obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height)
    }
  }

  function spawnPlastics(){
    if (frameCount % 57 === 0){
      plastic = createSprite(Math.round(random(100,900)),0,10,40);
      plastic.velocityY = 4
      
       //generate random obstacles
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: plastic.addImage(plasticImg);
         plastic.scale=0.1
                 break;
         case 2: plastic.addImage(plasticBagImg);
         plastic.scale=0.06
                 break;
         default: break;
       }
       plasticsGroup.add(plastic)
       plastic.lifetime = 250

       plastic.depth = boatRower.depth;
       boatRower.depth = boatRower.depth + 1

       plastic.setCollider("rectangle",0,0,plastic.width,plastic.height)

      }
    }