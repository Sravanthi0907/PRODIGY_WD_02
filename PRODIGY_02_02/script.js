document.addEventListener('DOMContentLoaded', function() {
    // Display current time
    function updateCurrentTime() {
        const currentTime = new Date();
        document.getElementById('current-time').innerText = currentTime.toLocaleTimeString();
    }
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    const minElem = document.querySelector('.min');
    const secElem = document.querySelector('.sec');
    const msecElem = document.querySelector('.msec');
    const resetBtn = document.querySelector('.resetbtn');
    const playBtn = document.querySelector('.playbtn');
    const lapBtn = document.querySelector('.lapbtn');
    const clearBtn = document.querySelector('.clearbtn');
    const lapsContainer = document.querySelector('.laps');

    let min = 0,
        sec = 0,
        msec = 0,
        intervalId,
        isRunning = false;

    function updateDisplay() {
        minElem.textContent = String(min).padStart(2, '0');
        secElem.textContent = String(sec).padStart(2, '0');
        msecElem.textContent = String(msec).padStart(2, '0');
    }

    function startStopwatch() {
        intervalId = setInterval(() => {
            msec++;
            if (msec === 100) {
                msec = 0;
                sec++;
            }
            if (sec === 60) {
                sec = 0;
                min++;
            }
            updateDisplay();
        }, 10);
    }

    function stopStopwatch() {
        clearInterval(intervalId);
    }

    playBtn.addEventListener('click', () => {
        if (isRunning) {
            stopStopwatch();
            playBtn.textContent = 'Play';
            resetBtn.classList.remove('visibility');
        } else {
            startStopwatch();
            playBtn.textContent = 'Pause';
            resetBtn.classList.add('visibility');
        }
        isRunning = !isRunning;
        lapBtn.classList.toggle('visibility');
    });

    resetBtn.addEventListener('click', () => {
        stopStopwatch();
        min = 0;
        sec = 0;
        msec = 0;
        updateDisplay();
        playBtn.textContent = 'Play';
        isRunning = false;
        lapBtn.classList.add('visibility');
        resetBtn.classList.add('visibility');
        lapsContainer.innerHTML = '';
        clearBtn.classList.add('visibility');
    });

    lapBtn.addEventListener('click', () => {
        const lapTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(msec).padStart(2, '0')}`;
        const lapElem = document.createElement('li');
        lapElem.textContent = lapTime;
        lapsContainer.appendChild(lapElem);
        clearBtn.classList.remove('visibility');
    });

    clearBtn.addEventListener('click', () => {
        lapsContainer.innerHTML = '';
        clearBtn.classList.add('visibility');
    });
});
