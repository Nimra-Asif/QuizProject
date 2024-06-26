const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text:"HyperText Machine Language", correct:false},
            {text:"HyperText Markup Language", correct:true},
            {text:"HighText Markup Language", correct:false},
            {text:"Hyperlink Text Markup Language", correct:false},
        ]
    },
    {
        question: "What is the purpose of a loop in programming?",
        answers: [
            {text:"To execute a block of code repeatedly", correct:true},
            {text:"To execute a block of code once", correct:false},
            {text:"To stop the execution of code", correct:false},
            {text:"To debug the code", correct:false},
        ]
    },
    {
        question: "In object-oriented programming, what is a class?",
        answers: [
            {text:"A function", correct:false},
            {text:"A type of variable", correct:false},
            {text:"A module", correct:false},
            {text:"A blueprint for creating objects", correct:true},
        ]
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        answers: [
            {text:"ol", correct:false},
            {text:"ul", correct:true},
            {text:"list", correct:false},
            {text:"li", correct:false},
        ]
    },
    {
        question: "Which of the following is a loop structure in JavaScript?",
        answers: [
            {text:"for", correct:false},
            {text:"while", correct:false},
            {text:"do-while", correct:false},
            {text:"All of the above", correct:true},
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            {text:"JavaScript Online Notation", correct:false},
            {text:"Java Standard Object Notation", correct:false},
            {text:"JavaScript Object Notation", correct:true},
            {text:"JavaScript Object Network", correct:false},
        ]
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        answers: [
            {text:"constant", correct:false},
            {text:"let", correct:false},
            {text:"const", correct:true},
            {text:"var", correct:false},
        ]
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        answers: [
            {text:"var = name;", correct:false},
            {text:"var name;", correct:true},
            {text:"variable name;", correct:false},
            {text:"declare name;", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next >>"
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct)
            {
                button.dataset.correct = answer.correct
            }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
        {
            answerButton.removeChild(answerButton.firstChild);
        }
}
function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
        {
            selectedBtn.classList.add("correct");
            score++;
        } 
        else
        {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButton.children).forEach(button =>
            {
                if(button.dataset.correct === "true")
                    {
                        button.classList.add("correct");
                    }
                    button.disabled = true;
            });
            nextButton.style.display = "block";
    }

    function showScore()
    {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton()
    {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length)
            {
                showQuestion();
            }
            else
            {
                showScore();
            }
    }

  nextButton.addEventListener("click", ()=>
{
    if(currentQuestionIndex < questions.length)
        {
            handleNextButton();
        }
        else
        {
            startQuiz();
        }
})  


startQuiz();