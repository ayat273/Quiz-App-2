const questions = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answer: [
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: [
      { text: "Go", correct: false },
      { text: "Ag", correct: false },
      { text: "Ge", correct: false },
      { text: "Au", correct: true },
    ],
  },
];
let questionElement = document.getElementById("questions");
let answerElement = document.getElementById("answer-button");
let nextBtn = document.getElementById("next-btn");
let current = 0;
let score = 0;
function startQuiz() {
  current = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuiz();
}
function showQuiz() {
  resetStatus();
  currentQuiz = questions[current];
  let quizNo = current + 1;
  questionElement.innerHTML = quizNo + "." + currentQuiz.question;
  currentQuiz.answer.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetStatus() {
  nextBtn.style.display = "none";
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}
function selectAnswer(e) {
  let selectButton = e.target;
  let isCorrect = selectButton.dataset.correct === "true";
  if (isCorrect) {
    selectButton.classList.add("correct");
    score++;
  } else {
    selectButton.classList.add("incorrect");
  }
  Array.from(answerElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetStatus();
  questionElement.innerHTML = `Youe Scored ${score} out of ${questions.length} ! `;
  nextBtn.innerHTML = "play Again";
  nextBtn.style.display = "block";
}
function handleNextBtn() {
  current++;
  if (current < questions.length) {
    showQuiz();
  } else {
    showScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (current < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});
startQuiz();
