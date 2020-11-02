export default class Boot extends Phaser.Scene {
  box: any;
  stick: any;
  left: any;
  joyStick: any;
  text: any;
  slurp: any;
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
  }

  create() {
    this.scene.start("Preloader");
    return;
    this.input.addPointer(10);

    this.box = this.add.rectangle(400, 300, 128, 128, 0x6666ff);

    this.physics.add.existing(this.box);
    this.joyStick = this.plugins
      .get("rexvirtualjoystickplugin")
      //@ts-ignore
      .add(this, {
        x: 400,
        y: 300,
        radius: 100,
        base: this.add.circle(0, 0, 100, 0x888888),
        thumb: this.add.circle(0, 0, 50, 0xcccccc),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
      })
      .on("update", this.dumpJoyStickState, this);

    this.text = this.add.text(0, 0, "");
    this.dumpJoyStickState();

    this.slurp = this.add
      .rectangle(1100, 500, 128, 128, 0xffcc00)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)

      .on("pointerup", () => {
        console.log("up");
        this.box.setAlpha(1);
      })

      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          this.box.setAlpha(0.5);
        }
      );
  }

  dumpJoyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = "Key down: ";
    for (var name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += name + " ";
      }
    }
    s += "\n";
    s += "Force: " + Math.floor(this.joyStick.force * 100) / 100 + "\n";
    s += "Angle: " + Math.floor(this.joyStick.angle * 100) / 100 + "\n";
    this.text.setText(s);

    this.physics.velocityFromRotation(
      this.joyStick.rotation,
      this.joyStick.force * 2,
      this.box.body.velocity
    );
  }

  /*
  create() {
    //this.scene.start("Preloader");
    this.input.addPointer(10);
    this.box = this.add.rectangle(400, 300, 128, 128, 0x6666ff);

    this.physics.add.existing(this.box);
    //@ts-ignore;
    this.stick = this.pad.addStick(0, 0, 200, "arcade-joy");
    this.stick.alignBottomLeft();
    //@ts-ignore;
    this.left = this.pad.addButton(
      1100,
      550,
      "arcade-joy",
      "button1-up",
      "button1-down"
    );
    this.stick.on("update", this.stickUpdate, this);
  }

  stickUpdate(stick: any, force: any) {
    const maxSpeed = 400;

    this.box.body.setVelocity(0);

    if (stick.isDown) {
      this.physics.velocityFromRotation(
        stick.rotation,
        force * maxSpeed,
        this.box.body.velocity
      );
    }
  }
  */

  update() {}
}
