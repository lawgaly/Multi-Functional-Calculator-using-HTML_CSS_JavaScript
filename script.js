document.addEventListener("DOMContentLoaded", () => {
    showGrid(1); 
    showSubTitle('This is Standard Calculator');
});
const div_navigationButtons = document.querySelector(".navigationButtons"); 
const gridSubText = document.createElement("h2");
gridSubText.id="subTitle";
div_navigationButtons.parentNode.insertBefore(gridSubText, div_navigationButtons.nextSibling);

function showSubTitle(message) {
    gridSubText.textContent = message; 
    gridSubText.style.display = "block"; 
}
function showGrid(gridNumber) {
    // Hide all grids
    const grids = document.querySelectorAll(".calculatorContainer");
    grids.forEach(grid => {
        grid.style.display = "none";
    });

    // Show the selected grid
    const selectedGrid = document.getElementById(`grid${gridNumber}`);
    if (selectedGrid) {
        selectedGrid.style.display = "block";
        if (gridNumber === 1) {
            showSubTitle('Standard Calculator');
            setupCalculator(selectedGrid); 
        } else if (gridNumber === 2) {
            showSubTitle('Scientific Calculator');
            setupScientificCalculator(selectedGrid); 
        } else if (gridNumber === 3) {
            showSubTitle('Programmer Calculator');
            setupProgrammerCalculator(selectedGrid);
        } else if (gridNumber === 4) {
            showSubTitle('Currency Calculator a live exchange rates');
            sutupExchangeRateCalculator(selectedGrid)
        } else if (gridNumber === 5) {
            showSubTitle('Salary and Tax Calculator (In Progress..)');
        }
    }
}
// Common Calculator Functions (Global Functions for both grid1,grid2 and grid3 )
function updateDisplay(display, displayValue) {
    display.value = displayValue;
}
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return secondOperand !== 0 ? firstOperand / secondOperand : "Error";
        case 'powxY':
            return Math.pow(firstOperand, secondOperand).toString();
        case 'mod':
            return (firstOperand % secondOperand).toString();
        default:
            return secondOperand;
    }
}

function backSpace(calculator) {
    const { displayValue } = calculator;
    if (displayValue.length > 1) {
        calculator.displayValue = displayValue.slice(0, -1);
    } else {
        calculator.displayValue = '0';
    }
}

function plusminus(calculator) {
    const currentValue = parseFloat(calculator.displayValue);
    calculator.displayValue = (currentValue * -1).toString();
}

function disableAllButtons(grid) {
    const buttons = grid.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true; 
    });
}

function enableAllButtons(grid) {
    const buttons = grid.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false; 
    });
}

