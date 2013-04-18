//////////////////////////////////////////////////////
// Group members: Zi Wang (ziw), Bingying Xia(bxia) //
//////////////////////////////////////////////////////

var canvasID = "myCanvas";
var CANVAS_WIDTH = 510;
var CANVAS_HEIGHT = 510;
var canvas = document.getElementById(canvasID);
var ctx = canvas.getContext("2d");

// game grid
var GRID_WIDTH = 30;
var GRID_HEIGHT = 30;
var WALL_WIDTH = 3;
var numRows = CANVAS_WIDTH/GRID_HEIGHT;
var numCols = CANVAS_HEIGHT/GRID_WIDTH;

// colors for UI & Pacman
var BG_COLOR = "black";
var BORDER_COLOR = "blue";
var BEAN_COLOR = "white";
var PACMAN_COLOR = "yellow";

// colors for ghost
var RED = "red";
var PINK = "#ff9cce";
var CYAN = "#00ffde";
var ORANGE = "#ffb847";
var WEAK_COLOR = "#0031ff";
var BLINKING_COLOR = "white";

// size of sprites
var NORMAL_BEAN_RADIUS = 2;
var POWER_BEAN_RADIUS = 5;
var PACMAN_RADIUS = 9;
var GHOST_RADIUS = 9;

// directions
var UP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;


// game parameters
var intervalId;
var restartTimer = 0;
var timerDelay = 80;
var speed = 5;
var score = 0;
var lives = [];
var MAX_LIFE = 3;
var life = MAX_LIFE;
var weakBonus = 200;
var MAX_BEANS = 136;
var beansLeft = MAX_BEANS;
var weakCounter;
var WEAK_DURATION = 10000/timerDelay;


//bean cases
var NORMAL_BEAN = 1
var POWER_BEAN = 2;

//spirtes instances
var welcomePacman;
var welcomeBlinky;
var welcomeInky;
var mrPacman;
var blinky;
var inky;
var pinky;
var clyde;
var ghosts;

