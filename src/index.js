import Phaser from 'phaser';

const config = {
  //WebGL by default, but automatically selects the correct library to render with
  type: Phaser.AUTO,

  //Dimensions of game area
  width: 800,
  height: 600,

  //Physics to use for gravity. Arcade is a good default.
  physics: {
    //Arcade physicis plugin, manages physicis simulations (gravity/velocity/etc)
    default: 'arcade',
  },

  //What is seen on the screen.
  scene: {
    //Functions called in this order: preload, create, update

    //In preload we load assets such as images, music, animations, etc
    preload,

    //Initializes application
    create,
  },
};

//This context during preload is Scene. Contains functions and properties we can use.
function preload() {
  //this.load.image(What key we want to refer to the file as, path to file)
  this.load.image('sky', 'assets/sky.png');
}

//Now we add the image to render
function create() {
  //this.add.image(x coordinate, y coordinate, what key we are referring to the file as)

  //KEEP IN MIND THE CENTER OF THE IMAGE IS INSERTED WHERE THE COORDINATES ARE SPECIFIED UNLESS .setOrigin IS CALLED.
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
}

new Phaser.Game(config);
