import { createSlice } from '@reduxjs/toolkit';

const OPERATOR = {
    ADD: "+",
    MIN: "-",
    DIV: "/",
    MULT: "*",
}
const initialState = {
    displayValue: '0',
    previousValue: null,
    operation: null,
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        inputNumber: (state, action) => {
            state.previousValue = action.payload;
            if (state.displayValue === '0') {
                state.displayValue = action.payload;
            } else {
                state.displayValue += action.payload;
            }
        },
        inputSymbol: (state, action) => {
            if (action.payload === ".") {
                // Check if the current number already contains a decimal point
                const currentNumber = state.displayValue.split(/[\+\-\*\/]/).pop();
                if (!currentNumber.includes(".")) {
                    state.previousValue = action.payload;
                    state.displayValue += action.payload;
                    state.operation = action.payload;
                }
            } else {
                state.previousValue = action.payload;
                state.displayValue += action.payload;
                state.operation = action.payload;
            }
            
        },
        clearInput: (state = initialState) => {
            state.displayValue = '0';
            state.previousValue = null;
            state.operation = null;
        },
        evaluateInput: (state, action) => {
            let displayValue = clean(state.displayValue.replaceAll(" ", ""));
            state.previousValue = displayValue;
            
            function processPatterns(operator) {
                
                let regex = new RegExp(`(?<![0-9${operator}])\\-?[0-9]*\\.?[0-9]+[${operator}]\\-?[0-9]*\\.?[0-9]+`, 'g');
                let matches = [...displayValue.matchAll(regex)];
                while (matches.length) {
                    displayValue = solveFor(displayValue, matches);
                    matches = [...displayValue.matchAll(regex)];
                }
            }
            // MULT & DIV
            processPatterns("\\*\\/");
            //PLUS/MINUS
            processPatterns("\\+\\-");
            
            if (displayValue.match(/\./)) {
                displayValue = processDec(displayValue);
            }
            state.displayValue = displayValue;
            state.operation = null;
        }    
    }
});

function clean(expression) {
    if (expression.match(/\./)) {
        expression = processDec(expression);
    }
    expression = expression.replace(/([\+\*\/]){2,}/g, (match) => match.slice(-1));
    expression = expression.replace(/([\-]{2,})/g, '-');
    expression = expression.replace(/([0-9])\-\+/g, '$1-')
    expression = expression.replace(/([\+\*\/])\-\+/g, (match) => match.slice(-1));
    return expression;
}
    function processDec(expression) {
        const decReg = new RegExp('(\\d*\\.\\d*\\.{1,}\\d*)');
        let first = true;
        const replaceFunc = (match) => {
            const strbuild = [];
            const parts = match.split('.').forEach((foo, index) => {
                if (first && index === 0) {
                    strbuild.push(foo + '.');
                    first = false;
                } else {
                    strbuild.push(foo);
                }
            });
            return strbuild.join("");
        };

        return expression.replace(decReg, replaceFunc);

    }

    function solveFor(displayValue, matches) {
        
        matches.forEach(match => {
            
            let operator;
            if (match[0].includes("-") && !match[0].includes("--")) {
                operator = "-";
            }
            if (match[0].includes("+")) {
                operator = "+";
            }
            if (match[0].includes("/")) {
                operator = "/";
            }
            if (match[0].includes("*")) {
                operator = "*";
            }
            const parts = match[0].split(operator);
            const left = parts[0];
            const right = parts[1];
            
            if (operator === "-" && !left && right) {
                right = `-${right}`;
            }
            let result;
            switch(operator) {
                case OPERATOR.MULT:
                    result = Number.parseFloat(left) * Number.parseFloat(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
                case OPERATOR.DIV:
                    result = Number.parseFloat(left) / Number.parseFloat(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
                case OPERATOR.ADD:
                    result = Number.parseFloat(left) + Number.parseFloat(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
                case OPERATOR.MIN:
                    result = Number.parseFloat(left) - Number.parseFloat(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
            }
            displayValue = displayValue.replace(match[0], result);
        });
        return displayValue;
    }
export const { inputNumber, inputSymbol, clearInput, evaluateInput} = calculatorSlice.actions;
export default calculatorSlice.reducer;