class Level implements IListenable{
    private player: Player;

    constructor(
        private initialPlayerPosition:Point = new Point(50, 50) //todo get this from some config
    ) {
        this.player = new Player(this.initialPlayerPosition);
    }

    public animate(): void {
        this.player.animate();
    }
}