import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputNumber, inputSymbol, clearInput, evaluateInput} from '../store/calculatorSlice';
import './Calculator.css';


const Calculator = () => { 
    const dispatch = useDispatch();
    const displayValue = useSelector((state) => 
        state.calculator.displayValue);

    const handleNumberClick = (number) => {
        dispatch(inputNumber(number));
    }
    const handleOperatorClick = (operator) => {
        dispatch(inputSymbol(operator));
    }
    const handleClear = () => {
        dispatch(clearInput());
    }
    const handleEquals = () => {
        dispatch(evaluateInput());
    }

    const renderNumberButtons = () => {
        const buttons = [];
        for (let i = 1; i <10; i++) {
            buttons.push(
                <button key={i} className="button" type="button" onClick={() => handleNumberClick(i.toString())}>
                    {i}
                </button>
            );
        }
        return buttons;
    }
    const renderOperatorButtons = () => {
        const symbols = ["+", "-", "/", "%", "*"];
        const buttons = [];
        for(let i = 0; i < symbols.length; i++) {
            buttons.push(
                <button key={symbols[i]} className="button" type="button" onClick={() => handleOperatorClick(symbols[i])}>
                        {symbols[i]}
                </button>
            );
        }
        return buttons;
    }
    const renderClear = () => {
        return (
        <button key="C" id="clear" className="button" type="button" onClick={() => handleClear()}>
                    C
                </button>
        );
    }
    const renderEquals = () => {
        return (
        <button key="E" id="equals" className="button" type="button" onClick={() => handleEquals()}>
                    E
                </button>
        );
    }
    
    return (
        <div className="calculator">
          <div className="display">{displayValue}</div>
          {renderNumberButtons()}
          {renderOperatorButtons()}
          {renderClear()}
          {renderEquals()}
        </div>
      );
}

export default Calculator;