// Setup Calculator (Standard Calculator) - Grid 1
function setupCalculator(grid) {
    const display = grid.querySelector('.calculator-screen');
    const buttons = grid.querySelectorAll("button");
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);
        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }
        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${result}`;
            calculator.firstOperand = result;
        }
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    function handleButtonClick(button) {
        const value = button.value || button.textContent;
        // Handle Backspace Key
        if (button.classList.contains('backspace-btn')) {
            backSpace(calculator);
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle operators
        if (button.classList.contains('operator')) {
            handleOperator(value);
            updateDisplay(display, calculator.displayValue);
            return;
        }

        // Handle plus/minus button
        if (button.id === 'plusmins') {
            plusminus(calculator);
            updateDisplay(display, calculator.displayValue);
            return;
        }

        // Handle Off Key (Disable buttons)
        if (button.classList.contains('offKey')) {
            disableAllButtons(grid);
            return;
        }

        // Handle decimal
        if (button.classList.contains('decimal')) {
            if (!calculator.displayValue.includes(".")) {
                calculator.displayValue += ".";
            }
            updateDisplay(display, calculator.displayValue);
            return;
        }

        // Handle "AC" All Clear Button
        if (button.classList.contains('all-clear')) {
            enableAllButtons(grid);
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
            updateDisplay(display, calculator.displayValue);
            return;
        }
        if (button.classList.contains('equal-sign')) {
            const { firstOperand, displayValue, operator } = calculator;
            const inputValue = parseFloat(displayValue);
            if (operator && firstOperand != null) {
                calculator.displayValue = `${calculate(firstOperand, inputValue, operator)}`;
                calculator.firstOperand = null;
                calculator.operator = null;
                calculator.waitingForSecondOperand = false;
            }
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle digits
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = value;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue =
                calculator.displayValue === '0' ? value : calculator.displayValue + value;
        }
        updateDisplay(display, calculator.displayValue);
    }
    buttons.forEach(button => {
        button.addEventListener("click", () => handleButtonClick(button));
    });
    updateDisplay(display, calculator.displayValue);
}

// Setup Scientific Calculator (Grid 2)
function setupScientificCalculator(grid) {
    const display = grid.querySelector('.calculator-screen');
    const buttons = grid.querySelectorAll("button");
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };
    function factorial(n) { 
        // To calculate the factorial of a number.
        let fact = 1;
        for (let i = n; i >= 1; i--) 
    {
            fact *= i;     
    }
        return fact;
    }
    
    function handleDataOperations(calculator,operation){
        const currentValue = parseFloat(calculator.displayValue);
        switch (operation) {
            case 'sin':
                //calculator.displayValue = Math.sin(currentValue ).toString();
                calculator.displayValue = Math.sin(currentValue * (Math.PI / 180)).toString();
                break;
            case 'cos':
                calculator.displayValue = Math.cos(currentValue * (Math.PI / 180)).toString();
                break;
            case 'tan':
                calculator.displayValue = Math.tan(currentValue * (Math.PI / 180)).toString();
                break;
            case 'log':
                calculator.displayValue = Math.log10(currentValue).toString();
                break;
            case 'sqrt':
                calculator.displayValue = Math.sqrt(currentValue).toString();
                break;
            case 'pow2':
                calculator.displayValue = Math.pow(currentValue, 2).toString();
                break;
            case 'pow_ten':
                calculator.displayValue = Math.pow(currentValue, 10).toString();
                break;
            case 'powxY':
                handleOperator(operation);
                break;
            case 'fact_n':
                calculator.displayValue = factorial(currentValue).toString();
                break;
            case 'absButton':
                calculator.displayValue = Math.abs(currentValue).toString();
                break;
            case 'oneoverx':
                calculator.displayValue = (1/currentValue).toString();
                break;        
            case 'mod':
                handleOperator(operation);
                break;
            case 'piValue':
                calculator.displayValue =3.1415926535897932384626433832795.toString();
                break;
            case 'e_x':
                calculator.displayValue = Math.exp(currentValue).toString();
                    break;
            case 'even':
                calculator.displayValue = currentValue % 2===0 ?'True':'False';
                break;
            case 'odd':
                    calculator.displayValue = currentValue % 2===1 ?'True':'False';
                    break;
    
            default:
                console.error(`Unknown scientific function: ${operation}`);
        }
        updateDisplay(display, calculator.displayValue);
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);
        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }
        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${result}`;
            calculator.firstOperand = result;
        }
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    function handleButtonClick(button) {
        const value = button.value || button.textContent;

        // Handle Backspace Key
        if (button.classList.contains('backspace-btn')) {
            backSpace(calculator);
            updateDisplay(display, calculator.displayValue);
            return;
        }

        // Handle operators
        if (button.classList.contains('operator')) {
            handleOperator(value);
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle plus/minus button
        if (button.id === 'plusmins') {
            plusminus(calculator);
            updateDisplay(display, calculator.displayValue);
            return;
        }

        // Handle Off Key (Disable buttons)
        if (button.classList.contains('offKey')) {
            disableAllButtons(grid);
            return;
        }

        // Handle decimal
        if (button.classList.contains('decimal')) {
            if (!calculator.displayValue.includes(".")) {
                calculator.displayValue += ".";
            }
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle decimal data-operation such as sin,cos,tan .
        if (button.classList.contains('data-operations')) {
            const dataOperationsValue = button.value || button.textContent;
            handleDataOperations(calculator,dataOperationsValue);
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle "AC" (All Clear) Button
        if (button.classList.contains('all-clear')) {
            enableAllButtons(grid);
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle equals button
        if (button.classList.contains('equal-sign')) {
            const { firstOperand, displayValue, operator } = calculator;
            const inputValue = parseFloat(displayValue);

            if (operator && firstOperand != null) {
                calculator.displayValue = `${calculate(firstOperand, inputValue, operator)}`;
                calculator.firstOperand = null;
                calculator.operator = null;
                calculator.waitingForSecondOperand = false;
            }
            updateDisplay(display, calculator.displayValue);
            return;
        }
        // Handle digits
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = value;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue =
                calculator.displayValue === '0' ? value : calculator.displayValue + value;
        }
        updateDisplay(display, calculator.displayValue);
    }
    buttons.forEach(button => {
        button.addEventListener("click", () => handleButtonClick(button));
    });
    updateDisplay(display, calculator.displayValue);
}

// Setup Programmer Calculator (Grid 3) , Check This Code....
function updateDisplayBinaryHexOct(hex_text,binary_text,octal_text,decimalNum) {
    const hexRep=decimalToHex(decimalNum);
    hex_text.value=hexRep;
    const binaryRep = decimalToBinary(decimalNum);
    binary_text.value=binaryRep;
    const octRep=decimalToOCT(decimalNum);
    octal_text.value=octRep;
}
function decimalToBinary(decimal) {
    if (decimal < 0) {
        throw new Error('Input must be a non-negative integer.');
    }
    return decimal.toString(2);
}

function decimalToHex(decimal) {
    if (decimal < 0) {
        throw new Error('Input must be a non-negative integer.');
    }
    return decimal.toString(16).toUpperCase(); 
}
function decimalToOCT(decimal) {
    if (decimal < 0) {
        throw new Error('Input must be a non-negative integer.');
    }
    return decimal.toString(8);
}


function setupProgrammerCalculator(grid) 
{
const display = grid.querySelector('.calculator-screen');
const buttons = grid.querySelectorAll("button");
const hex_text = grid.querySelector('#hexadecimal');
const binary_text=grid.querySelector('#binary')
const octal_text=grid.querySelector('#octal');

const calculator = 
{
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
        calculator.operator = nextOperator;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${result}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function handleButtonClick(button) {
    const value = button.value || button.textContent;
    if (button.classList.contains('backspace-btn')) {
        backSpace(calculator);
        updateDisplay(display, calculator.displayValue);
        return;
    }
    // Handle operators
    if (button.classList.contains('operator')) {
        handleOperator(value);
        updateDisplay(display, calculator.displayValue);
        return;
    }
    // Handle plus/minus button
    if (button.id === 'plusmins') {
        plusminus(calculator);
        updateDisplay(display, calculator.displayValue);
        return;
    }
    // Handle Off Key (Disable buttons)
    if (button.classList.contains('offKey')) {
        disableAllButtons(grid);
        return;
    }
    // Handle decimal
    if (button.classList.contains('decimal')) {
        if (!calculator.displayValue.includes(".")) {
            calculator.displayValue += ".";
        }
        updateDisplay(display, calculator.displayValue);
        return;
    }
    // Handle decimal data-operation such as sin,cos,tan .
    if (button.classList.contains('data-operations')) {
        const dataOperationsValue = button.value || button.textContent;
        handleDataOperations(calculator,dataOperationsValue);
        updateDisplay(display, calculator.displayValue);
        return;
    }
    // Handle "AC" (All Clear) Button
    if (button.classList.contains('all-clear')) {
        enableAllButtons(grid);
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
        hex_text.value=0;
        binary_text.value=0;
        octal_text.value=0;
        updateDisplay(display, calculator.displayValue);
        return;
    }
    // Handle equals button
    if (button.classList.contains('equal-sign')) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator && firstOperand != null) {
            calculator.displayValue = `${calculate(firstOperand, inputValue, operator)}`;
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
        }
        updateDisplay(display, calculator.displayValue);
        updateDisplayBinaryHexOct(hex_text,binary_text,octal_text,parseFloat(calculator.displayValue))
        return;
    }
    // Handle digits
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = value;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue =
            calculator.displayValue === '0' ? value : calculator.displayValue + value;
    }
    updateDisplayBinaryHexOct(hex_text,binary_text,octal_text,parseFloat(calculator.displayValue))
    updateDisplay(display, calculator.displayValue);
}
buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button));
});
updateDisplay(display, calculator.displayValue);
}
//  sutupExchangeRateCalculator Grid 4
function sutupExchangeRateCalculator(grid) {
    // const exchangeRates = {GBP: { USD: 1.26, EUR: 1.21 },EUR: { USD: 1.05, GBP: 0.83 },USD: { EUR: 0.95, GBP: 0.79 }};  This for fixed exchangeRates
    // This for a live exchange rates
    const API_ExchangeRate = 'https://api.exchangerate-api.com/v4/latest/';
    document.getElementById('onvecrt_btn').addEventListener('click', async function()
    {
        const amount = parseFloat(document.getElementById('amountCurrency').value);
        const fromCurrency = document.getElementById('from_Currency').value;
        const toCurrency = document.getElementById('to_Currency').value;
        const selectedto_Currency = document.getElementById('to_Currency');
        if (fromCurrency === toCurrency) {
            document.getElementById('resultofCurrency').textContent = amount.toFixed(2) +" "+ selectedto_Currency.value;
            return;
        }
        try {
            const response = await fetch(`${API_ExchangeRate}${fromCurrency}`);
            const data = await response.json();
            const rate = data.rates[toCurrency];
            const convertedAmount = amount * rate;
            document.getElementById('resultofCurrency').textContent = convertedAmount.toFixed(2)+" "+ selectedto_Currency.value;
            } 
            catch (error) 
            {
            document.getElementById('resultofCurrency').textContent = 'Error fetching rates';
            console.error('Error fetching exchange rates:', error);
            }
    });
}