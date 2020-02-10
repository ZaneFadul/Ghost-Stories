class Clickable {

  constructor(x,y,w,h,color,highlight,colorOutline){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.highlight = highlight;
    this.colorOutline = color;
    this.clicked = false;
  }

  show(){
    if (this.checkHover()){
      fill(this.highlight);
      if(mouseIsPressed){
        this.clicked = true;
      }
    }
    else{
      fill(this.color);
    }
    strokeWeight(4);
    stroke(this.colorOutline);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
    fill(0);
    textSize(30);
    textAlign(CENTER,CENTER);
    text("start",this.x,this.y);
    noStroke();
    rectMode(CORNER);
  }

  checkHover(){
    return mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2;
  }

  getClicked(){
    var toReturn = this.clicked;
    this.clicked = false;
    return toReturn;
  }
}
