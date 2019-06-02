class Vector {
    constructor(public i: number, public j: number) {
    }

    public amount(): number {
        return Math.sqrt(this.i*this.i + this.j*this.j)
    }

    public angle(): number {
        let atan = Math.atan(this.j/this.i)
        if(this.i < 0) atan += Math.PI;
        return atan;
    }

    public setAmount(newAmount: number): Vector {
        let ratio: number = newAmount / this.amount();
        this.i *= ratio;
        this.j *= ratio;
        return this;
    }

    public setAngle(angle: number): Vector {
        angle = angle % (2*Math.PI);
        let oldAmount = this.amount();
        this.i = 1; //arbitrary
        if((angle > Math.PI/2 && angle < 3*Math.PI/2) || angle < -Math.PI/2) this.i = -1;
        this.j = this.i * Math.tan(angle); //j = i*tan(angle), and i = 1
        this.setAmount(oldAmount); //we don't change amount
        return this;
    }

    public rotateRight(angle: number): Vector {
        let oldAngle = this.angle();
        this.setAngle(oldAngle + angle * Math.PI/180);
        return this;
    }

    public rotateLeft(angle: number): Vector {
        this.setAngle(this.angle() - angle * Math.PI/180);
        return this;
    }
}