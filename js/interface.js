/*class MenuButton {
constructor(x,y,w,h){
this.x=x;this.y=y;this.w=w;this.h=h;this.switch=false;
}

checkOverlap(){
return mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h;
}

update(){
overlapped = this.checkOverlap()
clicked = mouseIsPressed;
if (overlapped){
}
if (overlapped && clicked){
this.switch = true;
}
}

show(){
fill(255,255,100);
noStroke();
rect(this.x,this.y,this.w,this.h);
}

getSwitch(){
return this.switch;
}

}*/

class GUI {

  constructor(x,y,w,h,hero){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.health = hero.getAttributes()[0];
    this.maxhealth = this.health;
    this.magic = hero.getAttributes()[1];
    this.maxmagic = this.magic;
    this.ghostMode = false;
    this.ghostMeteropacity = 0;
  }

  update(hero){
    this.health = hero.getAttributes()[0];
    this.magic = hero.getAttributes()[1];
    this.maxhealth = hero.getMaxHealth();
    this.maxmagic = hero.getMaxMagic();
    this.ghostMode = hero.getGhostMode();
  }

  show(){
    noStroke();
    //-------HEALTH---------------------
    //bottom bar
    if (this.health < 2){
      fill(random(150,255),0,0);
    }else{
      fill(255,0,0);
    }
    rect(this.x,this.y,this.w,this.h);
    //top bar
    if(this.health > 0){
      fill(0,255,0);
      rect(this.x,this.y,this.health*this.w/this.maxhealth,this.h);
    }
    //---------MAGIC----------------------
    //bottom bar
    if(this.magic < 3){
      var col = random(30,60);
      fill(col,col,col);
    }
    else{
      fill(rgba(60,60,60,this.ghostMeteropacity));
    }
    rect(this.x,this.y+50,this.w,this.h);
    //top bar
    fill(rgba(255,255,255,this.ghostMeteropacity));
    rect(this.x,this.y+50,this.magic*this.w/this.maxmagic,this.h);
    if(this.ghostMode == true){
      if(this.ghostMeteropacity <= 1){
        this.ghostMeteropacity += 0.03;
      }
      if(this.ghostMeteropacity > 1){
        this.ghostMeteropacity = 1;
      }
    }
    if(this.ghostMode == false){
      if(this.magic == this.maxmagic){
        if(this.ghostMeteropacity > 0){
          this.ghostMeteropacity -= 0.03;
        }
        if(this.ghostMeteropacity <= 0){
          this.ghostMeteropacity = 0;
        }
      }
    }
    if(String(this.ghostMeteropacity).length > 20){
      this.ghostMeteropacity = 0;
    }


  }





}
