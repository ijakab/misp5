class Point {
    constructor(public x:number, public y: number) {

    }

    public addVelocity(velocity: Vector): Point {
        this.x += velocity.i;
        this.y += velocity.j;
        return this;
    }

    public isSame(otherPoint: Point): boolean {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    }

    public distanceFrom(otherPoint: Point): number {
        let xSquared = (this.x-otherPoint.x) * (this.x-otherPoint.x);
        let ySquared = (this.y-otherPoint.y) * (this.y-otherPoint.y);
        return Math.sqrt(xSquared+ySquared);
    }

    public isInRadius(otherPoint: Point, radius: number) {
        return this.distanceFrom(otherPoint) <= radius;
    }
}