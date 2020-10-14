class Game{	
 	constructor(){
 		Game.c.beginPath()
		Game.c.fillStyle='black'
		Game.c.fillRect(0,0,cnv.width,cnv.height)
		this.q=0
		this.ball = new Ball
		this.board= new Board

		this.wall= new Wall
		this.wall.addData()

		this.ball.show()
		this.board.move()

		this.z=setInterval(()=>{


			Game.c.beginPath()
			Game.c.fillStyle='black'
			Game.c.fillRect(0,0,cnv.width,cnv.height)
			this.ball.update()
			this.board.show()

			this.wall.show()
			this.gameover()

			//baxum borardi het

			if(this.ball.y+10 >=this.board.y && this.ball.x>=this.board.x && this.board.x+100 >= this.ball.x){
				
				this.ball.vy =- this.ball.vy
			}

			// baxum

			for(let i=this.wall.arr.length-1; i>=0; i--){
		     	for(let j=0; j<this.wall.arr[i].length; j++){
		     		if(this.wall.arr[i][j].active==true &&
		     			this.wall.arr[i][j].x<=this.ball.x+10 &&
		     			this.wall.arr[i][j].x+70>=this.ball.x+10 && 
		     			this.wall.arr[i][j].y+15>=this.ball.y-10 &&
		     			this.wall.arr[i][j].y<=this.ball.y+10){
		     				
		     				this.wall.arr[i][j].active=false
		     				this.q++

		     				this.ball.vy=-this.ball.vy
		     		}
         		}
         	}
		     				
         	if(this.q==16){
         		clearInterval(this.z)
	 			Game.c.beginPath()
				Game.c.fillStyle='black'
				Game.c.fillRect(0,0,cnv.width,cnv.height)

	 			Game.c.font = "40px Georgia";
	 			Game.c.fillStyle='#ffffff'
	 			Game.c.fillText("You Won!!",180,300)
	 			Game.c.fill()

         	}
			
		},50)

 	}

 	gameover(){
 		if(this.ball.y+20 >  cnv.height){
	 		clearInterval(this.z)
	 		Game.c.beginPath()
			Game.c.fillStyle='black'
			Game.c.fillRect(0,0,cnv.width,cnv.height)

	 		Game.c.font = "40px Georgia";
	 		Game.c.fillStyle='#ffffff'
	 		Game.c.fillText("Game Over!!!",180,300)
	 		Game.c.fill()
	 	}
 	}

 }

 Game.c=cnv.getContext('2d')

 class Ball{
 	constructor(){
 		this.x=cnv.width/2
 		this.y=cnv.height-25
 		this.vx=10
 		this.vy=10
 		// this.vx=Math.round(Math.random()*20+10);
 		// this.vy=Math.round(Math.random()*20+10);

 	}
 	show(){
 		Game.c.beginPath();
 		Game.c.fillStyle = "white"
		Game.c.arc(this.x, this.y, 10, 0, 2 * Math.PI);
		Game.c.fill();
 	}
 	update(){
 		this.x+=this.vx
 		this.y-=this.vy
 		

 		if(this.x+10 >= cnv.width){
 			this.vx=-this.vx
	 	}
	 	if(this.x-10 <= 0){
	 		this.vx=- this.vx 
	 	}
	  	if (this.y-10 <= 0) {
	 		this.vy =- this.vy
	 	}
	 	
		this.show()
 	}
 }

 class Board{
 	constructor(){
 		this.x=230
 		this.y=cnv.height-20
 	}
 	show(){
 		Game.c.fillStyle="white"
 		Game.c.fillRect(this.x,this.y,100,10)
 	}
 	move(){
 		document.addEventListener('keydown',(e)=>{
 			if(e.key=='ArrowRight' && this.x+120 <= cnv.width){
				this.x+=20
				// console.log(this.x)
			}
			if(e.key=='ArrowLeft' && this.x > 20 ){
				this.x-=20
			}	
 		})
 	}
}

class Wall{
	constructor(){
		this.arr=[]
		this.column=4
		this.rows=4
		this.x=130
		this.y=30
		
	}
	addData(){

		for( let i=0;i<this.rows;i++){

			this.arr.push([])
			for(let j=0;j<this.column;j++){
				this.arr[i].push({x:this.x*j+70 ,y:this.y+30*i,active:true})
			}
		}
				console.log(this.arr)
	}

	show(){
		for(let i=0;i<this.arr.length;i++){
			for(let j=0;j<this.arr[i].length;j++){
				if(this.arr[i][j].active==true){
					Game.c.beginPath()
					Game.c.fillStyle='white'
					Game.c.fillRect(this.arr[i][j].x,this.arr[i][j].y,70,15 )
				}	
			}
		}
	}


}

new Game