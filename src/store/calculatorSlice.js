import { createSlice } from '@reduxjs/toolkit';

const OPERATOR = {
    ADD: "+",
    MIN: "-",
    DIV: "/",
    MULT: "*",
}
const initialState = {
    displayValue: '5 - 9 + 5',
    previousValue: null,
    operation: null,
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        inputNumber: (state, action) => {
            if (state.displayValue === '0') {
                state.displayValue = action.payload;
            } else {
                state.displayValue += action.payload;
            }
        },
        inputSymbol: (state, action) => {
            state.displayValue += action.payload;
            state.operation = action.payload;
        },
        clearInput: (state = initialState) => {
            state.displayValue = '0';
            state.previousValue = null;
            state.operation = null;
        },
        evaluateInput: (state, action) => {
            let displayValue = state.displayValue.replaceAll(" ", "");
            state.previousValue = displayValue;
        
            function processPatterns(operator) {
                let regex = new RegExp(`\-?[0-9]*\\.?[0-9]+[\\${operator}]\-?[0-9]*\\.?[0-9]+`, 'g');
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

            state.displayValue = displayValue;
            
            state.operation = null;

        }    
    }
});

    function solveFor(displayValue, matches) {
        
        matches.forEach(match => {
            
            let operator;
            if (match[0].includes("-")) {
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
            const left = match[0].split(operator)[0];
            const right = match[0].split(operator)[1];

            // Handling negative numbers
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
        });
        return displayValue;
    }
export const { inputNumber, inputSymbol, clearInput, evaluateInput} = calculatorSlice.actions;
export default calculatorSlice.reducer;