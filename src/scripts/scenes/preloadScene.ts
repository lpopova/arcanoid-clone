export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' })
    }

    preload() {
        this.load.atlas("sprites", "assets/spritesheet.png", "assets/spritesheet.json");
        // this.load.image('ball', 'assets/ball.png')
        // this.load.image('paddle', 'assets/paddle.png')
        // this.load.image('red', 'assets/red.png')
        // this.load.image('blue', 'assets/blue.png')
        // this.load.image('yellow', 'assets/yellow.png')
        // this.load.image('powerup1', 'assets/powerup1.png')
        // this.load.image('powerup2', 'assets/powerup2.png')
        // this.load.image('powerup3', 'assets/powerup3.png')
        // this.load.image('powerup4', 'assets/powerup4.png')
        // this.load.image('powerup5', 'assets/powerup5.png')
        // this.load.image('bullet', 'assets/bullet.png')
    }

    create() {
        this.scene.start("MainScene")
    }
}
