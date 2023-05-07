var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1Img,heart2Img,heart3Img,zombieImg,shooter1Img
var bullets=80
var score=0
var life=3
var winning,lose,explosion
var gameState="fight"
function preload(){
  shooter1Img=loadImage("shooter_1.png")
  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")
  heart2Img=loadImage("heart_2.png")
  heart3Img=loadImage("heart_3.png")
  bgImg = loadImage("bg.jpeg")
  heart1Img=loadImage("heart_1.png")
  zombieImg=loadImage("zombie.png")
  winning=loadSound("win.mp3")
  lose=loadSound("lose.mp3")
  explosion=loadSound("explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(width/2,height/2,width,height)
bg.addImage(bgImg)
bg.scale = 2.5
  

//creating the player sprite
player = createSprite(displayWidth-600, displayHeight-100, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,500,500)


  heart1=createSprite(displayWidth+600,40,20,20);
  heart1.visible=false
  heart1.addImage(heart1Img)
  heart1.scale=0.4
  heart2=createSprite(displayWidth+500,40,20,20)
  heart2.visible=false
  heart2.addImage(heart2Img)
  heart2.scale=0.4
   heart3=createSprite(displayWidth+600,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.4
  bulletGroup=new Group()
  
  zombieGroup=new Group()
}

function draw() {
  background(0); 
  if(gameState==="fight"){

  if(life===3){
    heart3.visible=true
    heart2.visible=false
    heart1.visible=false
  }
  if(life===2){
    heart3.visible=false
    heart2.visible=true
    heart1.visible=false
  }
  if(life===1){
    heart3.visible=false
    heart2.visible=false
    heart1.visible=true
  }
  if(life===0){
    gameState="lost"
    heart1.visible=false
    heart2.visible=false
    heart3.visible=false
  }
  if(score===100){
    gameState="won"
    winning.play()

  }
  console.log(zombieGroup.length)
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].x<10){
      life--
    }
  }
  
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-600,player.y-30,20,10)

  bullet.velocityX=20
  bulletGroup.add(bullet)
  player.depth=bullet.depth
  player.depth=player.depth+2
  player.addImage(shooter_shooting)
  bullets=bullets-1
  explosion.play()
 
}
 
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (bullets==0){
  gameState="bullet"
  lose.play()
}
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      explosion.play()
      score=score+2
    }
  }
}
if(zombieGroup.isTouching(player)){
  lose.play()
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
    }
  }
}
enemy()
  }
drawSprites();
textSize(60)
fill("black")
text("bullets="+bullets,width/4,displayHeight/2-250)
text("score="+score,width/2,displayHeight/2-250)
text("lives="+life,3*width/4,displayHeight/2-250)


if(gameState=="lost"){
textSize(100)
fill("red")
text("You Lost",650,400)
zombieGroup.destroyEach()
player.destroy()

}
else if(gameState=="won"){
  textSize(100)
  fill("yellow")
  text("you WON",650,400)
  zombieGroup.destroyEach()
  player.destroy()
}

else if(gameState==="bullet"){
  textSize(50)
  fill("yellow")
  text("You ran out of Bullets",650,400)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}
}
function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(width+50,width-50),random(200,height-200),40,40)
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,1000,1000)
    //zombie.lifetime=400
    zombieGroup.add(zombie)
  }
}