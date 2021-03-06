class Config {
    public energyLossConstant: number = 0.002;

    public springConstant: number = 25;
    public springBaseLength: number = 100;
    public springDistanceFromPlayer: number = 70;
    public springMaximumEnergy: number = 1800;
    public maximumFrictionFactor: number = 200;
    public initialPotentialEnergy: number = 0;

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
        let chosenEnergy = Number(localStorage.getItem('initialPotentialEnergy')) || 0;
        if(chosenEnergy < 0) chosenEnergy = 0;
        if(chosenEnergy > this.springMaximumEnergy) chosenEnergy = this.springMaximumEnergy;
        this.initialPotentialEnergy = chosenEnergy;
    }
}