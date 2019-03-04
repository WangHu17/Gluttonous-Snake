var content = document.getElementById('content');
var play = document.getElementById('play');
var scoreTop = document.getElementById('scoreTop');
var lose = document.getElementById('lose');
var scoreEnd = document.getElementById('score');
var close = document.getElementById('close');
var stopBtn = document.getElementById('stopBtn');
var startBool = true;
var stopBool = true;
var snakeMove;
var speed = 150;
init();
function init() {
	this.mapWith = parseInt(getComputedStyle(content).width);
	this.mapHeight = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
}
function startGame(){
	play.style.display = 'none';
	stopBtn.style.display = 'block';
	food();
	snake();
	bindEvent();
}
function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapWith/20));
	this.foodY = Math.floor(Math.random() * (this.mapHeight/20));
	food.style.left = this.foodX * 20 +'px';
	food.style.top = this.foodY *20 +'px';
	this.mapDiv.appendChild(food).setAttribute('class','food');
}
function snake(){
	for (var i = 0; i < this.snakeBody.length; i++) {
		var snake = document.createElement('div');	
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + 'px';
		snake.style.top = this.snakeBody[i][1] *20 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch(this.direct) {
			case 'right':
				snake.style.transform = 'rotate(90deg)';
				break;
			case 'up':
				break;
			case 'left':
				snake.style.transform = 'rotate(-90deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(180deg)';
				break;
			default:
				break;
		}
	}
}
function move(){
	for(var i = this.snakeBody.length-1; i > 0; i--){
		this.snakeBody[i][0] = this.snakeBody[i-1][0];
		this.snakeBody[i][1] = this.snakeBody[i-1][1];
	}
	switch(this.direct) {
		case 'right':
			this.snakeBody[0][0] +=1;
			break;
		case 'up':
			this.snakeBody[0][1] -=1;
			break;
		case 'left':
			this.snakeBody[0][0] -=1;
			break;
		case 'down':
			this.snakeBody[0][1] +=1;
			break;
		default:
			break;
	}
	removeClass('snake');
	snake();
	if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		switch(this.direct) {
			case 'right':
				this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);
				break;
			case 'up':
				this.snakeBody.push([snakeEndX,snakeEndY - 1,'body']);
				break;
			case 'left':
				this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);
				break;
			case 'down':
				this.snakeBody.push([snakeEndX,snakeEndY + 1,'body']);
				break;
			default:
				break;
		}
		this.score ++;
		scoreTop.innerHTML = this.score;
		removeClass('food');
		food();
	}
	if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapWith / 20){
		gameOver();
	}
	if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapHeight / 20){
		gameOver();
	}
	var snakeHeadX = this.snakeBody[0][0];
	var snakeHeadY = this.snakeBody[0][1];
	for(var i = 1; i < this.snakeBody.length; i ++){
		if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]){
			gameOver();
		}
	}
}
function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while (ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}
function bindEvent(){
	
	close.onclick = function(){
		lose.style.display = 'none';
		play.style.display = 'block';
	}
	
	stopBtn.onclick = function(){
		stopAndStart();
	}
}
play.onclick = function(){
		stopAndStart();
	}
function stopAndStart(){
	if(stopBool){
		if(startBool){
			startGame();
			startBool = false;
		}
		stopBtn.setAttribute('src','./images/begin.jpg');
		document.onkeydown = function(e){
			var code = e.keyCode;
			setDirect(code);
		}
		snakeMove = setInterval(function(){
			move();
		},speed);
		stopBool = false; 
	}else{
		stopBtn.setAttribute('src','./images/stop.jpg');
		clearInterval(snakeMove);
		document.onkeydown = function(e){
			e.returnValue = false;
			return false;
		}
		stopBool = true;
	}

}
function setDirect(code){
	switch(code) {
		case 37:
			if(this.left){
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if(this.up){
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if(this.right){
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if(this.down){
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
	}
}
function gameOver(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	lose.style.display = 'block';
	console.log(this.score);
	scoreEnd.innerHTML = this.score;
	this.score = 0;
	scoreTop.innerHTML = this.score;
	startBool = true;
	stopBool = true;
	stopBtn.style.display = 'none';
}