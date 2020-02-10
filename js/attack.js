class Attack {
  constructor(hero,control){
    this.hero = hero;
    this.control = control;
    this.counter = 0;
    this.direction = "down";
    this.x=0;
    this.y=0;
    this.size=hero.getsize();
    this.inputList = [];
  }

  getx(){
    return this.x;
  }
  gety(){
    return this.y;
  }

  getsize(){
    return this.size;
  }

  attackStart(){
    this.counter = 0;
    this.x = this.hero.getx();
    this.y = this.hero.gety();
    this.direction = this.hero.getFacing();
    this.inputList = control.getList();
  }

  attack(object=undefined){
    if(this.counter > 60){
      hero.setAttackState(false);
      this.x = 30000;
      this.y = 30000;
      this.counter = 0;
      return;
    }
    if(this.hero.getAttackState() == false){
      this.x = 400000;
      this.y = 400000;
      this.counter = 0;
      return;
    }
    //LEFT UP
    if(this.direction == "upleft"){
      this.x -= 4.5;
      this.y -= 4.5;
    }
    //LEFT DOWN
    else if(this.direction == "downleft"){
      this.x -= 4.5;
      this.y += 4.5;
    }
    //RIGHT UP
    else if(this.direction == "upright"){
      this.x += 4.5;
      this.y -= 4.5;
    }
    //RIGHT DOWN
    else if(this.direction == "downright"){
      this.x += 4.5;
      this.y += 4.5;
    }
    //ONLY LEFT
    else if(this.direction == "left"){
      this.x -= 6;
    }
    //ONLY RIGHT
    else if(this.direction == "right"){
      this.x += 6;
    }
    //ONLY UP
    else if(this.direction == "up"){
      this.y -= 6;
    }
    //ONLY DOWN
    else if(this.direction == "down"){
      this.y += 6;
    }
    fill("rgba(230,230,255,0.5)");
    rectMode(CENTER);
    ellipse(this.x + this.hero.getsize()/2,this.y  + this.hero.getsize()/2,this.hero.getsize()/2);
    rectMode(CORNER);
    this.counter += 1;
  }
}
