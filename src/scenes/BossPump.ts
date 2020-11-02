import GamePlay from "./GamePlay";

export default class BossPump extends Phaser.GameObjects.Sprite {
  private _config: enemyConfig;
  private _tween: Phaser.Tweens.Tween;
  private _scene: GamePlay;
  private _damage: number;

  constructor(params: enemyConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this.create();
  }

  create() {
    this.setName("bossPump").setScale(2);
    this._damage = this._config.itemData.d;

    let _animationConfig = {
      key: "pumpAnim",
      frames: this._config.scene.anims.generateFrameNumbers("bossPump", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };
    this._config.scene.anims.create(_animationConfig);

    _animationConfig = {
      key: "pumpHit",
      frames: this._config.scene.anims.generateFrameNumbers("bossPump", {
        frames: [4],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    };
    this._config.scene.anims.create(_animationConfig);

    this.play("pumpAnim");

    this._config.scene.add.existing(this);
  }

  update(time: number, delta: number) {}

  pause() {
    this._config.scene.physics.world.disable(this);
  }

  activate() {
    this._config.scene.physics.world.enable(this);
    //@ts-ignore
    this.body.setImmovable(true);
    //@ts-ignore
    this.body.setCircle(24, 12, 16);
  }

  hit(damage: number) {
    this.play("pumpHit");
    this._config.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.play("pumpAnim");
      },
    });

    this._damage -= damage;

    if (this._damage <= 0) this.removeItem();
  }

  removeItem() {
    this._scene.physics.world.disable(this);

    this.setTintFill(0xffffff);

    this._scene.time.addEvent({
      delay: 100,
      callback: () => {
        this._scene.removeBossItem(this);
      },
    });
  }
}
