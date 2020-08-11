export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
    }

    shoot(x, y, hwidth)
    {
        this.shootBullet(x - hwidth, y);
        this.shootBullet(x + hwidth, y);
    }

    private shootBullet(x, y) {
        let bullet:Phaser.Physics.Arcade.Image = this.getFirstDead(true,x, y, "sprites", "bullet");
        bullet.enableBody(true, x, y, true, true);
        bullet.setVelocityY(-300);        
    } 
}