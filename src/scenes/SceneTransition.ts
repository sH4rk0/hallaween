export default class SceneTransition extends Phaser.Scene {
  private blocks: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "SceneTransition",
    });
  }

  preload() {}

  create() {
    this.blocks = this.add.group(undefined, {
      key: "black-block",
      repeat: 210,
      setScale: { x: 0, y: 0 },
    });

    Phaser.Actions.GridAlign(this.blocks.getChildren(), {
      width: 21,
      cellWidth: 62,
      cellHeight: 60,
      x: 31,
      y: 30,
    });
  }

  appear(_disappear: boolean, _callback: any) {
    let i = 0;

    this.blocks.children.iterate((child: any, index: number) => {
      this.tweens.add({
        targets: child,
        scaleX: 1,
        scaleY: 1,
        angle: 180,
        _ease: "Sine.easeInOut",
        ease: "Power2",
        duration: 250,
        onComplete: () => {
          //console.log(index);

          if (_disappear && index == 209) {
            if (_callback != null) _callback();
            this.disappear();
          }
        },
        delay: i * 25,
        repeat: 0,
      });

      i++;

      if (i % 21 === 0) {
        i = 0;
      }
    });
  }

  disappear() {
    let i = 0;

    this.blocks.children.iterate((child) => {
      this.tweens.add({
        targets: child,
        scaleX: 0,
        scaleY: 0,
        angle: 180,
        _ease: "Sine.easeInOut",
        ease: "Power2",
        duration: 250,
        delay: i * 25,
        repeat: 0,
      });

      i++;

      if (i % 21 === 0) {
        i = 0;
      }
    });
  }
}
