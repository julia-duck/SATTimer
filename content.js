{
    let displayStr = "00:00";
    let secs = 0;
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
                <button id="easy" class="button">Easy</button>
                <button id="hard" class="button">Hard</button>
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
            secs = 60;
            setTimer();
        });

        document.getElementById("hard").addEventListener("click", () => {
            secs = 120;
            setTimer();
        });

        document.getElementById("close-button").addEventListener("click", CloseTimer);
        
        

    }


    function setTimer() {
        if (window.timerId) {
            clearInterval(window.timerId);
        }
        countdown(); //start instantly without waiting a second
        window.timerId = setInterval(() => {countdown();}, 1000); //counts down a second every second (1000 milisecs)
    }

    function countdown() {
        if (secs == -1) {
            clearInterval(window.timerId);
            return;
        }
        let mins = Math.floor(secs / 60);
        let rightSecs = secs % 60;
        const displayMins = mins.toString().padStart(2, '0');
        const displaySecs = rightSecs.toString().padStart(2, '0');
        displayStr = displayMins + ":" + displaySecs;
        secs--;
        document.getElementById("timer-display").innerText = displayStr;
    }

    function CloseTimer() {
        document.getElementById("timer-window").remove();
    }
}