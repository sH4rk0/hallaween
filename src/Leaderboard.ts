import * as firebase from "firebase";

export default class Leaderboard {
  private firebaseConfig = {
    apiKey: "AIzaSyAsKEXJ2dj-f5zndT1LKWSTwzTJYqVDrgY",
    authDomain: "sh4rko.firebaseapp.com",
    databaseURL: "https://sh4rko.firebaseio.com",
    projectId: "sh4rko",
    storageBucket: "sh4rko.appspot.com",
    messagingSenderId: "347983602438",
    appId: "1:347983602438:web:95f186a7fdda63cd3eb487",
    measurementId: "G-7NHR0276YC",
  };

  private fireBaseApp: firebase.app.App;
  private fireBaseDb: firebase.database.Database;
  private scores: firebase.database.Reference;
  private highscores: Array<any>;
  private allscores: Array<any>;

  constructor() {
    this.fireBaseApp = firebase.initializeApp(this.firebaseConfig);
    this.fireBaseDb = this.fireBaseApp.database();
    this.scores = this.fireBaseDb.ref("scores");
    this.highscores = [];
    this.allscores = [];

    firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        //console.log(error);
      });
    this.getData();
  }

  insertScore(score: ScoreConfig) {
    if (score.score != 0 && score.name != "") this.scores.push(score);
  }

  getHighscores() {
    return this.highscores;
  }

  getData() {
    this.scores.on("value", (data) => {
      this.allscores = [];
      Object.entries(data.val()).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];
        this.allscores.push(value);
      });

      this.allscores.sort((a: any, b: any) => {
        const valueA = a.score;
        const valueB = b.score;

        let comparison = 0;
        if (valueA < valueB) {
          comparison = 1;
        } else if (valueA > valueB) {
          comparison = -1;
        }
        return comparison;
      });

      if (this.allscores.length > 0) {
        this.highscores = [];
        for (let i = 0; i < 5; i++) {
          this.highscores.push(this.allscores[i]);
        }
      }
    });
  }
}
