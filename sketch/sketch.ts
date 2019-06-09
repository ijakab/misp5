// @ts-ignore
let levelNumber = localStorage.getItem('currentLevel') || 0;
let level:Level = new Level(Number(levelNumber)); //todo from localstorage
let bg: p5.Image;

function setup() {
    createCanvas(500, 500);
    strokeWeight(2);
    stroke(51);
    textSize(20);
    bg = loadImage('assets/background.jpg');
}

function draw() {
    background(bg);
    level.animate();
}
