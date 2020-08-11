import 'phaser';

export enum PowerupType {
    ExtraLife = 2,
    Shoot = 3,
    ExtraBall = 4,
    Wide = 5,
}

export default class Powerup extends Phaser.Physics.Arcade.Image {

    // life 2, ball 4, wide 5, shoot 3
    private powerupType: PowerupType;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, '');                
    }

    drop(x: number, y: number) {
        this.powerupType = Phaser.Math.RND.integerInRange(2, 5);
        this.setTexture("sprites", "powerup" + this.powerupType);

        this.enableBody(true, x, y, true, true);
 
		this.setActive(true);
		this.setVisible(true);

        this.setVelocityY(300);
    }

    getType(): PowerupType {
        return this.powerupType;
    }
    
}