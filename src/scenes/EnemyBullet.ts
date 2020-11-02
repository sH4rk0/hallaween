import GamePlay from "./GamePlay";

export default class EnemyBullet extends Phaser.GameObjects.Sprite {
  private _config: enemyBulletConfig;
  private _scene: GamePlay;

  constructor(params: enemyBulletConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this.create();
  }

  create() {
    this.setName("enemyBullet");

    //@ts-ignore
    this._config.scene.physics.world.enable(this);
    //@ts-ignore
    this.body.setImmovable(true);

    this.setFrame(0).setScale(1).setOrigin(0.5);
    //@ts-ignore
    //this.body.setCollideWorldBounds(true).setBounce(1);

    //let _xvel: number = 100 + Phaser.Math.RND.integerInRange(1, 3) * 16;

    /*const _animationConfig = {
      key: "bulletAnimation",
      frames: this._config.scene.anims.generateFrameNumbers("enemyBullet", {
        frames: [0, 1],
      }),
      frameRate: 4,
      yoyo: false,
      repeat: -1,
    };
    this._config.scene.anims.create(_animationConfig);*/

    switch (this._config.itemData.direction) {
      case 0: //Horizontal
        //@ts-ignore
        this.body.setVelocity(this._config.itemData.velocity, 0);
        break;
      case 1: //Vertical
        //@ts-ignore
        this.body.setVelocity(this._config.itemData.velocity, 0);
        break;
      case 2: //seek
        let angle = Phaser.Math.Angle.BetweenPoints(this, this._scene._player);

        this._scene.physics.velocityFromRotation(
          angle,
          600,
          //@ts-ignore
          this.body.velocity
        );
        break;
    }

    this._config.scene.add.existing(this);
  }

  update(time: number, delta: number) {}

  playExplosion() {
    /*  let _anim = this._scene.add
      .sprite(this.x, this.y, "fake-explo")
      .setOrigin(0.5)
      .setScale(2)
      .setDepth(20);
    let _animationConfig = {
      key: "bomb-explo",
      frames: this._scene.anims.generateFrameNumbers("bomb-explo", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      }),
      frameRate: 30,
      yoyo: false,
    };
    this._scene.anims.create(_animationConfig);
    _anim.play("bomb-explo");
    _anim.on(
      "animationcomplete",
      () => {
        _anim.destroy();
      },
      this
    );
    */
  }

  removeItem() {
    this.playExplosion();
    this._scene.removeItem(this);
  }
}
