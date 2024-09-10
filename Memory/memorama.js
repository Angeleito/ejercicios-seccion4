const totalLetters = 12;
let letters = [];
let selectedLetters = [];
let valueUsed = [];
let currentMove = 0;
let currentAttemps = 0;
const timeLimit = 60000; 
let timeRemaining = timeLimit / 1000;

let letterTemplate = '<div class="letter"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        e.target.classList.add('active');
        if (!selectedLetters[0] || selectedLetters[0] !== e.target && e.target.classList.contains('active')) {
            selectedLetters.push(e.target);

            if (++currentMove == 2) {
                currentAttemps++;
                document.querySelector('#stats').innerHTML = currentAttemps + ' ' + 'intentos';

                if (selectedLetters[0].querySelector('.face').innerHTML == selectedLetters[1].querySelector('.face').innerHTML) {
                    selectedLetters = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectedLetters[0].classList.remove('active');
                        selectedLetters[1].classList.remove('active');
                        selectedLetters = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd;
    do {
        rnd = Math.floor(Math.random() * totalLetters * 0.5);
    } while (valueUsed.filter(value => value === rnd).length >= 2);
    valueUsed.push(rnd);
}

function endGame() {
    alert('¡El tiempo se ha agotado! Fin del juego.');
    letters.forEach(letter => {
        letter.querySelector('.letter').removeEventListener('click', activate);
    });
}

function updateTimer() {
    timeRemaining--;
    document.getElementById('timer').innerText = `Tiempo restante: ${timeRemaining}s`;
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

for (let i = 0; i < totalLetters; i++) {
    let div = document.createElement('div');
    div.innerHTML = letterTemplate;
    letters.push(div);
    document.querySelector('#game').append(letters[i]);
    randomValue();
    letters[i].querySelector('.face').innerHTML = valueUsed[i];
    letters[i].querySelector('.letter').addEventListener('click', activate);
}


const timerInterval = setInterval(updateTimer, 1000);
setTimeout(endGame, timeLimit);
                
            