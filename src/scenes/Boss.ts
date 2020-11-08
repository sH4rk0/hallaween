import GamePlaySlurp from "./GamePlay";
import Bomb from "./EnemyBullet";
import BossPump from "./BossPump";
import Enemy from "./Enemy";
import { GameData } from "../GameData";
export default class Boss extends Phaser.GameObjects.Container {
  private _config: enemyConfig;
  private _isDie: boolean = false;
  private _1: Phaser.Input.Keyboard.Key;
  private _2: Phaser.Input.Keyboard.Key;
  private _3: Phaser.Input.Keyboard.Key;
  private _4: Phaser.Input.Keyboard.Key;
  private _5: Phaser.Input.Keyboard.Key;
  private _6: Phaser.Input.Keyboard.Key;
  private _7: Phaser.Input.Keyboard.Key;
  private _8: Phaser.Input.Keyboard.Key;
  private _9: Phaser.Input.Keyboard.Key;
  private _isAnimating: boolean = false;
  private _circleTween: Phaser.Tweens.Tween;
  private _circlePumps: Array<Phaser.GameObjects.Sprite>;
  private _top: Phaser.GameObjects.Sprite;
  private _base: Phaser.GameObjects.Sprite;
  private _core: Phaser.GameObjects.Sprite;
  private _damage: number = 0;
  private _maxHit: number = 0;
  private _collider: Phaser.GameObjects.Sprite;
  private _leftParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _rightParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _fireParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _whiteParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _darkParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _scene: GamePlaySlurp;
  private _moveTween: Phaser.Tweens.Tween;
  private _startTween: Phaser.Tweens.Tween;
  private _type: number;
  private _isShieldActive: boolean = false;
  private _actionSequence: Array<{
    a: number;
    d: number;
    data: { sw?: swarmConfig };
  }>;
  private _currentAction: number = 0;
  private _actionTimer: Phaser.Time.TimerEvent;
  private _swarmTimer: Phaser.Time.TimerEvent;
  private _levelLevel: {
    a: Array<{
      a: number;
      d: number;
      data: { sw?: swarmConfig };
    }>;
    d: number;
    s: number;
    pd: number;
  };

  private _level: Array<{
    a: Array<{
      a: number;
      d: number;
      data: { sw?: swarmConfig };
    }>;
    d: number;
    s: number;
    pd: number;
  }>;

  constructor(params: enemyConfig) {
    super(params.scene, params.x, params.y);
    this._config = params;
    this._scene = <GamePlaySlurp>this._config.scene;
    this.create();
  }

