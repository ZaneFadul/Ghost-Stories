/*IMPROVEMENTS:
-add a pick up item system
-add title/intro


-edit radius change
-if not push out ghost out mechanic
*/
//useful variables
var ghostpassColor = "rgba(100,100,200,0.6)";

//counter variables
var gameOverScreen = 0;

//BOOLEANS!!!!
var room1 = false;
var room2 = false;
var room3 = false;
var room4 = false;
var room5 = false;
var room6 = false;
var room7 = false;
var room8 = false;
var room9 = false;
var title = false;
var intro = true;
var theEnd = false;
var gameOver = false;

var mainFont = "Arial";
function preload(){
  mainFont = loadFont("css/fonts/munro.ttf");
}

function setup()
{
  //var width = 1920;
  //var height = 1080;
  createCanvas(1920,1080);
  //-----------------------------------------info objects
  info = new Prompt(width/2,height/15);
  //=------------------------------------------------main objects
  control = new ControlEngine();
  hero = new Hero(width/4, height/4);
  attack = new Attack(hero,control);
  hero.initializeAttack(attack);
  ghost = new Ghost(hero);
  hero.initializeGhost(ghost);
  gui = new GUI(3.25*width/4,height/60, width/8,width/80,hero);
  healBlock = new Thing(width/2, height/2-width/40, width/20, width/20,100);
  //clickable
  startButton = new Clickable(width/2,2*height/3,width/4,height/20,255,100,"rgb(100,100,255)");
  //Room !!!!!!!!!!!!!!!!!
  arenalwall = new Thing(width/8, 5.5*height/12,width/50,3*height/4, 100);
  arenarwall = new Thing(7*width/8, 5.5*height/12,width/50,3*height/4, 100);
  arenaupwall = new Thing(width/2, 5.5*height/12-3*height/8+width/100,5.4*height/4,width/50, 100);
  arenadownwall = new Thing(width/2, 5.5*height/12+3*height/8-width/100,5.4*height/4,width/50, 100);
  //----------------DOORS----------------------------------------------
  arena1doorright = new Door("right");
  arena2doorleft = new Door("left");
  arena2doordown = new Door("down");
  arena3doorup = new Door("up");
  arena3doorleft = new Door("left");
  arena3doorright = new Door("right");
  arena4doorright = new Door("right");
  arena5doorleft = new Door("left");
  arena5doorright = new Door("right");
  arena5doordown = new Door("down");
  arena6doorup = new Door("up");
  arena6doordown = new Door("down");
  arena7doorleft = new Door("left");
  arena7doorup = new Door("up");
  arena8doordown = new Door("down");
  arena8doorup = new Door("up");
  arena9doordown = new Door("down");
  //-----------------------LOCKED DOORS----------------------------------------
  arena1doorrightlock = new Lock("right")
  arena2doordownlock = new Lock("down");
  arena3doorleftlock = new Lock("left");
  arena6doordownlock = new Lock("down");
  arena3extralock = new Lock("left","#662C13",2*width/8,3*height/12,false);
  arena5extralock = new Lock("up","#662C13",10.85*width/15,1.5*height/5,false);
  arena7extralock = new Lock("left", "#662C13",1.5*width/4,3.5*height/8,false);
  arena7lava = new LockedThing(2.5*width/4,3.3*height/5,2*width/4,1.2*height/4);
  arena8updoorlock = new Lock("up");
  arena9downdoorlock = new Lock("down");
  //--------------------------KEYS-------------------------------------------
  key0 = new Item(-100000,0,"key",arena1doorrightlock);
  key1 = new Item(width/4,height/4,"key",arena2doordownlock);
  key2 = new Item(0.8*width/4,3*height/5,"key",arena3doorleftlock);
  key3 = new Item(1.5*width/8,7*height/12,"key",arena3extralock);
  key4 = new Item(1.4*width/8,1*height/5,"key",arena7lava);
  key5 = new Item(6*width/8,1.4*height/5,"key",arena7extralock);
  key6 = new Item(0.8*width/4,1.2*height/5,"key",arena5extralock);
  //----------------ROOM LISTS-----------------------------------------------
  //room1
  arena1objects = [healBlock,arena1doorright,arena1doorrightlock,new Thing(width/2,height/2,width/10,height,"rgba(0,0,0,0)","prompt","Press \"a\" to attack!")];
  arena1objects = lineOfOrbs(6*width/10,height/2-width/40,3,"heal",arena1objects,"right");
  arena1objects = lineOfOrbs(width/2 - width/10,height/2-width/40,3,"heal",arena1objects,"left");
  arena1enemies = [new Enemy(3*width/4,2*height/4,3,1,"rgb(255,0,0)",key0)];


  //room2
  arena2objects = [new Thing(4.7*width/8,2.7*height/12,height/8,height/4,"rgb(20,20,50)","prompt","Try pressing D!"),
  new Thing(4.5*width/8,2.7*height/12,width/100,height/4,ghostpassColor,"ghostpassable"),
  new Thing(width/2-width/12,8.5*height/12-3*height/8+width/100,4.2*height/4,width/100,100),
  arena2doorleft,arena2doordown,arena2doordownlock,key1,arenaupwall];
  arena2enemies = [new Enemy(3*width/4,2*height/4,3,1,"rgb(255,0,0)","heal")];


  //room3
  arena3objects = [arena3doorleft,arena3doorright,arena3doorleftlock,new Thing(2*width/8,6.7*height/12,width/100,height/2,ghostpassColor,"ghostpassable"),new Thing(2*width/8,1.9*height/12,width/100,height/12,ghostpassColor,"ghostpassable"),arenaupwall,arenadownwall,arena3doorup,arena3extralock,key3];
  arena3enemies = [new Enemy(3*width/4,2*height/4,3,1),new Enemy(0.8*width/4,2*height/4,3,1)];


  //room4
  arena4objects = [arena4doorright,new Thing(width/2,5.5*height/12,3.4*height/4,1.5*height/4,"rgb(0,255,0)","heal")];


  //room5
  arena5objects = [new Thing(2*width/3,1.5*height/5,1.2*height/3,width/100,ghostpassColor,"ghostpassable"),new Thing(1.2*width/3,1.5*height/5,height,width/100),new Thing(2.45*width/3,1.5*height/5,1.5*height/8,width/100), new Thing(width/2,height/4,width/100,height/9), new Thing(1.5*width/4,height/4,width/100,height/9), new Thing(2.5*width/4,height/4,width/100,height/9), new Thing(1*width/4,height/4,width/100,height/9),
  new Thing(1.25*width/4,height/6,width/100,height/9),  new Thing(2.25*width/4,height/6,width/100,height/9),  new Thing(2.75*width/4,height/6,width/100,height/9),  new Thing(1.75*width/4,height/6,width/100,height/9),
  new Thing(1.4*width/8,1*height/5,width/25,width/25,"rgb(250,100,250)","addMagic"),arena5extralock,arenalwall,arenaupwall,arenarwall,key4, arena5doorleft,arena5doorright,arena5doordown];


  //room6
  arena6objects = [arena6doorup, arena6doordown,arena6doordownlock];


  //room7---------------------------------!!!
  arena7objects = [arena7lava,new Thing(width/2,3*height/6+15,0.85*width/3,width/100), new Thing(1.05*width/2,2*height/6+30,0.6*width/3,width/100,ghostpassColor,"ghostpassable"),
  new Thing(3.45*width/8,2.7*height/12,width/100,height/4+6),  new Thing(5*width/8,5.5*height/12 - 25,width/50,0.85*height/5),
  new Thing(width/4,2*height/6+30,width/4,width/100),
  arena7extralock,arena7doorleft,arena7doorup,arenadownwall,arenarwall,key5,key6];


  //room8
  arena8objects = [new Thing(width/2,height/2-40,width/15,3*height/4-30,"rgb(10,10,10)","decor"),new Thing(1.8*width/6,height/2-40,width/8,3*height/4-30,"rgba(255,100,0,0.8)","lava"),new Thing(4.2*width/6,height/2-40,width/8,3*height/4-30,"rgba(255,100,0,0.8)","lava"),arenaupwall,arenadownwall,arena8doordown,arena8doorup,arena8updoorlock,key2];
  arena8enemies = [new Enemy(2*width/4,1*height/4,3,1),new Enemy(2*width/4,2.3*height/4,3,1)]

  //room9
  arena9objects = [arena9doordown,arena9downdoorlock];
  arena9enemies = [new Enemy(width/2,height/3,10,2,"rgb(230,0,0)","key",arena6doordownlock,width/20,1.5)];
  //---------------------ROOMS--------------------------------------------------
  arena1 = new Arena("rgb(20,20,50)",arena1objects,arena1enemies);
  arena2 = new Arena("rgb(20,20,50)",arena2objects,arena2enemies);
  arena3 = new Arena("rgb(20,20,20)",arena3objects,arena3enemies);
  arena4 = new Arena("rgb(30,20,50)",arena4objects);
  arena5 = new Arena("rgb(20,20,50)",arena5objects);
  arena6 = new Arena("rgb(10,10,10)",arena6objects);
  arena7 = new Arena("rgb(20,20,20)",arena7objects);
  arena8 = new Arena("rgb(20,20,20)",arena8objects,arena8enemies);
  arena9 = new Arena("rgb(20,20,20)",arena9objects,arena9enemies);
}

