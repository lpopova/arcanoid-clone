import 'phaser';

export default class Life extends Phaser.GameObjects.Text {

    constructor(scene: Phaser.Scene) {
        super(scene, 10, 10, "Lives: 3", { fontSize: "30px", fontFamily: "Roboto,Arial"});
    }

}