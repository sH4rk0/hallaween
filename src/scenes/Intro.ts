import { leaderboard } from "../InitGame";

export default class Intro extends Phaser.Scene {
  private _play: Phaser.GameObjects.Text;

  private _howtoplayText: Phaser.GameObjects.BitmapText;
  private _howtoplayContainer: Phaser.GameObjects.Container;
  private _creditsText: Phaser.GameObjects.BitmapText;
  private _creditsContainer: Phaser.GameObjects.Container;

  private _ouasText: Phaser.GameObjects.Image;
  private _ouasContainer: Phaser.GameObjects.Container;

  private _hallaweenLogo: Phaser.GameObjects.Image;

  private _bgImage: Phaser.GameObjects.Image;

  private _highscores: Array<any>;
  private _highscoresText: Array<Phaser.GameObjects.BitmapText>;

  private _music: Phaser.Sound.BaseSound;
  private _allauin: Phaser.Sound.BaseSound;
  private _status: number;
  private _highscoresColors: Array<number> = [
    0xff0000,
    0xffff00,
    0x15880c,
    0x0c69bf,
    0xff8200,
  ];

  private _bossFaces: Array<Phaser.GameObjects.Sprite> = [];
  private _bossCaps: Array<Phaser.GameObjects.Sprite> = [];
  private _bossDecorations: Array<Phaser.GameObjects.Sprite> = [];
  private _bossTexts: Array<Phaser.GameObjects.Text> = [];
  private _bossContainer: Phaser.GameObjects.Container;
  private _bestLevel: number = 0;
  private _deluca: Phaser.GameObjects.Container;
  private _body: Phaser.GameObjects.Image;
  private _arm: Phaser.GameObjects.Image;
  private _face: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {
    /* this.load.scenePlugin(
      "rexgesturesplugin",
      "assets/js/rexgestures.js",
      "rexGestures",
      "rexGestures"
    );*/
  }

