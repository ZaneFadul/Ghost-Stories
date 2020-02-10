class Item {

  constructor(x,y,property="heal",lock=0){
    this.x = x;
    this.y = y;
    this.size = width/130;
    this.property = property;
    switch(this.property){
      case "key":
      this.color = "rgb(200,200,200)";
      break;

      case "heal":
      this.color = "rgb(0,255,0)";
      break;

      case "addMagic":
      this.color = "rgb(100,100,255)";
      break;

      case "revitalize":
      this.color = "rgb(100,255,100)";
    }
    if(this.property == "key"){
      if(lock == 0){
        throw "need a lock object!";
      }
      this.lock = lock;
    }
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

  setcoords(x,y){
    this.x = x;
    this.y = y;
  }

  show(hero,ghost,enemyList=undefined,value=1){
    if (this.checkCollision(hero)){
      switch(this.property){
        case "key":
        this.lock.unlock();
        this.setcoords((-1)*width,(-1)*height);
        break;

        case "heal":
        if(hero.getAttributes()[0] != hero.getMaxHealth()){
          hero.heal(value);
          this.setcoords((-1)*width,(-1)*height);
        }
        break;

        case "addMagic":
        hero.maxMagic();
        this.setcoords((-1)*width,(-1)*height);
        break;

        case "revitalize":
        hero.maxHealth();
        hero.maxMagic();
        this.setcoords((-1)*width,(-1)*height);
        break;
      }
    }
    if (this.checkCollision(ghost)){
      switch(this.property){
        case "key":
        this.setcoords((-1)*width,(-1)*height);
        this.lock.unlock();
        break;

        case "heal":
        if(hero.getAttributes()[0] != hero.getMaxHealth()){
          hero.heal(value);
          this.setcoords((-1)*width,(-1)*height);
        }
        break;

        case "addMagic":
        hero.maxMagic();
        this.setcoords((-1)*width,(-1)*height);
        break;

        case "revitalize":
        hero.maxHealth();
        hero.maxMagic();
        this.setcoords((-1)*width,(-1)*height);
        break;
      }
    }
    fill(this.color);
    if (this.property == "heal"){
      if(hero.getAttributes()[0] == hero.getMaxHealth()){
        fill("rgba(0,255,0,0.1)");
      }
    }
    noStroke();
    rectMode(CENTER);
    if(this.property == "key"){
      triangle(this.x - this.size/2,this.y+this.size/2,this.x + this.size/2,this.y + this.size/2,this.x,this.y - this.size/2);
    }
    else{
      ellipse(this.x,this.y,this.size);
    }
    rectMode(CORNER);
  }

  checkCollision(hero){
    return hero.getx() + hero.getsize() > this.x - this.size/2 && hero.getx() < this.x + this.size/2 && hero.gety() + hero.getsize() > this.y - this.size/2 && hero.gety() < this.y + this.size/2;
  }
}