function draw()
{
  //PRELIMINARY
  background(0);
  if(intro != true){
    if(document.getElementById("introvideo") != null){
      document.getElementById("introvideo").parentNode.removeChild(document.getElementById("introvideo"));
    }
  }

  //audio
  if(title != true && intro != true && !hero.isDead()){
    ghostdun.play();
    dun.play();

    if(hero.getGhostMode() == true){
      ghostdun.volume = 1;
      dun.volume = 0;
    }
    else{
      dun.volume = 1;
      ghostdun.volume = 0;
    }
    //updates
    hero.update(inputList);
    ghost.update(hero,inputList);
    gui.update(hero);
  }

  //controls
  inputList = control.getList();






  //Room 1
  if (room1 == true){
    //graphics
    show(arena1);
    if (hero.getGhostMode() == true){
      info.call("this is your ghost xd");
    }
    room1, room2 = doorConnect(arena1doorright);
  }





  //Room 2
  if (room2 == true){
    //graphics
    show(arena2);
    //doors
    room2, room1 = doorConnect(arena2doorleft);
    room2, room3 = doorConnect(arena2doordown);
  }





  //Room 3
  if (room3 == true){
    //graphics
    show(arena3);
    //doors
    room3, room2 = doorConnect(arena3doorup);
    room3, room4 = doorConnect(arena3doorleft);
    room3, room5 = doorConnect(arena3doorright);
  }





  //Room 4
  if (room4 == true){
    show(arena4);
    //doors
    room4,room3 = doorConnect(arena4doorright);
  }







  //Room 5
  if (room5 == true){
    show(arena5);
    //doors
    room5,room3 = doorConnect(arena5doorleft);
    room5,room6 = doorConnect(arena5doordown);
    room5,room7 = doorConnect(arena5doorright);
  }





  //Room 6
  if (room6 == true){
    show(arena6);
    //doors
    room6,room5 = doorConnect(arena6doorup);
    room6,theEnd = doorConnect(arena6doordown);
  }



  //Room 7
  if (room7 == true){
    show(arena7);
    //doors
    room7,room5 = doorConnect(arena7doorleft);
    room7,room8 = doorConnect(arena7doorup);
  }






  //Room 8
  if (room8 == true){
    show(arena8);
    if(arena8.getEnemiesDead() == true){
      if(arena8updoorlock.getUnlocked() == false){
        arena8updoorlock.unlock();
      }
    }
    //doors
    room8,room7 = doorConnect(arena8doordown);
    room8,room9 = doorConnect(arena8doorup);
  }






  //Room 9
  if (room9 == true){

    show(arena9);
    if(arena9.getEnemiesDead() == true){
      if(arena9downdoorlock.getUnlocked() == false){
        arena9downdoorlock.unlock();
      }
    }
    //doors
    room9,room8 = doorConnect(arena9doordown);
  }



  //DEAD
  if (hero.isDead()){
    gameOver = true;
  }

  if(gameOver == true){
    room1=false;
    room2=false;
    room3=false;
    room4=false;
    room5=false;
    room6=false;
    room7=false;
    room8=false;
    room9=false;
    ghostdun.pause();
    ghostdun.currentTime = 0;
    dun.pause();
    dun.currentTime = 0;
    ghostdun2.pause();
    ghostdun2.currentTime = 0;
    dun2.pause();
    dun2.currentTime = 0;
    if(gameOverScreen < 1){
      gameOverScreen += 0.005;
    }
    if(gameOverScreen > 0.1){
      if (gameover.currentTime > 6){
        gameover.pause();
      } else {
        gameover.play();
      }
      if (gameover.currentTime > 4){
        startButton.show();
      }
    }
    fill("rgba(255,255,255," + String(gameOverScreen)+")");
    textSize(200);
    textAlign(CENTER);
    text("u died xD",width/2,height/3);

    if(startButton.getClicked()){
      hero.maxHealth();
      gameOver = false;
      room1 = true;
      hero.setx(width/4);
      hero.sety(height/4);
      gameover.pause();
      gameover.currentTime = 0;
      gameOverScreen = 0;
    }
  }




  //Intro
  if (intro == true){
    introvideo.play();
    introvideo.volume = 0;
    introaudio.play();
    if(inputList[5] == true){
      introaudio.pause();
      introaudio.currentTime = 0;
      menu.play();
      intro = false;
      title = true;
    }
    if(introvideo.currentTime >= introvideo.duration - 1){
      introvideo.pause();
    }
    if(introaudio.currentTime > 43.5){
      intro = false;
      title = true;
    }
  }






  //Title
  if(title == true){
    startButton.show();
    if(startButton.getClicked()){
      title = false
      room1 = true;
      introaudio.pause();
      introaudio.currentTime = 0;
      menu.pause();
      menu.currentTime = 0;
      intro.volume = 0;
      menu.volume = 0;
    }
    fill(255);
    textFont(mainFont);
    textAlign(CENTER,CENTER);
    textSize(300);
    text("GHOST STORIES",width/2,height/4);
  }

  //THE END
  if (theEnd == true){
    room1=false;
    room2=false;
    room3=false;
    room4=false;
    room5=false;
    room6=false;
    room7=false;
    room8=false;
    room9=false;
    dun.pause();
    ghostdun.pause();
    fill(0);
    rect(width/2,height/2,width,height);
    fill(255);
    textSize(200);
    textAlign(CENTER);
    text("YOU WIN",width/2,height/3);
    win.play();
    if(win.currentTime >= win.duration - 1){
      win.pause();
      location.reload();
    }
  }

}










function doorConnect(door){
  if(door.getSwitch()){
    hero.setAttackState(false);
    return false, true;
  }
}

function show(arena){
  arena.show(hero,ghost);
  ghost.show();
  hero.show();
  gui.show();
}

function keyPressed() {
  control.checkPress(keyPressed);
}

function keyReleased(){
  control.checkRelease(keyReleased);
}

function lineOfOrbs(x,y,length,type,listToPush,direction){
  for(var i = 0; i <= length - 1;i++){
    if(direction == "right"){
      var orb = new Item(x + i*width/30,y,type);
    }
    else if(direction == "left"){
      var orb = new Item(x - i*width/30,y,type);
    }
    listToPush.push(orb);
  }
  return listToPush;
}

function rgba(col1,col2,col3,alpha){
  return "rgba("+String(col1)+","+String(col2)+","+String(col3)+","+String(alpha)+")";
}
