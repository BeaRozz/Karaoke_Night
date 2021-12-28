var MENU = 0, SELECT = 1, PLAY = 2, END = 3;
var gameState = 1;

var SongButtons, SongSelection;
var SongSelection1, SongSelection2, SongSelection3;
var SongDuration = 0, Intro = 125;

var bg, player, limit1, limit2;
var goodNoteImg, badNoteImg, GnotesGroup, BnotesGroup;
var GoodNotes = 0, BadNotes = 0;

function preload(){
  bgmenu = loadImage("Images/menupage.jpg");
  bgplay = loadImage("Images/bgplay.jpg");
  bgselect = loadImage("Images/selecting.jpg");
  bgfinal = loadImage("Images/finalresults.jpg");

  SongSelection1 = loadSound("Sound/Missa Langosta.mp3");
  SongSelection2 = loadSound("Sound/I will Survive.mp3");
  SongSelection3 = loadSound("Sound/Tequila.mp3");

  goodNoteImg = loadImage("Images/goodnote.png");
  badNoteImg = loadImage("Images/brokennote.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  SongButtons = new Buttons();

  bg = createSprite(windowWidth/16*9.6, windowHeight/2, windowWidth/4 * 3, windowHeight - 100);
  bg.shapeColor = "#088A85";
  bg.visible = false;

  player = createSprite(bg.width, bg.height + 35, 150, 30);
  player.shapeColor = "yellow";
  player.visible = false;

  limit1 = createSprite(windowWidth/6, player.y - 50, 200, 150);
  limit1.visible = false;
  player.collide(limit1);

  limit2 = createSprite(windowWidth + 55, player.y - 50, 200, 150);
  limit2.visible = false;
  limit2.collide(player);

  GnotesGroup = new Group();
  BnotesGroup = new Group();
}

function draw() {
  background(bgmenu);  
  /*Intro += -1

  if(Intro < 0){
    gameState = 1;
  }*/

  if(gameState === 1){
    background(bgselect);
    SongButtons.display()
  }else{
    SongButtons.hide();
  }

  if(gameState === 2){
    background(bgplay);
    bg.visible = true;
    player.visible = true;
    playerMove();
    spawner();

    SongDuration = SongDuration + 1;
    console.log(SongDuration);

    if(GnotesGroup.isTouching(player)){
      GoodNotes += 1
      GnotesGroup.destroyEach();
    }

    if(BnotesGroup.isTouching(player)){
      BadNotes += 1
      BnotesGroup.destroyEach();
    }

    //SongDuration = SongDuration - 1
    //console.log(SongDuration);
  }

  if(SongDuration < 0){
    background(bgfinal);
  }

  drawSprites();
}

function playerMove(){
  if(keyDown("A") || keyDown("LEFT_ARROW")){
    player.x += -10;
  }

  if(keyDown("RIGHT_ARROW") || keyDown("D")){
    player.x += 10
  }
}

function spawner(){
  if(frameCount%50 === 0){
    goodNote = createSprite(random(windowWidth/6 + 100, windowWidth + 250), 100);
    goodNote.addImage(goodNoteImg);
    goodNote.scale = 0.3;
    goodNote.velocityY = 8;
    goodNote.lifetime = 80;

    GnotesGroup.add(goodNote);
  }

  if(frameCount%80 === 0){
    badNote = createSprite(random(windowWidth/6 + 100, windowWidth + 250), 100);
    badNote.addImage(badNoteImg);
    badNote.scale = 0.5;
    badNote.velocityY = 8;
    badNote.lifetime = 80;

    BnotesGroup.add(badNote);
  }
}