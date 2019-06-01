class Spring implements IListenable {
    private energy: number = 0;

    constructor(positionToReference: Point, orientation: SpringOrientation) {
    }

    public displayStats(): Spring {
        text(`Ep: ${this.energy.toFixed(2)}`, 150, 20);
        return this;
    }

    public animate(): void {
    }
}