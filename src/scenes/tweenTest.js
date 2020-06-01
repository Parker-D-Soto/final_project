class tweenTest extends Phaser.Scene {
    constructor() {
        super("tweenTest");
    }

    preload(){
        this.load.image('saloonTheater', './assets/saloon theater.png');
        this.load.image('fire',  './assets/fire.png');
        this.load.spritesheet('player', './assets/player.png', {frameWidth: 60, frameHeight: 104, startFrame: 0, endFrame: 13}); //dimensions: 60 x 104
        this.load.spritesheet('bartender', './assets/bartender.png', {frameWidth: 60, frameHeight: 140}); //dimensions: 60 x 140
        this.load.spritesheet('gambler', './assets/gambler.png', {frameWidth: 96, frameHeight: 132}); //dimensions: 96 x 132
    }

    create(){
        this.saloonTheater = this.add.image(-512, -100, 'saloonTheater').setOrigin(0,0);
        this.bartender = this.physics.add.sprite(40, 364, 'bartender').setOrigin(0,0).setInteractive();
        this.bartender.body.immovable = true;
        this.gambler = this.physics.add.sprite(860, 364, 'gambler').setOrigin(0,0).setInteractive();
        this.gambler.body.immovable = true;
        this.f1 = this.add.image(120, 270, 'fire').setOrigin(0, 0);
        this.f2 = this.add.image(120, 370, 'fire').setOrigin(0, 0);
        this.f3 = this.add.image(120, 470, 'fire').setOrigin(0, 0);
        this.f4 = this.add.image(120, 120, 'fire').setOrigin(0, 0);
        this.f5 = this.add.image(435, 120, 'fire').setOrigin(0, 0);
        this.f6 = this.add.image(750, 120, 'fire').setOrigin(0, 0);
        this.player = new playerSprite(this, game.config.width / 3, 400, 'player').setOrigin(0.5, 0.5);
        this.tweened = false;
    }

    update() {
        if (!this.tweened) {
            this.tweened = true;
        var tween = this.tweens.add({
            targets: this.saloonTheater,
            x: { from: -512, to: 0 },
            y: { from: -100, to: 0},
            scale: { from: 1, to: 0.5},
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        }); 
        var tween = this.tweens.add({
            targets: [this.player],
            scale: { from: 1, to: 0.5},
            x: this.player.x / 2 + 256,
            y: this.player.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.gambler],
            scale: { from: 1, to: 0.5},
            x: this.gambler.x / 2 + 256,
            y: this.gambler.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.bartender],
            scale: { from: 1, to: 0.5},
            x: this.bartender.x / 2 + 256,
            y: this.bartender.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.f1],
            scale: { from: 1, to: 0.5},
            x: this.f1.x / 2 + 256,
            y: this.f1.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.f2],
            scale: { from: 1, to: 0.5},
            x: this.f2.x / 2 + 256,
            y: this.f2.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.f3],
            scale: { from: 1, to: 0.5},
            x: this.f3.x / 2 + 256,
            y: this.f3.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.f4],
            scale: { from: 1, to: 0.5},
            x: this.f4.x / 2 + 256,
            y: this.f4.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.f5],
            scale: { from: 1, to: 0.5},
            x: this.f5.x / 2 + 256,
            y: this.f5.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
        var tween = this.tweens.add({
            targets: [this.f6],
            scale: { from: 1, to: 0.5},
            x: this.f6.x / 2 + 256,
            y: this.f6.y / 2 + 50,
            ease: 'Linear',       
            duration: 1000,
            repeat: 0,            
            delay: 1000
        });
    }
    }
}

//scale x needs to go from 1 to 0.5
//scale y needs to go from 1 to 0.5

//x needs to go from -512 to 0
//y needs to go from -100 t0 0