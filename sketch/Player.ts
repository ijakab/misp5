 class Player implements IListenable, IColladible{
    public energy:number = 0;
    public velocity: number = 3;
    private config: Config = Config.getInstance();

    constructor(public position: Point) {
    }

    public animate() {
        ellipse(this.position.x, this.position.y, 50, 50);
    }

    onCollide(): void {
    }
 }