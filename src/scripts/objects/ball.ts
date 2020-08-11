import 'phaser';

export default class Ball extends Phaser.Physics.Arcade.Image {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "sprites", "ball");        
    }

    update() {
        if(this.y > 800) {
            this.disableBody(true, true);
        }
    }
}