export let EnemyCases: any = {
  batSimpleLeft: {
    t: 0,
    e: "bat",
    x: -50,
    vx: 200,
    score: 10,
  },
  batSimpleLeftTween: {
    t: 0,
    e: "bat",
    x: -50,
    vx: 200,
    y: 50,
    score: 20,
    tween: { tweenDuration: 2000, tweenY: -400 },
  },
  batSimpleLeftSeek: {
    t: 0,
    e: "bat",
    x: -50,
    vx: 200,
    y: -1,
    score: 30,
  },
  batSimpleRight: {
    t: 0,
    e: "bat",
    vx: -200,
    score: 10,
  },
  batSimpleRightTween: {
    t: 0,
    e: "bat",
    y: 50,
    vx: -200,
    score: 20,
    tween: { tweenDuration: 2000, tweenY: -400 },
  },
  /* witch */
  witchSimpleLeft: {
    t: 0,
    e: "witch",
    x: -50,
    vx: 200,
    score: 30,
    energy: 3,
  },
  witchSimpleLeftTween: {
    t: 0,
    e: "witch",
    x: -50,
    vx: 200,
    y: 100,
    score: 40,
    energy: 3,
    tween: { tweenDuration: 2000, tweenY: -300 },
  },
  witchSimpleRight: {
    t: 0,
    e: "witch",
    vx: -200,
    score: 30,
    energy: 3,
  },
  witchSimpleRightTween: {
    t: 0,
    e: "witch",
    y: 100,
    vx: -200,
    score: 40,
    energy: 3,
    tween: { tweenDuration: 2000, tweenY: -300 },
  },
  /* ghast */
  ghastSimpleLeft: {
    t: 0,
    e: "ghast",
    x: -50,
    vx: 200,
    score: 40,
    energy: 4,
  },
  ghastSimpleLeftTween: {
    t: 0,
    e: "ghast",
    x: -50,
    vx: 200,
    y: 100,
    score: 50,
    energy: 4,
    tween: { tweenDuration: 2000, tweenY: -300 },
  },
  ghastSimpleRight: {
    t: 0,
    e: "ghast",
    vx: -200,
    score: 40,
    energy: 4,
  },
  ghastSimpleRightTween: {
    t: 0,
    e: "ghast",
    y: 100,
    vx: -200,
    score: 50,
    energy: 4,
    tween: { tweenDuration: 2000, tweenY: -300 },
  },
  /* ghost */
  ghostSimpleLeft: {
    t: 0,
    e: "ghost",
    x: -50,
    vx: 200,
    score: 20,
    energy: 2,
  },
  ghostSimpleLeftTween: {
    t: 0,
    e: "ghost",
    x: -50,
    vx: 200,
    y: 75,
    score: 30,
    energy: 2,
    tween: { tweenDuration: 2000, tweenY: -350 },
  },
  ghostSimpleRight: {
    t: 0,
    e: "ghost",
    vx: -200,
    energy: 2,
    score: 20,
  },
  ghostSimpleRightTween: {
    t: 0,
    e: "ghost",
    y: 75,
    vx: -200,
    score: 30,
    energy: 2,
    tween: { tweenDuration: 2000, tweenY: -350 },
  },

  /* pumb */
  pumpSimpleLeft: {
    t: 0,
    e: "bossPump",
    x: -50,
    vx: 200,
    score: 50,
    energy: 5,
  },
  pumpSimpleLeftTween: {
    t: 0,
    e: "bossPump",
    x: -50,
    vx: 200,
    y: 75,
    score: 60,
    energy: 5,
    tween: { tweenDuration: 2000, tweenY: -350 },
  },
  pumpSimpleRight: {
    t: 0,
    e: "bossPump",
    vx: -200,
    energy: 5,
    score: 50,
  },
  pumpSimpleRightTween: {
    t: 0,
    e: "bossPump",
    y: 75,
    vx: -200,
    score: 60,
    energy: 5,
    tween: { tweenDuration: 2000, tweenY: -350 },
  },

  incomingText: {
    t: 4,
    text: {
      text: "The BOSS is coming!!!...",
      size: 30,
      color: "#ff0000",
      stroke: { color: "#ffffff", thick: 10 },
    },
  },
};

