class Game {
    constructor() {        
        this.blocks = []
        this.lines = []
        this.lifes = []
        this.elements = [this.blocks]
        this.canvasData = {
            canvas: document.getElementById("snakeup"),
            context: document.getElementById("snakeup").getContext("2d")   
        }
        this.SpeedElement = 3
        this.player = new Player(this)
        this.newBlocks = new Block(this)
        this.generateRandomElements()
    }

    clearCanvas(){        
        let canvas = this.canvasData.context;        
        canvas.clearRect(0,0,this.canvasData.canvas.width,this.canvasData.canvas.height);
        
    }

    updateScreen() {
        
        this.clearCanvas();
        this.player.playerCreate();
    }

    subscribeBlock(block){

    }

    unsubscribeBlock(block){

    }

    subscribeLine(line){

    }

    unsubscribeLine(line){
        
    }

    subscribeLife(life){
        
    }

    unsubscribeLife(life){
        
    }

    draw() {

        for(let i = 0; i < this.elements.length; i++) {
            let gameElement = this.elements[i]
            if(Array.isArray(gameElement) && gameElement != "undefined") {

                
                for(let j = 0; this.elements[i][j]; j++) {
                    //console.log(this.elements[i][j])

                    if(this.elements[i][j].y > this.canvasData.canvas.scrollHeight){
                        console.log();
                        this.elements[i].splice(j,1);
                    }
                    
                    this.elements[i][j].y += this.elements[i][j].speed
                    
                    this.elements[i][j].draw()
                }
            }/*  else {
                gameElement.draw()
            } */

        }
    }
    generateRandomElements() {
        let counter = 0;

        let requestAnimation

        const performAnimation = () => {
            requestAnimation = requestAnimationFrame(performAnimation)

            if(this.blocks.length < 6 ){
                this.blocks.push(new Block(this))
            }
            
            this.clearCanvas();
            this.player.playerCreate();
            this.draw();
            


            //animate something
            
            //Blocks generator
            //START OLD CODE
            /* if(this.blocks.length < 5 && (counter%80) == 0){

                if(Math.random() > 0.1) {
                    this.blocks.push( new Block(this) )
                } else {
                    for(let i = 0; i<5; i++ ) {
                        let newBlock = new Block(this)
                        newBlock.x = 128 * i
                        this.blocks.push(newBlock)
                    }
                }
            }

            //Lifes generator
            if(this.lifes.length < 7 && (counter%30) == 0){                
                this.lifes.push(new Life(this) )
            }
            
            //this.updateScreen()

            //Create lifes
            
            for (let i = 0; i < this.lifes.length; i++) {
                this.lifes[i].y += this.lifes[i].speed
                
                               
                if(this.lifes[i].y > this.canvasData.canvas.scrollHeight){
                    this.lifes.splice(i,1);
                }else{                                     
                    this.lifes[i].createLife(this.lifes[i])
                }
                
            }
            
            //Create Blocks            
            for (let i = 0; i < this.blocks.length; i++) {
                
                this.blocks[i].y += this.blocks[i].speed

                if(this.blocks[i].y > this.canvasData.canvas.scrollHeight){
                    this.blocks.splice(i,1);
                }else{                
                    this.blocks[i].createBlock(this.blocks[i])
                }
                
            }
            this.checkCollisionWithPlayer() */
            //END OLD CODE
            counter++
        }

        requestAnimationFrame(performAnimation,1000 / 60)
    }

    checkCollisionWithPlayer(){
        /* console.log(this.player)
        console.log(this.lifes) */
        //player hit life
        
        for (let i = 0; i < this.lifes.length; i++) {
            
            let a,x,y;
          
            a = 16 + 16;
            x = this.player.x - this.lifes[i].x;
            y = this.player.y - this.lifes[i].y;
          
            if (a > Math.sqrt((x * x) + (y * y))) {
                this.player.startingPoint = this.player.startingPoint + this.lifes[i].point
                this.lifes.splice(i,1); //remove Life

              return true;
            } else {
              return false;
            }
            
        }

    }
}

class Player {
    constructor(game) {
        this.game = game
        document.onkeydown = this.move;
        this.x = 320,
        this.y = 612,
        this.speed = 20,
        this.startingPoint = 15     
        this.playerCreate(this)
    }

