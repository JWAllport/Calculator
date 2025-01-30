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
            let split = null;
            let runningTotal = null;
            //PEMDAS
            
            let previous = "";
            let operation = "";
            for (let i = 0; i < state.displayValue.length; i++) {
                let c = state.displayValue.charAt(i);
                if (c === "*") {
                    operation = "*";
                } else if (Number.parseInt(c)) {
                     if (operation === "*") {
                         c = previous * Number.parseInt(c)
                         state.displayValue = state.displayValue.substring(0, i-3) + state.displayValue.substring(i-3,i)
                     }
                     previous = c;
                } else if (operation === "*") {
                    c = previous * Number.parseInt(c);    
                }        
            }

            switch(state.operation) {
                case "*":
                    split = state.displayValue.split("*");
                    runningTotal = 1;
                    split.forEach(foo =>{
                        runningTotal *= foo;
                    });
                    state.displayValue = runningTotal.toString();
                    state.previousValue = state.displayValue;
                    break;
                case "-":
                    split = state.displayValue.split("-");
                    let previous = null;
                    split.forEach(foo => {
                        if (previous !== null) {
                            previous = Number.parseInt(previous) - Number.parseInt(foo);
                        } else {
                            previous = foo;
                        }
                    });
                    state.previousValue = state.displayValue;
                    state.displayValue = previous;
                    
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