class prisonScene extends Phaser.Scene {
    constructor() {
        super("prisonScene")
    }

    preload() {
        //setting scene
        this.load.image('jail_cell', './assets/jail_cell.png');
        this.load.image('jail_hall', './assets/jail_hall.png');

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
        this.load.text('w1', 'assets/text/prison/warden.txt');
    }

    create() {
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
        this.bIcon = this.add.sprite(50, 50, 'bIcon').setOrigin(0, 0);
        this.bIcon.setAlpha(0);

        //Press the helper button to trigger dialogue
        this.hButt.on('pointerdown', () => this.askHelp(this.diaText, this.diBox) );
    }


    update() {
        if(!diaBoo) {
            //updates player
            this.player.update();

            if(help_prog == 2) {
                this.clock = this.time.delayedCall(2000, () => {
                    this.warden.setAlpha(1);
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('w1').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    help_prog += 1;
                }, null, this);
            } else if (help_prog == 5) {
                this.clock = this.time.delayedCall(2000, () => {
                    this.warden.setAlpha(1);
                    pressedDia = true;
                    diaBoo = true;
                    dialogue = this.cache.text.get('w1').split("\n").reverse();
                    this.diaText.text = dialogue.pop();
                    this.diBox.setAlpha(0.5);
                    this.hButt.setAlpha(0);
                    this.bIcon.setAlpha(1);
                    help_prog += 1;
                }, null, this);
            }
        }
    }

    //helper function to process txt assets
    updateDia(diaText, diBox) {
        if(!gambleGame && !endScene1) {
            if(pressedDia) {
                pressedDia = false;
            } else {
                if(dialogue.length == 0) {
                    this.warden.setAlpha(0);
                    diBox.setAlpha(0);
                    this.hButt.setAlpha(1);
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

    askHelp(diaText, diBox) {
        if(!diaBoo) {
            if(help_prog == 0) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n2').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                help_prog += 1;
            } else if(help_prog == 1) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n3').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                help_prog += 1;
            } else if(help_prog == 3) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n4').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                help_prog += 1;
            } else if(help_prog == 4) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n5').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                help_prog += 1;
            } else if(help_prog == 6) {
                pressedDia = true;
                diaBoo = true;
                dialogue = this.cache.text.get('n6').split("\n").reverse();
                diaText.text = dialogue.pop();
                diBox.setAlpha(0.5);
                help_prog += 1;
            }
        } 
    }
}