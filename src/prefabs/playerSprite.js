class playerSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); //x, y coordinates, and sprite

        scene.add.existing(this); //adds the image
        scene.physics.add.existing(this); //adds the physics colliding detector

        this.setCollideWorldBounds(true); //this prevents it from walking off screen
    }
    
    update() {
        if(keyA.isDown && keyD.isDown) { 
            //Ensures WASD is being pressed before movement
            //the 20s is our temp hardcoded world bounds for the sprite
            if(keyLEFT.isDown) {
                if(help_prog < 1) {
                    help_prog = 1;
                }
                this.setVelocityX(-80); //this is how it moves so the collider can detect it
            } else if (keyRIGHT.isDown) {
                this.setVelocityX(80);
                if(help_prog < 1) {
                    help_prog = 1;
                }
            }
        } else {
            this.setVelocityX(0); //this is to make it stop when not receiving input
        }
    }
}