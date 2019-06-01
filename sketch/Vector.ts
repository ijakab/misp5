class Vector {
    constructor(public i: number, public j: number) {
    }

    public amount() {
        return Math.sqrt(this.i*this.i + this.j*this.j)
    }

    public angle() {
        return Math.atan(this.j/this.i)
    }

    public setAmount(newAmount: number): Vector {
        let ratio: number = newAmount / this.amount();
        this.i *= ratio;
        this.j *= ratio;
        return this;
    }
}