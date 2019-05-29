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
    function Level(levelNumber) {
        this.levelNumber = levelNumber;
        this.obstacles = [];
        this.collisionListeners = [];
        var config = levelConfig[levelNumber];
        var playerStartingPosition = new Point(config.playerStartX, config.playerStartY);
        this.player = new Player(playerStartingPosition);
        for (var _i = 0, _a = config.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            this.obstacles.push(new Obstacle(new Point(obstacle.x1, obstacle.y1), new Point(obstacle.x2, obstacle.y2)));
        }
        this.finishPosition = new Point(config.finishX, config.finishY);
        this.collisionListeners.push(this.player);
    }
    Level.prototype.animate = function () {
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            line(obstacle.startPoint.x, obstacle.startPoint.y, obstacle.endPoint.x, obstacle.endPoint.y);
        }
        this.handleCollisions();
        this.player.animate();
    };
    Level.prototype.handleCollisions = function () {
        var collision = Math.random() < 0.5;
        if (collision) {
            for (var _i = 0, _a = this.collisionListeners; _i < _a.length; _i++) {
                var collidable = _a[_i];
                collidable.onCollide();
            }
        }
    };
    return Level;
}());
var Obstacle = (function () {
    function Obstacle(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    return Obstacle;
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
    Player.prototype.onCollide = function () {
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
var levelConfig = [
    {
        playerStartX: 50,
        playerStartY: 50,
        obstacles: [
            {
                x1: 100,
                x2: 200,
                y1: 200,
                y2: 200
            }
        ],
        finishX: 200,
        finishY: 200
    }
];
var level = new Level(0);
function setup() {
    createCanvas(500, 500);
    strokeWeight(2);
    stroke(51);
}
function draw() {
    background(225, 255, 100);
    level.animate();
}
//# sourceMappingURL=build.js.map