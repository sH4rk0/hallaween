import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import Hud from "./scenes/Hud";
import Joy from "./scenes/Joy";
import GameOver from "./scenes/GameOver";
import Crack from "./scenes/Crack";
import GamePlay from "./scenes/GamePlay";
import ScoreInput from "./scenes/ScoreInput";
import Leaderboard from "./Leaderboard";
export let leaderboard: Leaderboard;

window.addEventListener("load", () => {
  leaderboard = new Leaderboard();
  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: "#000000",
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: 1280,
      height: 600,
    },

    scene: [
      Boot,
      Preloader,
      Crack,
      Intro,
      Joy,
      Hud,
      GamePlay,
      GameOver,
      ScoreInput,
    ],
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    input: {
      activePointers: 2,
      keyboard: true,
      gamepad: true,
    },
    render: {
      pixelArt: true,
      antialias: false,
    },
  };

  const game = new Phaser.Game(config);

  /*
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/"
      })
      .then(
        function(registration) {
          //console.log("ServiceWorker registration successful with scope: ",registration.scope);
        },
        function(err) {
          //console.log("ServiceWorker registration failed: ", err);
        }
      );
  }
  */
});
