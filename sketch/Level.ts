class Level implements IListenable {
    private player: Player;
    private spring: Spring;
    private obstacles: Array<Obstacle> = [];
    private finishPosition: Point;
    private collisionListeners: Array<IColladible> = [];
    private finished: boolean = false;

    constructor(
        private levelNumber: number
    ) {
        let config = levelConfig[levelNumber];
        this.player = new Player(new Point(config.playerStartX, config.playerStartY));
        this.spring = new Spring(this.player, config.springOrientation);
        for (let obstacle of config.obstacles) {
            this.obstacles.push(new Obstacle(new Point(obstacle.x1, obstacle.y1), new Point(obstacle.x2, obstacle.y2)));
        }
        this.finishPosition = new Point(config.finishX, config.finishY);

        this.collisionListeners.push(this.player);
    }

    public animate(): void {
        for (let obstacle of this.obstacles) {
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
        if (!this.finished) this.player.animate();
    }

    private handleCollisions(): Level {
        for (let obstacle of this.obstacles) {
            if(obstacle.checkCollision(this.player)) {
                // this.player.energy = 0;
                break;
            }
        }
        return this;
    }

    private drawFinish(): Level {
        fill(70);
        circle(this.finishPosition.x, this.finishPosition.y, 50);
        fill(255);
        return this;
    }

    private checkFinish(): Level {
        if (this.player.position.isInRadius(this.finishPosition, 25)) {
            this.finished = true;
        }
        return this;
    }
}