  create() {
    this.setName("bossCore");
    this.setAnimKeys();
    this._level = GameData.bossLevels;

    const _level: number = this._config.scene.registry.get("level");
    //console.log("setup boss level:" + _level);
    this._actionSequence = this._level[_level].a;
    this._levelLevel = this._level[_level];

    this._type = 0;
    this.x = 1600;
    this._isShieldActive = false;

    this._maxHit = this._level[this._type].d;

    this._scene.events.off("gameover", this.gameOver, this);
    this._scene.events.on("gameover", this.gameOver, this);

    this._scene.events.off("player-dead", this.playerDead, this);
    this._scene.events.on("player-dead", this.playerDead, this);

    this._leftParticle = this._config.scene.add
      .particles("explosionParticles")
      .setDepth(200);

    this._leftParticle
      .createEmitter({
        frame: ["smoke-puff", "cloud", "smoke-puff"],
        angle: { min: 200, max: 250 },
        speed: { min: 50, max: 60 },
        quantity: { min: 3, max: 5 },
        lifespan: 2000,
        alpha: { start: 1, end: 0 },
        scale: { start: 0.25, end: 0.1 },
        on: false,
      })
      .startFollow(this);

    this._leftParticle
      .createEmitter({
        frame: "muzzleflash2",
        lifespan: 200,
        scale: { start: 0.5, end: 0 },
        rotate: { start: 0, end: 180 },
        on: false,
      })
      .startFollow(this);

    this._rightParticle = this._config.scene.add
      .particles("explosionParticles")
      .setDepth(200);

    this._rightParticle
      .createEmitter({
        frame: ["smoke-puff", "cloud", "smoke-puff"],
        angle: { min: 300, max: 350 },
        // angle: { min: 200, max: 250 },
        speed: { min: 50, max: 60 },
        quantity: { min: 3, max: 5 },
        lifespan: 2000,
        alpha: { start: 1, end: 0 },
        scale: { start: 0.25, end: 0.1 },
        on: false,
      })
      .startFollow(this);

    this._rightParticle
      .createEmitter({
        frame: "muzzleflash2",
        lifespan: 200,
        scale: { start: 0.5, end: 0 },
        rotate: { start: 0, end: 180 },
        on: false,
      })
      .startFollow(this);

    this._fireParticle = this._config.scene.add
      .particles("fire")
      .createEmitter({
        x: 400,
        y: 300,
        speed: { min: 100, max: 200 },
        angle: { min: -85, max: -95 },
        scale: { start: 0, end: 1, ease: "Back.easeOut" },
        alpha: { start: 1, end: 0, ease: "Quart.easeOut" },
        blendMode: "SCREEN",
        lifespan: 1000,
        active: false,
      });

    this._whiteParticle = this._config.scene.add
      .particles("white-smoke")
      .createEmitter({
        x: 400,
        y: 300,
        speed: { min: 20, max: 100 },
        angle: { min: 0, max: 360 },
        scale: { start: 1, end: 0 },
        alpha: { start: 0, end: 0.5 },
        lifespan: 2000,
        active: false,
      });

    this._darkParticle = this._config.scene.add
      .particles("dark-smoke")
      .createEmitter({
        x: 400,
        y: 300,
        speed: { min: 20, max: 100 },
        angle: { min: 0, max: 360 },
        scale: { start: 1, end: 0 },
        alpha: { start: 0, end: 0.1 },
        blendMode: "ADD",
        lifespan: 2000,
        active: false,
      });

    this._fireParticle.startFollow(this, -400, -380);
    this._whiteParticle.startFollow(this, -400, -400);
    this._darkParticle.startFollow(this, -400, -380);

    this._damage = 0;
    this._isDie = false;
    //@ts-ignore
    this._config.scene.physics.world.enable(this);
    //@ts-ignore
    this.body
      //@ts-ignore
      .setCircle(50, -50, -50)
      .setImmovable(true)
      .setBounce(1);

    this._core = this._scene.add.sprite(0, 0, "pumpkin");
    this._top = this._scene.add
      .sprite(0, -42, "boss-top")
      .setScale(3)
      .setName("bossTop");
    this._base = this._scene.add
      .sprite(0, 42, "boss-base")
      .setScale(3)
      .setName("bossBase");
    this._config.scene.physics.world.enable([this._top, this._base]);

    //@ts-ignore
    this._top.body.setImmovable(true);
    //@ts-ignore
    this._top.body.setSize(69, 27);
    //@ts-ignore
    this._top.body.setOffset(6, 6);
    //@ts-ignore
    this._base.body.setImmovable(true);
    //@ts-ignore
    this._base.body.setSize(69, 20);
    //@ts-ignore
    this._base.body.setOffset(6, 12);

    this._scene.addToBossGroup(this._top);
    this._scene.addToBossGroup(this._base);

    this.add([this._core, this._top, this._base]);

    this._config.scene.add.existing(this);
    this.activate();
  }

  activate() {
    this._startTween = this._config.scene.add.tween({
      targets: this,
      alpha: 1,
      x: 1100,
      ease: "Sine.easeOut",
      duration: 2000,
      onStart: () => {
        this._config.scene.events.emit("display-boss-energy", [this._maxHit]);
      },
      onComplete: () => {
        this.nextAction();
        this.createShield();
      },
    });
  }

  nextAction() {
    // console.log("nextaction");
    if (this.isDie()) return;
    if (this._actionSequence[this._currentAction] == null)
      this._currentAction = 0;

    let _params: any = null;
    if (
      this._actionSequence[this._currentAction].data != null &&
      this._actionSequence[this._currentAction].data.sw != null
    ) {
      _params = this._actionSequence[this._currentAction].data.sw;
    }

    this._actionTimer = this._scene.time.addEvent({
      delay: this._actionSequence[this._currentAction].d,
      callback: () => {
        //console.log(this._actionSequence[this._currentAction].a, _params);
        this.animate(this._actionSequence[this._currentAction].a, _params);
      },
      loop: false,
    });
  }

  isAnimating(): boolean {
    return this._isAnimating;
  }

