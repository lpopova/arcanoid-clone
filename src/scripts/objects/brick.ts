import 'phaser';

export default class Brick extends Phaser.Physics.Arcade.Image {

    private life: number;

    static TEXTURES = ["red", "yellow", "blue"];
    
    static DEFAULT_LIFE = 3;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, '');
        this.life = Brick.DEFAULT_LIFE;
        this.updateTexture();
    }

    public hit() {
        this.life--;
        if(this.life <= 0) {
            this.scene.events.emit("brick_destroyed", this.x, this.y)
            this.disableBody(true, true);            
        } else {
            this.updateTexture();
        }
    }

    private updateTexture() {
        this.setTexture("sprites", Brick.TEXTURES[this.life - 1]);
    }

}