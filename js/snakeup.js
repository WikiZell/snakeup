
class SnakeUp {

    canvasData = {
        canvas: document.getElementById("snakeup"),
        context: document.getElementById("snakeup").getContext("2d")
    
    }

    playerData = {
        x : 320,
        y : 812,
        speed: 50,
        startingPoint:15      
    }

    

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

    playerMove(newPosition){
        let canvas = this.canvasData.canvas;
        //setBound        
        if(newPosition < (canvas.scrollWidth - 8) && newPosition > 8){
            this.playerData.x = newPosition;            
        }
        this.updateScreen()
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

function move(e) {
    let currentPosition = game.playerData.x,
        speed = game.playerData.speed;
	if(e.keyCode == 37) {
        game.playerMove( parseInt(currentPosition - speed) )
	}
	if(e.keyCode == 39) {        
        game.playerMove( parseInt(currentPosition + speed) )	
	}
	
}

document.onkeydown = move;