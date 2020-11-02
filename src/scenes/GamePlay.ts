import { EnemyCases, GameData } from "../GameData";
import Player from "./Player";
import Enemy from "./Enemy";
import EnemyBullet from "./EnemyBullet";
import Boss from "./Boss";
import PlayerShot from "./PlayerShot";
import BossPump from "./BossPump";
import Hud from "./Hud";
import Bonus from "./Bonus";

export default class GamePlay extends Phaser.Scene {
  public _player: Player;
  private _groupEnemy: Phaser.GameObjects.Group;
  private _groupBullets: Phaser.GameObjects.Group;
  public _groupBoss: Phaser.GameObjects.Group;
  private _boss: Boss;
  private _levels: any;
  private _currentLevelIndex: number = 0;
  private _currentSequence: number = 0;
  private _currentLevel: Level;
  private _levelText: Phaser.GameObjects.Text;
  private _tweenScroll: Phaser.Tweens.Tween;

  public map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  public layer: Phaser.Tilemaps.StaticTilemapLayer;
  public layer2: Phaser.Tilemaps.StaticTilemapLayer;
  public layer3: Phaser.Tilemaps.StaticTilemapLayer;
  public layer4: Phaser.Tilemaps.StaticTilemapLayer;
  private _cloud1: Phaser.GameObjects.TileSprite;
  private _cloud2: Phaser.GameObjects.TileSprite;
  private _sky1: Phaser.GameObjects.TileSprite;
  private _sky2: Phaser.GameObjects.TileSprite;
  private _sky3: Phaser.GameObjects.TileSprite;
  private _sky4: Phaser.GameObjects.TileSprite;
  private _stopNext: boolean = false;
  private _hud: Hud;
  private _bonusObj: { enemy: number; hits: number } = { enemy: 0, hits: 0 };

  public _sfx: Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound;

  constructor() {
    super({ key: "GamePlay" });
  }

  preload() {}

  create() {
    //console.log("create gameplay");
    this._bonusObj = { enemy: 0, hits: 0 };
    this._hud = <Hud>this.scene.get("Hud");

    this.input.addPointer(10);
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

    this._sfx = this.sound.addAudioSprite("sfx");
    this.registry.set("score", 0);
    this.registry.set("finalscore", 0);
    this.registry.set("win", false);

    this._currentSequence = 0;

    const _best = this.registry.get("bestlevel");

    this._currentLevelIndex = 0;
    //console.log(_best);
    if (_best != null) this._currentLevelIndex = _best;

    this.registry.set("level", this._currentLevelIndex);
    this._stopNext = false;

    this.cameras.main.setBackgroundColor("#7e20a2");
    this._sky1 = this.add
      .tileSprite(-40, -50, 1400, 600, "sky")

      .setOrigin(0)
      .setScrollFactor(0);

    this._cloud2 = this.add
      .tileSprite(-40, -50, 1400, 600, "cloud2")
      .setOrigin(0)
      .setScrollFactor(0);

    this._cloud1 = this.add
      .tileSprite(-40, -50, 1400, 600, "cloud1")

      .setOrigin(0)
      .setScrollFactor(0);

    this._sky2 = this.add
      .tileSprite(-40, 0, 400, 150, "bglevel1")
      .setScale(4)
      .setOrigin(0)
      .setAlpha(1)
      .setScrollFactor(0);

    this._sky3 = this.add
      .tileSprite(-40, 0, 400, 150, "bglevel2")
      .setScale(4)
      .setOrigin(0)
      .setAlpha(1)
      .setScrollFactor(0);

    this._sky4 = this.add
      .tileSprite(-40, 0, 1280, 300, "bglevel3")
      .setScale(2)
      .setOrigin(0)
      .setAlpha(1);

    this._groupEnemy = this.add.group({
      runChildUpdate: true,
      maxSize: 100,
    });

    this._groupBullets = this.add
      .group({
        runChildUpdate: true,
        maxSize: 30,
      })
      .setDepth(0);

    this._groupBoss = this.add.group({
      runChildUpdate: true,
      maxSize: 15,
    });

    this._player = new Player({ scene: this, x: 300, y: 0 });

    this._player.activate();

    this.physics.add.collider(
      this._groupBullets,
      this._groupEnemy,
      this.itemEnemyCollide,
      undefined,
      this
    );

    this.physics.add.collider(
      this._groupBoss,
      this._groupBullets,
      this.itemBossCollide,
      undefined,
      this
    );

    this.physics.add.collider(
      this._player,
      this._groupBoss,
      this.itemPlayerCollide,
      undefined,
      this
    );

    this.physics.add.collider(
      this._player,
      this._groupEnemy,
      this.itemPlayerCollide,
      undefined,
      this
    );
    this._levels = GameData.levels;
    this._currentLevel = this._levels[this._currentLevelIndex].level;

    let _config = {
      font: "40px",
      fill: "#ffffff",
      stroke: "#4ab7d8",
      strokeThickness: 10,
      wordWrap: true,
      wordWrapWidth: 1000,
      align: "center",
      lineSpacing: 20,
    };
    this._levelText = this.add
      .text(640, 300, "", _config)
      .setAlpha(0)
      .setOrigin(0.5)
      .setFontFamily('"Press Start 2P"')
      .setDepth(1000000);

    /* this._boss = new Boss({
      scene: this,
      x: 1600,
      y: 300,
      key: "",
      itemData: { d: 1000, data: { t: 3 } },
      isLast: true,
      isFirst: true,
    });
    this._groupBoss.add(this._boss);
    */

    this.start();
  }

