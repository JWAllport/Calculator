import { createSlice } from '@reduxjs/toolkit';

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
            
            switch(state.operation) {
                case "*":
                    const split = state.displayValue.split("*");
                    let runningTotal = 1;
                    split.forEach(foo =>{
                        runningTotal *= foo;
                    });
                    state.displayValue = runningTotal.toString();
                    state.previousValue = state.displayValue;
                    console.log(runningTotal);
                    break;
                case "-":
                    break;
                case "+": 
                    break;
                case "/":
                    break;
                case "%":
                    break;
            }
        }    
       
    }
});
export const { inputNumber, inputSymbol, clearInput, evaluateInput} = calculatorSlice.actions;
export default calculatorSlice.reducer;