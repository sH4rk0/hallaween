import GamePlay from "./GamePlay";
import Explosion from "./Explosion";
import EnemyBullet from "./EnemyBullet";
import Bonus from "./Bonus";

export default class Enemy extends Phaser.GameObjects.Sprite {
  private _config: enemyConfig;
  private _tween: Phaser.Tweens.Tween;
  private _scene: GamePlay;
  private _isDie: boolean = false;
  private _score: number;
  private _damage: number;
  private _shootTimer: Phaser.Time.TimerEvent;
  private _bonusTimer: Phaser.Time.TimerEvent;
  private _isTint: boolean = false;

  private _enemyProps: {
    framerate: number;
    frames: Array<number>;
    radius: number;
    radiusX: number;
    radiusY: number;
  };

  private _enemies: any = {
    bat: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 22,
      radiusX: 22,
      radiusY: 22,
    },
    pump: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 31,
      radiusX: 0,
      radiusY: 20,
    },

    bossPump: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 24,
      radiusX: 10,
      radiusY: 13,
    },
    wolf: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 31,
      radiusX: 0,
      radiusY: 20,
    },
    ghost: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 31,
      radiusX: 0,
      radiusY: 20,
    },
    witch: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 31,
      radiusX: 20,
      radiusY: 20,
    },
    dracula: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 31,
      radiusX: 0,
      radiusY: 20,
    },
    ghast: {
      framerate: 8,
      frames: [0, 1, 2, 3],
      radius: 31,
      radiusX: 0,
      radiusY: 20,
    },
  };

  constructor(params: enemyConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this.create();
  }

  create() {
    this._enemyProps = this._enemies[this._config.key];

    //console.log(this._config);

    if (this._config.itemData.data.score != null)
      this._score = this._config.itemData.data.score;

    this.setDepth(11).setOrigin(0.5);
    this.setupOrigin();
    this.setupShoot();
    this.setupDamage();

    //BODY
    this._config.scene.physics.world.enable(this);

    this.body
      //@ts-ignore
      .setCircle(
        this._enemyProps.radius,
        this._enemyProps.radiusX,
        this._enemyProps.radiusY
      )
      .setImmovable(true);

    //ANIMATIONS
    const _animationConfig = {
      key: "anim-" + this._config.key,
      frames: this._config.scene.anims.generateFrameNumbers(this._config.key, {
        frames: this._enemyProps.frames,
      }),
      frameRate: this._enemyProps.framerate,
      yoyo: false,
      repeat: -1,
    };
    this._config.scene.anims.create(_animationConfig);
    this.play("anim-" + this._config.key);

    this.setupVelocity();
    this.setupTween();
    this.setupBonus();

    if (
      this._config.itemData.data.bonus != null &&
      this._config.isFirst == true
    ) {
      this._scene.resetBonusObj();
    }
    if (
      this._config.itemData.data.bonus != null &&
      this._config.isLast == true
    ) {
      this._bonusTimer = this._scene.time.addEvent({
        delay: 200,
        callback: () => {
          if (this._isTint) {
            this.clearTint();
          } else {
            this.setTintFill(0xff0000);
          }
          this._isTint = !this._isTint;
        },
        loop: true,
      });
    }

    this._config.scene.add.existing(this);
  }

  update(time: number, delta: number) {
    if (
      (this._config.itemData.data.x == null && this.x < -50 && !this._isDie) ||
      (this._config.itemData.data.x != null && this.x > 1350 && !this._isDie)
    ) {
      this.stopActivities();
    }
  }

  setupBonus() {}

  setupVelocity() {
    if (this._config.itemData.data.vx != undefined) {
      //@ts-ignore
      this.body.setVelocityX(this._config.itemData.data.vx);
      if (this._config.itemData.data.vx > 0) {
        this.setFlipX(true);
      }
    } else {
      //@ts-ignore
      this.body.setVelocityX(Phaser.Math.RND.integerInRange(-250, -200));
    }
  }

  setupTween() {
    if (this._config.itemData.data.tween != null) {
      let _tweenY: number = 0;
      let _tweenDuration: number;

      if (this._config.itemData.data.tween.tweenY != null) {
        _tweenY = this._config.itemData.data.tween.tweenY;
      } else {
        _tweenY = Phaser.Math.RND.integerInRange(30, 60);
      }

      if (this._config.itemData.data.tween.tweenDuration != null) {
        _tweenDuration = this._config.itemData.data.tween.tweenDuration;
      } else {
        _tweenDuration = Phaser.Math.RND.integerInRange(800, 1200);
      }

      this._tween = this._config.scene.tweens.add({
        targets: this,
        y: "-=" + _tweenY,
        ease: "Sine.easeInOut",
        delay: 0,
        yoyo: true,
        repeat: -1,
        duration: _tweenDuration,
      });
    }
  }

  setupDamage() {
    if (this._config.itemData.data.energy != null) {
      this._damage = this._config.itemData.data.energy;
    } else {
      this._damage = 1;
    }
  }

  setupOrigin() {
    if (this._config.itemData.data.y != undefined) {
      if (this._config.itemData.data.y == -1) {
        this.y = this._scene._player.y;
      } else {
        this.y = this._config.itemData.data.y;
      }
    } else {
      this.y = Phaser.Math.RND.integerInRange(50, 500);
    }

    if (this._config.itemData.data.x != null) {
      this.x = this._config.itemData.data.x;
    } else {
      this.x = 1350;
    }
  }

  setupShoot() {
    if (this._config.itemData.data.shoot != null) {
      let _delay: number = this._config.itemData.data.shoot.ratio;
      let _loop: boolean = false;

      if (this._config.itemData.data.shoot.ratio == 0) {
        _delay = this._config.itemData.data.shoot.delay;
      } else {
        _loop = true;
      }

      this._shootTimer = this._scene.time.addEvent({
        delay: this._config.itemData.data.shoot.ratio,
        loop: _loop,
        callback: () => {
          this.shoot();
        },
      });
    }
  }

  shoot() {
    if (this._config.itemData.data.shoot != null) {
      this._scene.addToEnemyGroup(
        new EnemyBullet({
          scene: this._scene,
          x: this.x,
          y: this.y,
          key: this._config.itemData.data.shoot.bullet.type,
          itemData: {
            direction: this._config.itemData.data.shoot.bullet.direction,
            velocity: this._config.itemData.data.shoot.bullet.velocity,
          },
        })
      );
    }
  }

  stopActivities() {
    this._isDie = true;
    this._scene.physics.world.disable(this);
    if (this._tween != null) this._tween.remove();
    if (this._shootTimer != null) this._shootTimer.destroy();
    if (this._bonusTimer != null) this._bonusTimer.destroy();
    //@ts-ignore
    this.body.setVelocity(0, 0);
    this._scene.removeItem(this);
  }

  hit(damage: number) {
    this.setTintFill(0xffffff);
    this._config.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.clearTint();
      },
    });

    this._damage -= damage;
    if (this._damage <= 0) this.removeItem();
  }

  removeItem() {
    this._config.scene.events.emit("update-score", [this._score]);

    //console.log(this._config.itemData.data.bonus, this._config.isLast);
    if (
      this._config.itemData.data.bonus != null &&
      this._config.isLast == true
    ) {
      this._scene.updateBonusObj(this._config.itemData.data.bonus.enemy);
      if (this._scene.isBonusObjAvailable()) {
        this._scene.addToEnemyGroup(
          new Bonus({ scene: this._scene, x: this.x, y: this.y, key: "milk" })
        );

        this._scene.resetBonusObj();
      }
    } else if (
      this._config.itemData.data.bonus != null &&
      this._config.isLast == false
    ) {
      this._scene.updateBonusObj(this._config.itemData.data.bonus.enemy);
    }

    new Explosion({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: "bodyParts",
      options: { type: 0, enemy: this._config.key, sound: "splash" },
    });
    this.stopActivities();

    this._scene.time.addEvent({
      delay: 100,
      callback: () => {
        this._scene.removeItem(this);
        //if (this._config.isLast) this._scene.nextLevel();
      },
    });
  }
}
