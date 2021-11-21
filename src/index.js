import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};

const config = {
  //WebGL by default, but automatically selects the correct library to render with
  type: Phaser.AUTO,
  ...SHARED_CONFIG,

  //Physics to use for gravity. Arcade is a good default.
  physics: {
    //Arcade physicis plugin, manages physicis simulations (gravity/velocity/etc)
    default: 'arcade',
  },

  //What is seen on the screen.
  scene: [new PlayScene(SHARED_CONFIG)],
};

new Phaser.Game(config);
