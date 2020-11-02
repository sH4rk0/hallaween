import Joy from "../scenes/Joy";
import GamePlay from "./GamePlay";
import PlayerShot from "./PlayerShot";

export default class Player extends Phaser.GameObjects.Container {
  private _config: any;
  private _isDie: boolean = false;
  private _isGameOver: boolean = false;
  private _deluca: Phaser.GameObjects.Sprite;

  private _JoyScene: Joy;

  private _D: Phaser.Input.Keyboard.Key;
  private _A: Phaser.Input.Keyboard.Key;
  private _W: Phaser.Input.Keyboard.Key;
  private _S: Phaser.Input.Keyboard.Key;
  private _input: boolean = true;
  private _LEFT: Phaser.Input.Keyboard.Key;
  private _RIGHT: Phaser.Input.Keyboard.Key;
  private _UP: Phaser.Input.Keyboard.Key;
  private _DOWN: Phaser.Input.Keyboard.Key;

  private _SPACE: Phaser.Input.Keyboard.Key;
  private _B: Phaser.Input.Keyboard.Key;

  private _shootDamage: number = 0;

  private _tweenY: Phaser.Tweens.Tween;
  private _lives: number = 0;

  private _isFiring: boolean = false;
  private _gamepad: Phaser.Input.Gamepad.Gamepad;
  /* private _fireParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _whiteParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _darkParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _slimeParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  private _hitParticle: Phaser.GameObjects.Particles.ParticleEmitter;
  */
  private _scene: GamePlay;

  private _trainer: boolean = false;

  private _chargerOffsetX: number = 20;
  private _chargerOffsetY: number = 40;
  private _chargeValue: number;
  private _chargeStartFrequency: number = 200;
  private _chargeLevel: number = 1;

  private _charger: Phaser.GameObjects.Container;
  private _particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _particle2: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _emitterBlast: Phaser.GameObjects.Particles.ParticleEmitter;
  private _isActiveCollision: boolean = true;
  private _damagePlus: number = 0;
  private _yTimer: Phaser.Time.TimerEvent;

  constructor(params: playerConfig) {
    super(params.scene, params.x, params.y);
    this._config = params;
    this._scene = <GamePlay>this._config.scene;
    this.create();
  }

  create() {
    this._isActiveCollision = true;
    if (this._scene.registry.get("trainer")) this._trainer = true;

    this._scene.events.off("attach-stick", this.attachStick, this);
    this._scene.events.on("attach-stick", this.attachStick, this);

    /*this._scene.events.off("boss-dead", this.bossDead, this);
    this._scene.events.on("boss-dead", this.bossDead, this);*/

    this._chargeValue = 0;
    this._particle = this.scene.add.particles("sparkle");
    this._particle2 = this.scene.add.particles("sparkle");

    var circle = new Phaser.Geom.Circle(0, 0, 40);
    let graphics = this.scene.add.graphics();
    this._emitter = this._particle
      .createEmitter({
        x: 0,
        y: 0,
        moveToX: 1,
        moveToY: 1,
        lifespan: 500,
        scale: { start: 1, end: 0 },
        frequency: this._chargeStartFrequency,
        alpha: { start: 0.8, end: 0 },
        emitZone: { source: circle },
      })
      .stop();

    this._emitterBlast = this._particle2.createEmitter({
      x: 0,
      y: 0,
      angle: { min: 0, max: 360, steps: 20 },
      lifespan: 100,
      frequency: this._chargeStartFrequency,
      speed: 400,
      quantity: 20,
      scale: { start: 1, end: 0 },
      on: false,
    });

    this._charger = this.scene.add.container(0, 0).setDepth(10000);
    this._charger.add([this._particle, this._particle2]);

    this._isDie = false;
    this.setDepth(10000);
    //@ts-ignore
    this._scene.physics.world.enable(this);

    //@ts-ignore
    this.body
      //@ts-ignore
      .setCircle(30, -15, -15)
      .setCollideWorldBounds(true)
      .setImmovable(true)
      .setBoundsRectangle(new Phaser.Geom.Rectangle(0, 20, 1280, 520));

    //@ts-ignore
    this.body.useDamping = true;
    //@ts-ignore
    this.body.setDrag(0.9);

    this._deluca = this._scene.add.sprite(0, 20, "deluca").setScale(2);

    this._tweenY = this._scene.tweens.add({
      targets: [this._deluca],
      alpha: 1,
      y: this._deluca.y + 5,
      ease: "Sine.easeInOut",
      yoyo: true,
      loop: -1,
    });

    this.add(this._deluca);

    let _animationConfig = {
      key: "fly",
      frames: this._config.scene.anims.generateFrameNumbers("deluca", {
        frames: [0, 1, 2],
      }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    };
    this._config.scene.anims.create(_animationConfig);

    _animationConfig = {
      key: "fly-mask",
      frames: this._config.scene.anims.generateFrameNumbers("deluca", {
        frames: [3, 4, 5, 6],
      }),
      frameRate: 5,
      yoyo: false,
      repeat: 0,
    };
    this._config.scene.anims.create(_animationConfig);

    _animationConfig = {
      key: "fly-no-mask",
      frames: this._config.scene.anims.generateFrameNumbers("deluca", {
        frames: [5, 4, 3],
      }),
      frameRate: 5,
      yoyo: false,
      repeat: 0,
    };
    this._config.scene.anims.create(_animationConfig);

    this._deluca.play("fly");

    this._config.scene.add.existing(this);

    this._D = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this._A = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );

    this._S = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this._W = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );

