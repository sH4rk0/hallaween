import Game from "../scenes/GamePlay";
export default class Explosion extends Phaser.GameObjects.Sprite {
  private _config: {
    scene: Game;
    x: number;
    y: number;
    options: { type: number; enemy: string; sound?: string };
  };
  private _animation: any = [
    {
      key: "blood",
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      frameRate: 15,
      scale: 1,
      sound: "",
      offsetY: -15,
      offsetX: -15,
    },
  ];

  private particles: any = {
    bat: {
      head: 4,
      arms: [11, 11],
      blood: [6, 7, 8, 16, 17],
      bones: [9, 19, 18],
    },
    witch: {
      head: 3,
      arms: [13, 14],
      blood: [6, 7, 8, 16, 17],
      bones: [9, 19, 18],
    },
    wolf: {
      head: 0,
      arms: [10, 10],
      blood: [6, 7, 8, 16, 17],
      bones: [9, 19, 18],
    },
    dracula: {
      head: 1,
      arms: [9, 19, 18],
      blood: [6, 7, 8, 16, 17],
      bones: [9, 19, 18],
    },
    ghost: {
      head: 5,
      arms: [16, 17],
      blood: [6, 7, 8, 16, 17],
      bones: [6, 7, 8],
    },
    bossPump: {
      head: 2,
      arms: [12, 12],
      blood: [6, 7, 8, 16, 17],
      bones: [6, 7, 8, 16, 17],
    },
    ghast: {
      head: null,
      arms: null,
      blood: [9, 19, 18],
      bones: [9, 19, 18],
    },
  };
  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    let _scene: Game = <Game>this._config.scene;

    let _parts: {
      head: Array<number>;
      arms: Array<number>;
      blood: Array<number>;
      bones: Array<number>;
    } = this.particles[this._config.options.enemy];

    let _options: any = this._animation[this._config.options.type];
    this.setTexture(_options.key)
      .setScale(_options.scale)
      .setDepth(100)
      .setY(this.y + _options.offsetY)
      .setX(this.x + _options.offsetX);

    var animConfig = {
      key: "explode" + this._config.options.type,
      frames: _scene.anims.generateFrameNumbers(_options.key, {
        frames: _options.frames,
      }),
      frameRate: _options.frameRate,
      repeat: 0,
    };

    _scene.anims.create(animConfig);

    if (this._config.options.sound != null) {
      this._config.scene.sound.playAudioSprite("sfx", "splash", {
        loop: false,
        volume: 0.2,
      });
    }

    this.play("explode" + this._config.options.type);

    let particles = this._config.scene.add.particles("bodyparts");

    if (_parts.head != null)
      particles.createEmitter({
        frame: _parts.head,
        angle: { min: 240, max: 300 },
        speed: { min: 300, max: 500 },
        quantity: 1,
        lifespan: 4000,
        alpha: { start: 1, end: 0 },
        scale: 1,
        rotate: { start: 0, end: 360, ease: "Back.easeOut" },
        gravityY: Phaser.Math.RND.integerInRange(800, 900),
        on: false,
      });

    if (_parts.arms != null)
      particles.createEmitter({
        frame: _parts.arms,
        angle: { min: 240, max: 300 },
        speed: { min: 300, max: 500 },
        quantity: 2,
        lifespan: 4000,
        alpha: { start: 1, end: 0 },
        scale: 1,
        rotate: { start: 0, end: 360, ease: "Back.easeOut" },
        gravityY: Phaser.Math.RND.integerInRange(800, 900),
        on: false,
      });

    particles.createEmitter({
      frame: _parts.blood,
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 5,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 1,
      rotate: { start: 10, end: 360, ease: "Back.easeOut" },
      gravityY: Phaser.Math.RND.integerInRange(800, 900),
      on: false,
    });
    particles.createEmitter({
      frame: _parts.bones,
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 3,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 1,
      rotate: { start: 40, end: 360, ease: "Back.easeOut" },
      gravityY: Phaser.Math.RND.integerInRange(800, 900),
      on: false,
    });

    particles.emitParticleAt(this.x, this.y).setDepth(101);

    _scene.add.existing(this);

    this.on(
      "animationcomplete",
      () => {
        this._config.scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 300,
          onComplete: () => {
            this.destroy();
          },
        });
      },
      this
    );
  }
}
