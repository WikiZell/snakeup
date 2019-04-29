class Life {
    constructor(core) {
        this.core = core
        
        this.speed = this.core.SpeedElement;
        this.points = Math.floor(Math.random() * 10) + 1; //Points inside life    
        this.r = 16 //radius


        this.generateXY();

        //this.points = Math.floor(Math.random() * this.core.player.points + 5) + 1; //Points inside life
        
    }

    draw(ctx) {        
        ctx.beginPath();
        
        ctx.fillStyle = "#74f016";
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.fill();            
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(this.points, this.x, this.y+3);

        ctx.closePath();
    }

    generateXY(){       
        
        this.x = Math.floor(Math.random() * ((this.core.canvasProps.width - this.r) - this.r + 1) + this.r)
        this.y = -Math.abs(  Math.floor(Math.random() * 400) + 16   ) //set to -16 after debug

        /* if(this.checkCollisionWithBlocks()){
            console.log("Collision Detected in life")
            this.generateXY();
        } */
    }

    /* checkCollisionWithBlocks() {       
        for (let i = 0; i < this.core.blocks.length; i++) {
            let block = this.core.blocks[i]
            let circle={x:this.x,y:this.y,r:this.r};
            let rect={x:block.x,y:block.y,w:block.w,h:block.h};
            
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