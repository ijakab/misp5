var Config = (function () {
    function Config(frictionFactor, playerMass) {
        if (frictionFactor === void 0) { frictionFactor = 2; }
        if (playerMass === void 0) { playerMass = 10; }
        this.frictionFactor = frictionFactor;
        this.playerMass = playerMass;
        this.energyLossConstanct = 0.005;
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
        this.finished = false;
        var config = levelConfig[levelNumber];
        var playerStartingPosition = new Point(config.playerStartX, config.playerStartY);
        this.player = new Player(playerStartingPosition);
        this.player.setVelocity(new Vector(1, 1));
        this.player.addEnergy(5000);
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
        this.drawFinish()
            .handleCollisions()
            .checkFinish();
        this.player.displayStats();
        if (!this.finished)
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
        return this;
    };
    Level.prototype.drawFinish = function () {
        circle(this.finishPosition.x, this.finishPosition.y, 50);
        return this;
    };
    Level.prototype.checkFinish = function () {
        if (this.player.position.isInRadius(this.finishPosition, 25)) {
            this.finished = true;
        }
        return this;
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
        this.velocity = new Vector(0, 0);
        this.config = Config.getInstance();
    }
    Player.prototype.displayStats = function () {
        text("Ek: " + this.energy.toFixed(2), 20, 20);
        text("v: " + this.velocity.amount().toFixed(2), 380, 20);
        return this;
    };
    Player.prototype.animate = function () {
        ellipse(this.position.x, this.position.y, 50, 50);
        if (this.energy > 0) {
            this.subtractEnergy().setVelocityFromEnergy().move();
        }
        return this;
    };
    Player.prototype.onCollide = function () {
    };
    Player.prototype.setVelocityFromEnergy = function () {
        if (this.velocity.amount() === 0)
            return;
        var speed = Math.sqrt(2 * this.energy / this.config.playerMass);
        this.velocity.setAmount(speed);
        return this;
    };
    Player.prototype.move = function () {
        this.position.addVelocity(this.velocity);
        return this;
    };
    Player.prototype.subtractEnergy = function () {
        this.energy -= this.config.frictionFactor * this.config.playerMass * this.config.energyLossConstanct;
        if (this.energy < 0)
            this.energy = 0;
        return this;
    };
    Player.prototype.addEnergy = function (energyAmount) {
        this.energy += energyAmount;
        return this;
    };
    Player.prototype.setVelocity = function (velocity) {
        this.velocity = velocity;
        this.velocity.setAmount(1);
        return this;
    };
    return Player;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.addVelocity = function (velocity) {
        this.x += velocity.i;
        this.y += velocity.j;
        return this;
    };
    Point.prototype.isSame = function (otherPoint) {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    };
    Point.prototype.distanceFrom = function (otherPoint) {
        var xSquared = (this.x - otherPoint.x) * (this.x - otherPoint.x);
        var ySquared = (this.y - otherPoint.y) * (this.y - otherPoint.y);
        return Math.sqrt(xSquared + ySquared);
    };
    Point.prototype.isInRadius = function (otherPoint, radius) {
        return this.distanceFrom(otherPoint) <= radius;
    };
    return Point;
}());
var Spring = (function () {
    function Spring() {
    }
    return Spring;
}());
var Vector = (function () {
    function Vector(i, j) {
        this.i = i;
        this.j = j;
    }
    Vector.prototype.amount = function () {
        return Math.sqrt(this.i * this.i + this.j * this.j);
    };
    Vector.prototype.angle = function () {
        return Math.atan(this.j / this.i);
    };
    Vector.prototype.setAmount = function (newAmount) {
        var ratio = newAmount / this.amount();
        this.i *= ratio;
        this.j *= ratio;
        return this;
    };
    return Vector;
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
    },
    {
        playerStartX: 100,
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
    textSize(20);
}
function draw() {
    background(225, 255, 100);
    level.animate();
}
//# sourceMappingURL=build.js.map