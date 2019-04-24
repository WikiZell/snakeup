
class SnakeUp {





    constructor() {
        this.playerCreate(this.playerData);
    }


    gameStart(){
        
    }
  
    blocks() {
      //Generate blocks
    }

    lines() {
        //Generate lines
    }

    checkCollision(){

    }


    clearCanvas(){        
        let canvas = this.canvasData.context;        
        canvas.clearRect(0,0,this.canvasData.canvas.width,this.canvasData.canvas.height);
    }

    updateScreen() {
        this.clearCanvas();
        this.playerCreate(this.playerData);
    }


  
  }
  
  // Usage:
  let game = new SnakeUp();





  
    // Arrow keys


class Game {
    constructor() {
        this.player = new Player()
        this.blocks = []
        this.lines = []

        this.canvasData = {
            canvas: document.getElementById("snakeup"),
            context: document.getElementById("snakeup").getContext("2d")   
        }
    }

    subscribeBlock(block){

    }

    unsubscribeBlock(block){

    }

    subscribeLine(line){

    }

    unsubscribeLine(line){
        
    }

    generateRandomBlocks() {
        setInterval(()=> {
            new Block(this)
        }, 1000)
    }
}

class Player {
    constructor(game) {
        this.game = game
        document.onkeydown = this.move;
        this.x = 320,
        this.y = 812,
        this.speed = 20,
        this.startingPoint = 15      
        playerCreate(this)
    }

    playerCreate(playerData) {
        //Create player
        let x = playerData.x,
        y = playerData.y,
        player = this.canvasData.context,
        w = 16;       
                
        player.beginPath();
        player.fillStyle = "red";
        player.arc(x,y,w,0,Math.PI*2,false);
        player.fill();        
        player.font = '8pt Calibri';
        player.fillStyle = 'white';
        player.textAlign = 'center';
        player.fillText(this.playerData.startingPoint, x, y+3);
    }

    move(e) {
        let currentPosition = this.x,
            speed = this.speed;
        if(e.keyCode == 37) {
            this.playerMove( parseInt(currentPosition - speed) )
        }
        if(e.keyCode == 39) {        
            this.playerMove( parseInt(currentPosition + speed) )	
        }
        
    }
    playerMove(newPosition){
        let canvas = this.game.canvasData.canvas;
        //setBound        
        if(newPosition < (canvas.scrollWidth - 8) && newPosition > 8){
            this.x = newPosition;            
        }
    }

}

class Block {
    constructor(subject) {
        this.subject = subject
        subject.subscribeBlock(this)
    }
    unsubscribe() {
        this.subject.unsubscribeBlock(this)
    }
}

class Line{
    constructor(subject) {
        subject.subscribeLine(this)
    }
}

