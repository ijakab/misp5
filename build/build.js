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
    function Level(initialPlayerPosition) {
        if (initialPlayerPosition === void 0) { initialPlayerPosition = new Point(50, 50); }
        this.initialPlayerPosition = initialPlayerPosition;
        this.player = new Player(this.initialPlayerPosition);
    }
    Level.prototype.animate = function () {
        this.player.animate();
    };
    return Level;
}());
var Player = (function () {
    function Player(position) {
        this.position = position;
        this.energy = 0;
        this.velocity = 3;
        this.config = Config.getInstance();
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
function setup() {
    createCanvas(500, 500);
}
function draw() {
    background(225, 255, 100);
    level.animate();
}
//# sourceMappingURL=build.js.map