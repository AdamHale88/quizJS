const quizQuestion = window.document.querySelector("#title");
const solution1 = window.document.querySelector("#btn1");
const solution2 = window.document.querySelector("#btn2");
const solution3 = window.document.querySelector("#btn3");
const solution4 = window.document.querySelector("#btn4");
const startQuizButton = window.document.getElementById("start");
const submitInitialsButton = window.document.getElementById("submit");
const logo = window.document.querySelector(".logo");
const timerDisplay = window.document.getElementById("time-box");
const highScores = window.document.querySelector(".highScores");
const rules = window.document.querySelector(".card-content");
const scoreDisplay = window.document.getElementById("score-box");
const choiceButtons = window.document.getElementById("choicebuttons");
const scoreForm = window.document.querySelector(".control");
const insertScore = window.document.querySelector(".tableInsert");
const initials = window.document.querySelector(".input");
let quizIndex = 0;
let scoreIndex = 0;
let points = 100;
let Localstorage = localStorage;
let initalsStorage = [];
let startTimer = 120;
let quizObjectArray = [
  {
    question: "How do we declare a Function ?",

    solutions: [
      "myFunction()",

      "function myFunction()",

      "function:myFunction()",

      "myFunction(): function",
    ],

    correctSolution: "function myFunction()",
  },

  {
    question: "How do we declare the variable cheeseBurger ?",

    solutions: [
      "var = cheeseburger",

      'var cheeseBurger = "value"',

      "variable + cheeseBurger =",

      "<var = cheeseburger>",
    ],

    correctSolution: 'var cheeseBurger = "value"',
  },

  {
    question: 'How does a "for" loop start ? ',

    solutions: [
      "for i = 1 to 5",

      "for(i=0;i<=5;i++)",

      "for(i<=5,i++)",

      "for(i=0,i<=5)",
    ],

    correctSolution: "for(i=0;i<=5;i++)",
  },

  {
    question:
      'Select the proper sytax  for calling an external script called "xxx.js"',

    solutions: [
      '<script value="xxx.js">',

      '<script src="xxx.js">',

      '<script href="xxx.js">',

      '<script name="xxx.js">',
    ],

    correctSolution: '<script src="xxx.js">',
  },

  {
    question:
      'Which is the correct way to get an alert box with "hello world" ?',

    solutions: [
      'alertbox("hello wolrd")',

      'alert("hello world")',

      'mesbox("hello world")',

      'alertbox="hello world"',
    ],

    correctSolution: 'alert("hello world")',
  },

  {
    question:
      'How do we write a conditonal statement for executing some staments only if "i" is equal to 5 ?',

    solutions: ["if i==5 then", "if(i=5)", "if i=5", "if i=5 then"],

    correctSolution: "if(i=5)",
  },

  {
    question:
      "Which is the correct way to put a message in the browsers status bar ?",

    solutions: [
      'windows.status = ("put your message here")',

      'windows.status = "put your message here"',

      'status("put your message here")',

      'statusbar = "put your message here"',
    ],

    correctSolution: 'windows.status = "put your message here"',
  },

  {
    question: 'The following loop will execute ___ times "for(x=1;x<=11;x++)"',

    solutions: ["9", "10", "0", "11"],

    correctSolution: "10",
  },

  {
    question: "In Javascript what are these symbols called + - * an / ?",

    solutions: [
      " comparrison operators",

      "operators",

      "the right answer is missing",

      "exspressions",
    ],

    correctSolution: "operators",
  },

  {
    question: "Which is a logical operator ?",

    solutions: ["/", "&&", "%", "|"],

    correctSolution: "&&",
  },
];

//*---------------------------//
//*         GAME TIMER        //
//*--------------------------//
function time() {
  setInterval(() => {
    if (startTimer === 0) {
      // i don't think this works //
      clearInterval(startTimer);
    } else {
      startTimer--;
      let minutes = Math.floor(startTimer / 60);
      let seconds = startTimer - minutes * 60;
      document.querySelector("#timeLeft").innerHTML =
        "Time Left: " + minutes + ":" + seconds;
      if (startTimer === 0) {
        document.querySelector("#timeLeft").innerHTML = "Time Up !";
        clearInterval(startTimer);
      }
    }
  }, 1000);
}