//game state and map
var gameOn = false;
var gamePaused = false;
var maze = new Array(CANVAS_HEIGHT/GRID_HEIGHT);
var mazeContent = [
//row1
[LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_ONLY, TOP_BOTTOM,
 TOP_BOTTOM, TOP_BOTTOM, RIGHT_TOP, LEFT_TOP, TOP_ONLY,
 TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY,
 TOP_ONLY, RIGHT_TOP],
//row2
[LEFT_RIGHT, BOTTOM_LEFT_TOP, RIGHT_TOP, LEFT_RIGHT, LEFT_TOP,
 TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_BOTTOM, BOTTOM_ONLY,
 BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, EMPTY_GRID,
 EMPTY_GRID, RIGHT_ONLY],
//row3
[LEFT_BOTTOM, RIGHT_TOP, LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT,
 BOTTOM_LEFT_TOP, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM, TOP_BOTTOM,
 TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, RIGHT_TOP, LEFT_ONLY, 
 EMPTY_GRID, RIGHT_ONLY],
//row4
[CLOSED_GRID, LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT, LEFT_BOTTOM, 
 TOP_BOTTOM, RIGHT_TOP, LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM,
 TOP_BOTTOM, TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_ONLY,
 EMPTY_GRID, RIGHT_ONLY],
//row5
[LEFT_TOP, RIGHT_BOTTOM, LEFT_RIGHT, LEFT_BOTTOM, TOP_ONLY, 
 TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_ONLY, TOP_BOTTOM, TOP_BOTTOM,
 TOP_BOTTOM, TOP_ONLY, TOP_BOTTOM, RIGHT_BOTTOM, LEFT_ONLY,
 EMPTY_GRID, RIGHT_ONLY],
//row6
[LEFT_RIGHT, BOTTOM_LEFT_TOP, BOTTOM_ONLY, TOP_RIGHT_BOTTOM, LEFT_RIGHT,
 BOTTOM_LEFT_TOP, RIGHT_BOTTOM, LEFT_RIGHT, LEFT_TOP, TOP_BOTTOM,
 RIGHT_TOP, LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM, BOTTOM_ONLY, 
 BOTTOM_ONLY, RIGHT_BOTTOM],
//row7
[LEFT_ONLY, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, BOTTOM_ONLY, 
 TOP_BOTTOM, TOP_BOTTOM, RIGHT_ONLY, LEFT_RIGHT, LEFT_TOP_RIGHT, 
 LEFT_RIGHT, LEFT_ONLY, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM,
 TOP_BOTTOM, RIGHT_TOP],
//row8
[LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM,
 TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT, 
 LEFT_RIGHT, LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM,
 TOP_RIGHT_BOTTOM, LEFT_RIGHT],
//row9
[LEFT_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, TOP_ONLY,
 TOP_BOTTOM, TOP_BOTTOM, RIGHT_ONLY, LEFT_RIGHT, LEFT_RIGHT, 
 LEFT_RIGHT, LEFT_ONLY, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM,
 TOP_BOTTOM, RIGHT_ONLY],
//row10
[LEFT_TOP, TOP_ONLY, TOP_ONLY, RIGHT_TOP, LEFT_RIGHT, 
 BOTTOM_LEFT_TOP, TOP_RIGHT_BOTTOM, LEFT_RIGHT, RIGHT_BOTTOM_LEFT, LEFT_RIGHT,
 RIGHT_BOTTOM_LEFT, LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM,
 TOP_RIGHT_BOTTOM, LEFT_RIGHT],
//row11
[LEFT_ONLY, EMPTY_GRID, EMPTY_GRID, RIGHT_ONLY, LEFT_ONLY,
 TOP_BOTTOM, TOP_BOTTOM, BOTTOM_ONLY, TOP_ONLY, BOTTOM_ONLY, 
 TOP_BOTTOM, BOTTOM_ONLY, TOP_ONLY, TOP_BOTTOM, TOP_BOTTOM,
 TOP_BOTTOM, RIGHT_ONLY],
//row12
[LEFT_ONLY, EMPTY_GRID, EMPTY_GRID, RIGHT_ONLY, LEFT_RIGHT, 
 BOTTOM_LEFT_TOP, TOP_BOTTOM, RIGHT_TOP, LEFT_RIGHT, BOTTOM_LEFT_TOP,
 TOP_BOTTOM, RIGHT_TOP, LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM,
 RIGHT_TOP, LEFT_RIGHT],
//row13
[LEFT_ONLY, EMPTY_GRID, EMPTY_GRID, RIGHT_ONLY, LEFT_ONLY,
 TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_ONLY, TOP_BOTTOM,
 TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_ONLY, TOP_BOTTOM, RIGHT_TOP,
 LEFT_RIGHT, LEFT_RIGHT],
//row14
[LEFT_ONLY, EMPTY_GRID, EMPTY_GRID, RIGHT_ONLY, LEFT_RIGHT, 
 LEFT_TOP, TOP_BOTTOM, RIGHT_BOTTOM, LEFT_RIGHT, BOTTOM_LEFT_TOP,
 TOP_BOTTOM, RIGHT_ONLY, LEFT_RIGHT, LEFT_TOP_RIGHT, LEFT_RIGHT, 
 LEFT_RIGHT, LEFT_RIGHT],
//row15
[LEFT_ONLY, EMPTY_GRID, EMPTY_GRID, RIGHT_ONLY, LEFT_RIGHT, 
 LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM,
 TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT,
 LEFT_RIGHT, LEFT_RIGHT],
//row16
[LEFT_ONLY, EMPTY_GRID, EMPTY_GRID, RIGHT_ONLY, LEFT_RIGHT,
 LEFT_BOTTOM, TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, BOTTOM_LEFT_TOP,
 TOP_BOTTOM, RIGHT_BOTTOM, LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT,
 RIGHT_BOTTOM_LEFT, LEFT_RIGHT],
//row17
[LEFT_BOTTOM, BOTTOM_ONLY, BOTTOM_ONLY, RIGHT_BOTTOM, LEFT_BOTTOM,
 TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, BOTTOM_ONLY, TOP_BOTTOM, 
 TOP_BOTTOM, TOP_BOTTOM, RIGHT_BOTTOM, RIGHT_BOTTOM_LEFT, LEFT_BOTTOM,
 TOP_BOTTOM, RIGHT_BOTTOM]
];

// grids that don't redraw
var staticGrids = [];
var staticGridsIndex = 0;


// start location of pacman
var pacmanStartLoc = [4,9];

