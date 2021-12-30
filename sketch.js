var MENU = 0, SELECT = 1, PLAY = 2, END = 3;
var gameState = SELECT;

var SongButtons, SongSelection;
var SongSelection1, SongSelection2, SongSelection3;
var SongDuration = 0, Intro = 125;

var bg, player, limit1, limit2;
var goodNoteImg, badNoteImg, GnotesGroup, BnotesGroup;
var GoodNotes = 0, BadNotes = 0;

var Video;

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
  
  vid = createVideo(["Video/Tequila.mp4"], vidLoad);
  vid.size(100,100)
  vid.x = windowWidth/2;
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
  //limit1.visible = false;
  player.bounceOff(limit1);

  limit2 = createSprite(windowWidth + 55, player.y - 50, 200, 150);
  //limit2.visible = false;
  limit2.collide(player);

  GnotesGroup = new Group();
  BnotesGroup = new Group();

  /*Video1 = createSprite(100,200,100,100);
  Video1.addVideo(Video);*/
}

function draw() {
  background(bgmenu);  
  /*Intro += -1

  if(Intro < 0){
    gameState = SELECT;
  }*/

  if(gameState === SELECT){
    background(bgselect);
    SongButtons.display()
  }else{
    SongButtons.hide();
  }

  if(gameState === PLAY){
    background(bgplay);
    bg.visible = true;
    player.visible = true;
    playerMove();
    spawner();

    SongButtons.hide();

    SongDuration = SongDuration + 1;
    console.log(SongDuration);

    if(player.isTouching(GnotesGroup)){
      GoodNotes += 1
      GnotesGroup.destroyEach();
    }

    if(player.isTouching(GnotesGroup)){
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
  console.log(gameState);
}

function playerMove(){
  if(keyDown("A") || keyDown("LEFT_ARROW")){
    player.velocityX = -10;
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

function vidLoad() {
  vid.loop();
  vid.volume(0);
}