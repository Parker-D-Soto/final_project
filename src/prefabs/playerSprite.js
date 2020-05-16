class playerSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); //x, y coordinates, and sprite

        scene.add.existing(this); //adds the image
        scene.physics.add.existing(this); //adds the physics colliding detector

        this.setCollideWorldBounds(true);

        this.noObject = true;
    }
    
    update() {
        //if(keyW.isDown && keyA.isDown && keyD.isDown && keyS.isDown) { 
            //Ensures WASD is being pressed before movement
            //the 20s is our temp hardcoded world bounds for the sprite
            if(keyLEFT.isDown) {
                this.setVelocityX(-80);
            } else if (keyRIGHT.isDown) {
                this.setVelocityX(80);
            } else if (keyUP.isDown) {
                this.setVelocityY(-80);
            } else if (keyDOWN.isDown) {
                this.setVelocityY(80);
            } else {
                this.setVelocityX(0);
                this.setVelocityY(0);
            }
       // }
    }
}