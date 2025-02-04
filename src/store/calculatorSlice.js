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
            //PEMDAS
            
            let hasMult = [...displayValue.matchAll(/[0-9]{1,2}\*[0-9]{1,2}/g)];
            let hasDiv = [...displayValue.matchAll(/[0-9]{1,2}\/[0-9]{1,2}/g)];
            let hasAdd = [...displayValue.matchAll(/[0-9]{1,2}\+[0-9]{1,2}/g)];
            let hasMin = [...displayValue.matchAll(/[0-9]{1,2}\-[0-9]{1,2}/g)];
            while(hasMult || hasDiv || hasAdd || hasMin) {
                if (hasMult.length) {
                    displayValue = solveFor(displayValue, hasMult, "*");
                    hasMult = [...displayValue.matchAll(/[0-9]{1,2}\*[0-9]{1,2}/g)];
                    hasDiv = [...displayValue.matchAll(/[0-9]{1,2}\/[0-9{1,2}]/g)];
                    hasAdd = [...displayValue.matchAll(/[0-9]{1,2}\+[0-9]{1,2}/g)];
                    hasMin = [...displayValue.matchAll(/[0-9]{1,2}\-[0-9]{1,2}/g)];
                }
                if (hasDiv.length) {
                    displayValue = solveFor(displayValue, hasDiv, "/");
                    hasMult = [...displayValue.matchAll(/[0-9]{1,2}\*[0-9]{1,2}/g)];
                    hasDiv = [...displayValue.matchAll(/[0-9]{1,2}\/[0-9]{1,2}/g)];
                    hasAdd = [...displayValue.matchAll(/[0-9]{1,2}\+[0-9]{1,2}/g)];
                    hasMin = [...displayValue.matchAll(/[0-9]{1,2}\-[0-9]{1,2}/g)];
                }
                if (hasAdd.length) {
                    displayValue = solveFor(displayValue,hasAdd, "+");
                    hasMult = [...displayValue.matchAll(/[0-9]{1,2}\*[0-9]{1,2}/g)];
                    hasDiv = [...displayValue.matchAll(/[0-9]{1,2}\/[0-9]{1,2}/g)];
                    hasAdd = [...displayValue.matchAll(/[0-9]{1,2}\+[0-9]{1,2}/g)];
                    hasMin = [...displayValue.matchAll(/[0-9]{1,2}\-[0-9]{1,2}/g)];
                }
                if (hasMin.length) {
                    displayValue = solveFor(displayValue, hasMin, "-");
                    hasMult = [...displayValue.matchAll(/[0-9]{1,2}\*[0-9]{1,2}/g)];
                    hasDiv = [...displayValue.matchAll(/[0-9]{1,2}\/[0-9]{1,2}/g)];
                    hasAdd = [...displayValue.matchAll(/[0-9]{1,2}\+[0-9]{1,2}/g)];
                    hasMin = [...displayValue.matchAll(/[0-9]{1,2}\-[0-9]{1,2}/g)];
                } 
                state.displayValue = displayValue;
                
                state.operation = null;
            }
        }    
    }
});

    function solveFor(displayValue, matches, operation) {
        
        matches.forEach(match => {
            const left = match[0].split(operation)[0];
            const right = match[0].split(operation)[1];
            let result;
            switch(operation) {
                case OPERATOR.ADD:
                     result = Number.parseInt(left) * Number.parseInt(right);
                    console.log(match);
                    break;
                case OPERATOR.DIV:
                    result = Number.parseInt(left) * Number.parseInt(right);
                    console.log(match);
                    break;
                case OPERATOR.MIN:
                    result = Number.parseInt(left) * Number.parseInt(right);
                    console.log(match);
                    break;
                case OPERATOR.MULT:
                    result = Number.parseInt(left) * Number.parseInt(right);
                    displayValue = displayValue.replace(match[0], result);
                    console.log(result);
                    break;
            }
        });
        return displayValue;
    }
export const { inputNumber, inputSymbol, clearInput, evaluateInput} = calculatorSlice.actions;
export default calculatorSlice.reducer;