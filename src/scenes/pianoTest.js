class pianoTest extends Phaser.Scene {
    constructor() {
        super("pianoTest");
    }

    preload(){
        this.load.image('sq', './assets/testerSquare.png'); //tester image
        this.load.audio('call', "./assets/rooster.mp3");
    }

    create(){
        this.button = this.add.image(512, 236, 'sq').setOrigin(0.5, 0.5).setInteractive();
        var sound = this.sound.add('call');
        this.button.on('pointerdown', () => this.playSound(sound) );
    }

    update() {

    }

    playSound(sound) {
        sound.play();
    }
}