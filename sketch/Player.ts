 class Player implements IListenable{
    public position: Point;
    public energy:number = 0;
    public velocity: number = 3;
    private config: Config = Config.getInstance();

    constructor(level: Level) {
        this.position = level.initialPlayerPosition
    }

    public animate() {
        ellipse(this.position.x, this.position.y, 50, 50);
    }
 }