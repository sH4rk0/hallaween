import { leaderboard } from "../InitGame";
import { NormalModuleReplacementPlugin } from "webpack";

export default class GameOver extends Phaser.Scene {
  _playerText: Phaser.GameObjects.BitmapText;

  private _music: Phaser.Sound.BaseSound;
  private _tile1: Phaser.GameObjects.TileSprite;
  private _tile2: Phaser.GameObjects.TileSprite;
  private _tile3: Phaser.GameObjects.TileSprite;
  private _tile4: Phaser.GameObjects.TileSprite;
  private _cloud1: Phaser.GameObjects.TileSprite;
  private _cloud2: Phaser.GameObjects.TileSprite;
  private _GameOver: Phaser.GameObjects.Text;
  private _score: number = 0;
  private _level: number = 0;
  private _trainer: boolean = false;
  private _bestlevel: number = 0;
  private _win: boolean = false;
  private _coffin: Phaser.GameObjects.Sprite;
  private _santa: Phaser.GameObjects.Sprite;
  private _deluca: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "GameOver",
    });
  }

  create() {
    // console.log("create gameover");

    this._win = this.registry.get("win");
    this.registry.set("win", false);

    //this._win = true;

    this.input.keyboard.on("keydown-O", (event: Event) => {
      this.game.renderer.snapshot((image: any) => {
        let mimeType = "image/png";
        var imgURL = image.src;
        var dlLink = document.createElement("a");
        dlLink.download = "snapshot";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [
          mimeType,
          dlLink.download,
          dlLink.href,
        ].join(":");
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
      });
    });

    this._score = this.registry.get("score");
    this._level = this.registry.get("level");
    this._trainer = this.registry.get("trainer");
    this._bestlevel = this.registry.get("bestlevel");

    if (this._level > this._bestlevel)
      this.registry.set("bestlevel", this._level);
    localStorage.setItem("bestlevel", this._level + "");

    this._tile1 = this.add
      .tileSprite(0, -50, 1280, 600, "sky")

      .setOrigin(0);

    this._cloud2 = this.add
      .tileSprite(-40, -50, 1400, 600, "cloud2")
      .setOrigin(0)
      .setScrollFactor(0);

    this._cloud1 = this.add
      .tileSprite(-40, -50, 1400, 600, "cloud1")

      .setOrigin(0)
      .setScrollFactor(0);

    this._tile2 = this.add
      .tileSprite(0, 0, 320, 150, "bglevel1")
      .setOrigin(0)
      .setScale(4);

    this._tile3 = this.add
      .tileSprite(0, 50, 320, 150, "bglevel2")
      .setScale(4)
      .setOrigin(0);

    this._tile4 = this.add
      .tileSprite(0, 550, 1280, 50, "gameoverbg")
      .setOrigin(0);

    let _config = {
      font: "60px",
      fill: "#ffffff",
      wordWrap: true,
      wordWrapWidth: 1000,
    };

    if (this._win) {
      this._music = this.sound.add("win");
      this._music.play(undefined, {
        loop: true,
        volume: 0.7,
      });

      this.registry.set("bestlevel", 0);
      localStorage.setItem("bestlevel", 0 + "");

      this._GameOver = this.add
        .text(640, 65, "THE END", _config)
        .setStroke("#ff6600", 10)
        .setAlpha(1)
        .setOrigin(0)
        .setFontFamily('"Press Start 2P"')
        .setDepth(1001)
        .setOrigin(0.5);

      this._santa = this.add.sprite(900, 504, "santa").setScale(2);

      let _animationConfig = {
        key: "run",
        frames: this.anims.generateFrameNumbers("santa", {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }),
        frameRate: 10,
        yoyo: false,
        repeat: -1,
      };
      this.anims.create(_animationConfig);
      this._santa.play("run");

      this._deluca = this.add
        .sprite(350, 504, "deluca")
        .setScale(2)
        .setFrame(6);

      this.tweens.add({
        targets: this._deluca,
        y: 490,
        yoyo: true,
        repeat: -1,
        ease: "Sine.InOut",
      });
    } else {
      this._coffin = this.add.sprite(640, 480, "coffin").setScale(4);

      let _animationConfig = {
        key: "walk",
        frames: this.anims.generateFrameNumbers("coffin", {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }),
        frameRate: 8,
        yoyo: false,
        repeat: -1,
      };
      this.anims.create(_animationConfig);

      this._coffin.play("walk");

      this._music = this.sound.add("gameover");
      this._music.play(undefined, {
        loop: true,
        volume: 0.2,
      });

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.sound.playAudioSprite("sfx", "bare", {
            loop: false,
            volume: 0.7,
          });
        },
      });

      this._GameOver = this.add
        .text(640, 65, "GAME OVER", _config)
        .setStroke("#ff6600", 10)
        .setAlpha(1)
        .setOrigin(0)
        .setFontFamily('"Press Start 2P"')
        .setDepth(1001)
        .setOrigin(0.5);
    }

    this.add
      .bitmapText(390, 300, "arcade", "SCORE   YOURNAME")
      .setTint(0xff8200);
    this.add.bitmapText(390, 340, "arcade", this._score + "").setTint(0xffffff);

    this._playerText = this.add
      .bitmapText(646, 340, "arcade", "")
      .setTint(0xffffff)
      .setText("");

    //  Do this, otherwise this Scene will steal all keyboard input
    this.input.keyboard.enabled = false;

    this.scene.launch("InputPanel");

    let panel = this.scene.get("ScoreInput");

    panel.events.off("updateName", this.updateName, this);
    panel.events.off("submitName", this.submitName, this);

    panel.events.on("updateName", this.updateName, this);
    panel.events.on("submitName", this.submitName, this);
  }

  startGame(): void {
    this.scene.start("Intro");
  }

  updateName(name: string) {
    // console.log("updatename", name);
    this._playerText.setText(name);
  }
  submitName(name: string) {
    //console.log("submitName", name);
    this.scene.stop("ScoreInput");

    if (!this._trainer)
      leaderboard.insertScore({
        score: this._score,
        name: name,
        level: this._level,
        date: Date.now(),
      });

    this.registry.set("score", 0);
    this.registry.set("level", 0);
    this.registry.set("finalscore", 0);

    this._music.stop();
    this.scene.stop("GameOver");
    this.scene.stop("ScoreInput");
    this.scene.start("Intro");
    this.scene.bringToTop("Intro");
  }

  step() {
    this._tile2.tilePositionX -= 0.005;
    this._tile3.tilePositionX -= 0.025;
    this._tile4.tilePositionX -= 0.3;
  }

  update(time: number, delta: number) {
    if (this._win) {
      this._cloud1.tilePositionX += 0.4;
      this._cloud2.tilePositionX += 0.1;

      this._tile2.tilePositionX += 0.05;
      this._tile3.tilePositionX += 0.1;
      this._tile4.tilePositionX += 2;
    } else {
      this._cloud1.tilePositionX += 0.4;
      this._cloud2.tilePositionX += 0.1;

      if (
        this._coffin.anims.currentFrame.index == 0 ||
        this._coffin.anims.currentFrame.index == 3 ||
        this._coffin.anims.currentFrame.index == 4 ||
        this._coffin.anims.currentFrame.index == 5 ||
        this._coffin.anims.currentFrame.index == 8 ||
        this._coffin.anims.currentFrame.index == 9
      )
        this.step();
    }
  }
}
