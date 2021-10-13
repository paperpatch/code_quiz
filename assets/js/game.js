const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let count = 30
let availableQuestions = []

let questions = [{
        question: 'Which type of JavaScript language is ___',
        choice1: 'Object-Based',
        choice2: 'Object-Oriented',
        choice3: 'Assembly-language',
        choice4: 'High-level',
        answer: 1,
    },
    {
        question: 'Which one of the following is also known as Conditional Expression:',
        choice1: 'Alternative to if-else',
        choice2: 'Switch statement',
        choice3: 'If-then-else statement',
        choice4: 'Immediate If',
        answer: 4,
    },
    {
        question: 'In JavaScript, what is a block of statement?',
        choice1: 'Conditional block',
        choice2: 'Block that combines a number of statements into a single compound statement',
        choice3: 'Both conditional block and a single statement',
        choice4: 'Block that contains a single statement',
        answer: 2,
    },
    {
        question: 'When interpreter encounters an empty statements, what it will do:',
        choice1: 'Shows a warning',
        choice2: 'Prompts to complete the statement',
        choice3: 'Throws an error',
        choice4: 'Ignores the statements',
        answer: 4,
    },
    {
        question: 'The "function" and " var" are known as:',
        choice1: 'Keywords',
        choice2: 'Data types',
        choice3: 'Declaration statements',
        choice4: 'Prototypes',
        answer: 3,
    },
    {
        question: 'Which of the following variables takes precedence over the others if the names are the same?',
        choice1: 'Global variable',
        choice2: 'The local element',
        choice3: 'The two of the above',
        choice4: 'None of the above',
        answer: 2,
    },
    {
        question: 'Which one of the following is the correct way for calling the JavaScript code?',
        choice1: 'Preprocessor',
        choice2: 'Triggering Event',
        choice3: 'RMI',
        choice4: 'Function/Method',
        answer: 4,
    },
    {
        question: 'Which of the following type of a variable is volatile?',
        choice1: 'Mutable variable',
        choice2: 'Dynamic variable',
        choice3: 'Volatile variable',
        choice4: 'Immutable variable',
        answer: 1,
    },
    {
        question: 'Which of the following option is used as hexadecimal literal beginning?',
        choice1: '00',
        choice2: '0x',
        choice3: '0X',
        choice4: 'Both 0x and 0X',
        answer: 4,
    },
    {
        question: 'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.',
        choice1: 'Prints an exception error',
        choice2: 'Prints an overflow error',
        choice3: 'Displays "Infinity"',
        choice4: 'Prints the value as such',
        answer: 3,
    },
    {
        question: 'Which built-in method combines the text of two strings and returns a new string?',
        choice1: 'append()',
        choice2: 'concat()',
        choice3: 'attach()',
        choice4: 'None of the above',
        answer: 2,
    },
    {
        question: "Which of the following function of Number object returns the number's value?",
        choice1: 'toString()',
        choice2: 'valueOf()',
        choice3: 'toLocalString()',
        choice4: 'toPrecision()',
        answer: 2,
    },
    {
        question: "Which of the following function of Array object calls a function for each element in the array?",
        choice1: 'concat()',
        choice2: 'every()',
        choice3: 'filter()',
        choice4: 'forEach()',
        answer: 4,
    },
    {
        question: "Which of the following function of Array object adds and/or removes elements from an array?",
        choice1: 'toSource()',
        choice2: 'sort()',
        choice3: 'splice()',
        choice4: 'unshift()',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    count = 30
    availableQuestions = [...questions]
    getNewQuestion()
}


// timer section

var time = setInterval(myTimer, 1000);

function myTimer() {
    count--;
    document.getElementById('timer').innerHTML = count;

    console.log(count);

    if (count < 0) {
        clearInterval(time);
        alert("Time's Up!");
        return window.location.assign('./end.html')
    }
}

// pull new questions function. updates progress bar text/display and question numbers

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
}

// Whenever you click an answer, it adds a class to show whether you're right or wrong. Then it shortly goes to the next question.

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        // pulls the questions.answer.number array
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        // pick 'correct' if answer matches the number set, otherwise pick 'wrong'. Correct gains points. Wrong loses time by 5 sec.
        let changeClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'wrong'
        if (changeClass === 'correct') {
            incrementScore(SCORE_POINTS)
        } else {
            document.getElementById('timer').innerHTML = count;
            count -= 5;
        }
        selectedChoice.parentElement.classList.add(changeClass)

        // make class disappear before going to the next question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(changeClass)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()