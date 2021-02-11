var balloon;
var database, balloonposition;

function preload(){
    database = firebase.database();
    backgroundImg = loadImage("BG.png");
    hotairballoon = loadAnimation("hab-1.png", "hab2.png", "hab3.png")

}

function setup() {
  createCanvas(1000,640);
  balloon = createSprite(500,300, 50, 50);
  balloon.addAnimation("hotairballoon", hotairballoon);   
  balloon.scale = 0.01;


  var ballposition = database.ref("BALLOON/position");
  ballposition.on("value", readHeight, showError);
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
   balloon.x = balloon.x - 10;
  }

  else if(keyDown(RIGHT_ARROW)){
   balloon.x - balloon.x + 10;
                                                              
  }

  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
  } 

  else if(keyDown(DOWN_ARROW)){ 
    balloon.y = balloon.y + 10;
   }
  

  drawSprites();
}

function updateHeight(x,y) {
  database.ref('BALLOON/height').set({
    'x' : height.x + x ,
    'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("cannot read the database");
}
