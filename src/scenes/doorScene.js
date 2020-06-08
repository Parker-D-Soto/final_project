class doorScene extends Phaser.Scene {
    constructor() {
        super("doorScene");
    }

    preload(){
        //Loading images
        this.load.image('door1', './assets/door1.png'); //dimensions: 512 x 576
        this.load.image('door2', './assets/door2.png'); //dimensions: 512 x 576
        this.load.image('saloonTheater', './assets/saloon theater.png'); //dimensions: 1024 x 576
        this.load.image('key1', './assets/key1.png');
        this.load.image('key2', './assets/key2.png');
        this.load.image('odd', './assets/dieODD.png');
        this.load.image('even', './assets/dieEVEN.png');
        this.load.image('sq', './assets/testerSquare.png');
        this.load.image('bar_choice', './assets/bartender_choices.png');
        this.load.image('gamble_choice', './assets/gambler_choices.png');
        this.load.image('door_choice', './assets/door_choices.png');
        this.load.image('gIcon', './assets/gambler_head.png');
        this.load.image('bIcon',  './assets/bartender head.png');
        this.load.image('whiskey', './assets/whiskey.png');
        this.load.image('fireball', './assets/fireball.png');


        //Firesprites
        this.load.image('fire',  './assets/fire.png');
        
        //Spritesheets
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 60, frameHeight: 104, startFrame: 0, endFrame: 13}); //dimensions: 60 x 104
        this.load.spritesheet('bartender', './assets/bartender.png', {frameWidth: 60, frameHeight: 140}); //dimensions: 60 x 140
        this.load.spritesheet('gambler', './assets/gambler.png', {frameWidth: 96, frameHeight: 132}); //dimensions: 96 x 132
        this.load.spritesheet('help', './assets/narrator.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('box', './assets/testerSquare.png', {frameWidth: 300, frameHeight: 300}); //dimensions: 96 x 132

        //Text used throughout scene
        this.load.text('barChat', 'assets/text/Bartender(chat).txt');
        this.load.text('barDrink2', 'assets/text/Bartender(drink2).txt');
        this.load.text('barNar3', 'assets/text/Bartender(narrator_prog_3).txt');
        this.load.text('beginning', 'assets/text/beginning.txt');
        this.load.text('buyMlt10', 'assets/text/Buy(money_less_than_10).txt');
        this.load.text('buyMt10', 'assets/text/Buy(money_more_than_10).txt');
        this.load.text('buyMt300', 'assets/text/Buy(money_more_than_300).txt');
        this.load.text('fightD0', 'assets/text/Fight(drink_0).txt');
        this.load.text('fightD1', 'assets/text/Fight(drink_1).txt');
        this.load.text('fightD2', 'assets/text/Fight(drink_2).txt');
        this.load.text('gambChat', 'assets/text/Gambler(chat).txt');
        this.load.text('gambNar3', 'assets/text/Gambler(narrator_prog_3).txt');
        this.load.text('gambNar3D1', 'assets/text/Gambler(narrator_prog_4_drink_1).txt');
        this.load.text('gambNar5', 'assets/text/Gambler(narrator_prog_5).txt');
        this.load.text('gambD3', 'assets/text/Gambler(drink3).txt');
        this.load.text('gambD4', 'assets/text/Gambler(drink4).txt');
        this.load.text('gamNar5', 'assets/text/Gambling(narrator_prog_5).txt');
        this.load.text('gamNarLt5', 'assets/text/Gambling(narrator_prog_less_than_5).txt');
        this.load.text('gamPlayL', 'assets/text/Gambling(player_loss).txt');
        this.load.text('gamPlayW', 'assets/text/Gambling(player_win).txt');
        this.load.text('Nar0', 'assets/text/Narrator(narrator_prog_0).txt');
        this.load.text('Nar1', 'assets/text/Narrator(narrator_prog_1).txt');
        this.load.text('Nar2', 'assets/text/Narrator(narrator_prog_2).txt');
        this.load.text('Nar3G1B1', 'assets/text/Narrator(narrator_prog_3_gambler_prog_1_bartender_prog_1).txt');
        this.load.text('NarControl', 'assets/text/Narrator(control).txt');
        this.load.text('Nar3', 'assets/text/Narrator(narrator_prog_3).txt');
        this.load.text('Nar4', 'assets/text/Narrator(narrator_prog_4).txt');
        this.load.text('Nar6', 'assets/text/Narrator(narrator_prog_6).txt');
        this.load.text('Hint1', 'assets/text/Hint(narrator_prog_1).txt');
        this.load.text('Hint2', 'assets/text/Hint(narrator_prog_3_gambler&bartender_prog_1).txt');
        this.load.text('Hint3', 'assets/text/Hint(narrator_prog_4).txt');

        //Audio used in the scene
        this.load.audio('aSound', "./assets/sfx/a.wav");
        this.load.audio('bSound', "./assets/sfx/b.wav");
        this.load.audio('cSound', "./assets/sfx/c.wav");
        this.load.audio('dSound', "./assets/sfx/d.wav");
        this.load.audio('eSound', "./assets/sfx/e.wav");
        this.load.audio('fSound', "./assets/sfx/f.wav");
        this.load.audio('music', "./assets/sfx/bar_music.wav");
        this.load.audio('gunshot', "./assets/sfx/gunshot.wav");
        this.load.audio('applause', "./assets/sfx/applause.wav");
    }

    create(){
        //reset global variables
        hTracker = 0;
        narrator_prog = 0;
        bartender_prog = 0;
        gambler_prog = 0;
        drink = 0;
        winStreek = 0;
        amount = 0;
        help_prog = 0;
        money = 0;
        endScene1 = false;
        g = "You leave the theatre, finally able to take a free step. You bound and leap through the streets you cry out 'freeeeeedom' as you toss yourself into the path of the nearest bus. You win. congrats. ur a cool dude. pround of you. this game was made by Eli Miller, Parker Soto and Vicente Hernandez."
        diaBoo = true;
        pressedDia = false;
        gamblerPhrase = false;

        //Used to have two pointers for the doors being able to drag
        this.input.addPointer(1); //needed for all the interactive objects

        //Defining Arrow Keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //WASD Inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Restart Key
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //starting dialogue update as game goes on, dialogue is global variable
        dialogue = this.cache.text.get('beginning').split("\n").reverse();

        //background
        this.saloonTheater = this.add.image(-512, -100, 'saloonTheater').setOrigin(0,0); 
        
        //An image of choices visible to player when near the bartender
        this.bar_choice = this.add.image(50, 230, 'bar_choice').setOrigin(0,0).setScale(.1,.1)
        this.bar_choice.setAlpha(0)

        //An image of choices visible to player when near the Gambler
        this.gamble_choice = this.add.image(890, 260, 'gamble_choice').setOrigin(0,0).setScale(.1,.1)
        this.gamble_choice.setAlpha(0)
        this.door_choice = this.add.image(790, 60, 'door_choice').setOrigin(0,0).setScale(.1,.1)

        //load music
        this.music = this.sound.add('music')
        this.music.setLoop(true);

        //piano keys
        this.keyC = this.add.image(528, 264, 'key2').setOrigin(0,0).setInteractive();;
        this.keyD = this.add.image(540, 264, 'key2').setOrigin(0,0).setInteractive();;
        this.keyE = this.add.image(552, 264, 'key1').setOrigin(0,0).setInteractive();;
        this.keyF = this.add.image(564, 264, 'key2').setOrigin(0,0).setInteractive();;
        this.keyA = this.add.image(588, 264, 'key2').setOrigin(0,0).setInteractive();;
        this.keyB = this.add.image(600, 264, 'key1').setOrigin(0,0).setInteractive();;

        //Piano Sounds
        this.keyCSound = this.sound.add('cSound');
        this.keyDSound = this.sound.add('dSound');
        this.keyESound = this.sound.add('eSound');
        this.keyFSound = this.sound.add('fSound');
        this.keyASound = this.sound.add('aSound');
        this.keyBSound = this.sound.add('bSound');

        //Piano Click Functions
        this.keyC.on('pointerdown', () => this.playPiano(this.keyCSound, this.diaText, this.diBox) );
        this.keyD.on('pointerdown', () => this.playPiano(this.keyDSound, this.diaText, this.diBox) );
        this.keyE.on('pointerdown', () => this.playPiano(this.keyESound, this.diaText, this.diBox) );
        this.keyF.on('pointerdown', () => this.playPiano(this.keyFSound,this.diaText, this.diBox) );
        this.keyA.on('pointerdown', () => this.playPiano(this.keyASound, this.diaText, this.diBox) );
        this.keyB.on('pointerdown', () => this.playPiano(this.keyBSound, this.diaText, this.diBox) );

        //More sfx
        this.gunsound = this.sound.add('gunshot')
        this.applause = this.sound.add('applause')
        
        //NPCs
        this.bartender = this.physics.add.sprite(40, 364, 'bartender').setOrigin(0,0).setInteractive();
        this.bartender.body.immovable = true;
        this.gambler = this.physics.add.sprite(860, 364, 'gambler').setOrigin(0,0).setInteractive();
        this.gambler.body.immovable = true;

        //furniture
        this.bar = this.physics.add.sprite(120, 270, 'bartender').setOrigin(0,0);
        this.bar.body.immovable = true;
        this.bar.setAlpha(0)
        this.bar.setScale(2)
        this.table = this.physics.add.sprite(750, 380, 'box').setOrigin(0,0);
        this.table.body.immovable = true;
        this.table.setAlpha(0)
        this.table.setScale(2)
        this.wall = this.physics.add.sprite(0, -750, 'box').setOrigin(0,0);
        this.wall.body.immovable = true;
        this.wall.setAlpha(0)
        this.wall.setScale(16)

        //bottles
        this.whiskey = this.add.sprite(800, 420, 'whiskey').setOrigin(0,0);
        this.fireball = this.add.sprite(830, 420, 'fireball').setOrigin(0,0);

        this.whiskey.setAlpha(0);
        this.fireball.setAlpha(0);

        //Fire Images
        this.f1 = this.add.image(120, 270, 'fire').setOrigin(0, 0);
        this.f2 = this.add.image(120, 370, 'fire').setOrigin(0, 0);
        this.f3 = this.add.image(120, 470, 'fire').setOrigin(0, 0);
        this.f4 = this.add.image(120, 120, 'fire').setOrigin(0, 0);
        this.f5 = this.add.image(435, 120, 'fire').setOrigin(0, 0);
        this.f6 = this.add.image(750, 120, 'fire').setOrigin(0, 0);

        //Making the Fire Images initially invisible till end animation
        this.f1.setAlpha(0);
        this.f2.setAlpha(0);
        this.f3.setAlpha(0);
        this.f4.setAlpha(0);
        this.f5.setAlpha(0);
        this.f6.setAlpha(0);

        //Setting an array of fire images to reveal 1 by 1 in end animation
        this.fArray = [this.f1, this.f2, this.f3, this.f4, this.f5, this.f6];

        //Once triggered the beginning of end animation will begin
        this.settingFire = false;

        //doors, are able to be dragged by the player when clicked
        this.door1 = this.add.image(0, 0, 'door1').setOrigin(0,0).setInteractive({ draggable: true });
        this.door2 = this.add.image(game.config.width / 2, 0, 'door2').setOrigin(0,0).setInteractive({ draggable: true });

        //Player Directional Walking Animation Configurations (Will use in the prefab)
        //Order of Animations = Right, Left, Up, Down

        //player prefab
        this.player = new playerSprite(this, game.config.width / 3, 400, 'player').setOrigin(0.5, 0.5);

        //score display
        this.money_display = this.add.text(950, 150, '$' + money)
        
        //Dialogue Text Configuration
        this.dialogueConfig = { 
            //making a config for the actual text
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
            fixedHeight: game.config.height / 4,
            wordWrap: {
                width: game.config.width - 150, 
                //This part is SUPER important
                //It lets us have multiple lines
                callback: null,             
                callbackScope: null,
                useAdvancedWrap: false
            },
        };

        //makes a transparent rectangle used for the dialogue box
        this.diBox = this.add.rectangle(0, 0, game.config.width, game.config.height / 4, 0x000000).setOrigin(0, 0);
        this.diBox.setAlpha(0.5)

        //the actual text object
        this.diaText = this.add.text(120, 0, dialogue.pop(), this.dialogueConfig).setOrigin(0, 0);

        //For Gambling Game
            //An odd and even choice button
            //A checker global variable to see if the player chose correctly
            //A global variable to see if the game is currently being played
            //A global variable to track the amount rolled by the gambler
        this.oddButton = this.add.image(2000, 400, 'odd').setOrigin(0.5, 0.5).setInteractive();
        this.evenButton = this.add.image(2000, 500, 'even').setOrigin(0.5, 0.5).setInteractive();
        checker = false;
        gamePlayed = false;
        amount = 0;

        //Colliders
        this.physics.add.collider(this.player, this.bartender);
        this.physics.add.collider(this.player, this.gambler); 
        this.physics.add.collider(this.player, this.bar, this.updateBar);
        this.physics.add.collider(this.player, this.table, this.updateGambler);
        this.physics.add.collider(this.player, this.wall); 

        //Right Door interactions
        this.door1.on('drag', function (pointer, dragX, dragY) {

            if(dragX <= 0) {
                this.x = dragX;
            }
        });

        //Left Door interactions
        this.door2.on('drag', function (pointer, dragX, dragY) {

            if(dragX >= game.config.width / 2) {
                this.x = dragX;
            }
    
        });

        //removes text box when screen is clicked
        this.input.on('pointerdown', () => this.updateDia(this.diaText, this.diBox) );

        //helper button
        this.hButt = this.add.sprite(32, 32, 'help').setOrigin(0, 0).setInteractive();

        //Icons that will display who is currently talking
        this.gIcon = this.add.sprite(32, 32, 'gIcon').setOrigin(0, 0);
        this.bIcon = this.add.sprite(32, 32, 'bIcon').setOrigin(0, 0);

        //These Icons are initially invisible
        this.gIcon.setAlpha(0);
        this.bIcon.setAlpha(0);
        
        //Press the helper button to trigger dialogue
        this.hButt.on('pointerdown', () => this.askHelp(this.diaText, this.diBox) );

        //for gambling game
            //Does function when the button is pressed
        this.oddButton.on('pointerdown', () => this.checkOdd(this.evenButton, this.oddButton) );
        this.evenButton.on('pointerdown', () => this.checkEven(this.oddButton, this.evenButton) );

        //tween boo
        this.tweened = false;

    }
    update(){
        //When Player is near the NPCs the Dialogue Helpers will appear
        //Each if statements checks for a certain x distance from the NPC activator object
        //Then the appropriate chat appears or dissapears
        if (this.player.x > this.bar.x + this.bar.width + 110) {
            barChat = false;
            this.bar_choice.setAlpha(0)
        }else{
            this.bar_choice.setAlpha(1)
            barChat = true;
        }
        if (this.player.x < this.table.x - 40) {
            gamblerChat = false;
            this.gamble_choice.setAlpha(0)
        }else{
            this.gamble_choice.setAlpha(1)
            gamblerChat = true;
        }

        //The if makes sure, the scene isn't ending
        //  the gambling mini game is not active
        //  and the dialogue parser is not active
        if(!diaBoo && !gambleGame && !endScene1) {

            //Method to restart the game
            if(keyR.isDown) {
                this.scene.start("doorScene"); 
            }

            //updates the door movements, and player movements
            this.door1.x = game.config.width / 2 - this.door2.x;
            this.door2.x = game.config.width / 2 - this.door1.x;
            this.player.update();
            this.money_display.text = '$' + money;
        //Checks for the gamble game is active and the scene is not ending
        } else if(gambleGame && !endScene1) {
            if(gamePlayed) { //checks first to see if the game's completed
                if(checker) { //Then checks to see if the player guessed right
                    if(winStreek <= 5) { //checks the win streak to shift from 1$ bets to 100$ bets
                        diaBoo = true; //dialogue activated
                        if (winStreek == 5) { //If winstreak is activated then the appropriate dialogue is loaded
                            dialogue = this.cache.text.get('gamNar5').split("\n").reverse();
                        } else {
                            //Otherwise the other dialogue is used
                            dialogue = this.cache.text.get('gamPlayW').split("\n").reverse(); 
                        }
                        //Dialogue activator code
                        this.diaText.text = dialogue.pop();
                        this.diBox.setAlpha(0.5);
                        this.hButt.setAlpha(0);
                        this.gIcon.setAlpha(1);
                        money += 1;
                        winStreek += 1;
                    } else {
                        //Dialogue activator code for the non winstreak
                        //This is used throughout the code so let me explain
                        //Whenever I reference similar code as 'loading' dialogue, or something similar 
                        //This is what's happening:
                        diaBoo = true;
                        //This shows that dialogue is being parsed by player
                        dialogue = this.cache.text.get('gamPlayW').split("\n").reverse();
                        //The appropriate text file is split into an array of line of text
                        this.diaText.text = dialogue.pop();
                        //The array is then popped one by one loading the lines whenever the player clicks
                        //The text immediately loads the first line
                        this.diBox.setAlpha(0.5);
                        //The dialogue box is revealed
                        this.hButt.setAlpha(0);
                        this.gIcon.setAlpha(1);
                        //And the appropriate icon is displayer
                            //hButt - Helper
                            //gIcon - Gambler
                            //bIcon - bartender

                        //The below refers to the money won and winstreak of the player
                        money += 100;
                        winStreek += 1;
                    }
                } else {
                    //Dialogue activator code for the loss
                    diaBoo = true;
                    dialogue = this.cache.text.get('gamPlayL').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    if(winStreek > 5) {
                        money -= 99;
                    }
                    //Money loss, and the winstreak is set to 0
                    money -= 1;
                    winStreek = 0;
                }
                //some greetings depending if they got it right or wrong
                this.oddButton.x = 2000;
                this.evenButton.x = 2000;
                gambleGame = false;
                //I send the buttons away so the player can't see or press them

                if(gambler_prog < 2) {
                    //activation of gambling game signals progress to the dialogue progression
                    gambler_prog = 2;
                }
            }
        }

        //When the door is moved, then the dialogue progression is increased appropriately
        //The tracker is reset
        //And the music begins
        if(this.door1.x < 0 && help_prog < 2 && !endScene1) {
            help_prog = 2;
            hTracker = 0;
            this.music.play();
        } // triggers progress through the story

        //Checking for progress among the gambler, and the bartender
        //To progress the help dialogue
        if(bartender_prog == 2 && gambler_prog == 2 && help_prog < 4) {
            help_prog = 4;
            hTracker = 0;
        }

        //This signals the end of the game animation
        if(endScene1 && !diaBoo) {
            //The helper button dissapears
            this.hButt.setAlpha(0);
            //Checks the length of the array of fire assets till it reaches 0 and ensures a fire is not being set
            if(this.fArray.length != 0 && !this.settingFire) {
                //Begins the applause
                this.applause.play()
                this.applause.setLoop(true)
                //A boolean stating that fire is being set to alpha 1
                this.settingFire = true;
                //each fire appears every second till all of the fire appears
                //While a fire is appearing setting fire will remain true
                this.clock = this.time.delayedCall(1000, () => {
                    let fire = this.fArray.pop();
                    fire.setAlpha(1);
                    this.settingFire = false;
                }, null, this);
            //When the array is emptied the tween animation begins, to cause the background
            //and approriate assets to shrink revealing the larger stage
            } else if (this.fArray.length == 0 && !this.tweened) {
                //This tween is special cause its the background
                //It goes from its original x and y to 0,0
                //And it scales down to reveal the grander stage in 8 seconds
                this.tweened = true;
                var tween = this.tweens.add({
                    targets: this.saloonTheater,
                    x: { from: -512, to: 0 },
                    y: { from: -100, to: 0},
                    scale: { from: 1, to: 0.5},
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                }); 

                //The below tweens are special cause they're the assets, and works as follows
                //It scales to half (the same as the background)
                //Now the x and y follow a special algorithm that was made to keep they're relative position
                //The algorith divides the position by half (to account for the halved size of the background)
                //Then it adds half of off distance the position originally had
                //The stage was originally at -512, so it had to be adjusted by half that distance (halved scaled)
                //So x is increased by 256, and the same logic is used for the y
                var tween = this.tweens.add({
                    targets: [this.player],
                    scale: { from: 1, to: 0.5},
                    x: this.player.x / 2 + 256,
                    y: this.player.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.gambler],
                    scale: { from: 1, to: 0.5},
                    x: this.gambler.x / 2 + 256,
                    y: this.gambler.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.bartender],
                    scale: { from: 1, to: 0.5},
                    x: this.bartender.x / 2 + 256,
                    y: this.bartender.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.f1],
                    scale: { from: 1, to: 0.5},
                    x: this.f1.x / 2 + 256,
                    y: this.f1.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.f2],
                    scale: { from: 1, to: 0.5},
                    x: this.f2.x / 2 + 256,
                    y: this.f2.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.f3],
                    scale: { from: 1, to: 0.5},
                    x: this.f3.x / 2 + 256,
                    y: this.f3.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.f4],
                    scale: { from: 1, to: 0.5},
                    x: this.f4.x / 2 + 256,
                    y: this.f4.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.f5],
                    scale: { from: 1, to: 0.5},
                    x: this.f5.x / 2 + 256,
                    y: this.f5.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.f6],
                    scale: { from: 1, to: 0.5},
                    x: this.f6.x / 2 + 256,
                    y: this.f6.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.keyC],
                    scale: { from: 1, to: 0.5},
                    x: this.keyC.x / 2 + 256,
                    y: this.keyC.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.keyD],
                    scale: { from: 1, to: 0.5},
                    x: this.keyD.x / 2 + 256,
                    y: this.keyD.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.keyE],
                    scale: { from: 1, to: 0.5},
                    x: this.keyE.x / 2 + 256,
                    y: this.keyE.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.keyF],
                    scale: { from: 1, to: 0.5},
                    x: this.keyF.x / 2 + 256,
                    y: this.keyF.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.keyA],
                    scale: { from: 1, to: 0.5},
                    x: this.keyA.x / 2 + 256,
                    y: this.keyA.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                var tween = this.tweens.add({
                    targets: [this.keyB],
                    scale: { from: 1, to: 0.5},
                    x: this.keyB.x / 2 + 256,
                    y: this.keyB.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
                //When the tween is activated the below is called
                //This causes the scene to change, and the music to stop after 2 seconds
                //after the completion of 8 second tween
            } else if(this.tweened) {
                this.clock = this.time.delayedCall(10000, () => {
                    this.scene.start("prisonScene"); 
                    this.applause.stop()
                    this.music.stop()
                }, null, this);
            }
        }
    }

    //The helper button activation code
    //Takes in the dialogue box and the dialogue text as arguments
    askHelp(diaText, diBox) {
        if(!diaBoo && !gambleGame && !endScene1) {
            //First ensure the gambling game isn't being player, the dialgue isn't being parsed, and the scene is not ending
            hTracker += 1; 
            //Since the help button is pressed, we increase the tracker
            //The below if else statements work as follows:
                //The help_prog and the hTracker are checked to see where the player is in reference to the dialogue progress tracker
                //Then when the appropriate progress is activated then the associated dialogue is loaded into the text parser
                    //This is done using the repeated text insert code used throughtout the game
            if(help_prog == 0) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar0').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 1 && hTracker >= 3) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Hint1').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 1) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar1').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 2) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar2').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 3) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar3').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 4 && hTracker >= 4) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('NarControl').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 4 && hTracker >= 4) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Hint2').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 4) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar3G1B1').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 5 && hTracker >= 4) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Hint3').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 5) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar4').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if (help_prog == 6) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar6').split("\n").reverse();
                diaText.text = dialogue.pop();
            }
        } 
    }
    //Function for triggering dialogue via the helper button using progression numbers 

    //Function to update the dialogue (central text parser function)
    updateDia(diaText, diBox) {
        //Ensures the mini games is not in progress
        if(!gambleGame) {
            if(pressedDia) {
                //This is used as extra protection from the clicks of the user
                //Because updateDia activates when clicked, and the player clicks the button
                //A weird thing happens that makes the dialogue skip text
                //So this here to prevent that from happening when dialogue is activated by clicking something
                pressedDia = false;
            } else {
                if(dialogue.length == 0) {
                    //If the dialogue (an array of lines) is empty then:
                        //The dialogue box dissapears
                        //The icons are adjusted
                        //The dialogue parser is set to false
                        //And the text is set to empty to disspear
                    diBox.setAlpha(0);
                    this.hButt.setAlpha(1);
                    this.gIcon.setAlpha(0);
                    this.bIcon.setAlpha(0);
                    diaBoo = false;
                    diaText.text = "";
                } else {
                    //If the array still has lines then the next line is popped from the array
                    //and uploaded to the dialogue text
                    diaBoo = true;
                    var diaString = dialogue.pop();
                    diaText.text = diaString
                } 
            } 
        }
    }
    //When there is dialogue it continues the dialogue

    //The piano click functions
    playPiano(sound, diaText, diBox) {
        //Takes in the appropriate piano sound, the dialgue text, and the dialogue box
        if(!diaBoo && !gambleGame && !endScene1) {
            //Plays the appropriate piano sound
            sound.play();
            //Sees that the player is able to play piano and progresses the helper dialogue
            if(help_prog < 3) {
                help_prog = 3;
                hTracker = 0;
            }
            if(sound == this.keyASound && barChat) {
                //This shows key was A for ask and the player is near the bartender
                if (drink < 2) {
                    //Shows that the player has not given the gambler the whiskey, and 
                    //loads the approriate dialogue
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('barNar3').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    //This shows the bartender was asked something and his dialogue is progressed
                    if(bartender_prog < 1) {
                        bartender_prog = 1;
                    }
                } else {
                    //If the whiskey is delivered to the gambler then the dialogue is updated appropriately
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('barDrink2').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                }
            } else if (sound == this.keyBSound && barChat) {
                //This shows the player wants to buy and is near the bar
                if (money > 300 && drink >= 2) {
                    //Money is greater than 300 (price of fireball)
                    //And the player already delivered the whiskey to gambler, so knows about the fireball
                    //So this gives the player appropriate dialgue and gives them the fireball drink
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMt300').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    money -= 300;
                    if (drink < 3) {
                        drink = 3;
                    }
                } else if (money < 10) {
                    //This shows the player can't afford a drink
                    //So they're given the appropriate dialgue
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMlt10').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                } else if (money > 10) {
                    //This shows that the player can afford the whiskey but was unable to get the fireball
                    //Thus the player buys the whiskey, and the dialogue is parsed
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMt10').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    money -= 10;
                    if(drink < 1) {
                        drink = 1;
                    }
                }
            } else if (sound == this.keyCSound && barChat) {
                //This shows the player is chatting with the bartender
                //So the chat dialogue is loaded
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('barChat').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                this.hButt.setAlpha(0);
                this.bIcon.setAlpha(1);
                if(bartender_prog < 2) {
                    bartender_prog = 2;
                }
            } else if (sound == this.keyFSound && barChat) {
                //This shows that the player is trying to fight the bartender
                this.gunsound.play();
                //A gun is shot
                if (drink < 2) {
                    //This shows the gambler does not have any drinks
                    //So the appropriate dialogue is loaded
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('fightD0').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                } else if (drink == 2 || drink == 3) {
                    //This shows the gambler has whiskey, so appropriate dialogue is loaded
                    //and the whiskey png is set to alpha 0
                    this.whiskey.setAlpha(0);
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('fightD1').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                }  else if (drink == 4) {
                    //This shows the fireball is owned by the gambler, and signals the end of the game
                    //So both whiskey (if there) and fireball are destroyed (set to Alpha 0)
                    this.whiskey.setAlpha(0);
                    this.fireball.setAlpha(0);
                    //Trigger end game, and end game dialogue is loaded
                    //The end animation is activated after the dialogue is parsed through
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('fightD2').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    endScene1 = true;
                }
            } else if (sound == this.keyASound && gamblerChat) {
                //This signals the player 'Asking' the gambler
                if (drink == 1) {
                    //This shows the player is giving the gambler whiskey
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar3D1').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    //Appropriate dialogue is processed
                    if(help_prog < 5) {
                        help_prog = 5;
                    }
                    //The progress of help dialogue is increased
                    hTracker = 0;
                    //Thus the help tracker is reset
                    this.whiskey.setAlpha(1);
                    //The whiskey appears
                    drink = 2;
                    //the drink progress tracker is increased
                } else if (drink == 3) {
                    //This shows the player giving the gambler a fireball
                    if(help_prog < 6) {
                        help_prog = 6;
                    }
                    //The help_prog tracker is increased
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambD3').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    //The appropriate dialogue is parsed
                    this.fireball.setAlpha(1);
                    //The fireball png is visible
                    drink = 4;
                    //The drink tracker is increased
                } else if (drink == 4) {
                    //This shows the gambler has a fireball
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambD4').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    //appropriate dialogue is paresed
                } else if (help_prog == 5) {
                    //This shows that the player has given him a whiskey, and
                    //trying to figure out why their key doesn't work
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar5').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    //Appropriate dialogue parsed
                } else {
                    //This shows the player is talking to the gambler prior to the whiskey
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar3').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    gambler_prog = 1;
                    //loads appropriate dialogue
                }
            } else if (sound == this.keyBSound && gamblerChat) {
                //This shows the player wanting to bet with the gambler
                //This means the gambling mini game activates
                if(bartender_prog < 1) {
                    bartender_prog = 1;
                } //updates the bartender dialogue
                amount = 0;
                //resets the amount rolled by the gambler's dice
                gambleGame = true;
                //sets the variable for the mini game to be true
                checker = false;
                //This is meant to check if the player is right or wrong
                gamePlayed = false;
                //Checks to see when the minigame is completed
                if(winStreek <= 5) {
                    //If there is a winstreak different dialogue is loaded
                    dialogue = this.cache.text.get('gamNarLt5').split("\n").reverse();
                } else {
                    dialogue = this.cache.text.get('gamNar5').split("\n").reverse();
                }
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                this.hButt.setAlpha(0);
                this.gIcon.setAlpha(1);
                //Dialogue is parsed
                amount = Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1);
                //this algorithm simulates 2 6 sided dice, looks weird but please don't touch
                console.log(amount);
                //logs the amount
                this.oddButton.x = 512; 
                this.evenButton.x = 512;
                //Allows the buttons to be visible
                //I opted to make them offscreen because its easier to ensure they won't be pressed
                //The gambling game continues in update()
            } else if (sound == this.keyCSound && gamblerChat) {
                //Shows the player wants to chat with gambler
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('gambChat').split("\n").reverse();
                this.diaText.text = dialogue.pop();
                this.diBox.setAlpha(0.5);
                this.hButt.setAlpha(0);
                this.gIcon.setAlpha(1);
                //appropriate dialogue is loaded
            }
        }
    }
    //Plays piano sounds

    //Checks to see if the amount rolled is even (player guessed even in gambling)
    checkEven(oddButton, evenButton) {
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
        //sets the game to complete, gets the odd/even button out of here, and brings back
        //the main button
    }

    //Checks to see if the amount rolled is odd (player guessed odd in gambling)
    checkOdd(evenButton, oddButton) {
        //same thing as check even pretty much
        if (amount % 2 != 0) {
            checker = true;
        } else {
            checker = false;
        }
        gamePlayed = true;
        oddButton.x = 2000;
        evenButton.x = 2000;
    }

    //updates the chat reveals for bar and gambler (two functions below)
    updateBar() {
        barChat = true;
        gamblerChat = false;
    }

    updateGambler() {
        gamblerChat = true;
        barChat = false;
    }
}
