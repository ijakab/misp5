class Spring implements IListenable {
    private energy: number = 0;
    private orientationVector: Vector;
    private position: Point;
    private config: Config = Config.getInstance();
    private fired:boolean = false;

    constructor(private player: Player, private orientation: SpringOrientation) {
        if(orientation === SpringOrientation.LEFT) {
            this.position = new Point(player.position.x - this.config.springDistanceFromPlayer, player.position.y);
            this.orientationVector = new Vector(1, 0)
        } else if (orientation === SpringOrientation.RIGHT) {
            this.position = new Point(player.position.x + this.config.springDistanceFromPlayer, player.position.y);
            this.orientationVector = new Vector(-1, 0)
        } else if (orientation === SpringOrientation.ABOVE) {
            this.position = new Point(player.position.x, player.position.y-this.config.springDistanceFromPlayer);
            this.orientationVector = new Vector(0, 1);
        } else {
            this.position = new Point(player.position.x, player.position.y+this.config.springDistanceFromPlayer);
            this.orientationVector = new Vector(0, -1);
        }
    }

    public displayStats(): Spring {
        text(`Ep: ${this.energy.toFixed(2)}`, 150, 20);
        return this;
    }

    public animate(): void {
        this.handleKeyEvents().handleContraction().drawSpring();
    }

    private handleContraction(): Spring {
        let x = this.energy / this.config.springConstant;
        this.orientationVector.setAmount(this.config.springBaseLength-x);
        return this;
    }

    private drawSpring(): Spring {
        let endPoint = new Point(this.position.x+this.orientationVector.i, this.position.y+this.orientationVector.j);
        line(this.position.x, this.position.y, endPoint.x, endPoint.y);
        if(!this.fired) this.player.setPosition(endPoint);
        return this;
    }

    private fire(): Spring {
        if(this.fired) return this;
        this.fired = true;
        this.player.setVelocity(this.orientationVector);
        this.player.addEnergy(this.energy);
        this.energy = 0;
    }

    private handleKeyEvents(): Spring {
        if(keyIsDown(38)) { //up arrow
            this.energy += 70;
            if(this.energy > this.config.springMaximumEnergy) this.energy = this.config.springMaximumEnergy;
        }
        if(keyIsDown(40)) { //down arrow
            this.energy -= 70;
            if(this.energy < 0) this.energy = 0;
        }
        if(keyIsDown(39)) { //left arrow
            this.orientationVector.rotateRight(4);
        }
        if(keyIsDown(37)) { //left arrow
            this.orientationVector.rotateLeft(4)
        }
        if(keyIsDown(32)) { //space
            this.fire();
        }
        return this;
    }
}