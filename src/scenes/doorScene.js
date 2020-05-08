class doorScene extends Phaser.Scene {
    constructor() {
        super("doorScene");
    }

    preload(){
        this.load.image('door1', './assets/door1.png'); //dimensions: 512 x 576
        this.load.image('door2', './assets/door2.png'); //dimensions: 512 x 576
    }

    create(){
        this.input.addPointer(1);

        this.door1 = this.add.image(0, 0, 'door1').setOrigin(0,0).setInteractive({ draggable: true });

        this.door2 = this.add.image(game.config.width / 2, 0, 'door2').setOrigin(0,0).setInteractive({ draggable: true });

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