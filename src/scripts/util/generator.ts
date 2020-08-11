import 'phaser';

export default abstract class AbstractBrickGenerator {

    public abstract generate(group: Phaser.Physics.Arcade.StaticGroup | Phaser.Physics.Arcade.Group);

}