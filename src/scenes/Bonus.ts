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
    //console.log(this._config.key);
    this.setName("bonus");
    //@ts-ignore
    this._config.scene.physics.world.enable(this);
    //@ts-ignore
    this.body.setImmovable(true);
    this.setFrame(0).setOrigin(0.5);

    let _animationConfig = {
      key: this._config.key + "-pulse",
      frames: this._config.scene.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1],
      }),
      frameRate: 2,
      yoyo: false,
      repeat: -1,
    };

    this._config.scene.anims.create(_animationConfig);
    this.play(this._config.key + "-pulse");

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
    //console.log(this._config.key);
    switch (this._config.key) {
      case "bonus-damage":
        this._scene.sound.playAudioSprite("sfx", "plutonio", {
          loop: false,
          volume: 2.5,
        });

        this._scene._player.increaseDamage();
        break;

      case "bonus-invulnerability":
        this._scene.sound.playAudioSprite("sfx", "chebello", {
          loop: false,
          volume: 0.5,
        });
        this._scene._player.setInvulnerability(2500, true);
        break;

      case "bonus-velocity":
        this._scene.sound.playAudioSprite("sfx", "chebello", {
          loop: false,
          volume: 0.5,
        });
        this._scene._player.increaseSpeed();
        break;

      case "bonus-live":
        this._scene.bonusLive();
        break;

      case "bonus-fire":
        this._scene.sound.playAudioSprite("sfx", "chebello", {
          loop: false,
          volume: 0.5,
        });
        this._scene._player.increaseFire();
        break;
    }

    this._scene.removeItem(this);
  }
}