    playerCreate() {
        let playerData = this

        let x = playerData.x,
        y = playerData.y,
        player = this.game.canvasData.context,
        w = 16;     
   
        player.beginPath();       

        player.fillStyle = "red";
        player.arc(x,y,w,0,Math.PI*2,false);        
        player.fill();

        player.font = '8pt Calibri';
        player.fillStyle = 'white';
        player.textAlign = 'center';
        player.fillText(playerData.startingPoint, x, y+3);
    }

    move = (e)=> {
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
        //game.updateScreen()
    }



}

class Block {
    constructor(game) {
        this.game = game
        //this.game.subscribeBlock(this)
      
        let xPosArr = [0,128,256,384,512]; //possible starting position X
        
        this.w = 128;
        this.h = 128;        
        
        //this.y = -Math.abs(this.w)
        

        this.speed = this.game.SpeedElement;
        this.point = Math.floor(Math.random() * this.game.player.startingPoint + 5) + 1; //Points inside life

        
        if (Math.random() == 0.3) {
            this.y = parseInt(-Math.abs(Math.random()*1000)+128)
            console.log(this.y)
          this.x = xPosArr[Math.floor(Math.random() * xPosArr.length)];
        } else {
            console.log("random 5")
          for (let i = 0; i < 5; i++) {
            this.y = -Math.abs(this.w)
            this.x = xPosArr[i];
            
          }
        }
        
    }

    draw() {
        let block = this.game.canvasData.context;
        
        block.beginPath();
        block.fillStyle = "blue";       
        block.fillRect(this.x, this.y, this.w, this.h);
        block.font = 'bold 28pt Arial';
        block.fillStyle = 'white';
        block.textAlign = 'center';
        block.fillText(this.point,this.x + (this.w/2),this.y + (this.h/2)+14);
        block.closePath();
    }

    /* createBlock(blockData) {
        let block = blockData.game.canvasData.context;
        
        //block.beginPath();
        block.fillStyle = "blue";       
        block.fillRect(blockData.x, blockData.y, blockData.w, blockData.h);
        block.font = 'bold 28pt Arial';
        block.fillStyle = 'white';
        block.textAlign = 'center';
        block.fillText(blockData.point,blockData.x + (blockData.w/2),blockData.y + (blockData.h/2)+14);
        
    } */

    unsubscribe() {
        this.subject.unsubscribeBlock(this)
    }
}

class Line{
    constructor(subject) {
        subject.subscribeLine(this)
    }
}


class Life{
    constructor(game) {
        this.game = game;
        game.subscribeLife(this);
        this.w = 16; //radius
        let min = this.w,
            max = (this.game.canvasData.canvas.scrollWidth - this.w);
            this.pickCoordinates()
            this.speed = this.game.SpeedElement;
            this.point = Math.floor(Math.random() * 10) + 1; //Points inside life        
    }

    pickCoordinates() {        
        this.x = Math.floor(Math.random() * ((this.game.canvasData.canvas.scrollWidth - this.w) - this.w + 1) + this.w) ,            
        this.y = -16; //set to -16 after debug
        console.log(this.checkCollisionWithBlocks())
        if(this.checkCollisionWithBlocks()) {
            this.pickCoordinates()
        }
    }

    createLife(lifeData){
           let life = lifeData.game.canvasData.context;
         
            //life.beginPath();
            life.fillStyle = "green";
            life.arc(lifeData.x,lifeData.y,lifeData.w,0,Math.PI*2,false);
            life.fill();            
            life.font = 'bold 13px Arial';
            life.fillStyle = 'white';
            life.textAlign = 'center';
            life.fillText(lifeData.point, lifeData.x, lifeData.y+3);      
                 
    }

    checkCollisionWithBlocks() {
        
        if(Array.isArray(this.game.blocks) && this.game.blocks.length == 0 ){
            
            return false;
        }

        let x = this.x,
            y = this.y,
            r = this.w;
        
        for (let i = 0; i < this.game.blocks.length; i++) {
            
            const block = this.game.blocks[i];

            var distX = Math.abs(x - block.x - block.w / 2);

            var distY = Math.abs(y - block.y - block.h / 2);

            if (distX > (block.w / 2 + r)) { return false; }
            if (distY > (block.h / 2 + r)) { return false; }

            if (distX <= (block.w / 2)) { return true; }
            if (distY <= (block.h / 2)) { return true; }

            var dx = distX - block.w / 2;
            var dy = distY - block.h / 2;
            return (dx * dx + dy * dy <= (r * r));
        }


    }
    
}


var game = new Game()