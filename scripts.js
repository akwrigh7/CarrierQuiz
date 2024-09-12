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

    
    let num = 0;
    let header = document.getElementById("header");
    let questionsWrapper = document.getElementById("questionsWrapper");
    let plansWrapper = document.getElementById("plansWrapper");
    let introText = document.getElementsByClassName("introText");

    // Hiding the header when the start button is pressed.
    document.getElementById("start").addEventListener("click", function () {
        for(let intro of introText){
            intro.style.display = "none";
        };
        header.style.display = "none";
        questionsWrapper.style.display = "flex";
        loadQuestion(num);
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
            loadProgBar(num + 1);
        });
    });

    // Next button
    let userAnswers = [];
    let numLines;
    nextBtn.addEventListener("click", function(){
        nextBtn.style.display = "none";
        restartBtn.style.display = "none";
        answerButtons.forEach(button => {
            if(button.classList.contains("clicked")){
                let buttonId = parseInt(button.id);
                userAnswers.push(buttonId);
                console.log(userAnswers);
                if (q.innerHTML == "How many lines do you need?"){
                    numLines = parseInt(button.innerHTML);
                    console.log(numLines);
                }
            };
            button.classList.remove("clicked");
        });
        num++;
        loadQuestion(num);
    });


    // Restart button
    restartBtn.addEventListener("click", function(){
        nextBtn.style.display = "none";
        restartBtn.style.display = "none";
        answerButtons.forEach(button => button.classList.remove("clicked"));
        num = 0;
        userAnswers = [];
        loadQuestion(num);
        loadProgBar(num);
    });

    let a1 = document.getElementById("1");
    let a2 = document.getElementById("2");
    let a3 = document.getElementById("3");
    let a4 = document.getElementById("4");
    let questionNum = document.getElementById("questionNum");
    let q = document.getElementById("question");
    function loadQuestion(num){
        if (questionsData.length < num + 1){
            questionsWrapper.style.display = "none";
            plansWrapper.style.display = "flex";
            planHead.style.display = "block";
            loadPlans();
        } else {
            questionNum.innerHTML = `Question ${num + 1}`;
            q.innerHTML = questionsData[num].question;
            a1.innerHTML = questionsData[num].a1;
            a2.innerHTML = questionsData[num].a2;
            a3.innerHTML = questionsData[num].a3;
            a4.innerHTML = questionsData[num].a4;
        }
    }

    let progressBar = document.getElementById("progressBar");
    function loadProgBar(num){
        let widthIncrements = 100 / questionsData.length;
        progressBar.style.width = `${num * widthIncrements}%`;
    }

    let recommendedPlans = document.getElementById("recommendedPlans");
    let loadBtn = document.getElementById("loadBtn");
    loadBtn.addEventListener("click", function(){
        loadPlans();
    });

    

    function sortPlans(){
        let allPlans = plansData;

        return plansData;
    }


    let sortedPlans = sortPlans();
    console.log(sortedPlans);
    let plansIndex = 0;
    let addMore = 4;
    function loadPlans(){
        let displayedPlans = sortedPlans.slice(plansIndex, addMore);
        console.log(displayedPlans);
        for(let plan of displayedPlans){
            console.log(plan.pricePer);
            let currentPlan = `<div class="plan ${plan.company}Border">
            <h3 class="cardHead ${plan.company}">${plan.plan}</h3>
            <div class="subHead">
                <p class="lines"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>${numLines} Line</p>
                <p class="network"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-access-point" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12l0 .01" />
                    <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
                    <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
                    <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
                    <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
                </svg>${plan.network}</p>
            </div>
            <div class="priceNtax">
                <p class="price"><span class="largePrice">$${parseInt(plan.pricePer) * numLines}</span>/mo.</p>
                <p class="tax">${plan.taxes}</p>
            </div>
            <p class="highSpeed">${plan.highSpeed}</p>
            <p class="afterHighSpeed">${plan.afterHighSpeed}</p>
            <p class="priority"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-speedtest" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5.636 19.364a9 9 0 1 1 12.728 0" />
                <path d="M16 9l-4 4" />
            </svg>${plan.priorityData}</p>
            <p class="hotspot"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>${plan.hotspot}</p>
            <p class="streaming"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-zoom" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M17.011 9.385v5.128l3.989 3.487v-12z" />
                <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z" />
            </svg>${plan.streamQlty}</p>
            <p class="texts"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
            </svg>${plan.texts}</p>
            <p class="calls"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>${plan.calls}</p>
            <p class="intTexts"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 9h8" />
                <path d="M8 13h6" />
                <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
            </svg>${plan.intTexts}</p>
            <p class="intCalls"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-call" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 7a2 2 0 0 1 2 2" />
                <path d="M15 3a6 6 0 0 1 6 6" />
            </svg>${plan.intCalls}</p>
            <p class="mexData"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
            </svg>${plan.mexData}</p>
            <p class="intData"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M3.6 9h16.8" />
                <path d="M3.6 15h16.8" />
                <path d="M11.5 3a17 17 0 0 0 0 18" />
                <path d="M12.5 3a17 17 0 0 1 0 18" />
            </svg>${plan.intData}</p>
            <button class="linkBtn"><a class="planLink" href="${plan.linkToSite}" target="_blank">View at ${plan.fullCompanyName}</a><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
              </svg></button>
            </div>`;
            recommendedPlans.innerHTML += currentPlan;
        }
        plansIndex += 4;
        if(plansIndex > sortedPlans.length){
            loadBtn.style.display = "none";
        }
        addMore += 4;
        console.log(plansIndex);
    }
  }
  
  fetchQuestions();