//*----------------------------------------------------//
//*    IN ORDER TO LET THE USER START THE QUIZ        //
//*---------------------------------------------------//
startQuizButton.addEventListener("click", (e) => {
  e.preventDefault();
  time();
  let solutionsIndex = [...quizObjectArray[quizIndex].solutions];
  if (e.target.tagName === "BUTTON") {
    quizQuestion.innerHTML = quizObjectArray[quizIndex].question;
    solution1.innerText = solutionsIndex[0];
    solution2.innerText = solutionsIndex[1];
    solution3.innerText = solutionsIndex[2];
    solution4.innerText = solutionsIndex[3];
//*----------------------------------------------------------------//
//*          TRIGGERS TO HIDE START OF GAME DOM ELEMENTS          //
//*---------------------------------------------------------------//
        function hideGameStart() {
            logo.classList.add("is-hidden");
            startQuizButton.classList.add("is-hidden");
            choiceButtons.classList.remove("is-hidden");
            timerDisplay.classList.remove("is-hidden");
            rules.classList.add("is-hidden");
          }
  }
  hideGameStart();
});


//*----------------------------------------------//
//*   USED TO CHECK THE INDEX OF THE QUIZ ARRY   //
//*----------------------------------------------//
function quizReferenceHandler() {
  if (quizIndex >= 9 || startTimer === 0) {
    showScoreBoard();
  } else {
    quizIndex++;
  }

  //*-------------------------------------------------//
  //*        HERE TO RANDOMIZE SOLUTIONS         //
  //*------------------------------------------------//
  function shuffleSolutions(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random());
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  //*-----------------------------//
  //*      HANDLE QUIZ STATE      //
  //*-----------------------------//
  let solutionsIndex = [...quizObjectArray[quizIndex].solutions];
  let quizState = () => {
    quizQuestion.innerHTML = quizObjectArray[quizIndex].question;
    solution1.innerText = solutionsIndex[0];
    solution2.innerText = solutionsIndex[1];
    solution3.innerText = solutionsIndex[2];
    solution4.innerText = solutionsIndex[3];
  };
  randomIndex = Math.floor(Math.random() * 4);
  shuffleSolutions(solutionsIndex);
  quizState();
}

//*---------------------------------------------------------//
//*         HANDLE USER CHOICE VALIDATION & SCORING       //
//*--------------------------------------------------------//
choiceButtons.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === quizObjectArray[quizIndex].correctSolution) {
      console.log("correct");
      scoreIndex = scoreIndex + points;
    }
    if (e.target.innerText !== quizObjectArray[quizIndex].correctSolution) {
      console.log("wrong");
      startTimer = startTimer - 12;
    }
  }
  quizReferenceHandler();
});

//*--------------------------------------------------//
//*     NEEDED TO SHOW THE SCORE TO THE USER        //
//*------------------------------------------------//
function showScoreBoard() {
  document.querySelector("#timeLeft").innerHTML = "Time Up !";
  scoreForm.classList.remove("is-hidden");
  timerDisplay.classList.add("is-hidden");
  quizQuestion.classList.add("is-hidden");
  choiceButtons.classList.add("is-hidden");
  scoreDisplay.classList.remove("is-hidden");
  highScores.classList.remove("is-hidden");
  submitInitialsButton.classList.remove("is-hidden");
}

//*-------------------------------------------------------------//
//*         USED TO GET & STORE THE USERS INTIALS           //
//*------------------------------------------------------------//
submitInitialsButton.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    initalsStorage.push(initials);
    localStorage.setItem("initials", JSON.stringify(initials.value));
    localStorage.setItem("score", scoreIndex);
    const scoreboard = JSON.parse(Localstorage.getItem("initials")) || [];
    insertScore.innerHTML = initalsStorage
      .map((player) => {
        return `<tr class="is-uppercase">
          <th>${scoreboard}</th>
          <td>${scoreIndex}</td>
          </tr>
          `;
      })
      .join("");
  }
});
