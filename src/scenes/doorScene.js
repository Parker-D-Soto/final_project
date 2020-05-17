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

        //load spritesheets
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 60, frameHeight: 104, startFrame: 0, endFrame: 13}); //dimensions: 60 x 104
        this.load.spritesheet('bartender', './assets/bartender.png', {frameWidth: 60, frameHeight: 140}); //dimensions: 60 x 140
        this.load.spritesheet('gambler', './assets/gambler.png', {frameWidth: 96, frameHeight: 132}); //dimensions: 96 x 132
    }

    create(){
        this.input.addPointer(1);

        this.saloonTheater = this.add.image(-512, -100, 'saloonTheater').setOrigin(0,0);

        //piano keys
        this.keyC = this.add.image(528, 264, 'key2').setOrigin(0,0);
        this.keyD = this.add.image(540, 264, 'key2').setOrigin(0,0);
        this.keyE = this.add.image(552, 264, 'key1').setOrigin(0,0);
        this.keyF = this.add.image(564, 264, 'key2').setOrigin(0,0);
        this.keyA = this.add.image(588, 264, 'key2').setOrigin(0,0);
        this.keyB = this.add.image(600, 264, 'key1').setOrigin(0,0);
        
        //NPCs
        this.bartender = this.add.sprite(40, 364, 'bartender').setOrigin(0,0);
        this.gambler = this.add.sprite(860, 364, 'gambler').setOrigin(0,0);

        this.door1 = this.add.image(0, 0, 'door1').setOrigin(0,0).setInteractive({ draggable: true });
        this.door2 = this.add.image(game.config.width / 2, 0, 'door2').setOrigin(0,0).setInteractive({ draggable: true });

        this.player = this.add.sprite(game.config.width / 3, 400, 'player').setOrigin(0,0);

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
    }
    update(){
        this.door1.x = game.config.width / 2 - this.door2.x;
        this.door2.x = game.config.width / 2 - this.door1.x;
    }
}
