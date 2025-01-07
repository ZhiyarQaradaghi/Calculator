const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-buttons button');
const historyContainer = document.getElementById('history-container');
const historyBtn = document.getElementById('history-btn');

let currentExpression = '';
let history = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === 'C') {
            currentExpression = '';
            display.value = '';
        } else if (value === 'DEL') {
            currentExpression = currentExpression.slice(0, -1);
            display.value = currentExpression;
        } else if (value === '=') {
            try {
                currentExpression = currentExpression.replace(/x/g, '*');
                const result = eval(currentExpression);
                display.value = result;
                history.push(`${currentExpression.replace(/\*/g, 'x')} = ${result}`);
                updateHistory();
                currentExpression = result.toString();
            } catch (error) {
                display.value = 'Error';
                currentExpression = '';
            }
        } else if (value === 'x²') {
            currentExpression += '**2';
            display.value = currentExpression;
        } else if (value === '√') {
            currentExpression = Math.sqrt(eval(currentExpression)).toString();
            display.value = currentExpression;
        } else if (value === '%') {
            currentExpression += '%';
            display.value = currentExpression;
        } else if (value === 'History') {
            toggleHistory();
        } else {
            currentExpression += value;
            display.value = currentExpression;
        }
    });
});

function updateHistory() {
    historyContainer.innerHTML = '';
    history.forEach(entry => {
        const historyEntry = document.createElement('div');
        historyEntry.textContent = entry;
        historyEntry.classList.add('history-entry');
        historyContainer.appendChild(historyEntry);
    });
}

function toggleHistory() {
    if (historyContainer.style.display === 'none' || !historyContainer.style.display) {
        historyContainer.style.display = 'block';
    } else {
        historyContainer.style.display = 'none';
    }
}
