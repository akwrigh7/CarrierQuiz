// prettier-ignore
const supabaseUrl = 'https://sirigarvmxiinxyermoj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcmlnYXJ2bXhpaW54eWVybW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMzg0OTksImV4cCI6MjA0MDkxNDQ5OX0.m14T-4NNpWOgT886U5diabvtpmTRJcEnjPbzIZ2utVc'
const database = supabase.createClient(supabaseUrl, supabaseKey)

async function fetchQuestions() {
    // PUT LOADING ANIMATION HERE

    let { data, error } = await database
      .from("questions")
      .select("*");

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    // PUT COMPLETED LOADING HERE
    console.log(JSON.stringify(data, null, 2));
  }
  
  fetchQuestions();

// let questions = [
//     {
//         question: "How many lines do you need?",
//         answer: ["1", "2", "3", "4 or more"]
//     },
//     {
//         question: "How much data do you use typically?",
//         answer: ["Less than 5GB", "10GB", "25GB", "More than 50GB"]
//     },
//     {
//         question: "How much hotspot do you need?",
//         answer: ["None", "5GB", "10GB", "15GB or more"]
//     }
// ];

// let num = 0;
// let header = document.getElementById("header");
// let questionsWrapper = document.getElementById("questionsWrapper");
// let introText = document.getElementsByClassName("introText");
// document.getElementById("start").addEventListener("click", function () {
//     for(let intro of introText){
//         intro.style.display = "none";
//     };
//     header.style.display = "none";
//     questionsWrapper.style.display = "flex";
//     loadQuestion(num);
// });

// let restartBtn = document.getElementById("restart");
// let nextBtn = document.getElementById("next");
// let answerButtons = document.querySelectorAll("#answers button");
// answerButtons.forEach(button => {
//     button.addEventListener("click", function(){
//         answerButtons.forEach(btn => {
//             btn.classList.remove("clicked");
//         });
//         this.classList.add("clicked");
//         nextBtn.style.display = "flex";
//         restartBtn.style.display = "flex";
//         loadProgBar(num + 1);
//     });
// });


// nextBtn.addEventListener("click", function(){
//     nextBtn.style.display = "none";
//     restartBtn.style.display = "none";
//     answerButtons.forEach(button => button.classList.remove("clicked"));
//     num++;
//     loadQuestion(num);
// });

// restartBtn.addEventListener("click", function(){
//     nextBtn.style.display = "none";
//     restartBtn.style.display = "none";
//     answerButtons.forEach(button => button.classList.remove("clicked"));
//     num = 0;
//     loadQuestion(num);
//     loadProgBar(num);
// });

// let a1 = document.getElementById("a1");
// let a2 = document.getElementById("a2");
// let a3 = document.getElementById("a3");
// let a4 = document.getElementById("a4");
// let questionNum = document.getElementById("questionNum");
// let question = document.getElementById("question");
// function loadQuestion(num){
//     if (questions.length < num + 1){
//         questionsWrapper.style.display = "none";
//     } else {
//         questionNum.innerHTML = `Question ${num + 1}`;
//         question.innerHTML = questions[num].question;
//         a1.innerHTML = questions[num].answer[0];
//         a2.innerHTML = questions[num].answer[1];
//         a3.innerHTML = questions[num].answer[2];
//         a4.innerHTML = questions[num].answer[3];
//     }
// }

// let progressBar = document.getElementById("progressBar");
// function loadProgBar(num){
//     let widthIncrements = 100 / questions.length;
//     progressBar.style.width = `${num * widthIncrements}%`;
// }