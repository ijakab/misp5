let player:Player = new Player();
let config:Config = new Config();

function setup() {
    createCanvas(windowWidth, windowHeight);
    let listeners:Array<IListenable> = [player];
    setInterval(() => {
        for(let listener of listeners) {
            listener.handleTimerEvent()
        }
    }, 500)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(100);
    textSize();
    player.animate(config);
    ellipse(player.x, player.y, 50, 50);
}
