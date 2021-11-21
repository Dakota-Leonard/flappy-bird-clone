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

    //Called every frame app is running
    update,
  },
};

//This context during preload is Scene. Contains functions and properties we can use.
function preload() {
  //this.load.image(What key we want to refer to the file as, path to file)
  //Sky
  this.load.image('sky', 'assets/sky.png');
  //Bird
  this.load.image('bird', 'assets/bird.png');
  //Pipe
  this.load.image('pipe', 'assets/pipe.png');
}

let bird = null;
let upperPipe = null;
let lowerPipe = null;
const pipeVerticalDistanceRange = [150, 250];
let pipeHorizontalDistance = 0;

const PIPES_TO_RENDER = 4;

const initialBirdPosition = { x: config.width / 10, y: config.height / 2 };

//Now we add the image to render
function create() {
  //this.add.image(x coordinate, y coordinate, what key we are referring to the file as)

  //KEEP IN MIND THE CENTER OF THE IMAGE IS INSERTED WHERE THE COORDINATES ARE SPECIFIED UNLESS .setOrigin IS CALLED.
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird')
    .setOrigin(0);

  bird.body.gravity.y = 400;

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1);

    const lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  //Setting input events
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

//Updates 60 times per second (60fps)
//Two arguments provided. Time and delta. Time is current time since render started and delta is time since last time update ran.
function update() {
  if (bird.y < 0 || bird.y > config.height + bird.height) {
    restartBirdPosition();
    bird.body.velocity.y = 0;
  }
}

function placePipe(uPipe, lPipe) {
  pipeHorizontalDistance += 400;
  const pipeVerticalDistance = Phaser.Math.Between(
    ...pipeVerticalDistanceRange
  );
  const pipeYPosition = Phaser.Math.Between(
    20,
    config.height - 20 - pipeVerticalDistance
  );

  uPipe.x = pipeHorizontalDistance;
  uPipe.y = pipeYPosition;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;

  uPipe.body.velocity.x = -200;
  lPipe.body.velocity.x = -200;
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
}

function flap() {
  bird.body.velocity.y = -250;
}

new Phaser.Game(config);
