var Config = (function () {
    function Config(frictionFactor, playerMass) {
        if (frictionFactor === void 0) { frictionFactor = 2; }
        if (playerMass === void 0) { playerMass = 10; }
        this.frictionFactor = frictionFactor;
        this.playerMass = playerMass;
        this.energyLossConstant = 0.002;
        this.springConstant = 25;
        this.springBaseLength = 100;
        this.springDistanceFromPlayer = 70;
        this.springMaximumEnergy = 1800;
        this.maximumFrictionFactor = 200;
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
        this.player = new Player(new Point(config.playerStartX, config.playerStartY));
        this.spring = new Spring(this.player, config.springOrientation);
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
            strokeWeight(6);
            stroke(2);
            line(obstacle.startPoint.x, obstacle.startPoint.y, obstacle.endPoint.x, obstacle.endPoint.y);
            stroke(0);
            strokeWeight(3);
        }
        this.drawFinish()
            .handleCollisions()
            .checkFinish();
        this.player.displayStats();
        this.spring.displayStats();
        this.spring.animate();
        if (!this.finished)
            this.player.animate();
    };
    Level.prototype.handleCollisions = function () {
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            if (obstacle.checkCollision(this.player)) {
                break;
            }
        }
        return this;
    };
    Level.prototype.drawFinish = function () {
        fill(70);
        circle(this.finishPosition.x, this.finishPosition.y, 50);
        fill(255);
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
    Obstacle.prototype.checkCollision = function (player) {
        var vectorAB = createVector(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y);
        var vectorAR = createVector(player.position.x - this.startPoint.x, player.position.y - this.startPoint.y);
        var vectorBR = createVector(player.position.x - this.endPoint.x, player.position.y - this.endPoint.y);
        var distance = -1, collision = -1;
        var vectorProjection = vectorAB.copy().mult(vectorAR.dot(vectorAB) / vectorAB.magSq());
        if (vectorProjection.magSq() <= vectorAB.magSq() && vectorProjection.angleBetween(vectorAB) == 0) {
            collision = 0;
            distance = createVector(vectorProjection.x - vectorAR.x, vectorProjection.y - vectorAR.y).mag();
        }
        else {
            collision = 1;
            distance = vectorAB.magSq() > vectorProjection.magSq() ?
                vectorAR.mag() : vectorBR.mag();
        }
        if (distance != -1 && distance <= (collision == 0 ? player.radius / 2 + player.radius / 15 : player.radius / 2)) {
            switch (collision) {
                case 1:
                    Obstacle.handleEdgeCollision(vectorAB.magSq() < vectorProjection.magSq() ? this.endPoint : this.startPoint, player);
                    break;
                case 0:
                    var vectorNormal = createVector(vectorProjection.x - vectorAR.x, vectorProjection.y - vectorAR.y).normalize();
                    Obstacle.handleLineCollision(player, vectorNormal, vectorAB);
                    break;
                default:
                    return false;
            }
            return true;
        }
        return false;
    };
    Obstacle.handleEdgeCollision = function (collPosition, player) {
        var Vrx = (player.position.x - collPosition.x) / (player.radius / 2);
        var Vry = (player.position.y - collPosition.y) / (player.radius / 2);
        var vector = player.velocity;
        vector.i = Vrx;
        vector.j = Vry;
        player.setVelocity(vector);
        console.log("edge collision");
    };
    Obstacle.handleLineCollision = function (player, vectorNormal, vectorAB) {
        var vectorReflection = (createVector(player.velocity.i, player.velocity.j)).sub(vectorNormal.mult(2 * createVector(player.velocity.i, player.velocity.j).dot(vectorNormal)));
        if (vectorReflection.angleBetween(vectorAB)) {
            player.velocity.i = vectorReflection.x;
            player.velocity.j = vectorReflection.y;
        }
    };
    return Obstacle;
}());
var Player = (function () {
    function Player(position) {
        this.position = position;
        this.energy = 0;
        this.velocity = new Vector(0, 0);
        this.config = Config.getInstance();
        this.radius = 50;
    }
    Player.prototype.displayStats = function () {
        text("Ek: " + this.energy.toFixed(2), 20, 20);
        text("v: " + this.velocity.amount().toFixed(2), 380, 20);
        return this;
    };
    Player.prototype.animate = function () {
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
        if (this.energy > 0) {
            this.subtractEnergy().setVelocityFromEnergy().move();
        }
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
        this.energy -= this.config.frictionFactor * this.config.playerMass * this.config.energyLossConstant;
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
    Player.prototype.setPosition = function (position) {
        this.position = position;
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
    function Spring(player, orientation) {
        this.player = player;
        this.orientation = orientation;
        this.energy = 0;
        this.config = Config.getInstance();
        this.fired = false;
        if (orientation === SpringOrientation.LEFT) {
            this.position = new Point(player.position.x - this.config.springDistanceFromPlayer, player.position.y);
            this.orientationVector = new Vector(1, 0);
        }
        else if (orientation === SpringOrientation.RIGHT) {
            this.position = new Point(player.position.x + this.config.springDistanceFromPlayer, player.position.y);
            this.orientationVector = new Vector(-1, 0);
        }
        else if (orientation === SpringOrientation.ABOVE) {
            this.position = new Point(player.position.x, player.position.y - this.config.springDistanceFromPlayer);
            this.orientationVector = new Vector(0, 1);
        }
        else {
            this.position = new Point(player.position.x, player.position.y + this.config.springDistanceFromPlayer);
            this.orientationVector = new Vector(0, -1);
        }
    }
    Spring.prototype.displayStats = function () {
        text("Ep: " + this.energy.toFixed(2), 150, 20);
        return this;
    };
    Spring.prototype.animate = function () {
        if (this.fired)
            return;
        this.handleKeyEvents().handleContraction().drawSpring();
    };
    Spring.prototype.handleContraction = function () {
        var x = this.energy / this.config.springConstant;
        this.orientationVector.setAmount(this.config.springBaseLength - x);
        return this;
    };
    Spring.prototype.drawSpring = function () {
        if (this.fired)
            return this;
        var endPoint = new Point(this.position.x + this.orientationVector.i, this.position.y + this.orientationVector.j);
        line(this.position.x, this.position.y, endPoint.x, endPoint.y);
        if (!this.fired)
            this.player.setPosition(endPoint);
        return this;
    };
    Spring.prototype.fire = function () {
        if (this.fired)
            return this;
        this.fired = true;
        this.player.setVelocity(this.orientationVector);
        this.player.addEnergy(this.energy);
        this.energy = 0;
    };
    Spring.prototype.handleKeyEvents = function () {
        if (keyIsDown(38)) {
            this.energy += 70;
            if (this.energy > this.config.springMaximumEnergy)
                this.energy = this.config.springMaximumEnergy;
        }
        if (keyIsDown(40)) {
            this.energy -= 70;
            if (this.energy < 0)
                this.energy = 0;
        }
        if (keyIsDown(39)) {
            this.orientationVector.rotateRight(4);
        }
        if (keyIsDown(37)) {
            this.orientationVector.rotateLeft(4);
        }
        if (keyIsDown(32)) {
            this.fire();
        }
        return this;
    };
    return Spring;
}());
var SpringOrientation;
(function (SpringOrientation) {
    SpringOrientation[SpringOrientation["LEFT"] = 0] = "LEFT";
    SpringOrientation[SpringOrientation["RIGHT"] = 1] = "RIGHT";
    SpringOrientation[SpringOrientation["ABOVE"] = 2] = "ABOVE";
    SpringOrientation[SpringOrientation["BELOW"] = 3] = "BELOW";
})(SpringOrientation || (SpringOrientation = {}));
var Vector = (function () {
    function Vector(i, j) {
        this.i = i;
        this.j = j;
    }
    Vector.prototype.amount = function () {
        return Math.sqrt(this.i * this.i + this.j * this.j);
    };
    Vector.prototype.angle = function () {
        var atan = Math.atan(this.j / this.i);
        if (this.i < 0)
            atan += Math.PI;
        return atan;
    };
    Vector.prototype.setAmount = function (newAmount) {
        var ratio = newAmount / this.amount();
        this.i *= ratio;
        this.j *= ratio;
        return this;
    };
    Vector.prototype.setAngle = function (angle) {
        angle = angle % (2 * Math.PI);
        var oldAmount = this.amount();
        this.i = 1;
        if ((angle > Math.PI / 2 && angle < 3 * Math.PI / 2) || angle < -Math.PI / 2)
            this.i = -1;
        this.j = this.i * Math.tan(angle);
        this.setAmount(oldAmount);
        return this;
    };
    Vector.prototype.rotateRight = function (angle) {
        var oldAngle = this.angle();
        this.setAngle(oldAngle + angle * Math.PI / 180);
        return this;
    };
    Vector.prototype.rotateLeft = function (angle) {
        this.setAngle(this.angle() - angle * Math.PI / 180);
        return this;
    };
    return Vector;
}());
var levelConfig = [
    {
        playerStartX: 400,
        playerStartY: 400,
        obstacles: [
            {
                x1: 20,
                x2: 480,
                y1: 20,
                y2: 20
            },
            {
                x1: 20,
                x2: 20,
                y1: 20,
                y2: 480
            },
            {
                x1: 20,
                x2: 480,
                y1: 480,
                y2: 480
            },
            {
                x1: 480,
                x2: 480,
                y1: 20,
                y2: 480
            },
            {
                x1: 160,
                x2: 160,
                y1: 40,
                y2: 200
            },
            {
                x1: 160,
                x2: 180,
                y1: 40,
                y2: 40
            },
            {
                x1: 180,
                x2: 180,
                y1: 40,
                y2: 200
            },
            {
                x1: 160,
                x2: 180,
                y1: 200,
                y2: 200
            },
            {
                x1: 70,
                x2: 70,
                y1: 330,
                y2: 350
            },
            {
                x1: 70,
                x2: 270,
                y1: 330,
                y2: 330
            },
            {
                x1: 270,
                x2: 270,
                y1: 330,
                y2: 350
            },
            {
                x1: 70,
                x2: 270,
                y1: 350,
                y2: 350
            }
        ],
        finishX: 70,
        finishY: 70,
        springOrientation: SpringOrientation.BELOW
    },
    {
        playerStartX: 400,
        playerStartY: 95,
        obstacles: [
            {
                x1: 20,
                x2: 480,
                y1: 20,
                y2: 20
            },
            {
                x1: 20,
                x2: 20,
                y1: 20,
                y2: 480
            },
            {
                x1: 20,
                x2: 480,
                y1: 480,
                y2: 480
            },
            {
                x1: 480,
                x2: 480,
                y1: 20,
                y2: 480
            },
            {
                x1: 160,
                x2: 160,
                y1: 40,
                y2: 200
            },
            {
                x1: 160,
                x2: 180,
                y1: 40,
                y2: 40
            },
            {
                x1: 180,
                x2: 180,
                y1: 40,
                y2: 200
            },
            {
                x1: 160,
                x2: 180,
                y1: 200,
                y2: 200
            },
            {
                x1: 70,
                x2: 70,
                y1: 330,
                y2: 350
            },
            {
                x1: 70,
                x2: 270,
                y1: 330,
                y2: 330
            },
            {
                x1: 270,
                x2: 270,
                y1: 330,
                y2: 350
            },
            {
                x1: 70,
                x2: 270,
                y1: 350,
                y2: 350
            },
            {
                x1: 390,
                x2: 390,
                y1: 320,
                y2: 480
            },
            {
                x1: 390,
                x2: 410,
                y1: 320,
                y2: 320
            },
            {
                x1: 410,
                x2: 410,
                y1: 320,
                y2: 480
            },
            {
                x1: 120,
                x2: 120,
                y1: 200,
                y2: 220
            },
            {
                x1: 120,
                x2: 240,
                y1: 200,
                y2: 200
            },
            {
                x1: 240,
                x2: 240,
                y1: 200,
                y2: 220
            },
            {
                x1: 120,
                x2: 240,
                y1: 220,
                y2: 220
            },
        ],
        finishX: 120,
        finishY: 160,
        springOrientation: SpringOrientation.ABOVE
    },
    {
        playerStartX: 400,
        playerStartY: 95,
        obstacles: [
            {
                x1: 20,
                x2: 480,
                y1: 20,
                y2: 20
            },
            {
                x1: 20,
                x2: 20,
                y1: 20,
                y2: 480
            },
            {
                x1: 20,
                x2: 480,
                y1: 480,
                y2: 480
            },
            {
                x1: 480,
                x2: 480,
                y1: 20,
                y2: 480
            },
            {
                x1: 60,
                x2: 60,
                y1: 50,
                y2: 70
            },
            {
                x1: 60,
                x2: 260,
                y1: 50,
                y2: 50
            },
            {
                x1: 260,
                x2: 260,
                y1: 50,
                y2: 70
            },
            {
                x1: 60,
                x2: 260,
                y1: 70,
                y2: 70
            },
            {
                x1: 60,
                x2: 60,
                y1: 70,
                y2: 130
            },
            {
                x1: 80,
                x2: 80,
                y1: 70,
                y2: 130
            },
            {
                x1: 60,
                x2: 80,
                y1: 130,
                y2: 130
            },
            {
                x1: 190,
                x2: 190,
                y1: 200,
                y2: 300
            },
            {
                x1: 210,
                x2: 210,
                y1: 200,
                y2: 300
            },
            {
                x1: 190,
                x2: 210,
                y1: 200,
                y2: 200
            },
            {
                x1: 190,
                x2: 210,
                y1: 300,
                y2: 300
            },
            {
                x1: 280,
                x2: 280,
                y1: 250,
                y2: 270
            },
            {
                x1: 280,
                x2: 480,
                y1: 250,
                y2: 250
            },
            {
                x1: 280,
                x2: 480,
                y1: 270,
                y2: 270
            },
            {
                x1: 280,
                x2: 280,
                y1: 270,
                y2: 380
            },
            {
                x1: 300,
                x2: 300,
                y1: 270,
                y2: 380
            },
            {
                x1: 280,
                x2: 300,
                y1: 380,
                y2: 380
            },
            {
                x1: 50,
                x2: 50,
                y1: 300,
                y2: 390
            },
            {
                x1: 90,
                x2: 90,
                y1: 300,
                y2: 390
            },
            {
                x1: 50,
                x2: 90,
                y1: 300,
                y2: 300
            },
            {
                x1: 50,
                x2: 90,
                y1: 390,
                y2: 390
            }
        ],
        finishX: 360,
        finishY: 320,
        springOrientation: SpringOrientation.ABOVE
    }
];
var levelNumber = localStorage.getItem('currentLevel') || 0;
var level = new Level(Number(levelNumber));
var bg;
var config = Config.getInstance();
function setup() {
    createCanvas(500, 500);
    strokeWeight(2);
    stroke(51);
    textSize(20);
    setBackground([
        {
            to: 0.3,
            imagePath: 'assets/background.jpg',
            debug: 'leg'
        },
        {
            from: 0.3,
            to: 0.6,
            imagePath: 'assets/background.jpg',
            debug: 'trava'
        },
        {
            from: 0.6,
            to: 0.9,
            imagePath: 'assets/background.jpg',
            debug: 'bakar'
        },
        {
            from: 0.9,
            imagePath: 'assets/background.jpg',
            debug: 'guma'
        }
    ]);
    bg = loadImage('assets/background.jpg');
}
function draw() {
    background(bg);
    level.animate();
}
function setBackground(backgroundOptions) {
    for (var _i = 0, backgroundOptions_1 = backgroundOptions; _i < backgroundOptions_1.length; _i++) {
        var backgroundOption = backgroundOptions_1[_i];
        if (!backgroundOption.from)
            backgroundOption.from = 0;
        if (!backgroundOption.to)
            backgroundOption.to = 1;
        if (config.frictionFactor > config.maximumFrictionFactor * backgroundOption.from && config.frictionFactor <= config.maximumFrictionFactor * backgroundOption.to) {
            console.log('bg je ', backgroundOption.debug);
            bg = loadImage(backgroundOption.imagePath);
        }
    }
}
//# sourceMappingURL=build.js.map