class Hero {

  constructor(x,y,ghost=undefined){ //initializing hero with full health
    //initializing graphics
    this.x = x;
    this.y = y;
    this.size = width/90;
    this.color = 255;
    //initializing control variables
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.ghost = ghost;
    //initializing attributes
    this.attack = 0;
    this.maxhealth = 10;
    this.maxmagic = 10;
    this.health = this.maxhealth;
    this.magic = this.maxmagic;
    this.ghostMode = false;
    this.attackState = false;
    this.facing = "down";
    //counter variables for cooldown
    this.damageCooldown = 0;
    this.magicCooldown = 0;
    this.healCooldown = 0;
    this.refillCooldown = 0;
    this.attackCooldown = 0;
    //graphic cooldown
    this.attackAnimation = 0;
    this.graphicCooldown = 0;
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
  initializeAttack(attack){
    this.attack = attack;
  }
  initializeGhost(ghost){
    this.ghost = ghost;
  }
  update(inputList){
    if(this.isDead()){
      this.ghostMode = false;
    }
    if (!this.isDead()){
      this.setSpeed(inputList);
      //controls
      if (this.ghostMode == false){
        this.x += 3*this.getSpeed()[0];
        this.y += 3*this.getSpeed()[1];
        if (inputList[4] == true){
          this.attackStart();
        }
        if(this.magic != this.maxMagic){
          this.addMagic(1);
        }
      }
      //tests

      if (inputList[5] == true && this.ghostMode == false){
        if(this.magic == 10){
          this.ghostOn();
        }
      }
      if(this.ghostMode == true && this.checkCollision(this.ghost)){
        this.ghostOff();
      }
      /*else if (inputList[5] == true && this.ghostMode == true){
      this.ghostOff();
    }*/
  }
  if(this.ghostMode == true){
    this.ghostState(this.direction);
  }
}

show(){
  fill(this.color);
  if(!this.isDead()){
    if(this.ghostMode == true){
      var now = millis();
      if(now - this.graphicCooldown < 200){
        fill(this.r,this.g,this.b);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
        return;
      }
      this.r = random(140,255);
      this.g = random(140,255);
      this.b = random(240,255);
      fill(this.r,this.g,this.b);
      this.graphicCooldown = now;
    }
    this.attackstate();
    noStroke();
    if(this.attackState == true){
      fill("rgb(100,100,255)");
    }
    else{
      fill(255);
    }
    rect(this.x, this.y, this.size, this.size);
    if(this.ghostMode == false){
      switch(this.facing){
        case "left":
        ellipse(this.x,this.y+this.size/2,this.size/6);
        break;
        case "right":
        ellipse(this.x+this.size,this.y+this.size/2,this.size/6);
        break;
        case "up":
        ellipse(this.x+this.size/2,this.y,this.size/6);
        break;
        case "down":
        ellipse(this.x+this.size/2,this.y+this.size,this.size/6);
        break;
        case "upleft":
        ellipse(this.x,this.y,this.size/6);
        break;
        case "downleft":
        ellipse(this.x,this.y+this.size,this.size/6);
        break;
        case "upright":
        ellipse(this.x+this.size,this.y,this.size/6);
        break;
        case "downright":
        ellipse(this.x+this.size,this.y+this.size,this.size/6);
        break;
      }
    }
  }
}

//------------------SETTERS--------------------------
setSpeed(inputList){
  if (inputList[0] == true){ //LEFT_ARROW
    this.xSpeed = -1;
    this.facing = "left";
  }
  if (inputList[1] == true){ //RIGHT_ARROW
    this.xSpeed = 1;
    this.facing = "right";
  }
  if ((inputList[0] == true && inputList[1] == true) || (inputList[0] == false && inputList[1] == false)) { // if both left and right are pressed or none of them are
    this.xSpeed = 0;
  }
  if (inputList[2] == true){ //UP_ARROW
    this.ySpeed = -1;
    this.facing = "up";
  }
  if (inputList[3] == true){ //DOWN_ARROW
    this.ySpeed = 1;
    this.facing = "down";
  }
  if ((inputList[2] == true && inputList[3] == true) || (inputList[2] == false && inputList[3] == false)) { // if both left and right are pressed or none of them are
    this.ySpeed = 0;
  }
  if(this.xSpeed == -1 && this.ySpeed == -1){
    this.facing = "upleft";
  }
  if(this.xSpeed == 1 && this.ySpeed == -1){
    this.facing = "upright";
  }
  if(this.xSpeed == 1 && this.ySpeed == 1){
    this.facing = "downright";
  }
  if(this.xSpeed == -1 && this.ySpeed == 1){
    this.facing = "downleft";
  }
}


setCanGhost(value){
  this.canGhost = value;
}

setxSpeed(number){
  this.xSpeed = number;
}

setySpeed(number){
  this.ySpeed = number;
}

setx(number){
  this.x = number;
}

sety(number){
  this.y = number;
}

setMaxHealth(number){
  this.maxhealth = number;
  this.health = this.maxhealth;
}

setMaxMagic(number){
  this.maxmagic = number;
  this.magic = this.maxmagic;
}

setRoom(position){
  switch(position){
    case "up":
    this.setx(width/2);
    this.sety(5.5*height/12-2.8*height/8+width/100);
    break;
    case "down":
    this.setx(width/2);
    this.sety(5.5*height/12+2.6*height/8-width/100);
    break;
    case "left":
    this.setx(1.1*width/8 + 4);
    this.sety(5.5*height/12);
    break;
    case "right":
    this.setx(6.8*width/8 - 4);
    this.sety(5.5*height/12);
    break;
  }
}
//----------------------GETTERS-----------------------------
getSpeed(){
  return [this.xSpeed, this.ySpeed];
}

getColor(){
  return this.color;
}

getAttributes(){
  return [this.health, this.magic]
}

getMaxHealth(){
  return this.maxhealth;
}

getMaxMagic(){
  return this.maxmagic;
}

getGhostMode(){
  return this.ghostMode;
}

isDead(){
  return this.health <= 0;
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

getFacing(){
  return this.facing;
}

canGhost(){
  return this.canGhost;
}

//----------------------UTILITY-----------------------------
heal(number){
  var now = millis();
  if(now - this.healCooldown < 100){
    return;
  }
  if(this.health == this.maxhealth){
    return;
  }
  if(this.health + number > this.maxhealth){
    heal.play();
    background("rgba(210,255,210,0.1)");
    heal.currentTime = 0;
    this.health = this.maxhealth;
  }
  else if (this.health != this.maxhealth){
    heal.play();
    background("rgba(210,255,210,0.1)");
    this.health += number;
    heal.currentTime = 0;
  }
  this.healCooldown = now;
}

maxHealth(){
  this.health = this.maxhealth;
}

damage(number=1){
  if(!this.isDead()){
    var now = millis();
    if(now - this.damageCooldown < 1000){
      return;
    }
    damage.play();
    if(this.health > 0){
      this.health -= number;
    }
    background(255,0,0);
    this.color = "rgb(255,0,0)";
    damage.currentTime = 0;
    this.damageCooldown = now;
  }
  if(this.isDead()){
    if(this.ghostMode == true){
      this.ghostOff();
    }
    this.maxMagic();
  }
}

addMagic(number){
  var now = millis();
  if(now - this.refillCooldown < 100){
    return;
  }
  if(this.magic == this.maxmagic){
    return;
  }
  if (this.magic + number > this.maxmagic){
    this.magic = this.maxmagic;
  }
  else if (this.magic < this.maxmagic){
    this.magic += number;
  }
  this.refillCooldown = now;
}

maxMagic(){
  this.magic = this.maxmagic;
}

ghostOn(){
  this.attackState = false;
  this.ghostMode = true;
  ghostchange.play();
  ghostchange.currentTime = 0;
  background("rgba(255,255,255,0.2)");
}

ghostOff(){
  background("rgba(255,255,255,0.2)");
  this.magicCooldown = millis();
  ghostchange.play();
  metertick.pause();
  metertickurgent.pause();
  this.ghostMode = false;
  ghostchange.currentTime = 0;
}

ghostState(){
  var now = millis();
  fill("rgba(255,255,255,0.02)");
  rect(0,0,width,height);
  if(now - this.magicCooldown < 1000){
    return;
  }
  if(this.magic >= 4){
    metertick.play();
    metertickurgent.pause();
  }
  else if (this.magic < 4){
    metertickurgent.play();
  }
  this.magic -= 1;
  if(this.magic == 0){
    this.maxMagic();
    this.damage();
    this.ghostOff();
  }
  if(this.checkCollision(this.ghost)){
    this.ghostOff();
  }
  metertick.currentTime = 0;
  metertickurgent.currentTime = 0;
  this.magicCooldown = now;
}

attackStart(){
  var now = millis();
  if (now - this.attackCooldown < 900){
    return;
  }
  //attack
  this.attack.attackStart();
  attackaudio.play()
  attackaudio.currentTime = 0;
  this.attackState = true;
  this.attackCooldown = now;
}

attackstate(){
  var now = millis();
  this.color = "rgb(100,100,255)";
  if (now - this.attackAnimation < 500){
    return;
  }
  this.color = 255;
  this.attack.attack();
}

getAttackState(){
  return this.attackState;
}

getAttack(){
  return this.attack;
}

setAttackState(value){
  this.attackState = value;
}

checkCollision(hero){
  return hero.getx() + hero.getsize() > this.x && hero.getx() < this.x + this.size && hero.gety() + hero.getsize() > this.y && hero.gety() < this.y + this.size;
}

}
