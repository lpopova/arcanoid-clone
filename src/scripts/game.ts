import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import GameOverScene from './scenes/gameOverScene'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#01000a',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, GameOverScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

window.addEventListener('load', () => {
    const game = new Phaser.Game(config)
})
