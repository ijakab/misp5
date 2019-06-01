class Spring implements IListenable {
    private energy: number = 0;
    private orientationVector: Vector;
    private position: Point;
    private config: Config = Config.getInstance();

    constructor(positionToReference: Point, private orientation: SpringOrientation) {
        if(orientation === SpringOrientation.LEFT) {
            this.position = new Point(positionToReference.x - 50, positionToReference.y);
            this.orientationVector = new Vector(1, 0)
        } else if (orientation === SpringOrientation.RIGHT) {
            this.position = new Point(positionToReference.x + 50, positionToReference.y);
            this.orientationVector = new Vector(-1, 0)
        } else if (orientation === SpringOrientation.ABOVE) {
            this.position = new Point(positionToReference.x, positionToReference.y-50);
            this.orientationVector = new Vector(0, 1);
        } else {
            this.position = new Point(positionToReference.x, positionToReference.y+50);
            this.orientationVector = new Vector(0, -1);
        }
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
            this.energy += 70;
        }
        if(keyIsDown(40)) { //down arrow
            this.energy -= 70;
            if(this.energy < 0) this.energy = 0;
        }
        if(keyIsDown(39)) { //left arrow
            this.orientationVector.rotateRight(2);
        }
        if(keyIsDown(37)) { //left arrow
            this.orientationVector.rotateLeft(2)
        }
        return this;
    }
}