class Vector {
    constructor(public i: number, public j: number) {
    }

    public amount() {
        return Math.sqrt(this.i*this.i + this.j*this.j)
    }

    public angle() {
        return Math.atan(this.j/this.i)
    }
}