let startTime = 0;
let running = false;
let interval;
let lapCounter = 1;

const timeDisplay = document.querySelector(".time-display");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const lapButton = document.querySelector("#lap");
const lapList = document.querySelector(".lap-list");

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(14, 5);
}

function updateDisplay() {
    const currentTime = running ? Date.now() - startTime : startTime;
    timeDisplay.textContent = formatTime(currentTime);
}

function start() {
    if (!running) {
        startTime = Date.now() - startTime;
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

function reset() {
    startTime = 0;
    lapCounter = 1;
    updateDisplay();
    lapList.innerHTML = "";
    pause();
}

function lap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
reset();
