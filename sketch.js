var MENU = 0, SELECT = 1, PLAY = 2, END = 3;
var gameState = MENU;

var SongButtons, SongSelection;
var SongSelection1, SongSelection2, SongSelection3;
var SongDuration = 0;

var bg, player, limit1, limit2;
var goodNoteImg, badNoteImg, GnotesGroup, BnotesGroup;
var GoodNotes = 0, BadNotes = 0;

var ToSelect, playbutton;

function preload(){
  playbuttonImg = loadImage("Images/letsplay.png");
  bgmenu = loadImage("Images/menupage.jpg");
  bgplay = loadImage("Images/bgplay.jpg");
  bgselect = loadImage("Images/selecting.jpg");
  bgfinal = loadImage("Images/finalresults.jpg");

  SongSelection1 = loadSound("Sound/Missa Langosta.mp3");
  SongSelection2 = loadSound("Sound/I will Survive.mp3");
  SongSelection3 = loadSound("Sound/Tequila.mp3");
  BadNoteSound = loadSound("Sound/Wrong.mp3");

  goodNoteImg = loadImage("Images/goodnote.png");
  badNoteImg = loadImage("Images/brokennote.png");

  ToSelectImg = loadImage("Images/selectionback.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  SongButtons = new Buttons();

  playbutton = createSprite(windowWidth/2, windowHeight/3 + 100, 10,10);
  playbutton.addImage(playbuttonImg);
  playbutton.scale = 2;
  
  bg = createSprite(windowWidth/16*9.6, windowHeight/2, windowWidth/4 * 3, windowHeight - 100);
  bg.shapeColor = "#088A85";
  bg.visible = false;

  player = createSprite(bg.width, bg.height + 35, 150, 30);
  player.shapeColor = "yellow";
  player.visible = false;

  ToSelect = createSprite(windowWidth/6, windowHeight/6*5, 10,10);
  ToSelect.addImage(ToSelectImg);
  ToSelect.visible = false;
  ToSelect.scale = 0.25;

  /*limit1 = createSprite(windowWidth/6, player.y - 50, 200, 150);
  limit1.visible = false;
  player.bounceOff(limit1);

  limit2 = createSprite(windowWidth + 55, player.y - 50, 200, 150);
  limit2.visible = false;
  limit2.collide(player);*/

  GnotesGroup = new Group();
  BnotesGroup = new Group();

}

function draw() {
  background(bgmenu);  
  
  if(gameState === MENU){
    background(bgmenu);

    /*playbutton = createButton("Let's Play");
    playbutton.position(windowWidth/2, windowHeight/3 + 100);

    playbutton.mousePressed(()=>{
      gameState = SELECT;
      playbutton.hide();
    })*/

    if(mousePressedOver(playbutton)){
      gameState = SELECT;
      playbutton.visible = false;
    }
  }

  if(gameState === SELECT){
    background(bgselect);
    SongButtons.display();
  }

  if(gameState === PLAY){
    background(bgplay);
    bg.visible = true;
    player.visible = true;
    playerMove();
    spawner();

    SongButtons.hide();

    SongDuration += - 1;
    console.log(SongDuration);

    if(player.isTouching(GnotesGroup)){
      GoodNotes += 1
      GnotesGroup.destroyEach();
    }

    if(player.isTouching(BnotesGroup)){
      BadNotes += 1
      BnotesGroup.destroyEach();
      BadNoteSound.play();
    }
  }

  if(SongDuration < 0){
    gameState = END;
  }

  if(gameState === END){
    background(bgfinal);
    bg.visible = false;
    player.visible = false;
    ToSelect.visible = true;
    GnotesGroup.destroyEach();
    BnotesGroup.destroyEach();

    fill(0)
    textSize(50)
    text("Notas correctas logradas: " + GoodNotes, windowWidth/2, windowHeight/3 * 2 + 100);
    text("Notas malas logradas: " + BadNotes, windowWidth/2, windowHeight/3 * 2 + 150);
    fill("white;")
    textSize(20)
    text("Presiona el ícono de casa para elegir una nueva canción", windowWidth/20, windowHeight/12*11);

    if(mousePressedOver(ToSelect)){
      restart();
    }

  }

  drawSprites();
}

function playerMove(){

  if(player.x > 460.25){
    if(keyDown("A") || keyDown("LEFT_ARROW")){
      player.x += -10;
    }
  }

  if(player.x < 1600.25){
    if(keyDown("RIGHT_ARROW") || keyDown("D")){
      player.x += 10
    }
  }

}

function spawner(){
  if(frameCount%50 === 0){
    goodNote = createSprite(random(460.25, 1600.25), 100);
    goodNote.addImage(goodNoteImg);
    goodNote.scale = 0.3;
    goodNote.velocityY = 8;
    goodNote.lifetime = 80;

    GnotesGroup.add(goodNote);
  }

  if(frameCount%80 === 0){
    badNote = createSprite(random(460.25, 1600.25), 100);
    badNote.addImage(badNoteImg);
    badNote.scale = 0.5;
    badNote.velocityY = 8;
    badNote.lifetime = 80;

    BnotesGroup.add(badNote);
  }
}

function restart(){
  ToSelect.visible = false;
  gameState = SELECT;
}