class Prompt {

  constructor(x,y,font=mainFont,color=255){
    this.x = x;
    this.y = y;
    this.fontsize = 50;
    this.font = font;
    this.color = color;
    this.lastCall = 0;
  }

  call(message){
    var now = millis();
    if (now - this.lastCall > 3000){
      return;
    }
    textAlign(CENTER);
    fill(this.color);
    textFont(this.font,this.fontsize);
    text(message,this.x,this.y);
  }
}
