class gambleTest extends Phaser.Scene {
    //This one was a little complicated
    //First off I had to make global variables to keep track of the game and
    //To check if it was odd or even
    //Thats found in main.js

    //for reference when playing Top button is ODD, bottom is EVEN
    constructor() {
        super("gambleTest");
    }

    preload(){
        this.load.image('sq', './assets/testerSquare.png'); //tester image
    }

    create(){
        var amount = 0; //we start with an amount that'll change later

        checker = false;
        gamePlayed = false;
        //we set the checker(checks if odd or even Boolean)
        //and the gameplayed(see's if game's completed)
        //to False
        this.talker = this.add.text(0, 0, "Wanna Gamble Press the Button").setOrigin(0, 0);
        //set up the game with some chatting

        this.button = this.add.image(512, 236, 'sq').setOrigin(0.5, 0.5).setInteractive();
        this.oddButton = this.add.image(2000, 118, 'sq').setOrigin(0.5, 0.5).setInteractive();
        this.evenButton = this.add.image(2000, 354, 'sq').setOrigin(0.5, 0.5).setInteractive();
        //these buttons are to act as a trigger, can change later

        this.button.on('pointerdown', () => this.playGamble(this.oddButton, this.evenButton, amount, this.talker, this.button) );
        this.oddButton.on('pointerdown', () => this.checkOdd(amount, this.evenButton, this.button, this.oddButton) );
        this.evenButton.on('pointerdown', () => this.checkEven(amount, this.oddButton, this.button, this.evenButton) );
        //the buttons activation is by pressing and trigger different functions
    }

    update() {
        if(gamePlayed) { //checks first to see if the game's completed
            if(checker) {
                this.talker.text = "Correct, click to play again"
            } else {
                this.talker.text = "Wrong, click to play again"
            }
            //some greetings depending if they got it right or wrong
            this.oddButton.x = 2000;
            this.evenButton.x = 2000;
            //I send the buttons away so the player can't see or press them
        }
    }

    playGamble(oddButton, evenButton, amount, talker, button) { //starts the game
        gamePlayed = false; //game is not completed
        talker.text = "Odd or Even?" //sets up the conversation
        oddButton.x = 512; 
        evenButton.x = 512;
        //lets the players see the choices
        button.x = 2000;
        //gets the started button out of here
        amount = Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1);
        //this algorithm simulates 2 6 sided dice, looks weird but please don't touch
        console.log(amount);
        //logs the amount
    }

    checkEven(amount, oddButton, button, evenButton) {
        //player guessed even and this sees if their right
        if (amount % 2 == 0) {
            checker = true;
        } else {
            checker = false;
        }
        //uses the remainder of 2 to check if even, same thing used to check for odd
        gamePlayed = true;
        oddButton.x = 2000;
        evenButton.x = 2000;
        button.x = 512
        //sets the game to complete, gets the odd/even button out of here, and brings back
        //the main button
    }

    checkOdd(amount, evenButton, button, oddButton) {
        //same thing as check even pretty much
        if (amount % 2 != 0) {
            checker = true;
        } else {
            checker = false;
        }
        gamePlayed = true;
        oddButton.x = 2000;
        evenButton.x = 2000;
        button.x = 512
    }
}