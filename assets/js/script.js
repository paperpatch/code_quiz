// starting section
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const scoreButton = document.getElementById('score-btn');

// question section
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');

// We don't want answers to be in the same position, no need to define them
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  // overlay change from title page to game page
  startButton.classList.add('hide');
  scoreButton.classList.add('hide');
  questionContainerEl.classList.remove('hide');

  // randomize set questions
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0;

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  // show question
  questionEl.innerText = question.question
  // show multiple answers by loop
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add('btn')

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
    answerButtonsEl.appendChild(button);
  })
}

// need to get rid of our old answer overlay
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct)

  // return as array to use forEach loop
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    // put high score and initial section
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {question: 'Which type of JavaScript language is ___',
    answers: [
      {text: 'Object-Based', correct: true},
      {text: 'Object-Oriented', correct: false},
      {text: 'Assembly-language', correct: false},
      {text: 'High-level', correct: false},
    ]},
  {question: 'Which one of the following is also known as Conditional Expression:',
    answers: [
      {text: 'Alternative to if-else', correct: false},
      {text: 'Switch statement', correct: false},
      {text: 'If-then-else statement',correct: false},
      {text: 'Immediate If', correct: true},
    ]},
  {question: 'In JavaScript, what is a block of statement?',
    answers: [
      {text: 'Conditional block',correct: false},
      {text: 'Block that combines a number of statements into a single compound statement',correct: true},
      {text: 'Both conditional block and a single statement',correct: false},
      {text: 'Block that contains a single statement',correct: false},
    ]},
  {question: 'When interpreter encounters an empty statements, what it will do:',
    answers: [
      {text: 'Shows a warning',correct: false},
      {text: 'Prompts to complete the statement',correct: false},
      {text: 'Throws an error',correct: false},
      {text: 'Ignores the statements',correct: true},
    ]
  },
  {question: 'The "function" and " var" are known as:',
    answers: [
      {text: 'Keywords',correct: false},
      {text: 'Data types',correct: false},
      {text: 'Declaration statements',correct: true},
      {text: 'Prototypes',correct: false},
    ]
  },
  {question: 'Which of the following variables takes precedence over the others if the names are the same?',
    answers: [
      {text: 'Global variable',correct: false},
      {text: 'The local element',correct: true},
      {text: 'The two of the above',correct: false},
      {text: 'None of the above',correct: false},
    ]
  },
  {question: 'Which one of the following is the correct way for calling the JavaScript code?',
    answers: [
      {text: 'Preprocessor',correct: false},
      {text: 'Triggering Event',correct: false},
      {text: 'RMI',correct: false},
      {text: 'Function/Method',correct: true},
    ]
  },
  {question: 'Which of the following type of a variable is volatile?',
    answers: [
      {text: 'Mutable variable',correct: true},
      {text: 'Dynamic variable',correct: false},
      {text: 'Volatile variable',correct: false},
      {text: 'Immutable variable',correct: false},
    ]
  },
  {question: 'Which of the following option is used as hexadecimal literal beginning?',
    answers: [
      {text: '00',correct: false},
      {text: '0x',correct: false},
      {text: '0X',correct: false},
      {text: 'Both 0x and 0X',correct: true},
    ]
  },
  {question: 'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.',
    answers: [
      {text: 'Prints an exception error',correct: false},
      {text: 'Prints an overflow error',correct: false},
      {text: 'Displays "Infinity"',correct: true},
      {text: 'Prints the value as such',correct: false},
    ]
  },
]