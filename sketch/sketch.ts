// @ts-ignore
let level:Level = new Level(0);

function setup() {
    createCanvas(500, 500);
    strokeWeight(2);
    stroke(51);
}

function draw() {
    background(225, 255, 100);
    level.animate()
}
