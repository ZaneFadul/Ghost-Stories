class Door extends Thing {

  constructor(type){
    super(0,0,0,0);
    this.switch = false;
    this.type = type;
  }

  show(hero,ghost){
    if(this.checkCollision(hero)){
      this.switch = true;
      switch(this.type){
        case "up":
        hero.setRoom("down");
        break;
        case "down":
        hero.setRoom("up");
        break;
        case "left":
        hero.setRoom("right");
        break;
        case "right":
        hero.setRoom("left");
      }
    }
    switch(this.type){
      case "up":
      this.x= width/2;
      this.y = 5.5*height/12-3*height/8+width/100;
      this.w = 5.4*height/35 - 6;
      this.h = width/50 + 10;
      break;
      case "down":
      this.x = width/2;
      this.y = 5.5*height/12+3*height/8-width/100;
      this.w = 5.4*height/35 - 6;
      this.h = width/50 + 5;
      break;
      case "left":
      this.x = 1*width/8;
      this.y = 5.5*height/12;
      this.w = width/50 + 6;
      this.h = height/8 - 3;
      break;
      case "right":
      this.x=7*width/8;
      this.y=5.5*height/12;
      this.w=width/50 + 6;
      this.h=height/8 - 3;
      break;
    }
    fill(0);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
    rectMode(CORNER);
  }

  getSwitch(){
    var toReturn = this.switch;
    this.switch = false;
    return toReturn;
  }
}
