 class Player implements IListenable, IColladible{
    public energy:number = 0;
    public velocity: Vector = new Vector(0, 0);
    private config: Config = Config.getInstance();

    constructor(public position: Point) {
    }

    public animate() {
        text(`Ek: ${this.energy}`, 20, 20);
        text(`Ek: ${this.energy}`, 50, 20);
        ellipse(this.position.x, this.position.y, 50, 50);
        if(this.energy > 0) {
            this.energy -= this.config.frictionFactor * this.config.playerMass * this.config.energyLossConstanct;
        }
    }

    onCollide(): void {
    }

    addEnergy(energyAmount: number): void {
        this.energy += energyAmount;
    }
 }