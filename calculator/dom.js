let buttons = document.querySelectorAll('.button');
let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let decimal = document.getElementById('decimal');
let cleanerAll = document.getElementById('ac');
let cleanerWindow = document.getElementById('c');
let display = document.getElementById('display');
let sign = document.getElementById('sign');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryError = false;
let memoryPendingOperation = '';

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', (e) => {
        if (!memoryError) {
            pressNumber(e.target.textContent);
        }
    });
};

for (let i = 0; i < operations.length; i++) {
    let operation = operations[i];
    operation.addEventListener('click', (e) => {
        if (!memoryError) {
            addOperation(e.target.textContent);
        }
    });
};

sign.addEventListener('click', () => {
    if (!memoryError) {
        changeSign();
    }
})

decimal.addEventListener('click', () => {
    if (!memoryError) {
        addDecimal();
    }
});

cleanerAll.addEventListener('click', () => {
    clearAll();
})

cleanerWindow.addEventListener('click', () => {
    if (!memoryError) {
        clearWindow();
    }
})

function pressNumber(number) {
    if (memoryNewNumber && display.value === '-0') {
        display.value = '-' + number;
        memoryNewNumber = false;
    }
    else if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    }
    else {
        if (display.value === '0') {
            display.value = number;
        }
        else if (display.value === '-0') {
            display.value = '-' + number;
        }
        else {
            display.value += number;
        }
    }
    
};

function addOperation(oper) {
    let localOperationMemory = display.value;
    if (display.value == 0 && memoryPendingOperation == '/') {
        display.value = 'Error!';
        memoryError = true;
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.classList.add('inactive_button');

        }
        cleanerAll.classList.remove('inactive_button'); 
    }
    else if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
        memoryPendingOperation = oper;
    }
    else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += parseFloat(localOperationMemory);
        }
        else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        }
        else if (memoryPendingOperation === '/') {  
            memoryCurrentNumber /= parseFloat(localOperationMemory);
        }
        else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        }
        else {
            memoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = memoryCurrentNumber;
        memoryPendingOperation = oper;
    };
};

function addDecimal() {
    let localDecimalMemory = display.value;
    if (memoryNewNumber && display.value === '-0') { 
        localDecimalMemory = '-0.';
        memoryNewNumber = false;
    } 
    else if (memoryNewNumber) { 
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    }    
    else {
        if (localDecimalMemory.indexOf('.') === -1)
        localDecimalMemory += '.';
    }
    display.value = localDecimalMemory;
};

function clearWindow() {
    display.value = '0';
    memoryNewNumber = true;
};

function clearAll() {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
    memoryError = false;
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.classList.remove('inactive_button');
    }
}

function changeSign() {
    if (memoryNewNumber) {
        display.value = '-0';
        memoryNewNumber = false;
    }
    else if (display.value.indexOf('-') === -1 ) {
        display.value = '-' + display.value;
    }
    else {
        display.value = display.value.substring(1, display.value.length);
    }
}