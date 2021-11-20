import Phaser from 'phaser';

const config = {
  //WebGL by default, but automatically selects the correct library to render with
  type: Phaser.AUTO,

  //Dimensions of game area
  width: 800,
  height: 600,

  //Physics to use for gravity. Arcade is a good default.
  physics: {
    default: 'arcade',
  },
};

new Phaser.Game(config);
