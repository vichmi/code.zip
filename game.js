let x = 10, y = 10;

function setup() {
	setCanvasSize(800, 600);
}

function update() {
	x+=1;
}

function draw() {
	rect(x, y, 40, 40);
}
