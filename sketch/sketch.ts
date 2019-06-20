// @ts-ignore
let levelNumber = localStorage.getItem('currentLevel') || 0;
let level:Level = new Level(Number(levelNumber)); //todo from localstorage
let bg: p5.Image;
let config = Config.getInstance();

function setup() {
    createCanvas(500, 500);
    strokeWeight(2);
    stroke(51);
    textSize(20);


    setBackground([
        {
            to: 0.3,
            imagePath: 'assets/background.jpg',
            debug: 'leg'
        },
        {
            from: 0.3,
            to: 0.6,
            imagePath: 'assets/background.jpg',
            debug: 'trava'
        },
        {
            from: 0.6,
            to: 0.9,
            imagePath: 'assets/background.jpg',
            debug: 'bakar'
        },
        {
            from: 0.9,
            imagePath: 'assets/background.jpg',
            debug: 'guma'
        }
    ]);
    bg = loadImage('assets/background.jpg');
}

function draw() {
    background(bg);
    level.animate();
}

function setBackground(backgroundOptions: Array<any>) {
    for(let backgroundOption of backgroundOptions) {
        if(!backgroundOption.from) backgroundOption.from = 0;
        if(!backgroundOption.to) backgroundOption.to = 1;
        if(config.frictionFactor > config.maximumFrictionFactor * backgroundOption.from && config.frictionFactor <= config.maximumFrictionFactor * backgroundOption.to) {
            console.log('bg je ', backgroundOption.debug);
            bg = loadImage(backgroundOption.imagePath);
        }
    }
}