import SceneTransition from "../scenes/SceneTransition";

export default class Hud extends Phaser.Scene {
  private _scoreText: Phaser.GameObjects.Text;
  private _score: number = 0;
  private _isPaused: boolean = false;
  private _levelPauseContainer: Phaser.GameObjects.Container;
  private _music: Phaser.Sound.BaseSound;
  private _gamePlay: Phaser.Scene;
  private _level: number = 0;
  private _lives: Array<Phaser.GameObjects.Image>;
  private _startingLives: number = 3;
  private _livesCounter: number = 0;
  private _levelMusic: Array<string> = [
    "music0",
    "music1",
    "music0",
    "music1",
    "music0",
    "music1",
  ];

  private _energybarBg: Phaser.GameObjects.Image;
  private _energybar: Phaser.GameObjects.Image;
  private _energybarmask: Phaser.GameObjects.Image;
  private _scoreLives: number = 0;
  private _newLive: number = 100;

  private _bossMaxHit: number = 0;
  private _bossDamage: number = 0;
  private _transition: SceneTransition;

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() {}

  create() {
    this._transition = <SceneTransition>this.scene.get("SceneTransition");
    this._lives = [];
    this._livesCounter = 0;
    this._startingLives = 3;
    this._newLive = 5000;

    this.game.events.on(Phaser.Core.Events.BLUR, () => {
      this.handleLoseFocus();
    });

    this.game.events.on(Phaser.Core.Events.FOCUS, () => {
      this.handleLoseFocus();
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        return;
      }
      this.handleLoseFocus();
    });

