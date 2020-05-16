let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 576 ,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [textTest, moveTest, doorScene]
};

let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyA, keyS, keyD;