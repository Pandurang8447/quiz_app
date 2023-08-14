const questions =[
  {
    question:"Who invented C++?",
    answers: [
      { text: "Dennis Ritchie", correct: false},
      { text: "Ken Thompson", correct: false},
      { text: "Brian Kernighan", correct: false},
      { text: "Bjarne Stroustrup", correct: true},
    ]
  },
  {
    question:"What is C++?",
    answers: [
      { text: "C++ is an object oriented programming language", correct:false},
      { text: "C++ is a procedural programming language",correct:false},
      { text: "C++ supports both procedural and object oriented programming language",correct:true},
      { text: "C++ is a functional programming language",correct:false},
    ]
  },
  {
    question:"Which of the following is used for comments in C++?",
    answers:[
      {text:"/* comment */",correct:false},
      {text:"// comment */",correct:false},
      {text:"// comment",correct:false},
      {text:"both // comment or /* comment */",correct:true},
    ]
  },
  {
    question:"Which of the following is a correct identifier in C++?",
    answers:[
      {text:"VAR_1234",correct:true},
      {text:"$var_name",correct:false},
      {text:"7VARNAME",correct:false},
      {text:"7var_name",correct:false},
    ]
  },
  {
    question:"Which of the following approach is used by C++?",
    answers:[
      {text:"Left-right",correct:false},
      {text:"Right-left",correct:false},
      {text:"Bottom-up",correct:true},
      {text:"Top-down",correct:false},
    ]
  },
  {
    question:"Which of the following type is provided by C++ but not C?",
    answers:[
      {text:"double",correct:false},
      {text:"float",correct:false},
      {text:"int",correct:false},
      {text:"bool",correct:true},
    ]
  },
  {
    question:"By default, all the files in C++ are opened in _________ mode.",
    answers:[
      {text:"binary",correct:false},
      {text:"vtc",correct:false},
      {text:"text",correct:true},
      {text:"iscii",correct:false},
    ]
  },
  {
    question:"Which of the following correctly declares an array in C++?",
    answers:[
      {text:"array{10}",correct:false},
      {text:"array array[10]",correct:false},
      {text:"int array",correct:false},
      {text:"int array[10]",correct:true},
    ]
  },
  {
    question:"What is the size of wchar_t in C++?",
    answers:[
      {text:"based on the number of bits in the system",correct:true},
      {text:"2 or 4",correct:false},
      {text:"4",correct:false},
      {text:"2",correct:false},
    ]
  },
  {
    question:"Which keyword is used to define the macros in c++?",
    answers:[
      {text:"#macro",correct:false},
      {text:"#define",correct:true},
      {text:"macro",correct:false},
      {text:"define",correct:false},
    ]
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex =0;
let score=0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo=currentQuestionIndex+1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display="none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore(){
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})
startQuiz();
