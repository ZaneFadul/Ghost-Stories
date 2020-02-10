class LockedThing extends Thing {
  constructor(x,y,w,h,color="rgba(255,100,0,0.8)",property="lava"){
    super(x,y,w,h,color,property);
    this.unlocked = false;
    this.color = color;
  }

  unlock(){
    this.unlocked = true;
    unlocked.play();
    this.x = -111111111;
    this.y = -111111111;
  }
}
