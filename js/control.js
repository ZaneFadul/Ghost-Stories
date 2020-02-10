class ControlEngine {

  constructor(){
    this.inputList = [false,false,false,false,false,false];
    //[LEFT, RIGHT, UP, DOWN, Attack, Other]
  }

  checkPress(keyPressed){
    //A Button
    if(key == "a" || key =="A"){
      if(this.inputList[4] == false){
        this.inputList[4] = true;
      }
      else{
      this.inputList[4] = false;
    }
    }
    //D Button
    if(key == "d" || key =="D"){
      if(this.inputList[5] == false){
        this.inputList[5] = true;
      }
      else{
      this.inputList[5] = false;
    }
    }
    //LEFT_ARROW
    if(keyCode == LEFT_ARROW){ //if left is pressed
      this.inputList[0] = true;
    }
    //RIGHT_ARROW
    if(keyCode == RIGHT_ARROW){ //if right is pressed
      this.inputList[1] = true;
    }
    //UP_ARROW
    if(keyCode == UP_ARROW){ //if up is pressed
      this.inputList[2] = true;
    }
    //DOWN_ARROW
    if(keyCode == DOWN_ARROW){ //if down is pressed
      this.inputList[3] = true;
    }
    //this.inputList[4] = false;
    //this.inputList[5] = false;
  }

  checkRelease(key){
    if (key == "a"){
      console.log("released");
      this.inputList[4] = false;
    }
    if (key == "d"){
      this.inputList[5] = false;
    }
    //LEFT_ARROW
    if(keyCode == LEFT_ARROW){
      this.inputList[0] = false;
    }
    //RIGHT_ARROW
    if(keyCode == RIGHT_ARROW){
      this.inputList[1] = false;
    }
    //UP_ARROW
    if(keyCode == UP_ARROW){
      this.inputList[2] = false;
    }
    //UP_ARROW
    if(keyCode == DOWN_ARROW){
      this.inputList[3] = false;
    }
  }

  getList(){
    var toReturn = (this.inputList).slice();
    this.inputList[4] = false;
    this.inputList[5] = false;
    return toReturn;
  }
}
