 class Player implements IListenable, IColladible{
    public energy:number = 5000;
    public velocity: Vector = new Vector(0, 0);
    private config: Config = Config.getInstance();

    constructor(public position: Point) {
    }

    public animate() {
        text(`Ek: ${this.energy.toFixed(2)}`, 20, 20);
        text(`v: ${this.velocity.amount().toFixed(2)}`, 380, 20);
        ellipse(this.position.x, this.position.y, 50, 50);
        if(this.energy > 0) {
            this.energy -= this.config.frictionFactor * this.config.playerMass * this.config.energyLossConstanct;
            if(this.energy < 0) this.energy = 0;
            this.setVelocityFromEnergy()
        }
    }

    onCollide(): void {
    }

    private setVelocityFromEnergy() : void {
        if(this.velocity.amount() === 0) return;
        let speed:number = Math.sqrt(2*this.energy/this.config.playerMass);
        this.velocity.setAmount(speed);
    }

    public addEnergy(energyAmount: number): void {
        this.energy += energyAmount;
    }

    public setVelocity(velocity: Vector) {
        this.velocity = velocity;
        this.velocity.setAmount(1);
    }
 }