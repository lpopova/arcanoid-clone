import  AbstractBrickGenerator from './generator';

/*
 * Simple example class, bricks data can be loaded from json for example
 */
export default class GridGenerator extends AbstractBrickGenerator {

    public generate(group: Phaser.Physics.Arcade.StaticGroup | Phaser.Physics.Arcade.Group) {

        // example data
        group.createMultiple({ 
            key: "1", // it wont create them unless key is set, not used
            visible: true,
            active: true,
            quantity: 8 * 6,
        });

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 8,
            height: 6,
            cellWidth: 90,
            cellHeight: 32,
            x: 90,
            y: 80
        });
        
    }

}