class Enemy {

  constructor(x,y,health,value=1,color="rgb(230,0,0)",item="heal",lock=0,size=width/70,speed=1){
    this.x=x;
    this.y=y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.size = size;
    this.health = health;
    this.value = value;
    this.color = color;
    this.damageCooldown = 0;
    this.randomCounter = 0;
    this.detected = false;
    this.hero = false;
    this.item = item;
    this.lock = lock;
    this.dead = false;
    this.speed = speed;
  }

  show(hero,ghost){
    this.hero = hero;
    if(this.item instanceof Item){
      this.item.show(hero,ghost);
    }
    this.setSpeed();
    this.heroDetected(hero);
    this.x += this.speed*this.getSpeed()[0];
    this.y += this.speed*this.getSpeed()[1];
    if (this.checkCollision(hero)){
      hero.damage(this.value);
    }
    if (this.checkCollision(hero.getAttack())){
      this.damage();
      hero.setAttackState(false);
      //hurted sound effect
      if(this.health == 0){
        //deathSound effect
        this.x = 3000000;
        this.y = 3000000;
      }
    }
    if (this.checkCollision(ghost)){
      if(hero.getGhostMode() == true){
        hero.ghostOff();
      }
    }
    fill(this.color);
    noStroke();
    rect(this.x,this.y,this.size,this.size);
  }

  checkCollision(hero){
    return hero.getx() + hero.getsize() > this.x && hero.getx() < this.x + this.size && hero.gety() + hero.getsize() > this.y && hero.gety() < this.y + this.size;
  }

  setSpeed(){
    var now = millis();
    if (now - this.randomCounter < 400){
      return;
    }
    var inputList = [int(random(0,2)),int(random(0,2)),int(random(0,2)),int(random(0,2))];
    if(!this.detected){
      if (inputList[0] == 1){ //LEFT_ARROW
        this.xSpeed = -1;
      }
      if (inputList[1] == 1){ //RIGHT_ARROW
        this.xSpeed = 1;
      }
      if ((inputList[0] == 1 && inputList[1] == 1) || (inputList[0] == 0 && inputList[1] == 0)) { // if both left and right are pressed or none of them are
        this.xSpeed = 0;
      }
      if (inputList[2] == 1){ //UP_ARROW
        this.ySpeed = -1;
      }
      if (inputList[3] == 1){ //DOWN_ARROW
        this.ySpeed = 1;
      }
      if ((inputList[2] == 1 && inputList[3] == 1) || (inputList[2] == 0 && inputList[3] == 0)) { // if both left and right are pressed or none of them are
        this.ySpeed = 0;
      }
    }
    else{
      if(this.hero.getx() < this.x){
        this.xSpeed = -1;
      }
      if(this.hero.getx() > this.x){
        this.xSpeed = 1;
      }
      if(this.hero.gety() < this.y){
        this.ySpeed = -1;
      }
      if(this.hero.gety() > this.y){
        this.ySpeed = 1;
      }
      if(this.hero.getx() > this.x && this.hero.gety() > this.y && this.hero.gety()<this.y+this.size){
        this.xSpeed = 1;
        this.ySpeed = 0;
      }
      else if(this.hero.getx() < this.x && this.hero.gety() > this.y && this.hero.gety()<this.y+this.size){
        this.xSpeed = -1;
        this.ySpeed = 0;
      }
      if(this.hero.gety() < this.y && this.hero.getx() > this.x && this.hero.getx()<this.x+this.size){
        this.xSpeed = 0;
        this.ySpeed = -1;
      }
      else if(this.hero.gety() > this.y && this.hero.getx() > this.x && this.hero.getx()<this.x+this.size){
        this.xSpeed = 0;
        this.ySpeed = 1;
      }
    }
    //insert arena collisions
    this.randomCounter = now;
  }

  damage(){
    this.detected = true;
    if(this.health > 1){
      enemydamage.play();
      this.health -= 1;
    }
    else{
      enemykill.play();
      this.health -= 1;
      this.dead = true;
      if (this.item != undefined){
        if(this.item.property != "key"){
          this.item = new Item(this.x,this.y,this.item,this.lock);
        } else {
          this.item.x = this.x;
          this.item.y = this.y;
        }
      }
    }
    background(255,255,255);
    enemydamage.currentTime = 0;
  }

  getSpeed(){
    return [this.xSpeed,this.ySpeed];
  }

  getx(){
    return this.x;
  }

  gety(){
    return this.y;
  }

  getDead(){
    return this.dead;
  }

  getsize(){
    return this.size;
  }

  setx(x){
    this.x = x;
  }

  sety(y){
    this.y = y;
  }

  heroDetected(hero){
    if(this.checkCollisionRadius(hero)){
      this.detected = true;
    } else {
      this.detected = false;
    }
  }

  checkCollisionRadius(hero){
    return hero.getx() + hero.getsize()*10 > this.x - this.size/2 && hero.getx() - hero.getsize()*10 < this.x + this.size/2 && hero.gety() + hero.getsize()*10 > this.y - this.size/2 && hero.gety() - hero.getsize()*10 < this.y + this.size/2;
  }
}
