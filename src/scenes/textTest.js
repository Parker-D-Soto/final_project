class textTest extends Phaser.Scene {
    constructor() {
        super("textTest");
    }

    preload(){
        this.load.image('sq', './assets/testerSquare.png'); //tester image
        this.load.text('fgpt', 'assets/test.txt');
    }

    create(){

        this.dialogueTextList = this.cache.text.get('fgpt').split("\n").reverse(); 
        console.log(this.dialogueTextList);
        //This will be used to store the text from the text file
        //Its important that the text is separated by new lines
        //Because it makes a list of each dialogue box by new line

        var graphics = this.add.graphics(); 
        //this allows us to fill in and decorate rectangles
        //var back = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);

        this.rect = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        graphics.fillStyle(0xFACADE);
        graphics.fillRectShape(this.rect); 
        //make a a non-black background to better see

        this.diBox = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height / 4);
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRectShape(this.diBox); 
        //makes a transparent rectangle used for the dialogue box

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
                width: game.config.width - 20, 
                //This part is SUPER important
                //It lets us have multiple lines
                callback: null,             
                callbackScope: null,
                useAdvancedWrap: false
            },
        };
        
        this.diaText = this.add.text(0, 0, "", this.dialogueConfig).setOrigin(0, 0);
        //the actual text object
        
        this.input.on('pointerup', function (pointer) {
            if(this.dialogueTextList.length == 0) {
                this.diaText.text = "";
            } else {
                var diaString = this.dialogueTextList.pop();
                this.diaText.text = diaString
            }
        }, this);

        //This makes it so whenever the player clicks the screen the next dialogue is shown
        //Tried it with a button but couldn't get it to work
        //its a nice beginning draft
    }

    update() {

    }
}