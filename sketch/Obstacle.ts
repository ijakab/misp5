class Obstacle {
    constructor(public startPoint: Point, public endPoint: Point) {

    }

    public checkCollision(player: Player): boolean { //collision -1 none, 0 normal and 1 is for edge collision
        let vectorAB = createVector(
            this.endPoint.x - this.startPoint.x,
            this.endPoint.y - this.startPoint.y
        );
        let vectorAR = createVector(
            player.position.x - this.startPoint.x,
            player.position.y - this.startPoint.y
        );
        let vectorBR = createVector(
            player.position.x - this.endPoint.x,
            player.position.y - this.endPoint.y
        );
        let distance: number = -1, collision: number = -1;
        let vectorProjection = vectorAB.copy().mult(vectorAR.dot(vectorAB) / vectorAB.magSq());
        if (vectorProjection.magSq() <= vectorAB.magSq() && vectorProjection.angleBetween(vectorAB) == 0) {//line
            collision = 0;
            distance = createVector(vectorProjection.x - vectorAR.x, vectorProjection.y - vectorAR.y).mag();
        } else {//edge collision
            collision = 1;
            distance = vectorAB.magSq() > vectorProjection.magSq() ?
                vectorAR.mag() : vectorBR.mag();
        }
        if (distance != -1 && distance <= (collision == 0 ? player.radius / 2 + player.radius / 15 : player.radius / 2)) {
            switch (collision) {
                case 1:
                    Obstacle.handleEdgeCollision(
                        vectorAB.magSq() < vectorProjection.magSq() ? this.endPoint : this.startPoint,
                        player
                    );
                    break;
                case 0:
                    let vectorNormal = createVector(vectorProjection.x - vectorAR.x, vectorProjection.y - vectorAR.y).normalize();
                    Obstacle.handleLineCollision(player, vectorNormal, vectorAB);
                    break;
                default:
                    return false;
            }
            return true;
        }
        return false;
    }

    private static handleEdgeCollision(collPosition: Point, player: Player) {
        let Vrx: number = (player.position.x - collPosition.x) / (player.radius / 2);
        let Vry: number = (player.position.y - collPosition.y) / (player.radius / 2);
        let vector = player.velocity;
        vector.i = Vrx;
        vector.j = Vry;
        player.setVelocity(vector);
        console.log("edge collision");
        player.onCollide();
    }

    private static handleLineCollision(player: Player, vectorNormal: p5.Vector, vectorAB: p5.Vector) {
        let vectorReflection = (
            createVector(player.velocity.i, player.velocity.j)
        ).sub(vectorNormal.mult(2 * createVector(player.velocity.i, player.velocity.j).dot(
            vectorNormal
            ))
        );
        if (vectorReflection.angleBetween(vectorAB)) {
            player.velocity.i = vectorReflection.x;
            player.velocity.j = vectorReflection.y;
        }
        player.onCollide();
    }

}