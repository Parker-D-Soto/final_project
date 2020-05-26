let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 576 ,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [doorScene]
};

let game = new Phaser.Game(config);

//movement
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyA, keyS, keyD;

//dialogue progressions
let narrator_prog = 0
let bartender_prog = 0
let gambler_prog = 0
let drink = 0

//gambling progress
let winStreek = 0;

//gambler help
let amount = 0;

//Helper Button Progression
let help_prog = 0;

//Fight Helper 
let fight_prog = 0;

//Dialogue Helper
let dialogue;
let diaBoo = true;
let pressedDia = false;
let gamblerPhrase = false;

//Money Var
let money = 0;

//Sees when gamble game starts
let gambleGame = false;

//chatting triggers
let gamblerChat = false;
let barChat = false;

//testing
let checker, gamePlayed;