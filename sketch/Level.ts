class Level implements IListenable{
    private player: Player;
    private obstacles: Array<Obstacle> = [];
    private finishPosition: Point;

    constructor(
        private levelNumber: number
    ) {
        let config = levelConfig[levelNumber];
        let playerStartingPosition = new Point(config.playerStartX, config.playerStartY);
        this.player = new Player(playerStartingPosition);
        for(let obstacle of config.obstacles) {
            this.obstacles.push(new Obstacle(new Point(obstacle.x1, obstacle.y1), new Point(obstacle.x2, obstacle.y2)));
        }
        this.finishPosition = new Point(config.finishX, config.finishY);
    }

    public animate(): void {
        this.player.animate();
    }
}