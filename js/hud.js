class Hud {
    constructor(core,action,message) {
        this.core = core;
        this.action = action;
        this.message = message;
        
    }

    draw(ctx,action){

        switch (action) {
            case "SCORE":
                ctx.beginPath();
                ctx.textAlign = "start";
                ctx.font = "30px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText(`SCORE: ${this.core.score}`, 10, 40);
                ctx.closePath();
                break;
            case "GAMEOVER":
                ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.font = "30px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText(`GAME OVER`, ctx.canvas.clientWidth/2, ctx.canvas.clientHeight/2);
                ctx.fillText(`SCORE: ${this.core.score}`, ctx.canvas.clientWidth/2, ctx.canvas.clientHeight/2 + 35);
                ctx.closePath();
                break;
        
            default:
                break;
        }
        
    }
}