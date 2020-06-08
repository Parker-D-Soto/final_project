class prisonScene extends Phaser.Scene {
    constructor() {
        super("prisonScene")
    }

    preload() {
        //setting scene
        this.load.image('jail_cell', './assets/jail_cell.png');
        this.load.image('jail_hall', './assets/jail_hall.png');
        this.load.image('door', './assets/door.png')
        this.load.image('door_choice', './assets/door_choices.png');

        //Warden
        this.load.image('warden', './assets/warden.png');
        this.load.image('bIcon',  './assets/bartender head.png');

        //player
        this.load.spritesheet('player', './assets/player_inmate.png', {frameWidth: 60, frameHeight: 104, startFrame: 0, endFrame: 13}); //dimensions: 60 x 104

        //help box
        this.load.spritesheet('help', './assets/narrator.png', {frameWidth: 64, frameHeight: 64});

        //narrator text
        this.load.text('n1', 'assets/text/prison/n1.txt');
        this.load.text('n2', 'assets/text/prison/n2.txt');
        this.load.text('n3', 'assets/text/prison/n3.txt');
        this.load.text('n4', 'assets/text/prison/n4.txt');
        this.load.text('n5', 'assets/text/prison/n5.txt');
        this.load.text('n6', 'assets/text/prison/n6.txt');
        this.load.text('w1', 'assets/text/prison/w1.txt');
        this.load.text('w2', 'assets/text/prison/w2.txt');
        this.load.text('w3', 'assets/text/prison/w3.txt');
        this.load.text('w4', 'assets/text/prison/w4.txt');
        this.load.text('h1', 'assets/text/prison/hint.txt');
        
        //harmonica music
        this.load.audio('music', "./assets/sfx/harmonica.wav");
    }

    create() {
        //console stuff
        g = "you escape from the prison, you are caught and executed. Thanks for playing!"

        //reset help tracker
        hTracker = 0;

        //starting dialogue update as game goes on, dialogue is global variable
        dialogue = this.cache.text.get('n1').split("\n").reverse();

        //reset help_prog
        help_prog = 0;

        //placing back scene
        this.jail_hall = this.add.image(0, 0, 'jail_hall').setOrigin(0,0);

        //placing warden
        this.warden = this.add.image(750, 200, 'warden').setOrigin(0,0);
        this.warden.setAlpha(0);

        //placing foreground
        this.jail_cell = this.add.image(0, 0, 'jail_cell').setOrigin(0,0);
        this.cell_door = this.add.image(660, 165, 'door').setOrigin(0,0);

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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //player prefab
        this.player = new playerSprite(this, game.config.width / 3, 400, 'player').setOrigin(0.5, 0.5);
        
        //door choice
        this.door_choice = this.add.image(660, 110, 'door_choice').setOrigin(0,0).setScale(.1,.1)
        
        //music
        this.music = this.sound.add('music')
        this.music.setLoop(true);
        this.music.play()

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

        //removes text box when screen is clicked
        this.input.on('pointerdown', () => this.updateDia(this.diaText, this.diBox) );

        //helper button
        this.hButt = this.add.sprite(32, 32, 'help').setOrigin(0, 0).setInteractive();

        //Icons that will display who is currently talking
        this.bIcon = this.add.sprite(32, 32, 'bIcon').setOrigin(0, 0);
        this.bIcon.setAlpha(0);

        //Press the helper button to trigger dialogue
        this.hButt.on('pointerdown', () => this.askHelp(this.diaText, this.diBox) );
    }


    update() {
        if(!diaBoo) {

            //Method to restart the game
            if(keyR.isDown) {
                this.scene.start("doorScene"); 
            }

            //When the player talks to the helper
            //the warden will appear
            if(help_prog == 1) { 
                //Player has talked to helper trigger warden dialogue
                help_prog = -1;
                //This is to make sure the player can't talk to the helper as the
                //warden appears
                this.clock = this.time.delayedCall(2000, () => {
                    //After 2 seconds the warden appears
                    this.warden.setAlpha(1);

                    //trigger dilogue booleans
                    diaBoo = true;
                    //cache wanted dialogue
                    dialogue = this.cache.text.get('w1').split("\n").reverse();
                    //pop the first line of dialogue
                    this.diaText.text = dialogue.pop();
                    //trigger dialogue box
                    this.diBox.setAlpha(0.5);
                    //get rid of helper button
                    this.hButt.setAlpha(0);
                    //trigger warden Icon (same as bartender (same character))
                    this.bIcon.setAlpha(1);
                    //progress the dialogue
                    help_prog = 2;
                    hTracker = 0
                }, null, this);
                //Rest of else if tree refer to the above (same except for loading different dialogue)
            } else if (help_prog == 3) {
                help_prog = -1;
                this.clock = this.time.delayedCall(2000, () => {
                    this.warden.setAlpha(1);
                    diaBoo = true;
                    dialogue = this.cache.text.get('w2').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    hTracker = 0
                    help_prog = 4;
                }, null, this);
            } else if (help_prog == 5) {
                help_prog = -1;
                this.clock = this.time.delayedCall(2000, () => {
                    this.warden.setAlpha(1);
                    diaBoo = true;
                    dialogue = this.cache.text.get('w3').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    hTracker = 0
                    help_prog = 6;
                }, null, this);
            } else if (help_prog == 7) {
                help_prog = -1;
                this.clock = this.time.delayedCall(2000, () => {
                    this.warden.setAlpha(1);
                    diaBoo = true;
                    dialogue = this.cache.text.get('w4').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    hTracker = 0
                    help_prog = 8;
                }, null, this);
            }
        }
    }

    //helper function to process txt assets
    updateDia(diaText, diBox) {
            //A bool to help with a bug where when dialogue is loaded as something is pressed
            //The dialogue loads weird and the screen needs to be pressed twice
            if(pressedDia) {
                pressedDia = false;
            } else {
                //If dialogue is out of lines return to normal
                if(dialogue.length == 0) {
                    //ensure warden is gone
                    this.warden.setAlpha(0);
                    //get rid of the box
                    diBox.setAlpha(0);
                    //return helper button
                    this.hButt.setAlpha(1);
                    //get rid of any icons
                    this.bIcon.setAlpha(0);
                    //set boolean checking if dialogue is being processed to false
                    diaBoo = false;
                    //set the text to empty
                    diaText.text = "";
                } else {
                    //Otherwise pop the next part of the dialogue (the next line)
                    diaBoo = true;
                    var diaString = dialogue.pop();
                    diaText.text = diaString
                } 
            } 
    }

    //Helper dialogue
    askHelp(diaText, diBox) {
        //update tracker
        hTracker += 1;

        //ensure no dialogue is being processed
        if(!diaBoo) {
            //first bit of dialgue
            if(help_prog == 0) {
                //Process dialogue variables
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n2').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                //Update dialogue progress
                hTracker = 0
                help_prog = 1;
            } else if(help_prog == 2) {
                //Process dialogue variables
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n3').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                //update dialogue process
                hTracker = 0
                help_prog = 3;
            } else if(help_prog == 4) {
                //Process dialogue variables
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n4').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                //update dialogue process
                hTracker = 0
                help_prog = 5;
            } else if(help_prog == 6) {
                //Process dialoge variables
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n5').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                //Update dialogue process
                hTracker = 0
                help_prog = 7;
            } else if(help_prog == 8 && hTracker > 3) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('h1').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            } else if(help_prog == 8) {
                //Process dialogue variables
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n6').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
            }
        } 
    }
}
