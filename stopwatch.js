let startStopButton = document.getElementById("startStopButton");
let resetButton = document.getElementById("resetButton");
let lapButton = document.getElementById("lapButton");
let lapList = document.getElementById("lapList");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let lapCount = 1;

function updateTimeDisplay() {
    document.getElementById("minutes").textContent = formatTime(minutes);
    document.getElementById("seconds").textContent = formatTime(seconds);
    document.getElementById("milliseconds").textContent = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function startStopwatch() {
    isRunning = true;
    interval = setInterval(function() {
        milliseconds++;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        updateTimeDisplay();
    }, 10);
    startStopButton.textContent = "Pause";
}

function stopStopwatch() {
    isRunning = false;
    clearInterval(interval);
    startStopButton.textContent = "Start";
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateTimeDisplay();
    startStopButton.textContent = "Start";
}

function addLap() {
    if (isRunning) {
        let lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

startStopButton.addEventListener("click", function() {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", addLap);
