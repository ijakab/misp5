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
var Level = (function () {
    function Level() {
        this.initialPlayerPosition = new Point(50, 50);
    }
    return Level;
}());
var Player = (function () {
    function Player(level) {
        this.energy = 0;
        this.velocity = 3;
        this.config = Config.getInstance();
        this.position = level.initialPlayerPosition;
    }
    Player.prototype.animate = function () {
        ellipse(this.position.x, this.position.y, 50, 50);
    };
    return Player;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var level = new Level();
var player = new Player(level);
function setup() {
    createCanvas(500, 500);
}
function draw() {
    background(225, 255, 100);
    player.animate();
}
//# sourceMappingURL=build.js.map