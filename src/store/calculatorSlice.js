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
            let displayValue = state.displayValue;
            state.previousValue = displayValue;
            const operators = ["*", "/", "+", "-"];
            //PEMDAS
            operators.forEach(operator => {
                const regex = new RegExp(`[0-9]{1,2}\\${operator}[0-9]{1,2}`, 'g');
                let matches = [...displayValue.matchAll(regex)];
                while (matches.length) {
                    displayValue = solveFor(displayValue, matches, operator);
                    matches = [...displayValue.matchAll(regex)];
                }
            })
            
                state.displayValue = displayValue;
                
                state.operation = null;

        }    
    }
});

    function solveFor(displayValue, matches, operation) {
        
        matches.forEach(match => {
            const left = match[0].split(operation)[0];
            const right = match[0].split(operation)[1];
            let result;
            switch(operation) {
                case OPERATOR.MULT:
                    result = Number.parseInt(left) * Number.parseInt(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
                case OPERATOR.DIV:
                    result = Number.parseInt(left) / Number.parseInt(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
                case OPERATOR.ADD:
                    result = Number.parseInt(left) + Number.parseInt(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
                case OPERATOR.MIN:
                    result = Number.parseInt(left) - Number.parseInt(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
            }
        });
        return displayValue;
    }
export const { inputNumber, inputSymbol, clearInput, evaluateInput} = calculatorSlice.actions;
export default calculatorSlice.reducer;