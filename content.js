{
    let displayStr = "00:00";
    let secs = 0;
    let time = 0;
    //let questions = 0;
    //let totalTime = 0;
    let type = ""; //easy or hard
    let easyTime = 0;
    let medTime = 0;
    let hardTime = 0;
    let easyQuestions = 0;
    let medQuestions = 0;
    let hardQuestions = 0;
    if (window.timerId) {
        clearInterval(window.timerId);
    }
    if (!document.getElementById("timer-window")) {
        //create the element to inject
        const timerWindow = document.createElement('div');
        timerWindow.id = "timer-window";

        //backticks support multi-line
        timerWindow.innerHTML = `
            <button id="close-button">&#x2715</button>
            <div id="timer-display">${displayStr}</div>
            <div id="buttons">
                <button id="easy" class="button1">Easy</button>
                <button id="medium" class="button1">Medium</button>
                <button id="hard" class="button1">Hard</button>
                <button id="done" class="button2">Done</button>
                <button id="summary" class="button2">Summary</button>
            </div>
        `;

        document.body.appendChild(timerWindow);

        timerWindow.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        timerWindow.addEventListener("mousedown", (e) => {
            e.stopPropagation();
        });

        document.getElementById("easy").addEventListener("click", () => {
            time = 0;
            type = "easy";
            secs = 60;
            setTimer();
        });

        document.getElementById("medium").addEventListener("click", () => {
            time = 0;
            type = "medium";
            secs = 90;
            setTimer();
        });

        document.getElementById("hard").addEventListener("click", () => {
            time = 0;
            type = "hard";
            secs = 120;
            setTimer();
        });

        document.getElementById("done").addEventListener("click", () => {
            if (type == "easy") {
                easyQuestions++;
                easyTime += time;
            }
            else if (type == "hard") {
                hardQuestions++;
                hardTime += time;
            }
            else {
                medQuestions++;
                medTime += time;
            }
            clearInterval(window.timerId);
            resetTimer();
        });

        document.getElementById("summary").addEventListener("click", () => {
            let totalTime = easyTime + hardTime + medTime;
            let mins = Math.floor(totalTime / 60);
            let rightSecs = totalTime % 60;

            alert((easyQuestions + hardQuestions + medQuestions) + " questions in " + mins + " minutes and " + rightSecs + " seconds");

            totalTime = Math.round(easyTime/easyQuestions);
            let eM = Math.floor(totalTime / 60);
            let eS = totalTime % 60;
            totalTime = Math.round(medTime/medQuestions);
            let mM = Math.floor(totalTime / 60);
            let mS = totalTime % 60;
            totalTime = Math.round(hardTime/hardQuestions);
            let hM = Math.floor(totalTime / 60);
            let hS = totalTime % 60;

            alert("Easy average time: " + eM + " minutes and " + eS + " seconds. Medium average time: " + mM + " minutes and " + mS + " seconds. Hard average time: " + hM + " minutes and " + hS + " seconds.");
        });

        document.getElementById("close-button").addEventListener("click", CloseTimer);
        
        

    }


    function setTimer() {
        document.getElementById("timer-display").dataset.state = "countdown";
        if (window.timerId) {
            clearInterval(window.timerId);
        }
        countdown(); //start instantly without waiting a second
        window.timerId = setInterval(() => {countdown();}, 1000); //counts down a second every second (1000 milisecs)
    }

    function countdown() {
        if (secs == -1) {
            clearInterval(window.timerId);
            startStopwatch();
            return;
        }
        time += 1;
        let mins = Math.floor(secs / 60);
        let rightSecs = secs % 60;
        const displayMins = mins.toString().padStart(2, '0');
        const displaySecs = rightSecs.toString().padStart(2, '0');
        displayStr = displayMins + ":" + displaySecs;
        secs--;
        document.getElementById("timer-display").innerText = displayStr;
    }

    function startStopwatch() {
        secs = 0;
        document.getElementById("timer-display").dataset.state = "countup";
        countup();
        window.timerId = setInterval(() => {countup();}, 1000);
    }

    function countup() {
        time += 1;
        let mins = Math.floor(secs / 60);
        let rightSecs = secs % 60;
        const displayMins = mins.toString().padStart(2, '0');
        const displaySecs = rightSecs.toString().padStart(2, '0');
        displayStr = "-" + displayMins + ":" + displaySecs;
        secs++;
        document.getElementById("timer-display").innerText = displayStr;
    }

    function resetTimer() {
        displayStr = "00:00";
        document.getElementById("timer-display").dataset.state = "countdown";
        document.getElementById("timer-display").innerText = displayStr;
    }

    function CloseTimer() {
        document.getElementById("timer-window").remove();
    }
}