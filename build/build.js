var Config = (function () {
    function Config(frictionFactor, playerMass) {
        if (frictionFactor === void 0) { frictionFactor = 2; }
        if (playerMass === void 0) { playerMass = 10; }
        this.frictionFactor = frictionFactor;
        this.playerMass = playerMass;
    }
    Config.getInstance = function () {
        if (this.instance)
            return this.instance;
        else {
            this.instance = new Config();
            this.instance.loadConfig();
            return this.instance;
        }
    };
    Config.prototype.loadConfig = function () {
        this.frictionFactor = Number(localStorage.getItem('frictionFactor')) || 2;
        this.playerMass = Number(localStorage.getItem('playerMass')) || 10;
    };
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
function setup() {
    createCanvas(500, 500);
    console.log(Config.getInstance().frictionFactor);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(225, 255, 100);
    textSize();
    ellipse(player.x, player.y, 50, 50);
}
//# sourceMappingURL=build.js.map