let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimal = document.getElementById('decimal'),
    cleaner_all = document.getElementById('ac'),
    cleaner_window = document.getElementById('c'),
    display = document.getElementById('display'),
    sign = document.getElementById('sign'),
    memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '';

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', (e) => {
        pressNummber(e.target.textContent);
    });
};

for (let i = 0; i < operations.length; i++) {
    let operation = operations[i];
    operation.addEventListener('click', (e) => {
        addOperation(e.target.textContent);
    });
};

sign.addEventListener('click', () => {
    changeSign();
})

decimal.addEventListener('click', () => {
    addDecimal();
});

cleaner_all.addEventListener('click', () => {
    clearAll();
})

cleaner_window.addEventListener('click', () => {
    clearWindow();
})

function pressNummber(number) {
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
    if (memoryNewNumber && memoryPendingOperation !== '=') {
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
    var localDecimalMemory = display.value;
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
}

function changeSign() {
    if (memoryNewNumber) {
        display.value = '-0';
    }
    else if (display.value.indexOf('-') === -1 ) {
        display.value = '-' + display.value;
    }
    else {
        display.value = display.value.substring(1, display.value.length);
    }
}