export let GameData: any = {
  levels: [
    {
      /*level 1
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
      level: {
        name: "Flutter, flutter little bat,\nHow I wonder where you're at!",
        sequence: [
          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 500,
                type: EnemyCases.batSimpleRight,
              },
            },
          },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-fire", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },

          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 500,
                type: EnemyCases.batSimpleLeft,
              },
            },
          },

          { d: 1000, data: EnemyCases.batSimpleRightTween },
          { d: 1000, data: EnemyCases.batSimpleLeftTween },
          { d: 1000, data: EnemyCases.batSimpleRightTween },
          { d: 1000, data: EnemyCases.batSimpleLeftTween },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.batSimpleRightTween,
                bonus: null,
              },
            },
          },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-velocity", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },
          { d: 500, data: EnemyCases.batSimpleLeft },
          { d: 500, data: EnemyCases.batSimpleRight },
          { d: 500, data: EnemyCases.batSimpleLeft },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                bonus: null,
                type: EnemyCases.batSimpleLeftTween,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.batSimpleRightTween,
                bonus: null,
              },
            },
          },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-damage", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },

          { d: 500, data: EnemyCases.batSimpleRight },
          { d: 500, data: EnemyCases.batSimpleLeft },
          { d: 500, data: EnemyCases.batSimpleRight },

          {
            d: 9000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.batSimpleLeftTween,
                bonus: null,
              },
            },
          },

          {
            d: 2000,
            data: EnemyCases.incomingText,
          },

          { d: 2000, data: { t: 3 } },
        ],
      },
    },
    /*level 2
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    {
      level: {
        name:
          "Some little ghosts jumping on the bed,\nOne fell off and bumped his head!",
        sequence: [
          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 1000,
                type: EnemyCases.ghostSimpleRight,
              },
            },
          },

          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 1000,
                type: EnemyCases.ghostSimpleRightTween,
              },
            },
          },

          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 1000,
                type: EnemyCases.ghostSimpleLeftTween,
              },
            },
          },
          {
            d: 1000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-damage", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },

          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 1000,
                type: EnemyCases.ghostSimpleRightTween,
              },
            },
          },
          { d: 500, data: EnemyCases.batSimpleLeft },
          { d: 500, data: EnemyCases.ghostSimpleRight },
          { d: 500, data: EnemyCases.batSimpleLeft },

          { d: 500, data: EnemyCases.ghostSimpleRight },
          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghostSimpleRightTween,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-velocity", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghostSimpleLeftTween,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghostSimpleRightTween,
              },
            },
          },

          {
            d: 1500,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-fire", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },
          {
            d: 12000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghostSimpleLeftTween,
              },
            },
          },

          {
            d: 2000,
            data: EnemyCases.incomingText,
          },

          { d: 2000, data: { t: 3 } },
        ],
      },
    },
    /*level 3
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    {
      level: {
        name: "Oh, my it's getting late\nThere are witches in the air...",

        sequence: [
          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 1000,
                type: EnemyCases.witchSimpleRight,
              },
            },
          },
          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-damage", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },
          { d: 500, data: EnemyCases.batSimpleLeft },
          {
            d: 10000,
            data: {
              sw: {
                quantity: 10,
                delay: 1000,
                type: EnemyCases.witchSimpleLeftTween,
              },
            },
          },
          { d: 500, data: EnemyCases.batSimpleLeft },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.witchSimpleRightTween,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-fire", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.witchSimpleLeftTween,
              },
            },
          },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.witchSimpleRightTween,
              },
            },
          },

          { d: 500, data: EnemyCases.witchSimpleRight },
          { d: 500, data: EnemyCases.ghostSimpleLeft },

          { d: 500, data: EnemyCases.witchSimpleRight },

          {
            d: 12000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.witchSimpleLeftTween,
              },
            },
          },

          {
            d: 2000,
            data: EnemyCases.incomingText,
          },

          { d: 2000, data: { t: 3 } },
        ],
      },
    },
    /*level 4
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    {
      level: {
        name: "I saw a ghost, He saw me too\nI waved at him but he said Boo!!!",
        sequence: [
          { d: 1000, data: EnemyCases.ghastSimpleRight },
          { d: 1000, data: EnemyCases.witchSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          {
            d: 3000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-live", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.ghastSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.batSimpleRight },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghastSimpleRightTween,
              },
            },
          },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghastSimpleRightTween,
              },
            },
          },

          { d: 1000, data: EnemyCases.ghastSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleRight },
          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-invulnerability", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },
          { d: 1000, data: EnemyCases.witchSimpleLeft },
          { d: 1000, data: EnemyCases.ghastSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.batSimpleRight },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghastSimpleRightTween,
              },
            },
          },

          { d: 500, data: EnemyCases.ghastSimpleLeft },
          { d: 500, data: EnemyCases.batSimpleRight },

          { d: 500, data: EnemyCases.ghastSimpleLeft },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghastSimpleLeftTween,
              },
            },
          },
          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 200,
                type: EnemyCases.batSimpleRightTween,
                bonus: { type: "bonus-fire", enemy: 5 },
                tween: { tweenY: 50, tweenDuration: 1000 },
                y: 400,
              },
            },
          },
          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.ghastSimpleRightTween,
              },
            },
          },

          { d: 500, data: EnemyCases.witchSimpleRight },
          { d: 500, data: EnemyCases.batSimpleLeft },
          { d: 500, data: EnemyCases.batSimpleRight },

          {
            d: 12000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.batSimpleLeftTween,
              },
            },
          },

          {
            d: 2000,
            data: EnemyCases.incomingText,
          },

          { d: 2000, data: { t: 3 } },
        ],
      },
    },
    /*level 5
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    {
      level: {
        name:
          " I made a jack-o-lantern\nfor Halloween night\nHe has three crooked\nteeth But he can't bite",
        sequence: [
          { d: 1000, data: EnemyCases.pumpSimpleRight },
          { d: 1000, data: EnemyCases.witchSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.pumpSimpleRight },
          { d: 1000, data: EnemyCases.batSimpleLeft },
          { d: 1000, data: EnemyCases.pumpSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.pumpSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.pumpSimpleRight },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.pumpSimpleRightTween,
              },
            },
          },

          {
            d: 5000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.pumpSimpleRightTween,
              },
            },
          },

          { d: 1000, data: EnemyCases.pumpSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleRight },
          { d: 1000, data: EnemyCases.pumpSimpleLeft },
          { d: 1000, data: EnemyCases.batSimpleRight },
          { d: 1000, data: EnemyCases.pumpSimpleLeft },
          { d: 1000, data: EnemyCases.ghastSimpleRight },
          { d: 1000, data: EnemyCases.witchSimpleLeft },
          { d: 1000, data: EnemyCases.pumpSimpleRight },
          { d: 1000, data: EnemyCases.ghastSimpleLeft },
          { d: 1000, data: EnemyCases.batSimpleRight },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.pumpSimpleRightTween,
              },
            },
          },

          { d: 500, data: EnemyCases.ghastSimpleLeft },
          { d: 500, data: EnemyCases.batSimpleRight },
          { d: 500, data: EnemyCases.ghastSimpleLeft },

          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.pumpSimpleLeftTween,
              },
            },
          },
          { d: 0, data: EnemyCases.witchSimpleRightTween },
          { d: 0, data: EnemyCases.pumpSimpleLeftTween },
          { d: 0, data: EnemyCases.batSimpleRightTween },
          { d: 0, data: EnemyCases.batSimpleLeftTween },
          {
            d: 2000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.pumpSimpleRightTween,
              },
            },
          },

          { d: 500, data: EnemyCases.witchSimpleRight },
          { d: 500, data: EnemyCases.pumpSimpleLeft },
          { d: 500, data: EnemyCases.batSimpleRight },

          {
            d: 12000,
            data: {
              sw: {
                quantity: 5,
                delay: 500,
                type: EnemyCases.batSimpleLeftTween,
              },
            },
          },
          {
            d: 2000,
            data: EnemyCases.incomingText,
          },

          { d: 2000, data: { t: 3 } },
        ],
      },
    },
    /*END
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    {
      level: {
        name: "CONGRATULATION!!!",
        sequence: [
          {
            d: 100,
            data: {
              t: 7,
            },
          },

          {
            d: 4500,
            data: {
              t: 8,
            },
          },
        ],
      },
    },
  ],

  //1 open, 2 close, 3 move top, 4 move center, 5 move bottom, 6 rush left, 7 rush right, 8 shield on, 9 shield off, 10 swarm
  //11 flip r. 12 flip l

  bossLevels: [
    //--------------------------------------------------------------
    //BOSS 1
    //--------------------------------------------------------------
    {
      a: [
        { a: 1, d: 500 },
        { a: 2, d: 500 },

        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },

        {
          a: 10,
          d: 1000,
          data: {
            sw: {
              quantity: 5,
              delay: 500,
              type: EnemyCases.batSimpleLeftTween,
            },
          },
        },

        { a: 1, d: 1000 },
        { a: 2, d: 3000 },
      ],
      d: 50,
      s: 0,
      pd: 0,
    }, //level0

    //--------------------------------------------------------------
    //BOSS 2
    //--------------------------------------------------------------
    {
      a: [
        { a: 1, d: 1000 },
        { a: 2, d: 1000 },
        { a: 6, d: 200 },
        { a: 11, d: 50 },
        { a: 7, d: 50 },
        { a: 12, d: 50 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 500,
              type: EnemyCases.batSimpleRight,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 5,
              delay: 500,
              type: EnemyCases.ghostSimpleRightTween,
            },
          },
        },

        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 5,
              delay: 500,
              type: EnemyCases.ghostSimpleLeftTween,
            },
          },
        },
        { a: 8, d: 100 },
        { a: 1, d: 500 },
        { a: 9, d: 8000 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 500,
              type: EnemyCases.batSimpleLeft,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        { a: 2, d: 1000 },
      ],
      d: 80,
      s: 2,
      pd: 20,
    },
    //--------------------------------------------------------------
    //BOSS 3
    //--------------------------------------------------------------
    {
      a: [
        { a: 3, d: 100 },
        { a: 6, d: 100 },
        { a: 11, d: 50 },
        { a: 5, d: 100 },
        { a: 7, d: 100 },
        { a: 12, d: 50 },
        { a: 4, d: 100 },

        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 500,
              type: EnemyCases.witchSimpleLeftTween,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 500,
              type: EnemyCases.witchSimpleRightTween,
            },
          },
        },
        { a: 1, d: 500 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        { a: 8, d: 100 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        { a: 9, d: 8000 },
        { a: 2, d: 100 },
      ],
      d: 100,
      s: 4,
      pd: 25,
    },
    //--------------------------------------------------------------
    //BOSS 4
    //--------------------------------------------------------------
    {
      a: [
        { a: 8, d: 1000 },
        { a: 1, d: 1000 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 100,
              type: EnemyCases.ghastSimpleLeft,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 100,
              type: EnemyCases.ghastSimpleRight,
            },
          },
        },

        { a: 9, d: 8000 },
        { a: 2, d: 1000 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        { a: 8, d: 1000 },
        { a: 1, d: 1000 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 4,
              delay: 500,
              type: EnemyCases.ghastSimpleLeftTween,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 4,
              delay: 500,
              type: EnemyCases.ghastSimpleRightTween,
            },
          },
        },
        { a: 2, d: 1000 },
        { a: 9, d: 8000 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
        { a: 1, d: 1000 },
        { a: 6, d: 200 },
        { a: 11, d: 50 },

        { a: 7, d: 50 },
        { a: 12, d: 50 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 1,
              delay: 500,
              type: EnemyCases.batSimpleLeftSeek,
            },
          },
        },
      ],
      d: 120,
      s: 6,
      pd: 30,
    },
    //1 open, 2 close, 3 move top, 4 move center, 5 move bottom, 6 rush left, 7 rush right, 8 shield on, 9 shield off, 10 swarm
    //11 flip r. 12 flip l
    //--------------------------------------------------------------
    //BOSS 5
    //--------------------------------------------------------------
    {
      a: [
        { a: 1, d: 100 },
        { a: 6, d: 1000 },
        { a: 11, d: 100 },
        { a: 7, d: 100 },
        { a: 12, d: 100 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 4,
              delay: 500,
              type: EnemyCases.ghastSimpleLeftTween,
            },
          },
        },
        { a: 2, d: 100 },
        { a: 3, d: 100 },
        { a: 1, d: 100 },
        { a: 6, d: 1000 },
        { a: 11, d: 100 },
        { a: 7, d: 100 },
        { a: 12, d: 100 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 4,
              delay: 500,
              type: EnemyCases.ghastSimpleRightTween,
            },
          },
        },
        { a: 2, d: 100 },
        { a: 5, d: 100 },
        { a: 1, d: 100 },
        { a: 6, d: 1000 },
        { a: 11, d: 100 },
        { a: 7, d: 100 },
        { a: 12, d: 100 },
        {
          a: 10,
          d: 100,
          sw: {
            data: {
              quantity: 3,
              delay: 100,
              type: EnemyCases.ghastSimpleLeft,
            },
          },
        },
        { a: 2, d: 100 },
        { a: 4, d: 100 },
        { a: 1, d: 100 },
        { a: 8, d: 100 },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 100,
              type: EnemyCases.ghastSimpleLeft,
            },
          },
        },
        {
          a: 10,
          d: 100,
          data: {
            sw: {
              quantity: 3,
              delay: 100,
              type: EnemyCases.ghastSimpleRight,
            },
          },
        },
        { a: 9, d: 8000 },
      ],
      d: 140,
      s: 8,
      pd: 30,
    },
  ],

  tilemaps: [
    {
      key: "level-1",
      path: "assets/map/level-1.json",
    },
  ],
  spritesheets: [
    /* {
      name: "tiles",
      path: "assets/map/tilemap.png",
      width: 46,
      height: 46,
      spacing: 2,
    },*/
    {
      name: "bonus-damage",
      path: "assets/images/bonus-milk.png",
      width: 42,
      height: 81,
      frames: 2,
    },
    {
      name: "bonus-invulnerability",
      path: "assets/images/bonus-mask.png",
      width: 52,
      height: 58,
      frames: 2,
    },
    {
      name: "bonus-velocity",
      path: "assets/images/bonus-broom.png",
      width: 48,
      height: 96,
      frames: 2,
    },
    {
      name: "bonus-live",
      path: "assets/images/bonus-heart.png",
      width: 40,
      height: 40,
      frames: 2,
    },

    {
      name: "bonus-fire",
      path: "assets/images/bonus-fire.png",
      width: 44,
      height: 66,
      frames: 2,
    },

    {
      name: "faces",
      path: "assets/images/faces.png",
      width: 43,
      height: 58,
      frames: 18,
    },
    {
      name: "bossPump",
      path: "assets/images/bossPump.png",
      width: 72,
      height: 72,
      frames: 5,
    },
    {
      name: "levels",
      path: "assets/images/levels.png",
      width: 48,
      height: 48,
      frames: 5,
    },
    {
      name: "pumpkin",
      path: "assets/images/pumpkin.png",
      width: 105,
      height: 105,
      frames: 4,
    },
    {
      name: "arm",
      path: "assets/images/arm.png",
      width: 135,
      height: 74,
      frames: 2,
    },

    {
      name: "deluca",
      path: "assets/images/deluca.png",
      width: 54,
      height: 45,
      frames: 7,
    },

    {
      name: "bat",
      path: "assets/images/enemy-bat.png",
      width: 88,
      height: 88,
      frames: 4,
    },
    {
      name: "ghast",
      path: "assets/images/enemy-ghast.png",
      width: 80,
      height: 100,
      frames: 4,
    },
    {
      name: "pump",
      path: "assets/images/enemy-pump.png",
      width: 62,
      height: 86,
      frames: 4,
    },
    {
      name: "wolf",
      path: "assets/images/enemy-wolf.png",
      width: 56,
      height: 84,
      frames: 4,
    },
    {
      name: "santa",
      path: "assets/images/santa.png",
      width: 50,
      height: 53,
      frames: 10,
    },

    {
      name: "coffin",
      path: "assets/images/coffin.png",
      width: 62,
      height: 42,
      frames: 10,
    },
    {
      name: "ghost",
      path: "assets/images/enemy-ghost.png",
      width: 74,
      height: 91,
      frames: 4,
    },
    {
      name: "witch",
      path: "assets/images/enemy-witch.png",
      width: 96,
      height: 98,
      frames: 4,
    },
    {
      name: "bodyparts",
      path: "assets/images/bodyparts.png",
      width: 48,
      height: 48,
      frames: 20,
    },
    {
      name: "me",
      path: "assets/images/me.png",
      width: 53,
      height: 50,
      frames: 30,
    },
    {
      name: "dracula",
      path: "assets/images/enemy-dracula.png",
      width: 44,
      height: 70,
      frames: 4,
    },
    {
      name: "blood",
      path: "assets/images/blood.png",
      width: 126,
      height: 126,
      frames: 9,
    },
  ],

  atlas: [
    {
      key: "explosionParticles",
      imagepath: "assets/images/explosionParticles.png",
      jsonpath: "assets/images/explosionParticles.json",
    },
  ],

  images: [
    {
      name: "sky",
      path: "assets/images/skynew.png",
    },
    {
      name: "energybar",
      path: "assets/images/energy-bar.png",
    },
    {
      name: "energybarmask",
      path: "assets/images/energy-bar-mask.png",
    },
    {
      name: "heart",
      path: "assets/images/heart.png",
    },
    {
      name: "enemyBullet",
      path: "assets/images/enemyBullet.png",
    },
    {
      name: "gameoverbg",
      path: "assets/images/game-over-bg.png",
    },

    {
      name: "boss-base",
      path: "assets/images/boss-base.png",
    },
    {
      name: "share",
      path: "assets/images/share.png",
    },

    {
      name: "boss-top",
      path: "assets/images/boss-top.png",
    },

    {
      name: "cloud1",
      path: "assets/images/cloud1.png",
    },
    {
      name: "ouas-logo",
      path: "assets/images/ouas-logo.png",
    },

    {
      name: "ouas",
      path: "assets/images/ouas.png",
    },
    {
      name: "cat",
      path: "assets/images/cat.png",
    },
    {
      name: "cloud2",
      path: "assets/images/cloud2.png",
    },

    {
      name: "hallaween",
      path: "assets/images/hallaweenNew.png",
    },

    {
      name: "bglevel1",
      path: "assets/images/bg-level1new.png",
    },

    {
      name: "bglevel2",
      path: "assets/images/bg-level2new.png",
    },

    {
      name: "bglevel3",
      path: "assets/images/bg-level3.png",
    },

    {
      name: "bullet",
      path: "assets/images/bullet.png",
    },
    {
      name: "spark",
      path: "assets/images/spark.png",
    },
    {
      name: "body",
      path: "assets/images/body.png",
    },

    {
      name: "fairlight-logo",
      path: "assets/images/fairlight-logo.png",
    },

    {
      name: "fairlight-raster",
      path: "assets/images/fairlight-raster.png",
    },
    {
      name: "fairlight-raster2",
      path: "assets/images/fairlight-raster2.png",
    },

    {
      name: "credits",
      path: "assets/images/credits.png",
    },

    {
      name: "rub",
      path: "assets/images/gameover/rub.png",
    },

    {
      name: "end",
      path: "assets/images/gameover/end.png",
    },
    {
      name: "block",
      path: "assets/images/gameover/block.png",
    },

    {
      name: "fire",
      path: "assets/images/muzzleflash3.png",
    },
    {
      name: "white-smoke",
      path: "assets/images/smoke-puff.png",
    },
    {
      name: "dark-smoke",
      path: "assets/images/smoke0.png",
    },
    {
      name: "how-to",
      path: "assets/images/how-to.png",
    },
    { name: "scrollFont", path: "assets/fonts/test.png" },
  ],

  sounds: [
    {
      name: "halloween",
      paths: ["assets/sounds/halloween.ogg", "assets/sounds/halloween.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
    {
      name: "thunder",
      paths: ["assets/sounds/thunder.ogg", "assets/sounds/thunder.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
    {
      name: "fairlight",
      paths: ["assets/sounds/fairlight.ogg", "assets/sounds/fairlight.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
    {
      name: "alarm",
      paths: ["assets/sounds/alarm.ogg", "assets/sounds/alarm.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },

    {
      name: "boss-music",
      paths: ["assets/sounds/boss.ogg", "assets/sounds/boss.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },

    {
      name: "music0",
      paths: ["assets/sounds/music1.ogg", "assets/sounds/music1.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },

    {
      name: "music1",
      paths: ["assets/sounds/music2.ogg", "assets/sounds/music2.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
    {
      name: "gameover",
      paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },

    {
      name: "allauin",
      paths: ["assets/sounds/allauin.ogg", "assets/sounds/allauin.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
    {
      name: "win",
      paths: ["assets/sounds/win.ogg", "assets/sounds/win.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
  ],

  audio: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instances: 10,
    },
  ],

  script: [
    {
      key: "webfont",
      path: "assets/js/webfonts.js",
    },
  ],

  bitmapfont: [
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml",
    },
    {
      name: "commodore",
      imgpath: "assets/fonts/64_0.png",
      xmlpath: "assets/fonts/64.xml",
      jsonpath: "",
    },
  ],
};
