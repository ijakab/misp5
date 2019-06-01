class Spring implements IListenable {
    private energy: number = 0;
    private orientationVector: Vector;
    private config: Config = Config.getInstance();

    constructor(private positionToReference: Point, private orientation: SpringOrientation) {
    }

    public displayStats(): Spring {
        text(`Ep: ${this.energy.toFixed(2)}`, 150, 20);
        return this;
    }

    public animate(): void {
        this.handleKeyEvents().drawSpring();
    }

    private drawSpring(): Spring {
        return this;
    }

    private handleKeyEvents(): Spring {
        if(keyIsDown(38)) { //up arrow
            this.energy += 100;
        }
        if(keyIsDown(40)) { //down arrow
            this.energy -= 100;
        }
        if(keyIsDown(37)) { //left arrow

        }
        if(keyIsDown(39)) { //left arrow

        }
        return this;
    }
}