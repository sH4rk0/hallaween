import { leaderboard } from "../InitGame";
import { GameData } from "../GameData";

export default class Preloader extends Phaser.Scene {
  private _loading: Phaser.GameObjects.Text;
  private _text: Phaser.GameObjects.Text;
  private _progress: Phaser.GameObjects.Graphics;
  private _pumpkin: Array<Phaser.GameObjects.Image>;
  private _bg: Phaser.GameObjects.TileSprite;
  private _leaderboardIsActive: boolean;
  private _timer: Phaser.Time.TimerEvent;
  private _delucas: Phaser.GameObjects.Image;
  private _counter: number = 0;
  private _gamepad: Phaser.Input.Gamepad.Gamepad;
  private _started: boolean;

  constructor() {
    super({
      key: "Preloader",
    });
  }

  preload() {
    //this.cameras.main.setBackgroundColor('#f0e200')
    this.cameras.main.setBackgroundColor("#000000");
    this._progress = this.add.graphics();
    this.loadAssets();
  }

  update(time: number, delta: number) {
    if (this.input.gamepad.total > 0 && this._gamepad == undefined) {
      this._gamepad = this.input.gamepad.gamepads[0];
      //console.log("update", this.input.gamepad.total, this._gamepad);
    } else if (this.input.gamepad.total > 0 && this._gamepad != undefined) {
      if (
        this._gamepad != null &&
        this._gamepad.buttons[0].value == 1 &&
        !this._started
      ) {
        this._started = true;
        this.startGame();
      }
    }
  }

  init() {
    this._started = false;
    this._leaderboardIsActive = false;

    this._delucas = this.add.image(640, 300, "thelucasart").setAlpha(0);

    this._pumpkin = [];
    this._pumpkin.push(this.add.sprite(390, 100, "pumpkin").setAlpha(0));
    this._pumpkin.push(this.add.sprite(510, 100, "pumpkin").setAlpha(0));
    this._pumpkin.push(this.add.sprite(630, 100, "pumpkin").setAlpha(0));
    this._pumpkin.push(this.add.sprite(750, 100, "pumpkin").setAlpha(0));
    this._pumpkin.push(this.add.sprite(870, 100, "pumpkin").setAlpha(0));

    this.tweens.add({
      targets: this._pumpkin,
      y: 210,
      duration: 500,
      loop: true,
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeIn",
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

    this.tweens.add({
      targets: [
        this._pumpkin[0],
        this._pumpkin[1],
        this._pumpkin[2],
        this._pumpkin[3],
        this._pumpkin[4],
        this._delucas,
      ],
      alpha: 1,
      duration: 500,
    });

    const _config = {
      font: "30px",
      fill: "#000000",
      stroke: "#f6af2f",
      strokeThickness: 10,
      wordWrap: true,
      wordWrapWidth: 1000,
    };

    this._loading = this.add
      .text(this.game.canvas.width / 2, 520, "", _config)
      .setAlpha(1)
      .setFontFamily('"Press Start 2P"')
      .setDepth(1001)
      .setOrigin(0.5);
  }

  checkLeaderboard() {
    //this.scene.start("Intro");
    // console.log("checkLeaderboard");
    this._counter++;
    //return;
    if (
      (leaderboard != undefined &&
        leaderboard.getHighscores().length > 0 &&
        !this._leaderboardIsActive) ||
      this._counter == 5
    ) {
      this._timer.destroy();
      this._leaderboardIsActive = true;

      this.tweens.add({
        targets: [this._text],
        alpha: 1,
        x: 20,
        duration: 250,
        ease: "Sine.easeOut",
        delay: 200,
      });

      this._loading.setText("Tap/click to start");
      this._progress.clear();

      this.input.once("pointerdown", () => {
        this.tweens.add({
          targets: [
            this._delucas,
            this._loading,
            this._pumpkin[0],
            this._pumpkin[1],
            this._pumpkin[2],
            this._pumpkin[3],
            this._pumpkin[4],
          ],
          alpha: 0,
          duration: 500,
          onComplete: () => {
            this.startGame();
          },
        });
      });
    }
  }

  startGame() {
    /*
 this.scene.start("GameOver");
            this.scene.start("ScoreInput");
            this.scene.bringToTop("GameOver");
            this.scene.bringToTop("ScoreInput");
            return;
            */

    /*
            this.scene.start("GamePlay");
            this.scene.bringToTop("GamePlay");
            this.scene.start("Hud");
            this.scene.bringToTop("Hud");
            if (this.sys.game.device.input.touch) {
              this.scene.start("Joy");
              this.scene.bringToTop("Joy");
            }
           

            return;
            */

    // this.scene.start("GameOver");
    // return;

    //this.scene.start("Intro");
    //this.registry.set("bestlevel", 0);
    // return;

    /*   this.scene.start("GamePlay");
            this.scene.bringToTop("GamePlay");
            this.scene.start("Hud");
            this.scene.bringToTop("Hud");
            if (this.sys.game.device.input.touch) {
              this.scene.start("Joy");
              this.scene.bringToTop("Joy");
            }

            return;*/

    const _best = localStorage.getItem("bestlevel");

    if (_best != null && _best != undefined) {
      this.registry.set("bestlevel", _best);
    } else {
      this.registry.set("bestlevel", 0);
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("crack") === "fairlight") {
      this.scene.start("Crack");
    } else {
      this.scene.start("Intro");
      this.scene.bringToTop("SceneTransition");
    }
  }

  loadAssets(): void {
    this.load.on("start", () => {});

    this.load.on("fileprogress", (file: any, value: any) => {
      //console.log(file, value)
    });

    this.load.on("progress", (value: any) => {
      this._progress.clear();
      this._progress.fillStyle(0xf6af2f, 1);
      this._progress.fillRect(0, 480, 1280 * value, 70);
      this._loading.setText("Loading..." + Math.round(value * 100) + "%");
    });

    this.load.on("complete", () => {
      this._timer = this.time.addEvent({
        delay: 1000,
        callback: this.checkLeaderboard,
        callbackScope: this,
        repeat: -1,
      });
    });

    //Assets Load
    //--------------------------

    //SCRIPT
    GameData.script.forEach((element: ScriptAsset) => {
      this.load.script(element.key, element.path);
      //@ts-ignore
    });

    // IMAGES
    GameData.images.forEach((element: ImageAsset) => {
      this.load.image(element.name, element.path);
    });

    // TILEMAPS
    GameData.tilemaps.forEach((element: TileMapsAsset) => {
      this.load.tilemapTiledJSON(element.key, element.path);
    });

    // ATLAS
    GameData.atlas.forEach((element: AtlasAsset) => {
      this.load.atlas(element.key, element.imagepath, element.jsonpath);
    });

    // SPRITESHEETS
    GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
      this.load.spritesheet(element.name, element.path, {
        frameWidth: element.width,
        frameHeight: element.height,
        endFrame: element.frames,
      });
    });

    //bitmap fonts
    GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
      this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
    });

    // SOUNDS
    GameData.sounds.forEach((element: SoundAsset) => {
      this.load.audio(element.name, element.paths);
    });

    // Audio
    GameData.audio.forEach((element: AudioSpriteAsset) => {
      this.load.audioSprite(
        element.name,
        element.jsonpath,
        element.paths,
        element.instance
      );
    });
  }
}
