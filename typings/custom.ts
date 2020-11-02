interface ScoreConfig {
  name: string;
  score: number;
  level: number;
  date: number;
}

interface playerConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
}

interface PlayerShotConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  direction: boolean;
  level: number;
  charge: number;
  damage: number;
}

interface enemyConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  itemData: enemyData;
  isLast?: boolean;
  isFirst?: boolean;
}

interface enemyBulletConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  itemData: { direction: number; velocity: number };
}

interface Level {
  name: string;
  sequence: Array<enemyData>;
}

interface enemyData {
  d: number; //delay

  data: {
    t: number; //type 0=generic, 1=witch, 2=block, 3=boss, 4=text
    e?: string; //enemy
    x?: number; // start x
    y?: number; // start y
    vx?: number; // velocity x
    vy?: number; // velocity y

    text?: stringConfig;
    shoot?: {
      ratio: number;
      delay: number;
      bullet: { type: string; direction: number; velocity: number };
    };

    bonus?: { type: string; enemy: number };
    isLast?: boolean;
    tween?: { tweenY: number; tweenDuration: number };
    energy?: number;
    score?: number;
    sw?: swarmConfig;
  };
}

interface swarmConfig {
  quantity: number;
  delay: number;
  type: any;
  x?: number; // start x
  y?: number; // start y
  vx?: number; // velocity x
  vy?: number; // velocity y
  bonus?: { type: string; enemy: number };
  tween?: { tweenY: number; tweenDuration: number };
}

interface stringConfig {
  text: string;
  color?: string;
  size?: number;
  stroke?: { color: string; thick: number };
  duration?: number;
  repeat?: number;
  delay?: number;
}

interface genericConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
}

interface ImageAsset {
  name: string;
  path: string;
}

interface ScriptAsset {
  key: string;
  path: string;
}

interface TileMapsAsset {
  key: string;
  path: string;
}

interface SpritesheetsAsset {
  name: string;
  path: string;
  width: number;
  height: number;
  frames: number;
  spacing?: number;
}

interface SoundAsset {
  name: string;
  paths: Array<string>;
}

interface AudioSpriteAsset {
  name: string;
  jsonpath: string;
  paths: Array<string>;
  instance: { instance: number };
}

interface BitmapfontAsset {
  name: string;
  imgpath: string;
  xmlpath: string;
}

interface AtlasAsset {
  key: string;
  imagepath: string;
  jsonpath: string;
}
