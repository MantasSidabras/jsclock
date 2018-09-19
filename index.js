// import config from './config';

let width = window.innerWidth;
let height = window.innerHeight;

let spread = 0.2;
let thickness = 15;

const startAngle = -90;
const endAngle = startAngle + 360;

let hWidth;
let hHeight;
let hLength;

let mWidth;
let mHeight;
let mLength;

let sWidth;
let sHeight;
let sLength;

let initialHour;
let initialMinute;
let initialSecond;

let ms;
let sliderSpread;
let sliderThickness;

function adjustSize() {
	hHeight = height / 3;
	hWidth = hHeight;
	hLength = hWidth / 7;

	mWidth = hWidth + hWidth * spread;
	mHeight = hHeight + hHeight * spread;
	mLength = mWidth / 5;

	sWidth = hWidth + hWidth * spread + hWidth * spread;
	sHeight = hHeight + hHeight * spread + hHeight * spread;
	sLength = sWidth / 4;
}

function setup() {
	adjustSize();
	sliderSpread = createSlider(0.1, 0.5, 0.2, 0.01);
	sliderThickness = createSlider(2, 25, 20, 1);
	sliderSpread.changed(adjustSize);

	sliderSpread.position(20, 20);
	sliderThickness.position(20, 40);

	createCanvas(width, height);
	initialHour = hour();
	initialMinute = minute();
	initialSecond = second();
}

function windowResized() {
	adjustSize();
	let w = window.innerWidth;
	let h = window.innerHeight;
	resizeCanvas(w, h);
	width = w;
	height = h;
}

function draw() {
	spread = sliderSpread.value();
	thickness = sliderThickness.value();

	let mWidth = hWidth + hWidth * spread;
	let mHeight = hHeight + hHeight * spread;

	let sWidth = hWidth + hWidth * spread + hWidth * spread;
	let sHeight = hHeight + hHeight * spread + hHeight * spread;
	background(20);
	angleMode(DEGREES);

	ms = floor(
		millis() +
			(initialHour % 12) * 60 * 60 * 1000 +
			initialMinute * 60 * 1000 +
			initialSecond * 1000
	);

	hr = map((ms / (60 * 60 * 1000)) % 12, 0, 12, startAngle, endAngle);
	mn = map((ms / (60 * 1000)) % 60, 0, 60, startAngle, endAngle);
	sc = map((ms / 1000) % 60, 0, 60, startAngle, endAngle);

	strokeWeight(thickness);
	stroke(255, 196, 0);
	noFill();
	arc(width / 2, height / 2, hWidth, hHeight, startAngle, hr); // hour arc
	push();
	translate(width / 2, height / 2);
	rotate(hr - startAngle);
	line(0, 0, 0, -hLength);
	pop();

	stroke(63, 81, 181);
	arc(width / 2, height / 2, mWidth, mHeight, startAngle, mn); // min arc
	push();
	translate(width / 2, height / 2);
	rotate(mn - startAngle);
	line(0, 0, 0, -mLength);
	pop();

	stroke(255, 87, 34);
	arc(width / 2, height / 2, sWidth, sHeight, startAngle, sc); // sec arc
	push();
	translate(width / 2, height / 2);
	rotate(sc - startAngle);
	line(0, 0, 0, -sLength);
	pop();

	stroke(255);

	point(width / 2, height / 2);

	noStroke();
	fill(255, 235, 59);
	textSize(32);
	textStyle(BOLD);
	textFont('Roboto');
	text('3', width / 2 + sWidth / 2 + 15, height / 2 + 10, 40);
	text('6', width / 2 - 15, height / 2 + sHeight / 2 + 40, 40);
	text('9', width / 2 - sWidth / 2 - 35, height / 2 + 10, 40);
	text('12', width / 2 - 20, height / 2 - sHeight / 2 - 20, 40);
}
