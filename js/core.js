class Core {
    constructor() {  
        
        this.score = 0
        this.SpeedElement = 2
        this.blocks = []
        this.lines = []
        this.lifes = []
        this.elements = [this.blocks,this.lifes]

        window.spawnRate = 120; // number of frames between spawns
        this.spawnCountdown = spawnRate;

        this.canvas = document.getElementById("snakeup"); 
        this.ctx = this.canvas.getContext('2d');
        this.canvasProps = {
            width:640,
            height:860,
            friction:0.8,
            gravity:0.6
          };      
          this.canvas.width = this.canvasProps.width;
          this.canvas.height = this.canvasProps.height;
        
        
        
        this.player = new Player(this)
        this.hud = new Hud(this)
        this.animationFrameId = []
        this.stopAnimation = false
        this.update();
    }

    update(){
        
        this.ctx.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height);
        
        this.draw(); //draw elements
        this.player.draw(this.ctx);
        this.hud.draw(this.ctx,"SCORE")
        if(!this.stopAnimation) {
          // alive
          requestAnimationFrame(this.update.bind(this))
        } else {
          // game over
          requestAnimationFrame(this.drawGameOver.bind(this))
        }
      }

    generateRandomBlocks() {
        //blocks
        if (this.blocks.length < 15) {
            
          if (this.spawnCountdown) {
            this.spawnCountdown -= 1;            
          } else {
            if (Math.random() > 0.1) {
              this.blocks.push(new Block(this));
            }  else {
              console.log("ROW BLOCK !");
              let newBlock = new Block(this);
              let randomGreen = Math.random() * (newBlock.xPosArr.length - 0) + 0;
              for (let i = 0; i <= newBlock.xPosArr.length; i++) {                
                let newBlocks = new Block(this);
                
                if(randomGreen == i){
                  newBlocks.points = this.player.points - 2
                }               

                newBlocks.y = -Math.abs(newBlocks.h);
                newBlocks.x = newBlocks.xPosArr[i];
                this.blocks.push(newBlocks);
              }
              
            } 
          }
        }
    }

    generateRandomLifes() {
        //life
        if (this.lifes.length < 20) {
          if (this.spawnCountdown) {
            this.spawnCountdown -= 1;
          } else {
            if (Math.random() > 0.2) {
              this.lifes.push(new Life(this));
            }            
            this.spawnCountdown = spawnRate;
          }
          
        }

    }

    draw(){      
      this.elementsCleanUp()
      this.generateRandomBlocks()
      this.generateRandomLifes()

        for (let i = 0; i < this.elements.length; i++) {

            if(Array.isArray(this.elements[i])){
                for (let j = 0; j < this.elements[i].length; j++) {
                    const element = this.elements[i][j];                                      
                    element.move();
                    if(this.behaviorCheck(element)){
                        this.elements[i].splice(j,1);
                    }
                    element.speed = this.SpeedElement;
                    element.draw(this.ctx);                    
                }
            }            
        }
    }

    behaviorCheck(element){
        
        let elementName = element.constructor.name;
        
        switch (elementName) {
            
          case "Block":
            
            //out Of screen: Object remove
            if (element.y > this.canvasProps.height) {
              //console.log(elementName+" went out of screen")
              return true;
          }

            //hit player: Block object remove / Player points decrease of block points / Score UP
            if(this.collisionCheck(this.player,element,"CircleSquare")){
                console.log("User lose LIFE !!!")
                
                if(this.player.points > element.points){
                  this.score += element.points;
                }

                this.player.points -= element.points;

                console.log("SCORE:",this.score)
                this.speedChange()
                this.checkLife()        
                return true;
            }

            break;

          case "Life":
            //Collision Check
            //hit player: Life object remove / Player points increase of life points
            if(this.collisionCheck(this.player,element,"CircleCircle")){
                console.log("Player gain LIFE !!!")
                this.player.points += element.points;                
                return true;
            }

            //out Of screen: Object remove
            if (element.y > this.canvasProps.height) {
                //console.log(elementName+" went out of screen")
                return true;
            }
            

            break;

          default:
            
          
            break;
        }

    }

    checkLife(){
      if(this.player.points <= 0){
        //this.player.points = 0;
        this.endGame();
      }
    }

    endGame(){
      //window.requestAnimationFrame()

      this.stopAnimation = true  
      this.drawGameOver()
    }
    drawGameOver() {
        this.hud.draw(this.ctx,"GAMEOVER") 
    }
    speedChange(){          
          
           if(this.SpeedElement < 12){

          console.log("SpeedUP !",this.SpeedElement)
          console.log("SCORE !",this.score)
          console.log("FRAMERATE:",window.spawnRate)
          
          if(this.score >= 60 && this.SpeedElement == 2){
            this.SpeedElement += 2
            window.spawnRate -= 10
            console.log("SpeedUP !",this.SpeedElement)
          }else if (this.score >= 120 && this.SpeedElement == 4){
            this.SpeedElement += 2  
            window.spawnRate -= 10
            console.log("SpeedUP !",this.SpeedElement)
          }else if (this.score >= 220 && this.SpeedElement == 6){
            this.SpeedElement += 2 
            window.spawnRate -= 10
          }else if (this.score >= 280 && this.SpeedElement == 8){
            this.SpeedElement += 2 
            window.spawnRate -= 10
          }else if (this.score >= 400 && this.SpeedElement == 10){
            this.SpeedElement += 2 
            window.spawnRate -= 10
          }
        
        }

    }

    

    elementsCleanUp(){       
        let collisionLifesIndex = []

        for (var i = 0; i < this.lifes.length; i++) {
          for (var j = 0; j < this.blocks.length; j++) {
            if(this.collisionCheck(this.lifes[i],this.blocks[j],"CircleSquare")){
                console.log("COLLISION BLOCKS / LIFE TO CLEAN !!")
                collisionLifesIndex.push(i)
            }            
          }
        }

        collisionLifesIndex.map((index)=>this.lifes.splice(index,1) )

        let collisionBlocksIndex = []

        for (var i = 1; i < this.blocks.length; i++) {
            
              if(this.collisionCheck(this.blocks[i],this.blocks[i-1],"SquareSquare")){
                  console.log("COLLISION BLOCKS TO CLEAN !!")
                  collisionBlocksIndex.push(i)
              }            
            
          }
        
          collisionBlocksIndex.map((index)=>this.blocks.splice(index,1) )
          
    }

    collisionCheck(elementA,elementB,type){

        switch (type) {
          case "CircleCircle":
            let a, x, y;

            let circleA = {
              x: elementA.x,
              y: elementA.y,
              r: elementA.r
            };

            let circleB = {
              x: elementB.x,
              y: elementB.y,
              r: elementB.r
            };

            a = circleA.r + circleB.r;
            x = circleA.x - circleB.x;
            y = circleA.y - circleB.y;

            if (a > Math.sqrt(x * x + y * y)) {
              return true;
            } else {
              return false;
            }
            break;

          case "CircleSquare":
            let circle = {
              x: elementA.x,
              y: elementA.y,
              r: elementA.r
            };

            let rect = {
              x: elementB.x,
              y: elementB.y,
              w: elementB.w,
              h: elementB.h
            };

            var distX = Math.abs(circle.x - rect.x - rect.w / 2);
            var distY = Math.abs(circle.y - rect.y - rect.h / 2);

            if (distX > rect.w / 2 + circle.r) {
              return false;
            }
            if (distY > rect.h / 2 + circle.r) {
              return false;
            }

            if (distX <= rect.w / 2) {
              return true;
            }
            if (distY <= rect.h / 2) {
              return true;
            }

            var dx = distX - rect.w / 2;
            var dy = distY - rect.h / 2;
            return dx * dx + dy * dy <= circle.r * circle.r;
            break;

          case "SquareSquare":
          
            let rectA = {
              x: elementA.x,
              y: elementA.y,
              w: elementA.w,
              h: elementA.h
            };

            let rectB = {
              x: elementB.x,
              y: elementB.y,
              w: elementB.w,
              h: elementB.h
            };

            return !(
              rectB.x > rectA.x + rectA.w ||
              rectB.x + rectB.w < rectA.x ||
              rectB.y > rectA.x + rectA.h ||
              rectB.y + rectB.h < rectA.y
            );

            break;

          default:
            break;
        }
    }

}

//Start Class
document.addEventListener('DOMContentLoaded', function(){

    (function(){
        let requestAnimationFrame = window.requestAnimationFrame || 
                                    window.mozRequestAnimationFrame || 
                                    window.webkitRequestAnimationFrame || 
                                    window.msRequestAnimationFrame;

        let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        
        window.requestAnimationFrame = requestAnimationFrame;

        window.cancelAnimationFrame = cancelAnimationFrame;
        let game = new Core()
      })()
    
}, false);
