class Lock extends Thing{
  constructor(type,color="#662C13",x,y,fixed=true){
    super(x,y,0,0);
    this.fixed = fixed;
    this.type = type;
    this.unlocked = false;
    this.color = color;
  }

  show(hero,ghost){
    if(this.checkCollision(hero)){
      hero.setx(hero.getx() + (-3)*hero.getSpeed()[0]);
      hero.sety(hero.gety() + (-3)*hero.getSpeed()[1]);
    }
    if (this.checkCollision(ghost)){
      ghost.setx(ghost.getx() + (-3)*ghost.getSpeed()[0]);
      ghost.sety(ghost.gety() + (-3)*ghost.getSpeed()[1]);
    }
    if(!this.unlocked){

      switch(this.type){
        case "up":
        if(this.fixed){
          this.x=width/2;
          this.y = 5.5*height/12-3*height/8+width/100;
        }
        this.w = 5.4*height/35;
        this.h = width/50 + 15;
        break;
        case "down":
        if(this.fixed){
          this.x = width/2;
          this.y = 5.5*height/12+3*height/8-width/100 - 2;
        }
        this.w = 5.4*height/35;
        this.h = width/50 + 15;
        break;
        case "left":
        if(this.fixed){
          this.x = 1*width/8;
          this.y =5.5*height/12;
        }
        this.w = width/50 + 10;
        this.h = height/8;
        break;
        case "right":
        if(this.fixed){
          this.x=7*width/8;
          this.y=5.5*height/12;
        }
        this.w=width/50 + 10;
        this.h=height/8;
        break;
      }
    }
    fill(this.color);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
    rectMode(CORNER);
  }

  unlock(){
    this.unlocked = true;
    unlocked.play();
    this.x = -100000000;
    this.y = -1000000000;
  }

  getUnlocked(){
    return this.unlocked;
  }
}
