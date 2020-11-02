import GamePlay from "./GamePlay";

export default class Bonus extends Phaser.GameObjects.Sprite {
  private _config: genericConfig;
  private _scene: GamePlay;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this.create();
  }

  create() {
    this.setName("bonus");
    //@ts-ignore
    this._config.scene.physics.world.enable(this);
    //@ts-ignore
    this.body.setImmovable(true);
    this.setFrame(0).setOrigin(0.5);

    let _animationConfig = {
      key: "milk-pulse",
      frames: this._config.scene.anims.generateFrameNumbers("milk", {
        frames: [0, 1],
      }),
      frameRate: 2,
      yoyo: false,
      repeat: -1,
    };
    this._config.scene.anims.create(_animationConfig);
    this.play("milk-pulse");

    this._scene.tweens.add({
      targets: this,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      y: "-=20",
      ease: "Sine.InOut",
    });
    this._config.scene.add.existing(this);
  }

  update(time: number, delta: number) {}

  playExplosion() {}

  hit() {}
  removeItem() {
    this._scene.sound.playAudioSprite("sfx", "plutonio", {
      loop: false,
      volume: 2.5,
    });
    this._scene._player.increaseDamage();
    this._scene.removeItem(this);
  }
}
