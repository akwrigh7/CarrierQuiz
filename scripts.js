// prettier-ignore
let questions = [
    "How old?",
    "When?",
    "Why?"
];

let num = 0;
let header = document.getElementById("header");
let questionsWrapper = document.getElementById("questionsWrapper");
let startBtn = document.getElementById("start").addEventListener("click", function () {
    header.style.display = "none";
    questionsWrapper.style.display = "flex";
    loadQuestion(num)
});

let restartBtn = document.getElementById("restart");
let nextBtn = document.getElementById("next");
let answerButtons = document.querySelectorAll("#answers button");
answerButtons.forEach(button => {
    button.addEventListener("click", function(){
        answerButtons.forEach(btn => {
            btn.classList.remove("clicked");
        });
        this.classList.add("clicked");
        nextBtn.style.display = "flex";
        restartBtn.style.display = "flex";
    });
});


nextBtn.addEventListener("click", function(){
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";
    answerButtons.forEach(button => button.classList.remove("clicked"));
    num++;
    loadQuestion(num);
});

restartBtn.addEventListener("click", function(){
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";
    answerButtons.forEach(button => button.classList.remove("clicked"));
    num = 0;
    loadQuestion(num);
});

let questionNum = document.getElementById("questionNum");
let question = document.getElementById("question");
function loadQuestion(num){
    questionNum.innerHTML = `Question ${num + 1}`;
    question.innerHTML = questions[num];
}
