class Arena{

  constructor(color,thingList,enemyList=[undefined]){
    this.x=width/2;
    this.y=5.5*height/12;
    this.w=5.4*height/4;
    this.h=3*height/4;
    this.color = color;
    this.thingList = thingList;
    this.enemyList = enemyList;
    this.arenalwall = new Thing(width/8, 5.5*height/12,width/50,3*height/4, 100);
    this.arenarwall = new Thing(7*width/8, 5.5*height/12,width/50,3*height/4, 100);
    this.arenaupwall = new Thing(width/2, 5.5*height/12-3*height/8+width/100,5.4*height/4,width/50, 100);
    this.arenadownwall = new Thing(width/2, 5.5*height/12+3*height/8-width/100,5.4*height/4,width/50, 100);
    if(this.enemyList == [undefined]){
      this.allEnemiesDead = true;
    } else{
      this.allEnemiesDead = false;
    }
  }

  getEnemiesDead(){
    return this.allEnemiesDead;
  }

  show(hero,ghost){
    rectMode(CENTER);
    fill(this.color);
    rect(this.x,this.y,this.w,this.h);
    rectMode(CORNER);
    this.arenalwall.show(hero,ghost,this.enemyList);
    this.arenarwall.show(hero,ghost,this.enemyList);
    this.arenaupwall.show(hero,ghost,this.enemyList);
    this.arenadownwall.show(hero,ghost,this.enemyList);
    for(var i = 0; i < this.thingList.length; i++){
      this.thingList[i].show(hero,ghost,this.enemyList);
    }
    for(var i = 0; i < this.enemyList.length; i++){
      if(this.enemyList[i] == undefined){
        return;
      }
      this.enemyList[i].show(hero,ghost);
      if(this.enemyList[i].getDead() == false){
        this.allEnemiesDead = false;
        continue;
      }
      this.allEnemiesDead = true;
    }
  }
}
