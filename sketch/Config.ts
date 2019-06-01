class Config {
    public energyLossConstant: number = 0.005;

    public springConstant: number = 25;
    public springBaseLength: number = 100;

    constructor(public frictionFactor:number=2, public playerMass:number=10) {}

    private static instance: Config;
    public static getInstance(): Config {
        if(this.instance) return this.instance;
        else {
            this.instance = new Config();
            this.instance.loadConfig();
            return this.instance;
        }
    }

    public loadConfig() {
        this.frictionFactor = Number(localStorage.getItem('frictionFactor')) || 2;
        this.playerMass = Number(localStorage.getItem('playerMass')) || 10;
    }
}