  setAnimKeys() {
    this._1 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ONE
    );
    this._2 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.TWO
    );
    this._3 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.THREE
    );
    this._4 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.FOUR
    );
    this._5 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.FIVE
    );
    this._6 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SIX
    );
    this._7 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SEVEN
    );
    this._8 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.EIGHT
    );
    this._9 = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.NINE
    );
  }

  handleAnimKeys() {
    if (this._1.isDown && !this.isAnimating()) this.animate(1, null);
    if (this._2.isDown && !this.isAnimating()) this.animate(2, null);
    if (this._3.isDown && !this.isAnimating()) this.animate(3, null);
    if (this._4.isDown && !this.isAnimating()) this.animate(4, null);
    if (this._5.isDown && !this.isAnimating()) this.animate(5, null);
    if (this._6.isDown && !this.isAnimating()) this.animate(6, null);
    if (this._7.isDown && !this.isAnimating()) this.animate(7, null);
    if (this._8.isDown) this.animate(8, null);
    if (this._9.isDown) this.animate(9, null);
  }

  animate(anim: number, params: any) {
    //console.log(params);
    if (this.isDie()) return;
    this._isAnimating = true;
    switch (anim) {
      case 1:
        this.animOpen();
        break;
      case 2:
        this.animClose();
        break;
      case 3:
        this.moveTop();
        break;
      case 4:
        this.moveCenter();
        break;
      case 5:
        this.moveBottom();
        break;
      case 6:
        this.rushToLeft();
        break;
      case 7:
        this.rushToRight();
        break;
      case 8:
        this.enableShield();
        break;
      case 9:
        this.disableShield();
        break;
      case 10:
        this.generateSwarm(params);
        break;
      case 11:
        this.flipToRight();
        break;
      case 12:
        this.flipToLeft();
        break;
    }
  }

  generateSwarm(params: any) {
    //console.log(params);
    this.animationEnd();
    this._scene.generateSwarm(params);
  }

  createShield() {
    let circle = new Phaser.Geom.Circle(1100, 300, 250);
    let _pump: Phaser.GameObjects.Sprite;
    this._circlePumps = [];
    for (var i = 0; i < this._levelLevel.s; i++) {
      _pump = new BossPump({
        scene: this.scene,
        x: 0,
        y: 0,
        key: "bossPump",
        itemData: { d: this._levelLevel.pd, data: { t: 0 } },
      })
        .setDepth(100 + i)
        .setAlpha(0);
      this._scene.addToBossGroup(_pump);
      this._circlePumps.push(_pump);
    }

    Phaser.Actions.PlaceOnCircle(this._circlePumps, circle);

    this._circleTween = this._scene.tweens
      .addCounter({
        from: 250,
        to: 175,
        duration: 3000,
        delay: 2000,
        ease: "Sine.easeInOut",
        repeat: -1,
        yoyo: true,
      })
      .stop();
  }

  enableShield() {
    //console.log("enableShield");
    this._isShieldActive = true;

    this._circleTween.play();

    this._scene._groupBoss
      .getChildren()
      .forEach((_pump: any, index: number) => {
        if (_pump != null && _pump.name == "bossPump") {
          this.scene.tweens.add({
            targets: _pump,
            alpha: 1,
            delay: index * 50,
            onComplete: () => {
              _pump.activate();
            },
          });
        }
      });
    this.animationEnd();
  }
  disableShield() {
    // console.log("disableShield");
    let counter = 0;
    this._scene._groupBoss
      .getChildren()
      .forEach((_pump: any, index: number) => {
        if (_pump != null && _pump.name == "bossPump") {
          _pump.pause();
          this.scene.tweens.add({
            targets: _pump,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              this._isShieldActive = false;
              this._circleTween.pause();
            },
          });
        }
      });
    this.animationEnd();
  }

  animationEnd() {
    this._isAnimating = false;
    this._currentAction++;
    this.nextAction();
  }

  animOpen() {
    //  console.log("animOpen");
    this.scene.tweens.add({ targets: this._top, y: -80 });
    this.scene.tweens.add({
      targets: this._base,
      y: 80,
      onComplete: () => {
        this.animationEnd();
      },
    });
  }
  animClose() {
    // console.log("animClose");
    this.scene.tweens.add({ targets: this._top, y: -42 });
    this.scene.tweens.add({
      targets: this._base,
      y: 42,
      onComplete: () => {
        this.animationEnd();
      },
    });
  }
  moveTop() {
    // console.log("moveTop");
    this._moveTween = this.scene.tweens.add({
      targets: this,
      y: 150,
      onComplete: () => {
        this.animationEnd();
      },
    });
  }
  moveCenter() {
    //console.log("moveCenter");
    this._moveTween = this.scene.tweens.add({
      targets: this,
      y: 300,
      onComplete: () => {
        this.animationEnd();
      },
    });
  }
  moveBottom() {
    // console.log("moveBottom");
    this._moveTween = this.scene.tweens.add({
      targets: this,
      y: 450,
      onComplete: () => {
        this.animationEnd();
      },
    });
  }

  rushToLeft() {
    //console.log("rushToLeft");
    this._moveTween = this.scene.tweens.add({
      targets: this,
      x: 150,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.animationEnd();
      },
    });
  }

  rushToRight() {
    // console.log("rushToRight");
    this._moveTween = this.scene.tweens.add({
      targets: this,
      x: 1100,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.animationEnd();
      },
    });
  }
  flipToLeft() {
    // console.log("flipToLeft");
    this._top.setFlipX(false);
    this._base.setFlipX(false);
    this._core.setFlipX(false);
    this.animationEnd();
  }
  flipToRight() {
    // console.log("flipToRight");
    this._top.setFlipX(true);
    this._base.setFlipX(true);
    this._core.setFlipX(true);
    this.animationEnd();
  }

  gameOver() {
    this.stopActivities();
    this._scene.removeBossItem(this);
    this._scene._groupBoss.clear(true);
    //this.destroy();
  }

  playerDead() {
    this._scene.sound.playAudioSprite("sfx", "buaaa", {
      loop: false,
      volume: 0.25,
    });
    this.stopActivities();
  }

  secondCollider() {
    return this._collider;
  }

  getObjName(): string {
    return "boss";
  }

  stopActivities() {
    if (this._actionTimer != undefined) this._actionTimer.remove();
    if (this._startTween != undefined) this._startTween.pause().remove();
    if (this._moveTween != undefined) this._moveTween.pause().remove();
    this._darkParticle.stop();
    this._whiteParticle.stop();
    this._fireParticle.stop();
  }

  engineDown() {
    this.stopActivities();

    this._scene.sound.playAudioSprite("sfx", "falling", {
      loop: false,
      volume: 0.5,
    });

    //@ts-ignore
    this.body.setAccelerationX(100);
    this._scene.add.tween({ targets: this, angle: 45, duration: 5000 });
    //@ts-ignore
    this.body.setAccelerationY(400).setVelocity(0, 0);
  }

  hit(bodyPart: string, damage: number) {
    if (this.isDie()) return;

    switch (bodyPart) {
      case "bossTop":
        this._top.setTintFill(0xffffff);
        this._config.scene.sound.playAudioSprite("sfx", "nodamage", {
          loop: false,
          volume: 0.2,
        });
        this._config.scene.time.addEvent({
          delay: 100,
          callback: () => {
            this._top.clearTint();
          },
        });
        return;
        break;

      case "bossBase":
        this._base.setTintFill(0xffffff);
        this._config.scene.sound.playAudioSprite("sfx", "nodamage", {
          loop: false,
          volume: 0.2,
        });
        this._config.scene.time.addEvent({
          delay: 100,
          callback: () => {
            this._base.clearTint();
          },
        });
        return;
        break;

      case "bossCore":
        this._config.scene.sound.playAudioSprite("sfx", "bosshit", {
          loop: false,
          volume: 0.2,
        });
        this._core.setTintFill(0xffffff);
        this._config.scene.time.addEvent({
          delay: 100,
          callback: () => {
            this._core.clearTint();
          },
        });

        this._damage += damage;

        if (this._damage > this._maxHit / 4 && !this._fireParticle.active) {
          this._fireParticle.active = true;
        } else if (
          this._damage > this._maxHit / 3 &&
          !this._darkParticle.active
        ) {
          this._darkParticle.active = true;
        } else if (
          this._damage > this._maxHit / 2 &&
          !this._whiteParticle.active
        ) {
          this._whiteParticle.active = true;
        }

        if (this._damage >= this._maxHit) {
          this._isDie = true;
          this._config.scene.events.emit("update-score", [1000]);

          this.engineDown();
        } else {
          this._config.scene.events.emit("update-score", [100]);
        }
        this._config.scene.events.emit("update-boss-energy", [this._damage]);
        break;
    }
  }

  isDie(): boolean {
    return this._isDie;
  }

  update(time: number, delta: number) {
    //this.handleAnimKeys();

    if (this._isShieldActive) {
      Phaser.Actions.RotateAroundDistance(
        this._circlePumps,
        { x: this.x, y: this.y },
        0.02,
        this._circleTween.getValue()
      );
    }

    if (this.y > 900) {
      this._darkParticle.stop();
      this._whiteParticle.stop();
      this._fireParticle.stop();
      this._scene.physics.world.disable(this);

      this._scene.sound.playAudioSprite("sfx", "explosion", {
        loop: false,
        volume: 0.2,
      });

      this._scene.nextLevel();
      this._scene.bossDead();
      this._scene.removeBossItem(this);
      this._scene._groupBoss.clear(true);
    }
  }
}
