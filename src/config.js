import GameScene from './Phaser';
import Phaser from 'phaser';

export const gameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: 400,
    height: 400,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: GameScene
};
