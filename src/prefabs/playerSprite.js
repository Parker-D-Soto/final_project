class playerSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); //x, y coordinates, and sprite

        scene.add.existing(this); //adds the image
        scene.physics.add.existing(this); //adds the physics colliding detector

        this.setCollideWorldBounds(true); //this prevents it from walking off screen

        //Used to keep track of the direction of the player when
        //its not currently actively walking in a direction
        this.lastRight = false;
        this.lastLeft = false;
        this.lastUp = false;

        //Variables to track whether the animation is playing and which
        this.rAnimation = false;
        this.lAnimation = false;
        this.uAnimation = false;
        this.dAnimation = false;

        //This is an array of frames from the player spritesheet that'll act as animations
        //I kept trying to use the Phaser animation implementation but I kept getting a warning
        //Regarding Spritesheet frame dimensions causing the framerate to be 0, but when
        //even using a spritesheet from a Phaser example it still threw the same error
        //Thus to at least implement animations I'll be using a tween, to tween through
        //an array of frames to act as a pseudo animation.
        this.lArray = [12, 3, 13, 3];
        this.rArray = [10, 1, 11, 1];
        this.uArray = [7, 8,  9, 8];
        this.dArray = [4, 5, 6, 5]

        //This will be the object the tweens navigate acting as a pointer
        //to specific objects in the array

        this.arrayP = 0;

        //Now these will be the tweens acting as the pseudo animations
        //They target the player sprite itself because I made array parser
        //A part of the player allowing me to tween it
        this.lWalk = scene.tweens.add({
            targets: this,
            arrayP: { start: 0, to: 3 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        this.dWalk = scene.tweens.add({
            targets: this,
            arrayP: { start: 0, to: 3 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        this.uWalk = scene.tweens.add({
            targets: this,
            arrayP: { start: 0, to: 3 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        this.rWalk = scene.tweens.add({
            targets: this,
            arrayP: { start: 0, to: 3 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
    }
    
    update() {

        if(keyA.isDown && keyD.isDown) { 
            //Ensures WASD is being pressed before movement
            //the 20s is our temp hardcoded world bounds for the sprite
            if(keyLEFT.isDown && !keyRIGHT.isDown && !keyUP.isDown&& !keyDOWN.isDown) {
                //This will navigate the player left, and perform the animation
                if(!this.lAnimation) {
                    //Plays the animation if the animation isn't already playing
                    this.lWalk.play();
                    this.lAnimation = true;
                } else {
                    //Sets the frame to the coordinates of arrayP in the tween
                    this.setFrame(this.lArray[Math.floor(this.arrayP)]);
                }
                this.lAnimation = true;
                if(help_prog < 1) {
                    help_prog = 1;
                }
                //Progresses the helper button (players now know how to move)
                this.lastLeft = true;
                this.lastUp = false;
                this.lastRight = false;
                this.setVelocityX(-80); //this is how it moves so the collider can detect it

            //For the rest of the if else statements refer back to this first one if confused
            } else if (keyRIGHT.isDown && !keyLEFT.isDown && !keyUP.isDown&& !keyDOWN.isDown) {  
                //This will navigate the player right, and perform the animation
                if(!this.rAnimation) {
                    this.rWalk.play();
                    this.rAnimation = true;
                } else {
                    this.setFrame(this.rArray[Math.floor(this.arrayP)]);
                }
                this.rAnimation = true; 
                //Each else if is the same, except for direction and animation
                this.lastLeft = false;
                this.lastUp = false;
                this.lastRight = true;
                this.setVelocityX(80);
                if(help_prog < 1) {
                    help_prog = 1;
                }
            } else if (keyUP.isDown && !keyRIGHT.isDown && !keyLEFT.isDown&& !keyDOWN.isDown) {
                //This will navigate the player up, and perform the animation
                if(!this.uAnimation) {
                    this.uWalk.play();
                    this.uAnimation = true;
                } else {
                    this.setFrame(this.uArray[Math.floor(this.arrayP)]);
                }
                this.uAnimation = true; 
                this.lastLeft = false;
                this.lastUp = true;
                this.lastRight = false;
                this.setVelocityY(-80);
                if(help_prog < 1) {
                    help_prog = 1;
                }
            } else if (keyDOWN.isDown && !keyRIGHT.isDown && !keyLEFT.isDown&& !keyUP.isDown) {
                //This will navigate the player down, and perform the animation
                if(!this.dAnimation) {
                    this.dWalk.play();
                    this.dAnimation = true;
                } else {
                    this.setFrame(this.dArray[Math.floor(this.arrayP)]);
                }
                this.dAnimation = true; 
                this.lastLeft = false;
                this.lastUp = false;
                this.lastRight = false;
                this.setVelocityY(80);
                if(help_prog < 1) {
                    help_prog = 1;
                }

            //Special: this means that the player shouldn't be moving
            } else { //Velocity needs to be stopped or else it'll keep moving

                //Update the bools so no animation is playing
                this.rAnimation = false;
                this.lAnimation = false;
                this.uAnimation = false;
                this.dAnimation = false;

                //Decide which frame to set by last animation played
                if(this.lastLeft) {
                    this.setFrame(3);
                } else if (this.lastRight) {
                    this.setFrame(1);
                } else if (this.lastUp) {
                    this.setFrame(2);
                } else {
                    this.setFrame(0);
                }

                //stops the players movement
                this.setVelocityX(0);
                this.setVelocityY(0);
            }
        } else {

            //Update the bools so no animation is playing
            this.rAnimation = false;
            this.lAnimation = false;
            this.uAnimation = false;
            this.dAnimation = false;

            //Decide which frame to set by last animation played
            if(this.lastLeft) {
                this.setFrame(3);
            } else if (this.lastRight) {
                this.setFrame(1);
            } else if (this.lastUp) {
                this.setFrame(2);
            } else {
                this.setFrame(0);
            }

            this.setVelocityX(0); //this is to make it stop when not receiving input
            this.setVelocityY(0);
        }
    }
}