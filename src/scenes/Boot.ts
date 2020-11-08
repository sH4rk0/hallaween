export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {
    this.load.image("thelucasart", "assets/images/thelucasart.png");

    this.load.spritesheet("pumpkin", "assets/images/pumpkin.png", {
      frameWidth: 105,
      frameHeight: 105,
      endFrame: 4,
    });

    var graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 1280, 600);
    graphics.generateTexture("black-screen", 1280, 600);

    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 400, 70);
    graphics.generateTexture("button", 400, 70);

    graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(0, 0, 5, 5);
    graphics.generateTexture("sparkle", 5, 5);

    graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 64, 64);
    graphics.generateTexture("black-block", 64, 64);
  }

  create() {
    this.scene.start("SceneTransition");
    this.scene.start("Preloader");
    this.scene.bringToTop("SceneTransition");
  }

  update() {}
}