    this._LEFT = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this._RIGHT = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this._UP = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this._DOWN = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this._SPACE = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this._B = this._config.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.B
    );
  }

  bossDead() {
    this._deluca.play("fly-no-mask");
    this._scene.time.addEvent({
      delay: 500,
      callback: () => {
        this._deluca.play("fly");
      },
    });
  }

  startMovetimer() {
    if (this._yTimer != null) {
      this._yTimer.remove();
    }
    this._yTimer = this._scene.time.addEvent({
      delay: 4000,
      callback: () => {
        this._scene.generateSeeker();
      },
    });
  }

  deactivate() {
    this._input = false;
    //@ts-ignore
    this.body.setCollideWorldBounds(false);
  }

  maskOn() {
    //if (this._deluca != null)
    this._deluca.play("fly-mask");
  }

  attachStick() {
    //console.log("attachStick");
    this._JoyScene = <Joy>this._config.scene.scene.get("Joy");
  }

  activate() {
    this._config.scene.add.tween({
      targets: this,
      alpha: 1,
      y: 200,
      ease: "Sine.easeOut",
      duration: 1000,
      onComplete: () => {},
    });
  }

  engineDown() {
    this._isDie = true;
    this._isActiveCollision = false;
    this._scene.events.emit("player-dead");
    this._config.scene.stopSequence();

    this._scene.sound.playAudioSprite("sfx", "falling", {
      loop: false,
      volume: 0.5,
    });

    this._tweenY.pause().remove();

    //@ts-ignore
    this.body.setCollideWorldBounds(false);

    //@ts-ignore
    this.body.setAcceleration(100, 400);
    this._scene.add.tween({ targets: this, angle: 45, duration: 5000 });

    //@ts-ignore
    this.body.setVelocity(0, 0);
  }

  hit(boss: boolean) {
    this._isActiveCollision = false;
    //console.log(boss);
    if (boss) {
      // console.log("rimbalza");
      //@ts-ignore
      this.body.setVelocityX(-2000);
    }

    this._deluca.setTintFill(0xffffff);

    this._config.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this._deluca.clearTint();
      },
    });

    this._scene.events.emit("lose-live");
    this._lives = this._scene.registry.get("lives");

    if (this._lives == 0) {
      this._scene.sound.playAudioSprite("sfx", "ahhh");
      this.engineDown();
    } else {
      this._scene.tweens.add({
        targets: this,
        repeat: 30,
        yoyo: true,
        duration: 50,
        alpha: 0.1,
        onComplete: () => {
          this._isActiveCollision = true;
        },
      });

      this._scene.sound.playAudioSprite(
        "sfx",
        Phaser.Math.RND.pick(["allora", "nientedimeno"])
      );
    }
  }

  isFiring(): boolean {
    return this._isFiring;
  }

  isDie(): boolean {
    return this._isDie;
  }

  isActiveCollision() {
    return this._isActiveCollision;
  }

  handleInput() {
    if (!this._input) return;

    if (this._JoyScene && this._JoyScene.stick) {
      //@ts-ignore
      this._scene.physics.velocityFromRotation(
        this._JoyScene.stick.rotation,
        this._JoyScene.stick.force * 8,
        //@ts-ignore
        this.body.velocity
      );
    }

    if (this.fireIsDown()) {
      switch (true) {
        case this._chargeValue == 20:
          this._emitter.start();

          break;

        case this._chargeValue >= 110:
          this._emitter.stop();
          break;
      }

      this._emitter.setFrequency(
        this._chargeStartFrequency - this._chargeValue / 2
      );

      this._isFiring = true;
      this._chargeValue++;
    } else {
      if (this._chargeValue > 0) {
        switch (true) {
          case this._chargeValue < 50:
            this._chargeLevel = 1;
            this._shootDamage = 1 + this._damagePlus;
            break;

          case this._chargeValue >= 50 && this._chargeValue < 80:
            this._chargeLevel = 1.5;
            this._shootDamage = 3 + this._damagePlus;
            break;

          case this._chargeValue >= 80 && this._chargeValue < 110:
            this._chargeLevel = 2;
            this._shootDamage = 6 + this._damagePlus;
            break;

          case this._chargeValue >= 110:
            this._chargeLevel = 2;
            this._shootDamage = 14 + this._damagePlus;

            this._scene.sound.playAudioSprite(
              "sfx",
              Phaser.Math.RND.pick(["lockdown1", "lockdown2"]),
              {
                loop: false,
                volume: 0.7,
              }
            );

            break;
        }

        new PlayerShot({
          scene: this.scene,
          x: this.x + this._chargerOffsetX,
          y: this.y + this._chargerOffsetY,
          key: "bullet",
          direction: false,
          level: this._chargeLevel,
          charge: this._chargeValue,
          damage: this._shootDamage,
        });
      }

      this._chargeLevel = 1;
      this._chargeValue = 0;

      this._scene.time.addEvent({
        delay: 200,
        callback: () => {
          this._isFiring = false;
        },
      });

      this._emitter.stop();
    }

    if (this._A.isDown || this._LEFT.isDown) {
      //@ts-ignore
      this.body.setVelocityX(-400);
    }
    if (this._D.isDown || this._RIGHT.isDown) {
      //@ts-ignore
      this.body.setVelocityX(400);
    }
    if (this._W.isDown || this._UP.isDown) {
      //@ts-ignore
      this.body.setVelocityY(-400);
      this.startMovetimer();
    }
    if (this._S.isDown || this._DOWN.isDown) {
      //@ts-ignore
      this.body.setVelocityY(400);
      this.startMovetimer();
    }

    //this.startMovetimer();
  }

  fireIsDown(): boolean {
    //if (this._isFiring) return false;
    if (this._gamepad != null && this._gamepad.buttons[0].value == 1) {
      return true;
    }
    if (this._JoyScene == undefined) {
      if (this._SPACE.isDown) return true;
      return false;
    } else if (this._JoyScene.button1 && this._JoyScene.button1.isDown) {
      return true;
    } else {
      return false;
    }
  }

  increaseDamage() {
    this._damagePlus += 1;
  }

  handleGamePadInput() {
    if (this._isDie) return;
    if (this._gamepad.axes[0].getValue() == -1) {
      //@ts-ignore
      this.body.setVelocityX(-400);
    }
    if (this._gamepad.axes[0].getValue() == 1) {
      //@ts-ignore
      this.body.setVelocityX(400);
    }

    if (this._gamepad.axes[1].getValue() == -1) {
      //@ts-ignore
      this.body.setVelocityY(-400);
      this.startMovetimer();
    }
    if (this._gamepad.axes[1].getValue() == 1) {
      //@ts-ignore
      this.body.setVelocityY(400);
      this.startMovetimer();
    }
  }

  update(time: number, delta: number) {
    if (!this._isDie) this.handleInput();

    //console.log(this._scene.input.gamepad.total);
    if (this._scene.input.gamepad.total > 0 && this._gamepad == null) {
      //const pads = this._scene.input.gamepad.gamepads;
      this._gamepad = this._scene.input.gamepad.gamepads[0];
    } else if (this._gamepad != null) {
      if (!this._isDie) this.handleGamePadInput();
    }

    // var pads = this.input.gamepad.getAll();
    // var pads = navigator.getGamepads();

    this._charger.setPosition(
      this.x + this._chargerOffsetX + 40,
      this.y + this._chargerOffsetY
    );

    if (this.y > 650) {
      if (!this._isGameOver) {
        this._isGameOver = true;
        this._config.scene.gameOver();
      }
    }
  }
}