  create() {
    //console.log("create intro");
    this._bossFaces = [];
    this._bossTexts = [];

    this._bgImage = this.add.image(0, 0, "black-screen");

    this._bgImage.setTintFill(0x000000).setOrigin(0);

    this._bestLevel = this.registry.get("bestlevel");

    this.cameras.main.setBackgroundColor("#000000");

    this._hallaweenLogo = this.add
      .image(640, 100, "hallaween")

      .setAlpha(0);

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

    let _config = {
      font: "20px",
      fill: "#4ab7d8",
      stroke: "#ffffff",
      strokeThickness: 6,
      wordWrap: true,
      wordWrapWidth: 1000,
    };

    this._howtoplayText = this.add
      .bitmapText(1260, 560, "arcade", "How to Play", 20)
      .setAlpha(1)
      .setOrigin(1)
      .setInteractive()
      .on("pointerup", () => {
        this.openHowToPlay();
      })
      .on("pointerover", () => {
        this._howtoplayText.setTintFill(0xff0000);
      })
      .on("pointerout", () => {
        this._howtoplayText.clearTint();
      });

    this._howtoplayContainer = this.add.container(0, 0);

    this._howtoplayContainer
      .add([this.add.image(0, 0, "how-to").setOrigin(0)])
      .setAlpha(0)
      .setDepth(100001)
      .setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 1280, 600),
        Phaser.Geom.Rectangle.Contains
      )
      .on("pointerup", () => {
        this.closeHowToPlay();
      });

    /*CREDITS 
    -----------------------------------------------------*/
    this._creditsText = this.add
      .bitmapText(1260, 520, "arcade", "Credits", 20)
      .setAlpha(1)
      .setOrigin(1)
      .setInteractive()
      .on("pointerup", () => {
        this.openCredits();
      })
      .on("pointerover", () => {
        this._creditsText.setTintFill(0xff0000);
      })
      .on("pointerout", () => {
        this._creditsText.clearTint();
      });

    this._creditsContainer = this.add.container(0, 0);

    let _button = this.add
      .image(1050, 510, "button")
      .setInteractive()
      .setAlpha(0.1)
      .on("pointerdown", () => {
        window.open("https://sh4rko.itch.io/", "_blank");
      });

    let _me: Phaser.GameObjects.Sprite = this.add
      .sprite(640, 600, "me")
      .setOrigin(0.5, 1)
      .setScale(6);

    const _animationConfig = {
      key: "anim-me",
      frames: this.anims.generateFrameNumbers("me", {
        frames: [
          0,
          0,
          0,
          1,
          0,
          0,
          2,
          0,
          0,
          0,
          1,
          4,
          5,
          6,
          6,
          6,
          6,
          6,
          5,
          4,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1,
          7,
          8,
          9,
          9,
          9,
          9,
          9,
          8,
          7,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          10,
          11,
          11,
          11,
          12,
          11,
          11,
          11,
          12,
          11,
          11,
          11,
          10,
          0,
          0,
          0,
          1,
        ],
      }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    };
    this.anims.create(_animationConfig);
    _me.play("anim-me");

    this._creditsContainer
      .add([_button, this.add.image(0, 0, "credits").setOrigin(0), _me])
      .setAlpha(0)
      .setDepth(100001)
      .setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 1280, 600),
        Phaser.Geom.Rectangle.Contains
      )
      .on("pointerup", () => {
        this.closeCredits();
      });

    /*OUAS 
    ____________________________________________________________________*/
    this._ouasText = this.add
      .image(20, 580, "ouas-logo")
      .setOrigin(0, 1)
      .setScale(0.25)
      .setAlpha(1)
      .setInteractive()
      .on("pointerup", () => {
        this.openOuas();
      })
      .on("pointerover", () => {
        this._ouasText.setTintFill(0xff0000);
      })
      .on("pointerout", () => {
        this._ouasText.clearTint();
      });

    this._ouasContainer = this.add.container(0, 0);

    this._ouasContainer
      .add([this.add.image(0, 0, "ouas").setOrigin(0)])
      .setAlpha(0)
      .setDepth(100001)
      .setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 1280, 600),
        Phaser.Geom.Rectangle.Contains
      )
      .on("pointerup", () => {
        this.closeOuas();
      });

    /*LEADERBOARD 
    ____________________________________________________________________*/
    this._highscores = [];
    if (leaderboard != undefined)
      this._highscores = leaderboard.getHighscores();
    this._status = 0;
    this._highscoresText = [];
    this._highscoresText.push(
      this.add
        .bitmapText(640, 100, "arcade", "Top Pumpkins")
        .setAlpha(0)
        .setOrigin(0.5)
        .setTint(0xffffff)
    );

    if (this._highscores.length > 0) {
      for (let i = 0; i < 5; i++) {
        this._highscoresText.push(
          this.add
            .bitmapText(
              380,
              180 + i * 70,
              "arcade",
              i +
                1 +
                "ND " +
                this.fixNames(this._highscores[i].name) +
                " " +
                this._highscores[i].score +
                " LVL" +
                this._highscores[i].level
            )
            .setTint(this._highscoresColors[i])
            .setOrigin(0)
            .setAlpha(0)
            .setFontSize(24)
        );
      }
    }

    //this.add.image(0, 0, "bg").setOrigin(0);

    _config = {
      font: "40px",
      fill: "#ff8200",
      stroke: "#ffffff",
      strokeThickness: 8,
      wordWrap: true,
      wordWrapWidth: 1000,
    };
    this._play = this.add
      .text(640, 550, "PLAY", _config)
      .setAlpha(1)
      .setOrigin(0.5)
      .setFontFamily('"Press Start 2P"')
      .setInteractive()
      .setDepth(100)

      .on("pointerup", () => {
        if (this._music != undefined) this._music.stop();
        if (this._allauin != undefined) this._allauin.stop();
        this.scene.stop("Intro");

        this.scene.start("GamePlay");
        this.scene.bringToTop("GamePlay");
        this.scene.start("Hud");
        this.scene.bringToTop("Hud");
        if (this.sys.game.device.input.touch) {
          this.scene.start("Joy");
          this.scene.bringToTop("Joy");
        }
      })
      .on("pointerover", () => {
        this._play.setFill("#ff0000");
      })
      .on("pointerout", () => {
        this._play.setFill("#ff8200");
      });

    _config = {
      font: "80px",
      fill: "#b72025",
      stroke: "#ffffff",
      strokeThickness: 10,
      wordWrap: true,
      wordWrapWidth: 1000,
    };

    this.introIn();

    this._bossContainer = this.add.container(0, 0).setAlpha(0);

    let _face: Phaser.GameObjects.Sprite;
    let _text: Phaser.GameObjects.Text;
    const _names: Array<string> = ["Bat", "Ghost", "Witch", "Ghast", "Pumpkin"];

    for (var f = 0; f < 5; f++) {
      _face = this.add
        .sprite(250 + f * 200, 110, "levels")
        .setFrame(f)
        .setScale(2)
        .setTintFill(0xffffff)
        .setOrigin(0.5);
      this._bossFaces.push(_face);
      _text = this.add
        .text(250 + f * 200, 170, "???", {})
        .setFontFamily('"Press Start 2P"')
        .setOrigin(0.5);
      this._bossTexts.push(_text);
    }

    this._bossContainer.add(
      this.add
        .bitmapText(640, 30, "arcade", "Unlocked levels")
        .setOrigin(0.5)
        .setTint(0xffffff)
    );

    this._bestLevel = this.registry.get("bestlevel");
    // console.log(this._bestLevel);

    for (let i = 0; i < 5; i++) {
      if (this._bestLevel > i + 1) {
        this._bossContainer.add(this._bossFaces[i].clearTint());
        this._bossContainer.add(this._bossTexts[i].setText(_names[i]));
      } else {
        this._bossContainer.add(this._bossFaces[i]);
        this._bossContainer.add(this._bossTexts[i]);
      }
    }

    this._body = this.add
      .image(0, 600, "body")
      .setOrigin(0, 1)
      .setAlpha(1)
      .setScale(4);

    this._arm = this.add
      .image(0, 606, "arm")
      .setOrigin(0, 1)
      .setAlpha(1)
      .setFrame(1)
      .setScale(4);

    this._face = this.add
      .sprite(240, 405, "faces")
      .setOrigin(0.5, 1)
      .setAlpha(1)
      .setScale(4)
      .setFrame(0);

    this._deluca = this.add
      .container(400, 12, [this._body, this._arm, this._face])
      .setAlpha(0);

    this.tweens.add({
      targets: [this._face],
      alpha: 1,
      y: 409,
      ease: "Sine.easeInOut",
      yoyo: true,
      loop: -1,
    });

    this.tweens.add({
      targets: [this._body],
      alpha: 1,
      y: 596,
      ease: "Sine.easeInOut",
      yoyo: true,
      loop: -1,
    });

    this.tweens.add({
      targets: [this._arm],
      alpha: 1,
      y: 588,
      ease: "Sine.easeInOut",
      yoyo: true,
      loop: -1,
    });
    this._play.setAlpha(1);
    this.tweens.add({
      targets: this._deluca,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this._allauin = this.sound.add("allauin");
        this._allauin.play(undefined, {
          loop: false,
          volume: 1,
        });
        this._allauin.on("complete", () => {
          this.cameras.main.on("cameraflashstart", () => {
            this._hallaweenLogo.setAlpha(1);
            this._face.setFrame(17);
            this._arm.setFrame(0);
            let _thunder: Phaser.Sound.BaseSound = this.sound.add("thunder");
            _thunder.play(undefined, {
              loop: false,
              volume: 0.5,
            });
            this._music = this.sound.add("halloween");
            this._music.play(undefined, {
              loop: true,
              volume: 0.5,
            });
          });

          this.cameras.main.flash(
            2000,
            255,
            255,
            255,
            true,
            (cam: any, progress: number) => {
              if (progress == 1) {
                this.startChange();
              }
            }
          );
        });
      },
    });
  }

  openHowToPlay(): void {
    this._howtoplayContainer.setAlpha(1);
  }
  closeHowToPlay(): void {
    this._howtoplayContainer.setAlpha(0);
  }

  openCredits(): void {
    this._creditsContainer.setAlpha(1);
  }
  closeCredits(): void {
    this._creditsContainer.setAlpha(0);
  }

  openOuas(): void {
    this._ouasContainer.setAlpha(1);
  }
  closeOuas(): void {
    this._ouasContainer.setAlpha(0);
  }

  fixNames(_name: string) {
    if ((_name + "").length == 1) return _name + "         ";
    if ((_name + "").length == 2) return _name + "        ";
    if ((_name + "").length == 3) return _name + "       ";
    if ((_name + "").length == 4) return _name + "      ";
    if ((_name + "").length == 5) return _name + "     ";
    if ((_name + "").length == 6) return _name + "    ";
    if ((_name + "").length == 7) return _name + "   ";
    if ((_name + "").length == 8) return _name + "  ";
    if ((_name + "").length == 9) return _name + " ";
    if ((_name + "").length == 10) return _name + "";
  }

  startChange() {
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        if (this._status == 3) this._status = 0;
        switch (this._status) {
          case 0:
            this.introAnimOut();
            this._status += 1;
            break;
          case 1:
            this.highscoresOut();
            this._status += 1;
            break;
          case 2:
            this.bossOut();
            this._status += 1;
            break;
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  introAnimIn() {
    this.tweens.add({
      targets: [this._hallaweenLogo],
      alpha: 1,
    });
  }
  introAnimOut() {
    this.tweens.add({
      targets: [this._hallaweenLogo],
      alpha: 0,
      onComplete: () => {
        this.highscoresIn();
      },
    });

    // this.tweens.add({ targets: this._foodGroup.getChildren(), alpha: 0 });
  }

  highscoresIn() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 1,

      delay: (
        target: any,
        targetKey: any,
        value: any,
        targetIndex: any,
        totalTargets: any,
        tween: any
      ) => {
        return targetIndex * 100;
      },
    });
  }

  highscoresOut() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 0,

      onComplete: () => {
        this.bossIn();
      },
    });
  }

  bossIn() {
    this.tweens.add({
      targets: this._bossContainer,
      duration: 500,
      alpha: 1,
    });
  }

  bossOut() {
    this.tweens.add({
      targets: this._bossContainer,
      duration: 500,
      alpha: 0,

      onComplete: () => {
        this.introAnimIn();
      },
    });
  }

  introIn() {}

  introOut() {
    this._play.setY(-20);
  }

  update(time: number, delta: number) {}
}

/*
 var eases = [
   "Linear",
   "Quad.easeIn",
   "Cubic.easeIn",
   "Quart.easeIn",
   "Quint.easeIn",
   "Sine.easeIn",
   "Expo.easeIn",
   "Circ.easeIn",
   "Back.easeIn",
   "Bounce.easeIn",
   "Quad.easeOut",
   "Cubic.easeOut",
   "Quart.easeOut",
   "Quint.easeOut",
   "Sine.easeOut",
   "Expo.easeOut",
   "Circ.easeOut",
   "Back.easeOut",
   "Bounce.easeOut",
   "Quad.easeInOut",
   "Cubic.easeInOut",
   "Quart.easeInOut",
   "Quint.easeInOut",
   "Sine.easeInOut",
   "Expo.easeInOut",
   "Circ.easeInOut",
   "Back.easeInOut",
   "Bounce.easeInOut"
 ];
 */
