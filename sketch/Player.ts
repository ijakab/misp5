 class Player implements IListenable, IColladible{
    public energy:number = 0;
    public velocity: Vector = new Vector(0, 0);
    private config: Config = Config.getInstance();

    constructor(public position: Point) {
    }

    public displayStats(): Player {
        text(`Ek: ${this.energy.toFixed(2)}`, 20, 20);
        text(`v: ${this.velocity.amount().toFixed(2)}`, 380, 20);
        return this;
    }

    public animate(): void {
        ellipse(this.position.x, this.position.y, 50, 50);
        if(this.energy > 0) {
            this.subtractEnergy().setVelocityFromEnergy().move();
        }
    }

    onCollide(): void {
    }

    private setVelocityFromEnergy() : Player {
        if(this.velocity.amount() === 0) return;
        let speed:number = Math.sqrt(2*this.energy/this.config.playerMass);
        this.velocity.setAmount(speed);
        return this;
    }

    private move(): Player {
        this.position.addVelocity(this.velocity);
        return this;
    }

    private subtractEnergy(): Player {
        this.energy -= this.config.frictionFactor * this.config.playerMass * this.config.energyLossConstant;
        if(this.energy < 0) this.energy = 0;
        return this;
    }

    public addEnergy(energyAmount: number): Player {
        this.energy += energyAmount;
        return this;
    }

    public setVelocity(velocity: Vector): Player {
        this.velocity = velocity;
        this.velocity.setAmount(1);
        return this;
    }
 }