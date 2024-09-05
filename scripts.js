// prettier-ignore
const supabaseUrl = 'https://sirigarvmxiinxyermoj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcmlnYXJ2bXhpaW54eWVybW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMzg0OTksImV4cCI6MjA0MDkxNDQ5OX0.m14T-4NNpWOgT886U5diabvtpmTRJcEnjPbzIZ2utVc'
const database = supabase.createClient(supabaseUrl, supabaseKey)

async function fetchQuestions() {
    // PUT LOADING ANIMATION HERE

    let { data: questionsData, error: questionsError } = await database
      .from("questions")
      .select("*");

    if (questionsError) {
      console.error('Error fetching question data:', questionsError);
      return;
    }

    let { data: plansData, error: plansError } = await database
      .from("plans")
      .select("*");

    if (plansError) {
      console.error('Error fetching question data:', plansError);
      return;
    }
    

    // PUT COMPLETED LOADING HERE
    console.log(JSON.stringify(questionsData, null, 2));
    console.log(JSON.stringify(plansData, null, 2));

    
    // let num = 0;
    // let header = document.getElementById("header");
    // let questionsWrapper = document.getElementById("questionsWrapper");
    // let plansWrapper = document.getElementById("plansWrapper");
    // let introText = document.getElementsByClassName("introText");

    // // Hiding the header when the start button is pressed.
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

    // // Next button
    // let userAnswers = [];
    // nextBtn.addEventListener("click", function(){
    //     nextBtn.style.display = "none";
    //     restartBtn.style.display = "none";
    //     answerButtons.forEach(button => {
    //         if(button.classList.contains("clicked")){
    //             let buttonId = parseInt(button.id);
    //             userAnswers.push(buttonId);
    //             console.log(userAnswers);
    //         };
    //         button.classList.remove("clicked");
    //     });
    //     num++;
    //     loadQuestion(num);
    // });


    // // Restart button
    // restartBtn.addEventListener("click", function(){
    //     nextBtn.style.display = "none";
    //     restartBtn.style.display = "none";
    //     answerButtons.forEach(button => button.classList.remove("clicked"));
    //     num = 0;
    //     userAnswers = [];
    //     loadQuestion(num);
    //     loadProgBar(num);
    // });

    // let a1 = document.getElementById("1");
    // let a2 = document.getElementById("2");
    // let a3 = document.getElementById("3");
    // let a4 = document.getElementById("4");
    // let questionNum = document.getElementById("questionNum");
    // let q = document.getElementById("question");
    // function loadQuestion(num){
    //     if (questionsData.length < num + 1){
    //         questionsWrapper.style.display = "none";
    //         plansWrapper.style.display = "flex";
    //         planHead.style.display = "block";
    //         loadPlans();
    //     } else {
    //         questionNum.innerHTML = `Question ${num + 1}`;
    //         q.innerHTML = questionsData[num].question;
    //         a1.innerHTML = questionsData[num].a1;
    //         a2.innerHTML = questionsData[num].a2;
    //         a3.innerHTML = questionsData[num].a3;
    //         a4.innerHTML = questionsData[num].a4;
    //     }
    // }

    // let progressBar = document.getElementById("progressBar");
    // function loadProgBar(num){
    //     let widthIncrements = 100 / questionsData.length;
    //     progressBar.style.width = `${num * widthIncrements}%`;
    // }

    let recommendedPlans = document.getElementById("recommendedPlans");
    let loadBtn = document.getElementById("loadBtn");
    loadBtn.addEventListener("click", function(){
        recommendedPlans.innerHTML += "<div class='plan'></div>";
    });

    function sortPlans(){

    }



    function loadPlans(){
        
    }
  }
  
  fetchQuestions();

