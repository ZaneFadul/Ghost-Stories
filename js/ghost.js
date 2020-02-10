class Ghost extends Hero {

  constructor(hero){
    super(40000,40000);
    this.mode = false;
    this.outside = false;
    this.counter = 0;
  }

  update(hero,inputList){
    if (hero.ghostMode == true){
      if(this.outside == false){
        switch(hero.getFacing()){
          case "up":
          this.x = hero.getx();
          this.y = hero.gety() - 1.1*hero.getsize();
          break;
          case "down":
          this.x = hero.getx();
          this.y = hero.gety() + 1.1*hero.getsize();
          break;
          case "left":
          this.x = hero.getx() - 1.1*hero.getsize();
          this.y = hero.gety()
          break;
          case "right":
          this.x = hero.getx() + 1.1*hero.getsize();
          this.y = hero.gety();
          break;
          case "upleft":
          this.x = hero.getx() - 1.1*hero.getsize();
          this.y = hero.gety() - 1.1*hero.getsize();
          break;
          case "upright":
          this.x = hero.getx() + 1.1*hero.getsize();
          this.y = hero.gety() - 1.1*hero.getsize();
          break;
          case "downleft":
          this.x = hero.getx() - 1.1*hero.getsize();
          this.y = hero.gety() + 1.1*hero.getsize();
          break;
          case "downright":
          this.x = hero.getx() + 1.1*hero.getsize();
          this.y = hero.gety() + 1.1*hero.getsize();
          break;
        }
        this.outside = true;
      }
      this.mode = true;
      this.setSpeed(inputList);
      this.x += 3*this.getSpeed()[0];
      this.y += 3*this.getSpeed()[1];
    }
    else{
      this.outside = false;
      this.mode = false;
      this.x = 40000;
      this.y = 40000;
    }
  }

  show(){
    fill("rgba(255,255,255,0.5)");
    if(hero.getAttackState()){
      fill("rgba(255,255,255,0)");
    }
    rect(this.x,this.y,this.size,this.size);
  }
}
