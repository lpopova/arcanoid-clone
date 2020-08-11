import 'phaser';
import Powerup from '../objects/powerup';

export default class Powerups extends Phaser.Physics.Arcade.Group {

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Powerup });

        this.scene.events.on("brick_destroyed", this.onBrick, this);
    } 

    private dropPowerup(x, y) {
        let powerup: Powerup = this.getFirstDead();
        if(!powerup) powerup = this.create();
        powerup.drop(x, y);     
    }

    public onBrick(x, y) {
        if(Math.random() < 0.5) {
            this.dropPowerup(x, y);
        }
    }

}