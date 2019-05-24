 class Player implements IListenable{
    public x: number = 50;
    public y:number = 500;
    public energy:number = 100;
    public velocity: number = 3;

    public animate(config:Config) {
        this.energy -= this.velocity;
        if(this.energy > 0) {
            this.y -= this.velocity;
        }
    }

    public handleTimerEvent(): void {
        console.log('lalalla')
    }
 }