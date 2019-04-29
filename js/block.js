class Block {
    constructor(core) {
        this.core = core
        
        this.quantityForRow = 5;
        
        this.generateXYWH();
        

        this.points = Math.floor(Math.random() * (this.core.player.points -2) + 5) + 1; //Points inside life
        this.speed = this.core.SpeedElement;
    }

    draw(ctx) {        
        //ctx.beginPath();
        //ctx.fillStyle = "blue";       
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        
        
        this.r = 20;
    
        this.roundRect(ctx, this.x, this.y, this.w, this.h,20,true)
        



        ctx.font = 'bold 28pt Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(this.points,this.x + (this.w/2),this.y + (this.h/2)+14);
        ctx.closePath();
    }

    cubeColor(ctx){
        let playerPoints = this.core.player.points
        if(playerPoints > this.points){
            ctx.strokeStyle = "#74f016";
            ctx.fillStyle = "#74f016";
        }else{
            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
        }
    }

    roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == 'undefined') {
          stroke = true;
        }
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }

        this.cubeColor(ctx)

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
          ctx.fill();
        }
        if (stroke) {
          ctx.stroke();
        }
      
      }

    generateXYWH(){        
        let spacer = 2;
        let dimension = ((this.core.canvasProps.width - (spacer * (this.quantityForRow + 1)))) / this.quantityForRow;
        this.xPosArr = [];
        this.w = dimension
        this.h = dimension

        for (let i = 0; i < this.quantityForRow; i++) {
            if(i == 0){
                this.xPosArr.push( ( spacer ) )
            }else{
                this.xPosArr.push( ((i * dimension ) + spacer * i) + spacer )
            }
        }

        this.x = this.xPosArr[Math.floor(Math.random() * this.xPosArr.length)];
        this.y = -Math.abs(  dimension   )
        //this.y = -Math.abs(   (this.xPosArr[Math.floor(Math.random() * this.xPosArr.length)] )*3  )

        /* if(this.checkCollisionWithBlocks()){
            
            console.log("Collision Detected in Blocks")
            this.generateXYWH();
        } */

    }

    /* checkCollisionWithBlocks() {
        
        if(Array.isArray(this.core.blocks) && this.core.blocks.length == 0 ){
            
            return false;
        }

        
        
        for (let i = 0; i < this.core.lifes.length; i++) {
            let life = this.core.lifes[i]
            let circle={x:life.x,y:life.y,r:life.r};
            let rect={x:this.x,y:this.y,w:this.w,h:this.h};
            
            var distX = Math.abs(circle.x - rect.x-rect.w/2);
            var distY = Math.abs(circle.y - rect.y-rect.h/2);
        
            if (distX > (rect.w/2 + circle.r)) { return false; }
            if (distY > (rect.h/2 + circle.r)) { return false; }
        
            if (distX <= (rect.w/2)) { return true; } 
            if (distY <= (rect.h/2)) { return true; }
        
            var dx=distX-rect.w/2;
            var dy=distY-rect.h/2;
            return (dx*dx+dy*dy<=(circle.r*circle.r));
        }


    } */

    move(){
        this.y += this.speed;
    }

}