// grids with no beans
var noBean = [pacmanStartLoc,[5,12],[5,13],[5,3],[9,5],[9,6],[1,1],[5,1],[3,0],[2,4],[4,6],[5,6],[5,5],[12,7],[14,5],[12,11],[14,11]];
var noBeanIndex=noBean.length;


// power beans in maze
var powerBeans = [[0,0], [2,13], [16,4], [16,16], [2,5], [14,10]];


// ghost house
var ghostHouse = [];
var ghostHouseIndex = 0;
/*======================END GLOBAL VARs====================*/


/*====================Initialization Methods==============*/

function initCanvas(width, height){
	if(width===undefined || !(width instanceof Number)){
		width = CANVAS_WIDTH;
	}
	if(height===undefined || !(height instanceof Number)){
		height = CANVAS_HEIGHT;
	}

	ctx.fillStyle = "black";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

// draw maze, print instruction on lower-left corner, show lives on top-right corner
function initMaze(){
	for(var i=0; i<maze.length; i++){
		var oneRow = new Array(CANVAS_WIDTH/GRID_WIDTH);
		maze[i] = oneRow;
	}

	// draw maze with full beans
	for( var row = 0; row < CANVAS_HEIGHT/GRID_HEIGHT; row++){
		for(var col = 0; col < CANVAS_WIDTH/GRID_WIDTH; col++){
			var beanType = NORMAL_BEAN;
			var newGrid = new Grid(col*GRID_WIDTH,row*GRID_HEIGHT , mazeContent[row][col],beanType);
			
			maze[row][col] = newGrid;
			newGrid.draw();
		}
	}

	//overwrite beans that shouldn't ecist
	for(var i=0; i<noBean.length; i++){
		var x = noBean[i][0];
		var y = noBean[i][1];
		maze[x][y].beanType = undefined;
		maze[x][y].draw();
	}

	// draw power beans
	for(var i=0; i<powerBeans.length;i++){
		var x = powerBeans[i][0];
		var y = powerBeans[i][1];
		maze[x][y].beanType = POWER_BEAN;
		maze[x][y].draw();
	}

}


function initFields () {
	// body...
	for (var i=6; i<10; i++){
		ghostHouse[ghostHouseIndex]=[i,9];
		ghostHouseIndex++;
	}


	//fill up staticGrids[]
	for (var i=0; i<2; i++){
		for (var j=8; j<17; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}
	for (var i=9; i<17; i++){
		for (var j=0; j<4; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}
	for (var i=2; i<6; i++){
		for (var j=14; j<17; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}

	//fill up noBean[]
	for(var i=0; i<2; i++){
		for(var j=8; j<17; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for(var i=2; i<6; i++){
		for(var j=14; j<17; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for(var i=9; i<17; i++){
		for(var j=0; j<4; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for (var i=1; i<6; i++){
		noBean[noBeanIndex]=[i,2];
		noBeanIndex++;
	}
	for(var i=1; i<4; i+=2){
		for(var j=4; j<7; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for (var j=8; j<13; j++){
		noBean[noBeanIndex]=[3,j];
		noBeanIndex++;
	}
	for (var j=1; j<7; j++){
		noBean[noBeanIndex]=[7,j];
		noBeanIndex++;
	}
	for (var i=5; i<10; i++){
		for(var j=8; j<11; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for (var j=12; j<16; j++){
		noBean[noBeanIndex]=[7,j];
		noBeanIndex++;
	}
	for (var j=12; j<16; j++){
		noBean[noBeanIndex]=[9,j];
		noBeanIndex++;
	}
	for(var i=11; i<16; i+=2){
		for(var j=5; j<8; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for(var i=11; i<16; i+=2){
		for(var j=9; j<12; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for(var j=13; j<16; j++){
		noBean[noBeanIndex]=[11, j];
		noBeanIndex++;
	}
	for(var i=12; i<16; i++){
		noBean[noBeanIndex]=[i, 15];
		noBeanIndex++;
	}
	for(var i=13; i<17; i++){
		noBean[noBeanIndex]=[i, 13];
		noBeanIndex++;
	}
}
/*================END Initialization Methods==============*/


/*====================Util Methods================*/
//draw a circle
function circle(ctx, cx, cy, radius) {

	ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    ctx.fill();

}

//get opposite direction
function oppositeDir (dir) {
	switch(dir){
		case UP:
		return DOWN;
		break;

		case DOWN:
		return UP;
		break;

		case LEFT:
		return RIGHT;
		break;

		case RIGHT:
		return LEFT;
		break;

		default:
		return -1;//err
	}
}

function getRowIndex (yCord) {
	if(yCord === undefined){
		return -1;//err
	}
	return parseInt(yCord/GRID_HEIGHT);
}


function getColIndex (xCord) {
	if(xCord === undefined){
		return -1;//err
	}
	return parseInt(xCord/GRID_WIDTH);
}

function sleep(ms)
{
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
}

function fixGrids (x, y) {
	var row = getRowIndex(y);
	var col = getColIndex(x);

	if(xOnGridCenter(y)){
 		maze[row][col].draw();
 		if(col+1 < maze.length && !staticArrayContains([row, col+1])){
 			maze[row][col+1].draw();
 		}
 		if(col-1 >= 0 && !staticArrayContains([row, col-1])){
 			maze[row][col-1].draw();
 		}
 	}
 	else if(yOnGridCenter(x)){
 		maze[row][col].draw();
 		if(row+1 < maze.length  && !staticArrayContains([row+1, col])){
 			maze[row+1][col].draw();
 		}
 		if(row-1 >=0 && !staticArrayContains([row-1,col]) ){
 			maze[row-1][col].draw();
 		}
 	}
}

function staticArrayContains(cord) {
	var x = cord[0];
	var y = cord[1];
	for(var i=0; i< staticGrids.length; i++ ){
		if(x=== staticGrids[i][0] &&
			y=== staticGrids[i][1]){
			return true;
		}
	}
	return false;
}

function ghostHouseContains(cord) {
	var x = cord[0];
	var y = cord[1];
	for(var i=0; i< ghostHouse.length; i++ ){
		if(x=== ghostHouse[i][0] &&
			y=== ghostHouse[i][1]){
			return true;
		}
	}
	return false;
}

function onGridCenter (x,y) {
	return xOnGridCenter(y) && yOnGridCenter(x);
}

function xOnGridCenter (y) {
	return ((y - GRID_WIDTH/2) % GRID_WIDTH) === 0;
}

function yOnGridCenter (x) {
	return ((x - GRID_HEIGHT/2) % GRID_HEIGHT) === 0;
}

//see if sprite can move one more step at the given (x,y) facing the given direction
function canMove (x,y,dir) {
	if(!onGridCenter(x,y)){
		return true;
	}
	var canMove = false;
	var currGrid = maze[getRowIndex(y)][getColIndex(x)];
	var gridType = currGrid.gridType;
	switch(dir){
		case UP:
		if(gridType != LEFT_TOP && gridType != RIGHT_TOP && gridType != TOP_BOTTOM
			&& gridType != TOP_ONLY && gridType!= LEFT_TOP_RIGHT 
			&& gridType != TOP_RIGHT_BOTTOM && gridType!= BOTTOM_LEFT_TOP){
			canMove = true;
		}
		break;

		case DOWN:
		if(gridType != LEFT_BOTTOM && gridType != TOP_BOTTOM && gridType != RIGHT_BOTTOM
			&& gridType != BOTTOM_ONLY && gridType!= RIGHT_BOTTOM_LEFT
			&& gridType != BOTTOM_LEFT_TOP && gridType!= TOP_RIGHT_BOTTOM){
			canMove = true;
		}
		break;

		case LEFT:
		if(gridType != LEFT_BOTTOM && gridType != LEFT_TOP && gridType != LEFT_ONLY
			&& gridType != LEFT_RIGHT && gridType!= LEFT_TOP_RIGHT
			&& gridType != BOTTOM_LEFT_TOP && gridType!= RIGHT_BOTTOM_LEFT){
			canMove = true;
		}
		break;

		case RIGHT:
		if(gridType != RIGHT_BOTTOM && gridType != RIGHT_TOP && gridType != RIGHT_ONLY
			&& gridType != LEFT_RIGHT && gridType!= RIGHT_BOTTOM_LEFT 
			&& gridType != TOP_RIGHT_BOTTOM && gridType != LEFT_TOP_RIGHT){
			canMove = true;
		}
		break;
		default:
		break;


	}
	return canMove;
}
/*=================END Util Methods================*/


/*=================UI Update Methods===============*/

// draw instructions
function printInstruction () {
	ctx.fillStyle = "white";
	ctx.font="12px monospace";
	ctx.textAlign = "left";

	var txt = "WELCOME TO \nPACMAN 15-237!\n\n\nArrow keys or\nWASD to move\n\nQ to pause\nE to resume\nR to restart";
	var x = 12;
	var y = CANVAS_HEIGHT-200;
	var lineheight = 15;
	var lines = txt.split('\n');

	for (var i = 0; i<lines.length; i++)
	    ctx.fillText(lines[i], x, y + (i*lineheight) );

	if (ghosts.length === 0){
		ctx.fillStyle = "black";
		ctx.fillRect(x, CANVAS_WIDTH-40, 70, 30);
		ctx.fillStyle = "red";
		ctx.font = "16px monospace";
		ctx.textAlign = "left";
		ctx.fillText("GOD MODE", x, CANVAS_WIDTH-20);
	}

}

//draw lives on top-right corner
function showLives(){
	ctx.fillStyle="black";
	ctx.fillRect(CANVAS_WIDTH-80, 10, 70, 30);
	for(var i=0; i<life-1; i++){
		lives[i] = new Pacman(CANVAS_WIDTH-50+25*i, 30, RIGHT);
		lives[i].draw();
	}

}

//show welcome screen
function welcomeScreen(){

	gameOn = false;
	gamePaused = false;
	// welcome text
	ctx.fillStyle = "white";
	ctx.font = "80px monospace";
	ctx.textAlign = "center";
	ctx.fillText("PACMAN", CANVAS_WIDTH/2, 170);
	ctx.font = "20px monospace";
	ctx.fillText("Press s to start", CANVAS_WIDTH/2, 220);
	ctx.font = "14px monospace";
	ctx.fillText("DEVELOPED BY: ZI WANG, BINGYING XIA", CANVAS_WIDTH/2 , CANVAS_HEIGHT/20*19);

	welcomePacman = new Pacman(CANVAS_WIDTH/5, CANVAS_HEIGHT/3*2, RIGHT);
	welcomePacman.radius = 30;
	welcomePacman.draw();

	welcomeBlinky = new Ghost(CANVAS_WIDTH/5*3.3, CANVAS_HEIGHT/3*2, RED, LEFT);
	welcomeBlinky.radius = 30;
	welcomeBlinky.draw();

	welcomeInky = new Ghost(CANVAS_WIDTH/5*4, CANVAS_HEIGHT/3*2, CYAN, RIGHT);
	welcomeInky.radius = 30;
	welcomeInky.draw();
	intervalId = setInterval(updateWelcomeScreen, timerDelay*2);
}

//welcome screen animation
function updateWelcomeScreen () {
	ctx.fillStyle = "black";
	ctx.fillRect(0, CANVAS_HEIGHT/2, CANVAS_WIDTH,140);
	welcomePacman.mouthOpen = !welcomePacman.mouthOpen;
	welcomeBlinky.isMoving = !welcomeBlinky.isMoving;
	welcomeInky.isMoving = !welcomeInky.isMoving;
	welcomePacman.draw();
	welcomeInky.draw();
	welcomeBlinky.draw();
}


//show || update score
function showScore(){
	ctx.fillStyle="black";
	ctx.fillRect(CANVAS_WIDTH-250, 10, 190, 40);
	ctx.fillStyle = "white";
	ctx.font = "24px monospace";
	ctx.textAlign = "left";
	ctx.fillText("score: " + parseInt(score), CANVAS_WIDTH-250, 37);
}

//show win message
function winMessage(){
	//draw popup
	ctx.fillStyle = "black";
	ctx.strokeStyle = "green";
	ctx.lineWidth=5;
	ctx.fillRect(CANVAS_WIDTH/2-150, CANVAS_HEIGHT/2-40, 300, 100);
	ctx.strokeRect(CANVAS_WIDTH/2-150, CANVAS_HEIGHT/2-40, 300, 100);

	//write message
	ctx.textAlign="center";
	ctx.fillStyle = "white";
	ctx.font = "16px monospace";
	ctx.fillText("Congratulations, you won!", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+6);
	ctx.font = "12px monospace";
	ctx.fillText("press R to play again", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+28);
}

//show lose message
function loseMessage(){
	//draw popup
	ctx.fillStyle = "black";
	ctx.strokeStyle = "red";
	ctx.lineWidth=5;
	ctx.fillRect(CANVAS_WIDTH/2-100, CANVAS_HEIGHT/2-40, 200, 100);
	ctx.strokeRect(CANVAS_WIDTH/2-100, CANVAS_HEIGHT/2-40, 200, 100);

	//write message
	ctx.textAlign="center";
	ctx.fillStyle = "red";
	ctx.font = "26px monospace";
	ctx.fillText("GAME OVER", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+7);
	ctx.font = "12px monospace";
	ctx.fillText("press R to play again", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+28);
}

//update canvas for each frame. 
function updateCanvas() {
	restartTimer++;
	if (gameOver()===true){
		life--;
		// mrPacman.dieAnimation();
		showLives();
		if (life>0){
			sleep(500);
			clearInterval(intervalId);
			fixGrids(mrPacman.x, mrPacman.y);
			for(var i=0; i<ghosts.length; i++){
				fixGrids(ghosts[i].x, ghosts[i].y);
			}
			run();	
		}
		else {
			clearInterval(intervalId);
			sleep(500);
			loseMessage();
		}
		
	}
	else if (pacmanWon()===true){
		clearInterval(intervalId);
		sleep(500);
		winMessage();
	}
	else{
		if(weakCounter>0 && weakCounter<2000/timerDelay){
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isBlinking = !ghosts[i].isBlinking;
			}
		}
		if(weakCounter>0){
			weakCounter--;
		}
		if(weakCounter===0){
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isDead = false;
				ghosts[i].isWeak = false;
				ghosts[i.isBlinking = false];
				weakBonus= 200;
			}
		}

		eatBean();
		eatGhost();
		mrPacman.move();

		for(var i=0; i<ghosts.length; i++){
			if(ghosts[i].isDead === false){
				ghosts[i].move();
			}
		}

	 	fixGrids(mrPacman.x, mrPacman.y);
	 	for(var i=0; i<ghosts.length; i++){
			fixGrids(ghosts[i].x, ghosts[i].y);
		}

	    mrPacman.draw();
	    for(var i=0; i<ghosts.length; i++){
			ghosts[i].draw();
		}
	}
}

//try to eat a bean
function eatBean () {
	if(onGridCenter(mrPacman.x, mrPacman.y)){
		if(maze[mrPacman.getRow()][mrPacman.getCol()].beanType===NORMAL_BEAN){
			score+= parseInt(10);
			showScore();
			beansLeft--;
		}
		else if (maze[mrPacman.getRow()][mrPacman.getCol()].beanType===POWER_BEAN){
			score+=parseInt(50);
			showScore();
			beansLeft--;

			//ghosts enter weak mode
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isWeak=true;
			}
			weakCounter=WEAK_DURATION;
		}
		maze[mrPacman.getRow()][mrPacman.getCol()].beanType=undefined;
		maze[mrPacman.getRow()][mrPacman.getCol()].draw();
	}
}

//try to eat a weak ghost
function eatGhost () {
	for(var i=0; i<ghosts.length; i++){
		if(Math.abs(mrPacman.x-ghosts[i].x)<=5 && Math.abs(mrPacman.y-ghosts[i].y)<=5
			&& ghosts[i].isWeak && !ghosts[i].isDead){
			score += parseInt( weakBonus);
			weakBonus *=2;
			showScore();
			ghosts[i].isDead = true;
			ghosts[i].toGhostHouse();
		}
	}
}

function gameOver(){
	for(var i=0; i<ghosts.length; i++){
		if(Math.abs(mrPacman.x-ghosts[i].x)<=5 && Math.abs(mrPacman.y-ghosts[i].y)<=5
			&& !ghosts[i].isWeak){
			return true;
		}
	}
	return false;
}

function pacmanWon(){
	return beansLeft === 0;
}

//Show a count down each time the game starts
function countDown () {
	ctx.fillStyle = "black";
	ctx.fillRect(CANVAS_HEIGHT-85, 70, 80,80);
	ctx.fillStyle = "red";
	ctx.font = "50px monospace";
	ctx.textAlign = "center";
	ctx.fillText("3",CANVAS_HEIGHT-43, 130);
	setTimeout(function () {
		ctx.fillStyle = "black";
		ctx.fillRect(CANVAS_HEIGHT-85, 70, 80,80);
		ctx.fillStyle = "orange";
		ctx.fillText("2",CANVAS_HEIGHT-43, 130);
		setTimeout(function  () {
				ctx.fillStyle = "black";
			ctx.fillRect(CANVAS_HEIGHT-85, 70, 80,80);
			ctx.fillStyle = "yellow";
			ctx.fillText("1",CANVAS_HEIGHT-43, 130);
			setTimeout(function  () {
				ctx.fillStyle = "black";
				ctx.fillRect(CANVAS_HEIGHT-85, 70, 80,80);
				ctx.fillStyle = "green";
				ctx.textAlign = "center";
				ctx.fillText("GO",CANVAS_HEIGHT-43, 130);
				setTimeout(function  () {
					intervalId = setInterval(updateCanvas, timerDelay);
				},500);
			}, 1000);
		}, 1000);	
	}, 1000);
}
/*==================END UI Update Methods================*/


/*==================Game Control Methods===================*/
//listen to keyDown event
function onKeyDown (event) {
	var keycode = event.keyCode;
	var pauseCode = 81; //q to pause
	var continueCode = 69; //e to resume
	var restartCode = 82; //r to restart
	var godModeCode = 71; //g to enter god mode

	// wasd
	var wCode = 87; 
	var aCode = 65;
	var sCode = 83;
	var dCode = 68;
	//arrow keys
	var leftCode = 37;
	var upCode = 38;
	var rightCode = 39;
	var downCode = 40;

	//start game
	if(!gameOn){
		if(keycode === sCode){
			clearInterval(intervalId);
			gameOn = true;
			gamePaused = false;
			initMaze();
			run();
			return;
		}
		else if(keycode === godModeCode){
			clearInterval(intervalId);
			ghosts = [];
			gameOn = true;
			gamePaused = false;
			initMaze();
			run(true);
			return;
		}
	}
	else{

		//pause game
		if(keycode === pauseCode && !gamePaused){
			clearInterval(intervalId);
			gamePaused = true;
			return;
		}

		//resume game
		if(keycode === continueCode && gamePaused){
			intervalId = setInterval(updateCanvas, timerDelay);
			gamePaused = false;
			return;
		}

		//restart game
		if( keycode === restartCode && restartTimer > 0) {
			//can't restart game if a game was just refreshed.
			restartTimer = 0;
			clearInterval(intervalId);
			gameOn = true;
			gamePaused = false;
			score = 0;
			life = MAX_LIFE;
			beansLeft = MAX_BEANS;
			initMaze();
			run();
		}

		//4-way controls
		switch(keycode){
			case upCode:
			case wCode:
			mrPacman.nextDir = mrPacman.dir===UP ? undefined: UP;
			break;

			case rightCode:
			case dCode:
			mrPacman.nextDir = mrPacman.dir===RIGHT? undefined : RIGHT;
			break;

			case leftCode:
			case aCode:
			mrPacman.nextDir = mrPacman.dir === LEFT? undefined : LEFT;
			break;

			case downCode:
			case sCode:
			mrPacman.nextDir = mrPacman.dir === DOWN? undefined : DOWN;
			break;

			default:
			break;

		}
	}	
}

//run the game. Create mrPacman and 4 ghosts. Reset their positions.
function run(isGodMode) {
	showScore();
    
    mrPacman = new Pacman(pacmanStartLoc[1]*GRID_WIDTH + GRID_WIDTH/2, pacmanStartLoc[0]*GRID_HEIGHT + GRID_HEIGHT/2, RIGHT);
    if(isGodMode===undefined || !isGodMode){
	    blinky = new Ghost(0,0, RED, DOWN);
	    inky = new Ghost(0,0, CYAN, DOWN);
	    pinky = new Ghost(0,0, PINK, DOWN);
	    clyde = new Ghost(0,0, ORANGE, DOWN);

	    blinky.toGhostHouse();
	    inky.toGhostHouse();
	    pinky.toGhostHouse();
	    clyde.toGhostHouse();

	    ghosts = [blinky, inky, pinky, clyde];

	    inky.draw();
		blinky.draw();
		pinky.draw();
		clyde.draw();
	}
	else{
		ghosts = [];
	}
	showLives();
	printInstruction();

	mrPacman.draw();
	countDown();
}
/*===============END Game Control Methods===================*/



/*-----------GAME START-----------*/
initFields();
initCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
canvas.addEventListener('keydown', onKeyDown, false);
canvas.setAttribute('tabindex','0');
canvas.focus();
welcomeScreen();


