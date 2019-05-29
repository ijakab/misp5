// @ts-ignore
let player:Player = new Player();

function setup() {
    createCanvas(500, 500);
    console.log(Config.getInstance().frictionFactor)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(225, 255, 100);
    textSize();
    ellipse(player.x, player.y, 50, 50);
}