  start() {
    this.setupText({
      text: this._currentLevel.name,
      repeat: 0,
      duration: 3000,
    });
    //this.setupMap();
    this.startScroll();
  }

  bossDead() {
    this._player.bossDead();
    this._hud.restartMusic();
    this.startScroll();
  }

  bossIncoming() {}

  setupMap() {
    this.map = this.make.tilemap({ key: "level-1" });
    this.tileset = this.map.addTilesetImage("tilemap", "tiles");
    // this.layer2 = this.map.createStaticLayer("collision", this.tileset, 0, 0);
    // this.layer2.setCollisionByProperty({ collide: true });
    this.layer = this.map.createStaticLayer("world", this.tileset, 0, 0);
    // this.layer3 = this.map.createStaticLayer("over", this.tileset, 0, 0);
  }

  startScroll() {
    this._tweenScroll = this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1500,
      ease: "Sine.easeOut",
    });
  }

  resetBonusObj() {
    console.log("reset");
    this._bonusObj = { hits: 0, enemy: 0 };
  }
  updateBonusObj(enemy: number) {
    // console.log("update");
    this._bonusObj.enemy = enemy;
    this._bonusObj.hits += 1;
    //console.log(this._bonusObj);
  }
  isBonusObjAvailable(): boolean {
    //console.log("isBonusObjAvailable");
    if (this._bonusObj.enemy == this._bonusObj.hits) return true;
    return false;
  }

  update(time: number, delta: number) {
    this._player.update(time, delta);
    this._cloud1.tilePositionX += 0.4;
    this._cloud2.tilePositionX += 0.1;

    if (this._tweenScroll != null && this._tweenScroll.getTimeScale() != null) {
      this._sky2.tilePositionX += 0.05 * this._tweenScroll.getValue();
      this._sky3.tilePositionX += 0.2 * this._tweenScroll.getValue();
      // this.layer.x -= 1 * this._tweenScroll.getValue();

      this._sky4.tilePositionX += 0.5 * this._tweenScroll.getValue();
    }
  }

  stopScroll() {
    this._tweenScroll = this.tweens.addCounter({
      from: 1,
      to: 0,
      duration: 1500,
      ease: "Sine.easeIn",
    });
  }

  setupText(_config: stringConfig) {
    let _repeat: number = 0;
    let _duration: number = 0;
    let _delay: number = 0;

    if (_config.size != undefined) {
      this._levelText.setFontSize(_config.size);
    } else {
      this._levelText.setFontSize(28);
    }
    if (_config.color != undefined) {
      this._levelText.setColor(_config.color);
    } else {
      this._levelText.setColor("#ffffff");
    }
    if (_config.stroke != undefined) {
      this._levelText.setStroke(_config.stroke.color, _config.stroke.thick);
    } else {
      this._levelText.setStroke("#4ab7d8", 10);
    }
    if (_config.repeat != undefined) {
      _repeat = _config.repeat;
    } else {
      _repeat = 1;
    }
    if (_config.duration != undefined) {
      _duration = _config.duration;
    } else {
      _duration = 1000;
    }
    if (_config.delay != undefined) {
      _delay = _config.delay;
    } else {
      _delay = 1000;
    }
    this._levelText.setText(_config.text);
    this.animateText(_repeat, _duration, _delay);
  }

  animateText(_repeat: number, _duration: number, _delay: number) {
    this.tweens.add({
      targets: this._levelText,
      alpha: 1,
      duration: _duration,
      repeat: _repeat,
      yoyo: true,
      onComplete: () => {
        this.nextSequence(_delay);
      },
    });
  }

  nextSequence(_delay: number) {
    if (this._stopNext) return;
    this.time.addEvent({
      delay: _delay,
      callback: this.getSequence,
      callbackScope: this,
    });
  }

  getSequence() {
    if (this._stopNext) return;
    let _nextitem: enemyData = this._levels[this._currentLevelIndex].level
      .sequence[this._currentSequence];

    if (_nextitem != undefined) {
      this._currentSequence++;

      if (
        this._levels[this._currentLevelIndex].level.sequence[
          this._currentSequence
        ] == undefined
      ) {
        // console.log("last")
        this.addItem(true, _nextitem);
      } else {
        // console.log("not last")
        this.addItem(false, _nextitem);
        this.nextSequence(_nextitem.d);
      }
    }
  }

  addToBulletsGroup(item: any) {
    this._groupBullets.add(item);
  }

  addToBossGroup(item: any) {
    this._groupBoss.add(item);
  }

  removeFromBulletsGroup(shot: any) {
    this._groupBullets.remove(shot, true, true);
    shot.remove();
  }

  nextLevel() {
    this._currentSequence = 0;
    this._currentLevelIndex++;
    this.registry.set("level", this._currentLevelIndex);
    if (this._levels[this._currentLevelIndex] == undefined) {
    } else {
      this._currentLevel = this._levels[this._currentLevelIndex].level;
      this.setupText({
        text: this._currentLevel.name,
        repeat: 0,
        duration: 3000,
      });
    }
  }

  addItem(_isLast: boolean, _itemData: enemyData) {
    //console.log(_itemData);
    if (_itemData.data.sw != null) {
      this.generateSwarm(_itemData.data.sw);
      return;
    }

    let _type: number = _itemData.data.t;
    let _enemy: string = "";

    if (_itemData.data.e != null) _enemy = _itemData.data.e;
    //SINGLE ENEMY
    if (_type == 0)
      this._groupEnemy.add(
        new Enemy({
          scene: this,
          x: 0,
          y: 0,
          key: _enemy,
          itemData: _itemData,
        })
      );

    //BOSS
    if (_type == 3) {
      this._boss = new Boss({
        scene: this,
        x: 1100,
        y: 300,
        key: "",
        itemData: _itemData,
      });
      this._groupBoss.add(this._boss);
    }

    //BOSS ALERT
    if (_type == 4) {
      if (_itemData.data.text != undefined) {
        this.setupText(_itemData.data.text);
        this._hud.incomingBoss();
        // this.events.emit("incomingBoss");
        this._player.maskOn();
        this.stopScroll();
      }
    }

    if (_type == 6) {
      if (_itemData.data.text != undefined) {
        this.setupText(_itemData.data.text);
      }
    }

    if (_type == 5) {
      this.registry.set("win", true);
      this.events.emit("gameover");
    }

    if (_type == 7) {
      this._player.deactivate();
    }

    if (_type == 8) {
      this._levelText.setText("You have killed the Hallaween spirit");
      this.tweens.add({
        targets: this._levelText,
        alpha: 1,
        duration: 2000,
        repeat: 0,
        yoyo: true,
        onComplete: () => {
          this._levelText.setText("Now it's time for a new mission!");
          this.tweens.add({
            targets: this._levelText,
            alpha: 1,
            duration: 2000,
            repeat: 0,
            yoyo: true,
            onComplete: () => {
              this._player.maskOn();
              //@ts-ignore
              this._player.body.setAccelerationX(400);
              this.time.addEvent({
                delay: 2500,
                callback: () => {
                  this.registry.set("win", true);
                  this.events.emit("gameover");
                },
              });
            },
          });
        },
      });
    }
  }

  generateSeeker() {
    this._groupEnemy.add(
      new Enemy({
        scene: this,
        x: 0,
        y: 0,
        key: "bat",
        itemData: {
          d: 0,
          data: {
            t: 0,
            e: "bat",
            x: -50,
            vx: 400,
            y: -1,
            score: 50,
          },
        },
      })
    );
  }

  generateSwarm(_params: swarmConfig) {
    let _last: boolean = false;
    let _first: boolean = false;

    let params: swarmConfig = JSON.parse(JSON.stringify(_params));

    for (let i = 0; i < params.quantity; i++) {
      //console.log(_last);
      if (params.bonus != null) {
        params.type.bonus = params.bonus;
        if (i == params.quantity - 1) {
          _last = true;
        } else {
          _last = false;
        }
        if (i == 0) {
          _first = true;
        } else {
          _first = false;
        }
      }
      if (params.tween != null) {
        params.type.tween = params.tween;
      }

      if (params.x != null) {
        params.type.x = params.x;
      }
      if (params.vx != null) {
        params.type.vx = params.vx;
      }

      if (params.y != null) {
        params.type.y = params.y;
      }
      if (params.vy != null) {
        params.type.vy = params.vy;
      }

      this.time.addEvent({
        delay: params.delay * i,
        args: [{ last: _last, first: _first }],
        callback: (args: { last: boolean; first: boolean }) => {
          this.addToEnemyGroup(
            new Enemy({
              scene: this,
              x: 0,
              y: 0,
              key: params.type.e,
              itemData: { d: 0, data: params.type },
              isLast: args.last,
              isFirst: args.first,
            })
          );
        },
      });
    }
  }

  addToEnemyGroup(_item: PlayerShot | Enemy | EnemyBullet | Bonus) {
    this._groupEnemy.add(_item);
  }

  removeItem(_item: PlayerShot | Enemy | EnemyBullet | Bonus) {
    this._groupEnemy.remove(_item, true, true);
  }

  removeBossItem(_item: Boss | BossPump) {
    this._groupBoss.remove(_item, true, true);
  }

  itemPlayerCollide(_player: any, _item: any) {
    this.playerHit(_item);
  }

  itemEnemyCollide(_shot: any, _item: any) {
    if (_item.name == "enemyBullet" || _item.name == "bonus") return;
    if (_shot.getDamage() < 12) this.removeFromBulletsGroup(_shot);
    _item.hit(_shot.getDamage());
  }

  itemBossCollide(_item: any, _shot: any) {
    this.removeFromBulletsGroup(_shot);
    if (_item.name == "bossPump") {
      _item.hit(_shot.getDamage());
    } else {
      this._boss.hit(_item.name, _shot.getDamage());
    }
  }

  playerHit(_item: Enemy) {
    // console.log(this._player.isDie(), this._player.isActiveCollision());
    if (!this._player.isDie() && _item.name == "bonus") {
      _item.removeItem();
      return;
    }

    if (!this._player.isDie() && this._player.isActiveCollision()) {
      if (
        _item.name == "bossBase" ||
        _item.name == "bossTop" ||
        _item.name == "bossCore"
      ) {
        this._player.hit(true);
      } else {
        _item.removeItem();
        this._player.hit(false);
      }
      this.cameras.main.shake(200);
    }
  }

  stopSequence() {
    this._stopNext = true;
  }

  gameOver() {
    let particles = this.add.particles("bodyparts").setDepth(10);
    particles.createEmitter({
      frame: [6, 7, 8, 16, 17],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 4,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 1,
      rotate: { start: 10, end: 360, ease: "Back.easeOut" },
      gravityY: Phaser.Math.RND.integerInRange(800, 900),
      on: false,
    });
    particles.createEmitter({
      frame: [9, 19, 18],
      angle: { min: 240, max: 300 },
      speed: { min: 300, max: 500 },
      quantity: 4,
      lifespan: 4000,
      alpha: { start: 1, end: 0 },
      scale: 1,
      rotate: { start: 40, end: 360, ease: "Back.easeOut" },
      gravityY: Phaser.Math.RND.integerInRange(800, 900),
      on: false,
    });

    particles
      .emitParticleAt(this._player.x, this._player.y - 200)
      .setDepth(10000);

    let _head: Phaser.GameObjects.Image = this.add
      .image(this._player.x, this._player.x, "faces")
      .setFrame(1);

    let _random: Phaser.GameObjects.Image = this.add
      .image(this._player.x, this._player.y, "cat")
      .setFrame(0)
      .setScale(2);

    this.physics.world.enable(_head);
    //@ts-ignore
    _head.body.setGravity(0, 1000);
    //@ts-ignore
    _head.body.setVelocity(
      Phaser.Math.RND.integerInRange(-200, 200),
      Phaser.Math.RND.integerInRange(-500, -600)
    );
    this.tweens.add({
      targets: _head,
      angle: Phaser.Math.RND.integerInRange(-90, 90),
      duration: 2000,
    });

    this.physics.world.enable(_random);
    //@ts-ignore
    _random.body.setGravity(0, 1000);
    //@ts-ignore
    _random.body.setVelocity(
      Phaser.Math.RND.integerInRange(-100, 100),
      Phaser.Math.RND.integerInRange(-750, -900)
    );
    this.tweens.add({
      targets: _random,
      angle: Phaser.Math.RND.integerInRange(-90, 90),
      duration: 2000,
    });

    this.cameras.main.on(
      "cameraflashstart",
      (cam: any, fx: any, duration: number) => {
        this.sound.playAudioSprite("sfx", "cat", {
          loop: false,
          volume: 1,
        });
        this.sound.playAudioSprite("sfx", "explosion", {
          loop: false,
          volume: 0.2,
        });
      }
    );

    this.cameras.main.on("cameraflashcomplete", () => {
      this.events.emit("gameover");
    });

    this.cameras.main.flash(1500);
  }
}
