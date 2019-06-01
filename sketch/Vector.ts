class Vector {
    constructor(public i: number, public j: number) {
    }

    public amount(): number {
        return Math.sqrt(this.i*this.i + this.j*this.j)
    }

    public angle(): number {
        return Math.atan(this.j/this.i)
    }

    public setAmount(newAmount: number): Vector {
        let ratio: number = newAmount / this.amount();
        this.i *= ratio;
        this.j *= ratio;
        return this;
    }

    public setAngle(angle: number): Vector {
        let oldAmount = this.amount();
        this.i = 1; //arbitrary
        this.j = Math.tan(angle); //j = i*tan(angle), and i = 1
        this.setAmount(oldAmount); //we don't change amount
        return this;
    }

    public rotateRight(angle: number): Vector {
        this.setAngle(this.angle() + angle * Math.PI/180);
        return this;
    }

    public rotateLeft(angle: number): Vector {
        this.setAngle(this.angle() - angle * Math.PI/180);
        return this;
    }
}