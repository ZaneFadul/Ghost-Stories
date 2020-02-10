class Thing {

  constructor(x,y,w,h,color=100,property="collide",prompt = ""){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.property = property;
    this.prompt = prompt;
  }

  getx(){
    return this.x;
  }

  gety(){
    return this.y;
  }

  getw(){
    return this.w;
  }

  geth(){
    return this.h;
  }

  getproperty(){
    return this.property;
  }

  resize(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show(hero,ghost,enemyList=undefined,value=1){ //
    if (this.checkCollision(hero)){
      switch(this.property){
        case "decor":
        break;

        case "prompt":
        textSize(80);
        fill(255);
        text(this.prompt,width/2,height/2);
        break;

        case "collide":
        if(!hero.getGhostMode()){
          hero.setx(hero.getx() + (-3)*hero.getSpeed()[0]);
          hero.sety(hero.gety() + (-3)*hero.getSpeed()[1]);
        }
        break;

        case "ghostpassable":
        hero.setx(hero.getx() + (-3)*hero.getSpeed()[0]);
        hero.sety(hero.gety() + (-3)*hero.getSpeed()[1]);
        break;

        case "water":
        if(!hero.getGhostMode()){
          hero.setx(hero.getx() + (-2)*hero.getSpeed()[0]);
          hero.sety(hero.gety() + (-2)*hero.getSpeed()[1]);
        }
        break;

        case "lava":
        if(!hero.getGhostMode()){
          hero.setx(hero.getx() + (-2)*hero.getSpeed()[0]);
          hero.sety(hero.gety() + (-2)*hero.getSpeed()[1]);
        }
        hero.damage(value);
        break;

        case "damage":
        hero.damage(value);
        break;

        case "heal":
        hero.heal(value);
        break;

        case "revitalize":
        hero.maxHealth();
        hero.maxMagic();
      }
    }
    if (this.checkCollision(hero.getAttack())){
      switch(this.property){
        case "collide":
        hero.setAttackState(false);
        break;
      }
    }
    if (this.checkCollision(ghost)){
      switch(this.property){
        case "collide":
        ghost.setx(ghost.getx() + (-3)*ghost.getSpeed()[0]);
        ghost.sety(ghost.gety() + (-3)*ghost.getSpeed()[1]);
        break;

        case "addMagic":
        if(hero.getAttributes()[1] < hero.getMaxMagic() - 1){
          background("rgba(255,100,255,0.4)");
          hero.maxMagic();
          addmagic.play();
        }
        break;
      }
    }
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
    rectMode(CORNER);
    if(enemyList != undefined){
      for (var i = 0; i < enemyList.length; i++){
        if(this.checkCollision(enemyList[i])){
          switch(this.property){
            case "collide":
            enemyList[i].setx(enemyList[i].getx() + ((-1)*enemyList[i].speed)*enemyList[i].getSpeed()[0]);
            enemyList[i].sety(enemyList[i].gety() + ((-1)*enemyList[i].speed)*enemyList[i].getSpeed()[1]);
            break;
            case "ghostpassable":
            enemyList[i].setx(enemyList[i].getx() + ((-1)*enemyList[i].speed)*enemyList[i].getSpeed()[0]);
            enemyList[i].sety(enemyList[i].gety() + ((-1)*enemyList[i].speed)*enemyList[i].getSpeed()[1]);
            break;
          }
        }
      }
    }
  }

  checkCollision(hero){
    if(hero == undefined){
      return;
    }

    return hero.getx() + hero.getsize() > this.x - this.w/2 && hero.getx() < this.x + this.w/2 && hero.gety() + hero.getsize() > this.y - this.h/2 && hero.gety() < this.y + this.h/2;
  }
}