    this._music = this.sound.add(this._levelMusic[this._level]);
    this._music.play(undefined, {
      loop: true,
      volume: 0.3,
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.sound.playAudioSprite("sfx", "gloria", {
          loop: false,
          volume: 2,
        });
      },
    });

    this._gamePlay = <Phaser.Scene>this.scene.get("GamePlay");

    for (var i = 0; i < this._startingLives; i++) {
      this.addLive(i);
    }

    this._gamePlay.events.off("gameover", this.gameOver, this);
    this._gamePlay.events.on("gameover", this.gameOver, this);

    /* this._gamePlay.events.off("incomingBoss", this.incomingBoss, this);
    this._gamePlay.events.on("incomingBoss", this.incomingBoss, this);
    

    this._gamePlay.events.off("boss-dead", this.restartMusic, this);
    this._gamePlay.events.on("boss-dead", this.restartMusic, this);
    */

    this._gamePlay.events.off("lose-live", this.removeLive, this);
    this._gamePlay.events.on("lose-live", this.removeLive, this);

    this._gamePlay.events.off("bonus-live", this.bonusLive, this);
    this._gamePlay.events.on("bonus-live", this.bonusLive, this);

    this._gamePlay.events.off("update-score", this.updateScore, this);
    this._gamePlay.events.on("update-score", this.updateScore, this);

    this._gamePlay.events.off(
      "update-boss-energy",
      this.updateBossEnergy,
      this
    );
    this._gamePlay.events.on("update-boss-energy", this.updateBossEnergy, this);

    this._gamePlay.events.off(
      "display-boss-energy",
      this.displayBossEnergy,
      this
    );
    this._gamePlay.events.on(
      "display-boss-energy",
      this.displayBossEnergy,
      this
    );

    this._isPaused = false;
    this._score = 0;

    this._scoreText = this.add
      .text(20, 20, "0", {
        font: "30px",
        fill: "#ffffff",
        stroke: "#ff7f00",
        strokeThickness: 6,
        wordWrap: true,
        wordWrapWidth: 1000,
      })
      .setFontFamily('"Press Start 2P"')
      .setOrigin(0);

    this._levelPauseContainer = this.add.container(0, 0).setDepth(100001);
    this._levelPauseContainer
      .add([
        this.add.image(0, 0, "black-screen").setAlpha(0.7).setOrigin(0),
        this.add
          .text(640, 300, "PAUSED")
          .setTint(0xffffff)
          .setOrigin(0.5)
          .setAlpha(1)
          .setFontSize(30)
          .setFontFamily('"Press Start 2P"'),
      ])
      .setAlpha(0);

    this.input.keyboard.on("keydown-P", (event: Event) => {
      if (this._isPaused) {
        this.resumeGame();
      } else {
        this.pauseGame();
      }
    });

    this._energybarBg = this.add
      .image(640, 30, "energybarmask")
      .setOrigin(0.5)
      .setDepth(100000)
      .setAlpha(0);

    this._energybar = this.add
      .image(658, 29, "energybar")
      .setOrigin(0.5)
      .setDepth(100000)
      .setAlpha(0);

    this._energybarmask = this.add
      .image(658, 29, "energybar")
      .setOrigin(0.5)
      .setDepth(100000);

    this._energybarmask.visible = false;

    this._energybar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this._energybarmask
    );
  }

  update() {}

  displayBossEnergy(parameters: Array<number>) {
    this._energybarmask.setX(658);
    this._bossMaxHit = parameters[0];
    this.add.tween({ targets: [this._energybarBg, this._energybar], alpha: 1 });
  }

  updateBossEnergy(parameters: Array<number>) {
    this._bossDamage = parameters[0];
    this._energybarmask.setX(
      658 - (((this._bossDamage * 100) / this._bossMaxHit) * 383) / 100
    );
  }

  addLive(index: number) {
    this._lives.push(
      this.add
        .image(1240 - index * 50, 40, "heart")
        .setScale(1)
        .setOrigin(0.5)
    );
    this._livesCounter += 1;
    this.registry.set("lives", this._livesCounter);
  }

  bonusLive() {
    this._scoreLives++;
    this.sound.playAudioSprite("sfx", "1up");
    this.addLive(this._livesCounter);
  }

  removeLive() {
    this._lives[this._livesCounter - 1].destroy();
    this._lives.splice(this._livesCounter - 1, 1);
    this._livesCounter -= 1;
    this.registry.set("lives", this._livesCounter);
  }

  private updateScore(parameters: Array<any>): void {
    this._score += parameters[0];
    this._scoreText.setText(this._score + "");
    this.registry.set("score", this._score);

    const _addLive: number = Math.floor(this._score / this._newLive);

    if (_addLive > this._scoreLives) {
      this.bonusLive();
    }
  }

  private pauseGame() {
    this._levelPauseContainer.setAlpha(1);

    this._music.pause();
    this.game.scene.pause("GamePlay");
    this._isPaused = true;
  }
  private resumeGame() {
    this._levelPauseContainer.setAlpha(0);
    this.game.scene.resume("GamePlay");
    this._music.resume();

    this._isPaused = false;
  }

  handleLoseFocus() {
    if (this.game.scene.isActive("Hud")) {
      if (this.game.scene.isActive("GamePlay")) {
        this.pauseGame();
      } else {
        this.resumeGame();
      }
    }
  }

  incomingBoss() {
    this._music.stop();
    this._music = this.sound.add("alarm");
    this._music.play(undefined, {
      loop: false,
      volume: 0.1,
    });

    this._music.once("complete", () => {
      this._music.stop();
      this._music = this.sound.add("halloween");
      this._music.play(undefined, {
        loop: true,
        volume: 0.3,
      });
    });
  }

  restartMusic() {
    this.add.tween({
      targets: [this._energybarBg, this._energybar],
      alpha: 0,
      onComplete: () => {
        this._energybarmask.setX(658);
      },
    });

    this._level++;
    this._music.stop();
    this._music = this.sound.add(this._levelMusic[this._level]);
    this._music.play(undefined, {
      loop: true,
      volume: 0.3,
    });
  }

  private gameOver() {
    this._transition.appear(true, () => {
      this._music.stop();
      this.scene.stop("Hud");
      this.scene.stop("GamePlay");
      if (this.sys.game.device.input.touch) {
        this.scene.stop("Joy");
      }
      this.scene.start("GameOver");
      this.scene.start("ScoreInput");
      this.scene.bringToTop("GameOver");
      this.scene.bringToTop("ScoreInput");
      this.scene.bringToTop("SceneTransition");
    });
  }
}
