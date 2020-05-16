class moveTest extends Phaser.Scene {
    constructor() {
        super("moveTest");
    }

    preload(){
        this.load.image('sq', './assets/testerSquare.png');
    }

    create(){
        this.testPlayer = new playerSprite(this, 512, 238, 'sq').setOrigin(0.5, 0.5); 
        //Temp Player using the player's prefab with a temp asset

        this.sq1 = this.physics.add.staticImage(206, 118, 'sq').setOrigin(0.5,0.5);
        this.sq2 = this.physics.add.staticImage(206, 356, 'sq').setOrigin(0.5,0.5);
        this.sq3 = this.physics.add.staticImage(718, 356, 'sq').setOrigin(0.5,0.5);
        this.sq4 = this.physics.add.staticImage(718, 118, 'sq').setOrigin(0.5,0.5);
        //Just some obstacles to check colliders
        //Player is the sprite in the middle

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //WASD Inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //Movement Inputs for up, down, left, and right

        this.physics.add.collider(this.testPlayer, this.sq1);
        this.physics.add.collider(this.testPlayer, this.sq2); 
        this.physics.add.collider(this.testPlayer, this.sq3);
        this.physics.add.collider(this.testPlayer, this.sq4);
        //Collider for player and obstacles
    }
    update(){
        this.testPlayer.update();
    }
}