import GamePlay from "../scenes/GamePlay";

export default class PlayerShot extends Phaser.Physics.Arcade.Sprite {
  private _config: PlayerShotConfig;
  private _launchSound: Phaser.Sound.BaseSound;
  private _isPerforant: boolean;
  private _particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _velocity: number = 900;
  private _damage: number = 1;

  constructor(params: PlayerShotConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }
  create(): void {
    this._isPerforant = true;
    this._damage = this._config.damage;
    let _scene: GamePlay = <GamePlay>this._config.scene;
    _scene.physics.world.enable(this);

    this._particles = this._config.scene.add.particles("spark").setDepth(1);

    this._emitter = this._particles.createEmitter({
      speed: { min: 15 * this._config.level, max: 25 * this._config.level },
      lifespan: {
        min: 150 * this._config.level,
        max: 170 * this._config.level,
      },
      scale: { start: 0.5 * this._config.level, end: 0 },
      blendMode: "ADD",
    });

    this._emitter.startFollow(this, 16).setAlpha(0.5);

    if (this._config.direction) this._velocity *= -1;

    this.setDepth(10001)
      .setOrigin(0.5)
      .setScale(1 * this._config.level)
      .setImmovable(true)
      .setCircle(16, -8, -8)
      .setVelocityX(this._velocity);

    //@ts-ignore
    this.body.allowGravity = false;

    _scene.addToBulletsGroup(this);
    _scene.add.existing(this);

    this._config.scene.sound.playAudioSprite("sfx", "shoot", {
      loop: false,
      volume: 0.2,
    });
  }

  update(time: number, delta: number): void {
    if (this.x > 1300) this.remove();
  }

  getDamage(): number {
    return this._damage;
  }

  remove() {
    this._emitter.stop();
    this.destroy();
  }
}
