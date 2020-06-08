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
    scene: [prisonScene, doorScene]
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

//help button tracker
hTracker = 0;

//Ending Scene
endScene1 = false;

//testing
let checker, gamePlayed;

//console stuff
let help = "So you finally found ME, how can I help YOU?";
let me = "Who am I? I am YOU, YOU are ME"
let you = "YOU are NOTHING, YOU are EVERYTHING"
let nothing = ""
let everything = "01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100"
let g = "You leave the theatre, finally able to take a free step. You bound and leap through the streets you cry out 'freeeeeedom' as you toss yourself into the path of the nearest bus. You win. congrats. ur a cool dude. pround of you. this game was made by Eli Miller, Parker Soto and Vicente Hernandez."