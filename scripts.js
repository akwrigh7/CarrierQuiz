// prettier-ignore

let header = document.getElementById("header");
let questionsWrapper = document.getElementById("questionsWrapper");
let startBtn = document.getElementById("start").addEventListener("click", function () {
    header.style.display = "none";
    questionsWrapper.style.display = "flex";
});

let nextBtn = document.getElementById("next");
let answerButtons = document.querySelectorAll("#answers button");
answerButtons.forEach(button => {
    button.addEventListener("click", function(){
        answerButtons.forEach(btn => {
            btn.classList.remove("clicked");
        });
        this.classList.add("clicked");
        nextBtn.style.display = "flex";
    });
});