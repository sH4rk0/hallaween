import GamePlay from "./GamePlay";

export default class Joy extends Phaser.Scene {
  public stick: any;
  public button1: any;
  public button2: any;

  constructor() {
    super({
      key: "Joy",
    });
  }

  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "assets/js/rexJoystick.js",
      true
    );

    this.load.atlas(
      "arcade-joy",
      "assets/skins/arcade-joystick.png",
      "assets/skins/arcade-joystick.json"
    );

    this.load.scenePlugin(
      "VirtualJoystickPlugin",
      "assets/js/VirtualJoystickPlugin.min.js",
      "VirtualJoystickPlugin",
      "pad"
    );
  }

  create(): void {
    console.log("create joy");
    this.input.addPointer(2);

    this.stick = this.plugins
      .get("rexvirtualjoystickplugin")
      //@ts-ignore
      .add(this, {
        x: 120,
        y: 480,
        radius: 80,
        base: this.add.circle(0, 0, 80, 0x888888).setAlpha(0.25),
        thumb: this.add.image(0, 0, "pumpkin").setAlpha(0.5), //this.add.circle(0, 0, 40, 0xcccccc).setAlpha(0.5),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        forceMin: 0,
        // enable: true
      });

    //@ts-ignore
    this.button1 = this.pad.addButton(
      1200,
      500,
      "arcade-joy",
      "button3-up",
      "button3-down"
    );

    let _gp: GamePlay = <GamePlay>this.scene.get("GamePlay");
    _gp._player.attachStick();
  }
}
