class Level implements IListenable{
    private player: Player;
    private obstacles: Array<Obstacle> = [];
    private finishPosition: Point;
    private collisionListeners: Array<IColladible> = [];

    constructor(
        private levelNumber: number
    ) {
        let config = levelConfig[levelNumber];
        let playerStartingPosition = new Point(config.playerStartX, config.playerStartY);
        this.player = new Player(playerStartingPosition);
        this.player.setVelocity(new Vector(1, 1)); //todo from spring class
        this.player.addEnergy(5000);//todo from spring class
        for(let obstacle of config.obstacles) {
            this.obstacles.push(new Obstacle(new Point(obstacle.x1, obstacle.y1), new Point(obstacle.x2, obstacle.y2)));
        }
        this.finishPosition = new Point(config.finishX, config.finishY);

        this.collisionListeners.push(this.player);
    }

    public animate(): void {
        for(let obstacle of this.obstacles) {
            line(obstacle.startPoint.x, obstacle.startPoint.y, obstacle.endPoint.x, obstacle.endPoint.y);
        }
        this.drawFinish()
            .handleCollisions()
            .checkFinish();
        this.player.animate();
    }

    private handleCollisions(): Level {
        let collision = Math.random() < 0.5;
        if(collision) {
            for(let collidable of this.collisionListeners) {
                collidable.onCollide();
            }
        }
        return this;
    }

    private drawFinish(): Level {
        circle(this.finishPosition.x, this.finishPosition.y, 50);
        return this;
    }

    private checkFinish(): Level {
        //todo use collision logic here when implemented. this is temporary solution
        if(this.player.position.isInRadius(this.finishPosition, 25)) {
            console.log('FINISHIRO!!!')
        }
        return this;
    }
}