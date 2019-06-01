// @ts-ignore
let levelNumber = localStorage.getItem('currentLevel') || 0;
let level:Level = new Level(Number(levelNumber)); //todo from localstorage

function setup() {
    createCanvas(500, 500);
    strokeWeight(2);
    stroke(51);
    textSize(20)
}

function draw() {
    background(225, 255, 100);
    level.animate()
}
