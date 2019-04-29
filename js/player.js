class Player {
    constructor(core) {
        this.core = core
        document.onkeydown = this.move;
        this.core.ctx.canvas.onmousemove = this.mouseMove;
        this.x = 320,
        this.y = 612,
        this.speed = 20,
        this.points = 15     
        this.r = 16 //radius
        console.log(core)
    }

    move = (e)=> {
        if(e.keyCode == 37) {            
            if( (this.x - this.speed) < (this.core.canvasProps.width - (this.r /2)) && this.x - this.speed > (this.r /2)){
                this.x -= this.speed;            
            }
        }

        if(e.keyCode == 39) {        
            if( (this.x + this.speed) < (this.core.canvasProps.width - (this.r /2)) && this.x + this.speed > (this.r /2)){
                this.x += this.speed;            
            }	
        }
        
    }

    mouseMove = (e) =>{
        if( e.layerX < (this.core.ctx.canvas.clientWidth - (this.r)) && e.layerX > (this.r)){
            this.x = e.layerX;            
        }
    }

    draw(ctx){ 
        
        ctx.beginPath();

        

        ctx.fillStyle = "#74f016";
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.fill();
        ctx.font = 'bold 13pt Calibri';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(this.points, this.x, this.y-(this.r+3));
        
        ctx.closePath();
    }
}