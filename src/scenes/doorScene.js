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
        this.load.image('bar_choice', './assets/bartender_choices.png');
        this.load.image('gamble_choice', './assets/gambler_choices.png');
        this.load.image('door_choice', './assets/door_choices.png');
        this.load.image('gIcon', './assets/gambler_head.png');
        this.load.image('bIcon',  './assets/bartender head.png');

        //Firesprites
        this.load.image('fire',  './assets/fire.png');

        //load spritesheets
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 60, frameHeight: 104, startFrame: 0, endFrame: 13}); //dimensions: 60 x 104
        this.load.spritesheet('bartender', './assets/bartender.png', {frameWidth: 60, frameHeight: 140}); //dimensions: 60 x 140
        this.load.spritesheet('gambler', './assets/gambler.png', {frameWidth: 96, frameHeight: 132}); //dimensions: 96 x 132
        this.load.spritesheet('help', './assets/narrator.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('box', './assets/testerSquare.png', {frameWidth: 300, frameHeight: 300}); //dimensions: 96 x 132

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
        this.load.text('Nar4', 'assets/text/Narrator(narrator_prog_4).txt')

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
        
        //key prompts
        this.bar_choice = this.add.image(50, 230, 'bar_choice').setOrigin(0,0).setScale(.1,.1)
        this.bar_choice.setAlpha(0)
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

        //Fire Images
        this.f1 = this.add.image(120, 270, 'fire').setOrigin(0, 0);
        this.f2 = this.add.image(120, 370, 'fire').setOrigin(0, 0);
        this.f3 = this.add.image(120, 470, 'fire').setOrigin(0, 0);
        this.f4 = this.add.image(120, 120, 'fire').setOrigin(0, 0);
        this.f5 = this.add.image(435, 120, 'fire').setOrigin(0, 0);
        this.f6 = this.add.image(750, 120, 'fire').setOrigin(0, 0);

        this.f1.setAlpha(0);
        this.f2.setAlpha(0);
        this.f3.setAlpha(0);
        this.f4.setAlpha(0);
        this.f5.setAlpha(0);
        this.f6.setAlpha(0);

        this.fArray = [this.f1, this.f2, this.f3, this.f4, this.f5, this.f6];

        this.settingFire = false;

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

        //Colliders
        this.physics.add.collider(this.player, this.bartender);
        this.physics.add.collider(this.player, this.gambler); 
        this.physics.add.collider(this.player, this.bar, this.updateBar);
        this.physics.add.collider(this.player, this.table, this.updateGambler);
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
        this.hButt = this.add.sprite(32, 32, 'help').setOrigin(0, 0).setInteractive();

        this.gIcon = this.add.sprite(50, 50, 'gIcon').setOrigin(0, 0);
        this.bIcon = this.add.sprite(50, 50, 'bIcon').setOrigin(0, 0);

        this.gIcon.setAlpha(0);
        this.bIcon.setAlpha(0);

        this.hButt.on('pointerdown', () => this.askHelp(this.diaText, this.diBox) );
        //Press the helper button to trigger dialogue


        this.oddButton.on('pointerdown', () => this.checkOdd(this.evenButton, this.oddButton) );
        this.evenButton.on('pointerdown', () => this.checkEven(this.oddButton, this.evenButton) );
        //for gambling game

        //tween boo
        this.tweened = false;

    }
    update(){
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

        if(!diaBoo && !gambleGame && !endScene1) {
            this.door1.x = game.config.width / 2 - this.door2.x;
            this.door2.x = game.config.width / 2 - this.door1.x;
            this.player.update();
            //updates the door movements, and player movements

        } else if(gambleGame && !endScene1) {
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
                        this.hButt.setAlpha(0);
                        this.gIcon.setAlpha(1);
                        money += 1;
                        winStreek += 1;
                    } else {
                        diaBoo = true;
                        dialogue = this.cache.text.get('gamPlayW').split("\n").reverse();
                        this.diaText.text = dialogue.pop();
                        this.diBox.setAlpha(0.5);
                        this.hButt.setAlpha(0);
                        this.gIcon.setAlpha(1);
                        money += 100;
                        winStreek += 1;
                    }
                } else {
                    diaBoo = true;
                    dialogue = this.cache.text.get('gamPlayL').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
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
            }
        }

        if(this.door1.x < 0 && help_prog < 2 && !endScene1) {
            help_prog = 2;
            this.music.play();
        } // triggers progress through the story

        if(bartender_prog == 2 && gambler_prog == 2 && help_prog < 4) {
            help_prog = 4;
        }

        if(endScene1) {
            if(this.fArray.length != 0 && !this.settingFire) {
                this.settingFire = true;
                this.clock = this.time.delayedCall(1000, () => {
                    let fire = this.fArray.pop();
                    fire.setAlpha(1);
                    this.settingFire = false;
                }, null, this);
            } else if (this.fArray.length == 0 && !this.tweened) {
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
                    targets: [this.keyC],
                    scale: { from: 1, to: 0.5},
                    x: this.keyB.x / 2 + 256,
                    y: this.keyB.y / 2 + 50,
                    ease: 'Linear',       
                    duration: 8000,
                    repeat: 0,            
                    delay: 1000
                });
            }
        }
    }

    askHelp(diaText, diBox) {
        if(!diaBoo && !gambleGame && !endScene1) {
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
            } else if (help_prog == 5) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('Nar4').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            }
        } 
    }
    //Function for triggering dialogue via the helper button using progression numbers 

    updateDia(diaText, diBox) {
        if(!gambleGame && !endScene1) {
            if(pressedDia) {
                pressedDia = false;
            } else {
                if(dialogue.length == 0) {
                    diBox.setAlpha(0);
                    this.hButt.setAlpha(1);
                    this.gIcon.setAlpha(0);
                    this.bIcon.setAlpha(0);
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
        if(!diaBoo && !gambleGame && !endScene1) {
            sound.play();
            if(help_prog < 3) {
                help_prog = 3;
            }
            if(sound == this.keyASound && barChat) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('barNar3').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                this.hButt.setAlpha(0);
                this.bIcon.setAlpha(1);
                if(bartender_prog < 1) {
                    bartender_prog = 1;
                }
            } else if (sound == this.keyBSound && barChat) {
                if (money > 300 && drink >= 2) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMt300').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    if (drink < 3) {
                        drink = 3;
                    }
                } else if (money < 10) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('buyMlt10').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                } else if (money > 10 && money < 300) {
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
                if (drink == 0) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('fightD0').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                } else if (drink == 2) {
                    diaBoo = true;
                    dialogue = this.cache.text.get('fightD1').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                }  else if (drink == 4) {
                    //Trigger end game\
                    endScene1 = true;
                    this.hButt.setAlpha(0);
                }
            } else if (sound == this.keyASound && gamblerChat) {
                if (drink == 1) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar3D1').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    help_prog = 5;
                    drink = 2;
                } else if (drink == 3) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar3D1').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    help_prog = 5;
                    drink = 4;
                } else if (help_prog == 5) {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar5').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                } else {
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('gambNar3').split("\n").reverse();
                    diaText.text = dialogue.pop();
                    diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.gIcon.setAlpha(1);
                    gambler_prog = 1;
                }
            } else if (sound == this.keyBSound && gamblerChat) {
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
                this.hButt.setAlpha(0);
                this.gIcon.setAlpha(1);
                amount = Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1);
                //this algorithm simulates 2 6 sided dice, looks weird but please don't touch
                console.log(amount);
                //logs the amount
                this.oddButton.x = 512; 
                this.evenButton.x = 512;
            } else if (sound == this.keyCSound && gamblerChat) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('gambChat').split("\n").reverse();
                this.diaText.text = dialogue.pop();
                this.diBox.setAlpha(0.5);
                this.hButt.setAlpha(0);
                this.gIcon.setAlpha(1);
            }
        }
    }
    //Plays piano sounds

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

    updateBar() {
        barChat = true;
        gamblerChat = false;
    }

    updateGambler() {
        gamblerChat = true;
        barChat = false;
    }

}
