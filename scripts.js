// prettier-ignore
"use strict";
const supabaseUrl = 'https://sirigarvmxiinxyermoj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcmlnYXJ2bXhpaW54eWVybW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMzg0OTksImV4cCI6MjA0MDkxNDQ5OX0.m14T-4NNpWOgT886U5diabvtpmTRJcEnjPbzIZ2utVc'
const database = supabase.createClient(supabaseUrl, supabaseKey)

async function fetchQuestions() {
    // Gather data from Supabase for questions table
    let { data: questionsData, error: questionsError } = await database
      .from("questions")
      .select("*")
      .order("id", { ascending: true });

    // Handle retrieval error
    if (questionsError) {
      console.error('Error fetching question data:', questionsError);
      return;
    }

    // Gather data from Supabase for plans table
    let { data: plansData, error: plansError } = await database
      .from("plans")
      .select("*");

    // Handle retrieval error
    if (plansError) {
      console.error('Error fetching question data:', plansError);
      return;
    }

    let header = document.getElementById("header");
    let questionsWrapper = document.getElementById("questionsWrapper");
    let plansWrapper = document.getElementById("plansWrapper");
    let introText = document.getElementsByClassName("introText");
    let footer = document.getElementById("footer");

    // Hiding the header when the start button is pressed
    document.getElementById("start").addEventListener("click", function () {
        for(let intro of introText){
            intro.style.display = "none";
        };
        header.style.display = "none";
        // Display questions section and load the first question
        questionsWrapper.style.display = "flex";
        loadQuestion(num);
    });

    let num = 0;
    let answerButtons = document.querySelectorAll("#answers button");

    // Handle button presses to allow only one button to be pressed at a time
    answerButtons.forEach(button => {
        button.addEventListener("click", function(){
            // When a button is pressed, removed the clicked state from all other buttons
            answerButtons.forEach(btn => {
                btn.classList.remove("clicked");
            });
            // Add the class back to the button currently being pressed
            this.classList.add("clicked");
            // Display both restart and next buttons when user has selected an answer
            nextBtn.style.display = "flex";
            restartBtn.style.display = "flex";
            // Update the progress bar after user chooses an answer
            loadProgBar(num + 1);
        });
    });

    let userAnswers = [];
    let numLines;
    let nextBtn = document.getElementById("next");
    // Next button
    nextBtn.addEventListener("click", function(){
        // When the next button is pressed, hide both the next and restart buttons
        nextBtn.style.display = "none";
        restartBtn.style.display = "none";
        // Loop through each answer button
        answerButtons.forEach(button => {
            // If the button is clicked, capture the ID of that button and push it into the userAnswers array
            if(button.classList.contains("clicked")){
                let buttonId = parseInt(button.id);
                userAnswers.push(buttonId);
                console.log(userAnswers);
                // If the current question is about the number of lines, assign the user's choice to numLines
                if (q.innerHTML == "How many lines do you need?"){
                    numLines = parseInt(button.innerHTML);
                    console.log(numLines);
                }
            };
            // Remove the clicked state from the button
            button.classList.remove("clicked");
        });
        // Increment num and load the next question
        num++;
        loadQuestion(num);
    });

    let restartBtn = document.getElementById("restart");

    // Restart button
    restartBtn.addEventListener("click", function(){
        // Hide restart and next buttons when pressed
        nextBtn.style.display = "none";
        restartBtn.style.display = "none";
        // Remove the clicked state from every button
        answerButtons.forEach(button => button.classList.remove("clicked"));
        // Reset key variables
        num = 0;
        userAnswers = [];
        // Reset questions and progress bar status
        loadQuestion(num);
        loadProgBar(num);
    });

    let a1 = document.getElementById("1");
    let a2 = document.getElementById("2");
    let a3 = document.getElementById("3");
    let a4 = document.getElementById("4");
    let questionNum = document.getElementById("questionNum");
    let q = document.getElementById("question");
    let infoBtn = document.querySelector("#questionSVG svg");
    let infoModal = document.getElementById("infoModal");
    let modalP = document.getElementById("modalP");
    let modalHead = document.getElementById("modalHead");
    let modalClose = document.querySelector("#modalWrapper svg");
    infoBtn.addEventListener("click", () => {
        infoModal.style.display = "flex";
    })
    modalClose.addEventListener("click", () => {
        infoModal.style.display = "none";
    })
    // Load question
    function loadQuestion(num){
        console.log("this is num" + num);
        // If no more questions remain:
        if (questionsData.length < num + 1){
            // Hide questions section and unhide plans section
            questionsWrapper.style.display = "none";
            plansWrapper.style.display = "flex";
            planHead.style.display = "block";
            footer.style.display = "block";
            // Sort all of the plans
            sortPlans(plansData);
            // Set local storage to users answers
            localStorage.setItem("previousAnswers", JSON.stringify(userAnswers));
            console.log(localStorage.getItem("previousAnswers"));
        // If there are still unanswered questions:
        } else {
            // Update the question and its options to the page
            questionNum.innerHTML = `Question ${num + 1}`;
            q.innerHTML = questionsData[num].question;
            a1.innerHTML = questionsData[num].a1;
            a2.innerHTML = questionsData[num].a2;
            a3.innerHTML = questionsData[num].a3;
            a4.innerHTML = questionsData[num].a4;
            modalHead.innerHTML = questionsData[num].title;
            modalP.innerHTML = questionsData[num].info;
        }
    }

    let progressBar = document.getElementById("progressBar");
    // Progress bar
    function loadProgBar(num){
        // Set the width of the progress bar using the question the user is currently on
        let widthIncrements = 100 / questionsData.length;
        progressBar.style.width = `${num * widthIncrements}%`;
    }

    let recommendedPlans = document.getElementById("recommendedPlans");
    let filterBtns = document.querySelectorAll(".filter");
    // Loop over filter buttons and listen for click
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function(){
            // Remove the clicked state from each filter button
            filterBtns.forEach(button => {
                button.classList.remove("filterClick");
            });
            // Add the clicked state to the button that has just been pressed
            this.classList.add("filterClick");
            // Filter the plans based upon the button clicked
            filterPlans(this.id);
        });
    });

    // Filter
    function filterPlans(filter){
        currentPage = 1;
        // Display all sorted plans
        if(filter == "allFilter"){
            sortPlans(plansData);
        }
        // Display only plans that include Verizon for coverage
        if(filter == "verizonFilter"){
            let verizonPlans = [];
            // If the current plan includes the selected coverage, add it to the array
            for(let plan of plansData){
                if(plan.network.includes("Verizon") || plan.network.includes("Any")){
                    verizonPlans.push(plan);
                }
            }
            // Sort the new coverage array
            sortPlans(verizonPlans);
        }
        // Display only plans that include AT&T for coverage
        if(filter == "attFilter"){
            let attPlans = [];
            // If the current plan includes the selected coverage, add it to the array
            for(let plan of plansData){
                if(plan.network.includes("AT&T") || plan.network.includes("Any")){
                    attPlans.push(plan);
                }
            }
            // Sort the new coverage array
            sortPlans(attPlans);
        }
        // Display only plans that include T-Mobile for coverage
        if(filter == "tmobileFilter"){
            let tmobilePlans = [];
            // If the current plan includes the selected coverage, add it to the array
            for(let plan of plansData){
                if(plan.network.includes("T-Mobile") || plan.network.includes("Any")){
                    tmobilePlans.push(plan);
                }
            }
            // Sort the new coverage array
            sortPlans(tmobilePlans);
        }
        console.log(sorted);
    }
    let sorted;
    function sortPlans(plansToSort){
        // Loop over each plan
        for(let plan of plansToSort){
            let comparison = [];
            console.log(plan);
            // For each plan, subtract the users answers from the score of the current plan and add the difference to a new array
            for(let i = 0; i < plan.score.length; i++){
                // Use the absolute value of the comparison
                let subtraction = Math.abs(userAnswers[i + 1] - parseInt(plan.score[i]));
                // Add the comparison to the array
                comparison.push(subtraction);
            }
            // Add together all of the subtractions for each plan
            // The lower the total, the closer the match is to the user's answers
            let total = 0;
            for(let i = 0; i < comparison.length; i++){
                total += comparison[i];
                plan.total = total;
            }
            console.log(plan.total);
        }
        // Sort plans in descending order so that the plan with the lowest total displays first
        sorted = plansToSort.sort((a, b) => a.total - b.total);
        // Display the sorted plans to the page
        loadPlans(sorted);
    }

    let currentPage = 1;

    function loadPlans(sortedPlans){
        const countBy = 4;
        const totalPages = Math.ceil(sortedPlans.length / countBy);
        // Clear the previously displayed plans
        recommendedPlans.innerHTML = "";
        
        const startIndex = (currentPage - 1) * countBy;
        const endIndex = Math.min(startIndex + countBy, sortedPlans.length);
        
        for(let i = startIndex; i < endIndex; i++){
            const plan = sortedPlans[i];

            recommendedPlans.innerHTML += `<div class="plan ${plan.company}Border">
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
        }
        // Display each plan to the page
        // for(let plan of sortedPlans){
        //     let currentPlan = `<div class="plan ${plan.company}Border">
        //     <h3 class="cardHead ${plan.company}">${plan.plan}</h3>
        //     <div class="subHead">
        //         <p class="lines"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //             <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //             <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        //             <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        //             <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        //             <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        //         </svg>${numLines} Line</p>
        //         <p class="network"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-access-point" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //             <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //             <path d="M12 12l0 .01" />
        //             <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
        //             <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
        //             <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
        //             <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
        //         </svg>${plan.network}</p>
        //     </div>
        //     <div class="priceNtax">
        //         <p class="price"><span class="largePrice">$${parseInt(plan.pricePer) * numLines}</span>/mo.</p>
        //         <p class="tax">${plan.taxes}</p>
        //     </div>
        //     <p class="highSpeed">${plan.highSpeed}</p>
        //     <p class="afterHighSpeed">${plan.afterHighSpeed}</p>
        //     <p class="priority"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-speedtest" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M5.636 19.364a9 9 0 1 1 12.728 0" />
        //         <path d="M16 9l-4 4" />
        //     </svg>${plan.priorityData}</p>
        //     <p class="hotspot"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="size-6">
        //         <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        //     </svg>${plan.hotspot}</p>
        //     <p class="streaming"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-zoom" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M17.011 9.385v5.128l3.989 3.487v-12z" />
        //         <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z" />
        //     </svg>${plan.streamQlty}</p>
        //     <p class="texts"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
        //     </svg>${plan.texts}</p>
        //     <p class="calls"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        //     </svg>${plan.calls}</p>
        //     <p class="intTexts"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M8 9h8" />
        //         <path d="M8 13h6" />
        //         <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
        //     </svg>${plan.intTexts}</p>
        //     <p class="intCalls"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-call" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        //         <path d="M15 7a2 2 0 0 1 2 2" />
        //         <path d="M15 3a6 6 0 0 1 6 6" />
        //     </svg>${plan.intCalls}</p>
        //     <p class="mexData"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
        //     </svg>${plan.mexData}</p>
        //     <p class="intData"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        //         <path d="M3.6 9h16.8" />
        //         <path d="M3.6 15h16.8" />
        //         <path d="M11.5 3a17 17 0 0 0 0 18" />
        //         <path d="M12.5 3a17 17 0 0 1 0 18" />
        //     </svg>${plan.intData}</p>
        //     <button class="linkBtn"><a class="planLink" href="${plan.linkToSite}" target="_blank">View at ${plan.fullCompanyName}</a><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        //         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        //         <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
        //       </svg></button>
        //     </div>`;
        //     recommendedPlans.innerHTML += currentPlan;
        // }
        console.log(totalPages);
        loadPageButtons(totalPages);
    }

    function loadPageButtons(totalPages){
        // Get button container and set it empty
        let pageButtons = document.getElementById("pageButtons");
        pageButtons.innerHTML = "";
        // For each page, create a button
        for(let i = 1; i <= totalPages; i++){
            const pageBtn = document.createElement("button");
            pageBtn.classList.add("pageBtns");
            // If the current button's number is the same as the current page number, set the button's status to "clicked"
            if(i === currentPage){
                pageBtn.classList.add("pageBtnClick");
            }
            // Set the text of each button
            pageBtn.textContent = `${i}`;
            // When a page button is pressed, set the current page to the number of the button being pressed
            // Reload the plans to display the correct 4
            pageBtn.addEventListener("click", () => {
                currentPage = i;
                loadPlans(sorted);
            });
            // Add the button to the page
            pageButtons.appendChild(pageBtn);
        }
    }

    // Start new quiz
    document.getElementById("newQuiz").addEventListener("click", () => {
        // Reset all default values and hide the plan and question sections
        header.style.display = "flex";
        for(let intro of introText){
            intro.style.display = "flex";
        };
        plansWrapper.style.display = "none";
        planHead.style.display = "none";
        footer.style.display = "none";
        userAnswers = [];
        recommendedPlans.innerHTML = "";
        num = 0;
        progressBar.style.width = "0";
        currentPage = 1;
        // Clear any values in local storage.
        localStorage.clear();
    })

    $("#resume").on("click", resumeQuiz);

    function resumeQuiz(){
        $("#resume").addClass("hidden");
        for(let intro of introText){
            intro.style.display = "none";
        };
        header.style.display = "none";
        // Display questions section and load the first question
        questionsWrapper.style.display = "flex";
        questionsWrapper.style.display = "none";
        plansWrapper.style.display = "flex";
        planHead.style.display = "block";
        footer.style.display = "block";
        userAnswers = JSON.parse(localStorage.getItem("previousAnswers"));
        numLines = userAnswers[0];
        sortPlans(plansData);
    }




    // Update copyright date
    document.getElementById("year").textContent = new Date().getFullYear();
}

const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M12 5l0 14"></path> <path d="M5 12l14 0"></path> </svg>`;
const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M5 12l14 0"></path> </svg>`;
// On page load, check if the user has ever taken the test before
$(function(){
    // If the user has taken the test, give the option to resume.
    if(localStorage.getItem("previousAnswers")){
        $("#resume").removeClass("hidden");
    }

    $("#accordion").accordion({
        active: false,
        collapsible: true,
        icons: false,
        heightStyle: "content",
        create: function() {
            $(".accordionIcon").html(plusIcon);
        },
        activate: function(event, button) {
            $(".accordionIcon").html(plusIcon);
    
            button.newHeader.find(".accordionIcon").html(minusIcon);
        }
    });

    

    
})

fetchQuestions();
