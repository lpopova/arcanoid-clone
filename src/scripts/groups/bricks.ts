import 'phaser';
import AbstractGenerator from '../util/generator';
import Brick from '../objects/brick';

export default class Bricks extends Phaser.Physics.Arcade.StaticGroup {

    private generator:AbstractGenerator;

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Brick });
    } 

    public setGenerator(generator: AbstractGenerator) {
        this.generator = generator;
    }

    public placeBricks() {
        this.clear(true, true); // its better for bricks to be reused but for now I will clear them from the group
        this.generator.generate(this);
        this.refresh();
    }

}