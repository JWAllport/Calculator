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
        return (
            <div className="calculator">
                  <button id="seven" key="7" className="button" type="button" onClick={() => handleNumberClick("7")}>7</button>
                <button id="eight" key="8" className="button" type="button" onClick={() => handleNumberClick("8")}>8</button>
                <button id="nine" key="9" className="button" type="button" onClick={() => handleNumberClick("9")}>9</button>

                <button id="four" key="4" className="button" type="button" onClick={() => handleNumberClick("4")}>4</button>
                <button id="five" key="5" className="button" type="button" onClick={() => handleNumberClick("5")}>5</button>
                <button id="six" key="6" className="button" type="button" onClick={() => handleNumberClick("6")}>6</button>

                <button id="one" key="1" className="button" type="button" onClick={() => handleNumberClick("1")}>1</button>
                <button id="two" key="2" className="button" type="button" onClick={() => handleNumberClick("2")}>2</button>
                <button id="three" key="3" className="button" type="button" onClick={() => handleNumberClick("3")}>3</button>

                <button id="zero" key="0" className="button" type="button" onClick={() => handleNumberClick("0")}>0</button>                
              
            </div>
        )
    }
    const renderOperatorButtons = () => {
        return(
            <span id="operations">
                <button key="+" id="add" className="operator_button" type="button" onClick={() => handleOperatorClick("+")}>
                    +
                </button>
                <button key="-" id="subtract" className="operator_button" type="button" onClick={() => handleOperatorClick("-")}>
                    -
                </button>
                <button key="*" id="multiply" className="operator_button" type="button" onClick={() => handleOperatorClick("*")}>
                    *
                </button>
                <button key="/" id="divide" className="button" type="button" onClick={() => handleOperatorClick("/")}>
                    /
                </button>
            </span>
        )
    }
    const renderDecimal = () => {
        return (
            <button key="." id="decimal" className="decimal_button" type="button" onClick={() => handleOperatorClick(".")}>
                .
            </button>
        );
    }
    const renderClear = () => {
        return (
        <button key="C" id="clear" className="clear_button" type="button" onClick={() => handleClear()}>
                    C
        </button>
        );
    }
    const renderEquals = () => {
        return (
        <button key="=" id="equals" className="button" type="button" onClick={() => handleEquals()}>
                    =
                </button>
        );
    }
    
    return (
        <div className="calculator">
          <div id="display">{displayValue}</div>
          {renderNumberButtons()}
          {renderDecimal()}
          {renderEquals()}
          {renderOperatorButtons()}
          {renderClear()}
        
        </div>
      );
}

export default Calculator;