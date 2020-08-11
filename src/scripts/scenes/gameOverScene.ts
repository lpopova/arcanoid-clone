import 'phaser';

export default class GameOverScene extends Phaser.Scene { 

    constructor() {
        super({ key: 'GameOverScene' })
    }

    create() {
        this.add.text(this.cameras.main.centerX, 
                this.cameras.main.centerY, 
                "Tap to play again", 
                { fontSize: "80px", fontFamily: "Roboto,Arial", color: "#ffffff"})
            .setOrigin(0.5, 0.5);
        this.input.on('pointerup', pointer => {

            this.scene.switch('MainScene');

        }, this);

    }

}