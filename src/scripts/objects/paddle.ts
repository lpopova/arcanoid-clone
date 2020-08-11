import 'phaser';

export default class Paddle extends Phaser.Physics.Arcade.Image {

    public static TIME = 10000;

    private static NORMAL_SCALE = 1;
    private static WIDE_SCALE = 1.5;

    private shooting: boolean;

    private scaleTimer: Phaser.Time.TimerEvent;
    private shootingTimer: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x, y) {
        super(scene, x, y, "sprites", "paddle");

        this.reinit();
    }

    public reinit() {
        this.setWide(false);
        this.setShooting(false);
    }

    public setWide(wide: boolean) {
        this.scaleX = wide ? Paddle.WIDE_SCALE : Paddle.NORMAL_SCALE;   
        if(wide) {
            if(this.scaleTimer != null)
                this.scaleTimer.remove(false);
            this.scaleTimer = this.scene.time.delayedCall(Paddle.TIME, this.setWide, [ false ], this);
        } else 
            this.scaleTimer = null;
    }

    public setShooting(shooting: boolean) {
        this.shooting = shooting;
        if(shooting) {
            if(this.shootingTimer != null)
                this.shootingTimer.remove(false);
            this.shootingTimer = this.scene.time.delayedCall(Paddle.TIME, this.setShooting, [ false ], this);
        } else {
            this.shootingTimer = null;
        }
    }

    public isShooting() {
        return this.shooting;
    }

    update() {
        
    }
}