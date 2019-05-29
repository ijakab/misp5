// @ts-ignore
let level:Level = new Level();
// @ts-ignore
let player:Player = new Player(level);

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(225, 255, 100);
    player.animate()
}
