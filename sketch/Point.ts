class Point {
    constructor(public x:number, public y: number) {

    }

    public addVelocity(velocity: Vector): Point {
        this.x += velocity.i;
        this.y += velocity.j;
        return this;
    }
}