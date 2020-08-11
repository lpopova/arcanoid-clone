import 'phaser';
import Brick from '../objects/brick';
import Bricks from '../groups/bricks';
import Ball from '../objects/ball';
import Powerups from '../groups/powerups';
import Lives from '../ui/lives';
import GridGenerator from '../util/gridgenerator';
import Paddle from '../objects/paddle';
import Bullets from '../groups/bullets';
import Powerup, { PowerupType } from '../objects/powerup';

export default class MainScene extends Phaser.Scene {

    private bricks: Bricks;
    private ball: Phaser.Physics.Arcade.Image;
    private paddle: Paddle;
    private powerups: Powerups;
    private bullets: Bullets;

    private balls: Phaser.Physics.Arcade.Group;

    private lives: number;
    private livesText: Lives;

    private playing: boolean;

    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.sys.events.on('wake', this.wake, this);

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bricks = new Bricks(this);
        const generator = new GridGenerator();
        this.bricks.setGenerator(generator);
        
        this.powerups = new Powerups(this);

        this.balls = this.physics.add.group({
            classType: Ball,
            collideWorldBounds: true,
            bounceX: 1,
            bounceY: 1,
            runChildUpdate: true
        })
        
        this.paddle = new Paddle(this, 400, 550);
        this.physics.add.existing(this.paddle);
        this.add.existing(this.paddle);
        this.paddle.setImmovable(true);

        this.bullets = new Bullets(this);

        this.physics.add.collider(this.balls, this.bricks, this.hitBrick, undefined, this);
        this.physics.add.collider(this.balls, this.paddle, this.hitPaddle, undefined, this);
        this.physics.add.collider(this.bullets, this.bricks, this.bulletHitBrick, undefined, this);
        this.physics.add.overlap(this.paddle, this.powerups, this.hitPowerup, undefined, this);        

        this.input.on('pointermove', pointer => {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, this.paddle.displayWidth / 2, 800 - this.paddle.displayWidth / 2);
            if (this.ball) {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.on('pointerup', pointer => {
            if (this.ball) {
                this.ball.setVelocity(0, -300);
                this.ball = null;
            }
        }, this);

        this.input.on("pointerup", pointer => {
            if(this.paddle.isShooting())
            this.bullets.shoot(this.paddle.x, this.paddle.y, this.paddle.displayWidth/2);
        });

        this.livesText = new Lives(this);
        this.add.existing(this.livesText);
        this.startGame();
    }

    startGame() {
        this.lives = 3;
        this.livesText.setText("Lives: " + this.lives);

        this.bricks.placeBricks();

        this.ball = this.balls.create(400, 500);
        this.ball.setCollideWorldBounds(true);

        this.playing = true;
    }

    hitPowerup(paddle, power) {
        const powerup = power as Powerup;   
        switch (powerup.getType()) {
            case PowerupType.ExtraBall:
                const ball = this.addBall(powerup.x, powerup.y);
                this.hitPaddle(this.paddle, ball);
                break;
            case PowerupType.ExtraLife: 
                this.addLife();
                break;
            case PowerupType.Shoot:
                paddle.setShooting(true);
                break;                
            case PowerupType.Wide:
                paddle.setWide(true);
                break;
        }            
        powerup.disableBody(true, true);
    }

    hitBrick(ball, brick) {
        (brick as Brick).hit();
    }

    addBall(x, y) {
        const ball = this.balls.getFirstDead(true,x, y);
        ball.enableBody(false, x, y, true, true);
        return ball;
    }

    addLife() {
        this.lives++;
        this.livesText.setText("Lives: " + this.lives);
    }

    resetBall() {
        this.ball = this.balls.getFirstDead();
        if(this.ball) {
            this.ball.enableBody(false, 0, 0, true, true);
        } else {
            this.ball = this.balls.create(400, 500);
        }
        this.ball.x = this.paddle.x;
        this.ball.y = 500;
    }

    resetLevel() {
        this.resetBall();
    }

    hitPaddle(paddle, ball) {
        const angle = -90 - 90 * (paddle.x - ball.x) / (paddle.width);
        this.physics.velocityFromAngle(angle, 300, ball.body.velocity);
    }

    bulletHitBrick(bullet, brick) {
        bullet.setActive(false);
        bullet.setVisible(false);        
        brick.hit();
    }

    checkGameOver() {
        return this.balls.countActive() === 0;
    }

    wake() {
        this.startGame();
    }

    update() {
        if(this.balls.countActive() === 0 && this.playing) {            
            this.lives--;                        
            if(this.lives >= 0) {
                this.livesText.setText("Lives: " + this.lives); 
                this.resetBall();
            } else
            this.gameOver();            
        }
    }

    gameOver() {
        this.playing = false;
        this.scene.switch("GameOverScene");
    }
}
