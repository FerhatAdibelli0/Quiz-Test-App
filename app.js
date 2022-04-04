function Question(question, choices, answer) {
  this.question = question;
  this.choices = choices;
  this.answer = answer;
}

var p1 = new Question(
  "What is the most popular language ?",
  ["Javascript", "C++", "C#", "Php"],
  "Javascript"
);
var p2 = new Question(
  "What is the most popular framework ?",
  ["React", "Next", "Express", "Laravel"],
  "React"
);
var p3 = new Question(
  "Which of fields are mostly in-demand ?",
  ["Frondend", "Backend", "FullStack", "MernStack"],
  "MernStack"
);

Question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

let questionsAll = [p1, p2, p3];

function Quiz(questionsAll) {
  this.questionsAll = questionsAll;
  this.score = 0;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestion = function () {
  return this.questionsAll[this.questionIndex];
};

Quiz.prototype.isFinish = function () {
  return this.questionsAll.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();
  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

var quiz = new Quiz(questionsAll);

loadAllitems();

function loadAllitems() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var question = quiz.getQuestion();
    console.log(question);
    var choices = question.choices;
    document.querySelector("#question").textContent = question.question;
    for (let i = 0; i < choices.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.textContent = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function showProgress() {
  var questionNumber = quiz.questionIndex + 1;
  var totalNumber = quiz.questionsAll.length;
  document.querySelector(
    "#progress"
  ).innerHTML = `question ${questionNumber} of ${totalNumber}`;
}

function guess(id, offer) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(offer);
    loadAllitems();
  };
}

function showScore() {
  var html = `<b>Your Score :</b> ${quiz.score}`;
  document.querySelector(".card-body").innerHTML = html;
}
