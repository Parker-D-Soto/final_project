class doorScene extends Phaser.Scene {
    constructor() {
        super("doorScene");
    }

    preload(){
        this.load.image('door1', './assets/door1.png'); //dimensions: 512 x 576
        this.load.image('door2', './assets/door2.png'); //dimensions: 512 x 576
        this.load.image('saloonTheater', './assets/saloon theater.png'); //dimensions: 1024 x 576
        this.load.image('key1', './assets/key1.png');
        this.load.image('key2', './assets/key2.png');
        this.load.image('odd', './assets/dieODD.png');
        this.load.image('even', './assets/dieEVEN.png');
        this.load.image('sq', './assets/testerSquare.png');

        //load spritesheets
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 60, frameHeight: 104, startFrame: 0, endFrame: 13}); //dimensions: 60 x 104
        this.load.spritesheet('bartender', './assets/bartender.png', {frameWidth: 60, frameHeight: 140}); //dimensions: 60 x 140
        this.load.spritesheet('gambler', './assets/gambler.png', {frameWidth: 96, frameHeight: 132}); //dimensions: 96 x 132
        this.load.spritesheet('box', './assets/testersquare.png', {frameWidth: 300, frameHeight: 300}); //dimensions: 96 x 132

        this.load.text('barChat', 'assets/text/Bartender(chat).txt');
        this.load.text('barNar3', 'assets/text/Bartender(narrator_prog_3).txt');
        this.load.text('beginning', 'assets/text/beginning.txt');
        this.load.text('buyMlt10', 'assets/text/Buy(money_less_than_10).txt');
        this.load.text('buyMt10', 'assets/text/Buy(money_more_than_10).txt');
        this.load.text('buyMt300', 'assets/text/Buy(money_more_than_300).txt');
        this.load.text('fightD0', 'assets/text/Fight(drink_0).txt');
        this.load.text('fightD1', 'assets/text/Fight(drink_1).txt');
        this.load.text('gambChat', 'assets/text/Gambler(chat).txt');
        this.load.text('gambNar3', 'assets/text/Gambler(narrator_prog_3).txt');
        this.load.text('gambNar3D1', 'assets/text/Gambler(narrator_prog_4_drink_1).txt');
        this.load.text('gambNar5', 'assets/text/Gambler(narrator_prog_5).txt');
        this.load.text('gamNar5', 'assets/text/Gambling(narrator_prog_5).txt');
        this.load.text('gamNarLt5', 'assets/text/Gambling(narrator_prog_less_than_5).txt');
        this.load.text('gamPlayL', 'assets/text/Gambling(player_loss).txt');
        this.load.text('gamPlayW', 'assets/text/Gambling(player_win).txt');
        this.load.text('Nar0', 'assets/text/Narrator(narrator_prog_0).txt');
        this.load.text('Nar1', 'assets/text/Narrator(narrator_prog_1).txt');
        this.load.text('Nar2', 'assets/text/Narrator(narrator_prog_2).txt');
        this.load.text('Nar3G1B1', 'assets/text/Narrator(narrator_prog_3_gambler_prog_1_bartender_prog_1).txt');
        this.load.text('Nar3', 'assets/text/Narrator(narrator_prog_3).txt');

        this.load.audio('aSound', "./assets/sfx/a.wav");
        this.load.audio('bSound', "./assets/sfx/b.wav");
        this.load.audio('cSound', "./assets/sfx/c.wav");
        this.load.audio('dSound', "./assets/sfx/d.wav");
        this.load.audio('eSound', "./assets/sfx/e.wav");
        this.load.audio('fSound', "./assets/sfx/f.wav");
        this.load.audio('music', "./assets/sfx/bar_music.wav")
    }

    create(){
        this.input.addPointer(1); //needed for all the interactive objects

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //WASD Inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //starting dialogue update as game goes on, dialogue is global variable
        dialogue = this.cache.text.get('beginning').split("\n").reverse();

        //background
        this.saloonTheater = this.add.image(-512, -100, 'saloonTheater').setOrigin(0,0); 

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

        //doors
        this.door1 = this.add.image(0, 0, 'door1').setOrigin(0,0).setInteractive({ draggable: true });
        this.door2 = this.add.image(game.config.width / 2, 0, 'door2').setOrigin(0,0).setInteractive({ draggable: true });

        //player prefab
        this.player = new playerSprite(this, game.config.width / 3, 400, 'player').setOrigin(0.5, 0.5);
        
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

        this.diBox = this.add.rectangle(0, 0, game.config.width, game.config.height / 4, 0x000000).setOrigin(0, 0);
        this.diBox.setAlpha(0.5)
        //makes a transparent rectangle used for the dialogue box

        this.diaText = this.add.text(120, 0, dialogue.pop(), this.dialogueConfig).setOrigin(0, 0);
        //the actual text object

        //For Gambling Game
        this.oddButton = this.add.image(2000, 400, 'odd').setOrigin(0.5, 0.5).setInteractive();
        this.evenButton = this.add.image(2000, 500, 'even').setOrigin(0.5, 0.5).setInteractive();
        checker = false;
        gamePlayed = false;
        amount = 0;

        this.physics.add.collider(this.player, this.bartender);
        this.physics.add.collider(this.player, this.gambler); 
        this.physics.add.collider(this.player, this.bar);
        this.physics.add.collider(this.player, this.table);
        this.physics.add.collider(this.player, this.wall); 

        //Door interactions
        this.door1.on('drag', function (pointer, dragX, dragY) {

            if(dragX <= 0) {
                this.x = dragX;
            }
        });

        this.door2.on('drag', function (pointer, dragX, dragY) {

            if(dragX >= game.config.width / 2) {
                this.x = dragX;
            }
    
        });

        this.input.on('pointerdown', () => this.updateDia(this.diaText, this.diBox) );
        //removes text box when screen is clicked

        //helper button
        this.hButt = this.add.image(50, 50, 'sq').setOrigin(0, 0).setInteractive();

        this.hButt.on('pointerdown', () => this.askHelp(this.diaText, this.diBox) );
        //Press the helper button to trigger dialogue

        this.gambler.on('pointerdown', () => this.askGambler(this.diaText, this.diBox, this.oddButton, this.evenButton) );
        //Press the gambler to trigger dialogue and/or game

        this.oddButton.on('pointerdown', () => this.checkOdd(this.evenButton, this.oddButton) );
        this.evenButton.on('pointerdown', () => this.checkEven(this.oddButton, this.evenButton) );
        //for gambling game
    }
    update(){
        if(!diaBoo && !gambleGame) {
            this.door1.x = game.config.width / 2 - this.door2.x;
            this.door2.x = game.config.width / 2 - this.door1.x;
            this.player.update();
            //updates the door movements, and player movements

            if(fight_prog == 1) {
                fight_prog = 0;
                diaBoo = true;
                dialogue = this.cache.text.get('fightD0').split("\n").reverse();
                this.diaText.text = dialogue.pop();
                this.diBox.setAlpha(0.5);
            }
            if(fight_prog == 2) {
                fight_prog = 0;
                diaBoo = true;
                dialogue = this.cache.text.get('fightD1').split("\n").reverse();
                this.diaText.text = dialogue.pop();
                this.diBox.setAlpha(0.5);
            }
            if(gamblerPhrase) {
                diaBoo = true;
                dialogue = this.cache.text.get('gambChat').split("\n").reverse();
                this.diaText.text = dialogue.pop();
                this.diBox.setAlpha(0.5);
                gamblerPhrase = false;
            }
        } else if(gambleGame) {
            if(gamePlayed) { //checks first to see if the game's completed
                if(checker) {
                    if(winStreek <= 5) {
                        diaBoo = true;
                        if (winStreek == 5) {
                            dialogue = this.cache.text.get('gamNar5').split("\n").reverse();
                        } else {
                            dialogue = this.cache.text.get('gamPlayW').split("\n").reverse();
                        }
                        this.diaText.text = dialogue.pop();
                        this.diBox.setAlpha(0.5);
                        money += 1;
                        winStreek += 1;
                    } else {
                        diaBoo = true;
                        dialogue = this.cache.text.get('gamPlayW').split("\n").reverse();
                        this.diaText.text = dialogue.pop();
                        this.diBox.setAlpha(0.5);
                        money += 100;
                        winStreek += 1;
                    }
                } else {
                    diaBoo = true;
                    dialogue = this.cache.text.get('gamPlayL').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    if(winStreek > 5) {
                        money -= 99;
                    }
                    money -= 1;
                    winStreek = 0;
                }
                //some greetings depending if they got it right or wrong
                this.oddButton.x = 2000;
                this.evenButton.x = 2000;
                gambleGame = false;
                //I send the buttons away so the player can't see or press them

                if(gambler_prog < 2) {
                    gambler_prog = 2;
                }
                gamblerPhrase = true;
            }
        }

        if(this.door1.x < 0 && help_prog < 2) {
            help_prog = 2;
            this.music.play();
        } // triggers progress through the story

        if(bartender_prog == 2 && gambler_prog == 2 && help_prog < 4) {
            help_prog = 4;
        }
    }

    askHelp(diaText, diBox) {
        if(!diaBoo && !gambleGame) {
            if(help_prog == 0) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar0').split("\n").reverse();
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
            } else if (help_prog == 4) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar3G1B1').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            }
        } 
    }
    //Function for triggering dialogue via the helper button using progression numbers 

    updateDia(diaText, diBox) {
        if(!gambleGame) {
            if(pressedDia) {
                pressedDia = false;
            } else {
                if(dialogue.length == 0) {
                    diBox.setAlpha(0);
                    diaBoo = false;
                    diaText.text = "";
                } else {
                    diaBoo = true;
                    var diaString = dialogue.pop();
                    diaText.text = diaString
                } 
            } 
        }
    }
    //When there is dialogue it continues the dialogue

    playPiano(sound, diaText, diBox) {
        if(!diaBoo && !gambleGame) {
            sound.play();
            if(help_prog < 3) {
                help_prog = 3;
            }
            if(sound == this.keyASound) {
                if(bartender_prog < 1) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('barNar3').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    bartender_prog = 1
                    if(fight_prog < 1) {
                        fight_prog = 1;
                    }
                } else if (money > 300) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMt300').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                } else if (drink == 2) {
                    if(bartender_prog < 1) {
                        pressedDia = true;
                        diaBoo = true;
                        dialogue = this.cache.text.get('barChat').split("\n").reverse();
                        diaText.text = dialogue.pop();
                        diBox.setAlpha(0.5);
                        bartender_prog = 1
                        if(fight_prog < 2) {
                            fight_prog = 2;
                        }
                    }
                } else if (bartender_prog == 1){
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('barChat').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    if(bartender_prog == 1) {
                        bartender_prog = 2;
                    }
                } else if (money < 10) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMlt10').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                } else if (money > 10 && money < 300) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMt10').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    money -= 10;
                    if(drink < 1) {
                        drink = 1;
                    }
                }
            }
        }
    }
    //Plays piano sounds

    askGambler(diaText, diBox, oddButton, evenButton) {
        if(!diaBoo && !gambleGame) {
            if(gambler_prog == 0) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('gambNar3').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                gambler_prog = 1;
            } else if (drink == 1) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('gambNar3D1').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                drink = 2;
                help_prog = 5;
            } else if (help_prog == 5 && gambler_prog == 2) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('gambNar5').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                gambler_prog = 3;
            } else if(gambler_prog >= 1) {
                if(bartender_prog < 1) {
                    bartender_prog = 1;
                }
                amount = 0;
                gambleGame = true;
                checker = false;
                gamePlayed = false;
                if(winStreek <= 5) {
                    dialogue = this.cache.text.get('gamNarLt5').split("\n").reverse();
                } else {
                    dialogue = this.cache.text.get('gamNar5').split("\n").reverse();
                }
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                amount = Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1);
                //this algorithm simulates 2 6 sided dice, looks weird but please don't touch
                console.log(amount);
                //logs the amount
                oddButton.x = 512; 
                evenButton.x = 512;
            }  
        }
    }

    checkEven(oddButton, evenButton) {
        //player guessed even and this sees if their right
        console.log("even checker");
        console.log(amount);
        if (amount % 2 == 0) {
            checker = true;
        } else {
            checker = false;
        }
        console.log(checker);
        //uses the remainder of 2 to check if even, same thing used to check for odd
        gamePlayed = true;
        oddButton.x = 2000;
        evenButton.x = 2000;
        //sets the game to complete, gets the odd/even button out of here, and brings back
        //the main button
    }

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

}
