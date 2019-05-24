var Config = (function () {
    function Config() {
        this.friction = 0.9;
    }
    return Config;
}());
var Player = (function () {
    function Player() {
        this.x = 50;
        this.y = 500;
        this.energy = 100;
        this.velocity = 3;
    }
    Player.prototype.animate = function (config) {
        this.energy -= this.velocity;
        if (this.energy > 0) {
            this.y -= this.velocity;
        }
    };
    Player.prototype.handleTimerEvent = function () {
        console.log('lalalla');
    };
    return Player;
}());
var player = new Player();
var config = new Config();
function setup() {
    createCanvas(windowWidth, windowHeight);
    var listeners = [player];
    setInterval(function () {
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener.handleTimerEvent();
        }
    }, 500);
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
//# sourceMappingURL=build.js.map