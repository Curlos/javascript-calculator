import React, {useState} from 'react';
import {evaluate} from 'mathjs';
import './App.css';

const App = () => {
  const [expression, setExpression] = useState('');
  const [number, setNumber] = useState('');
  const [isNumber, setIsNumber] = useState(true);
  const [isOperation, setIsOperation] = useState(false);
  const [isNegative, setIsNegative] = useState(false);
  const [hasDecimal, setHasDecimal] = useState(false);
  const [isEqual, setIsEqual] = useState(false);

  const handleClickClear = () => {
    setExpression('');
    setNumber('');
    setIsNumber(true);
    setHasDecimal(false);
  }

  const handleClickOperation = (event) => {
    let operation = event.target.innerText;

    if(operation === 'x') {
      operation = '*';
    } 

    if(isOperation) {
      if(operation !== '-') {
        setExpression(expression.substring(0, expression.length - 1) + operation);
        setNumber(operation);
        setIsNegative(false);
      } else if (isOperation && !isNegative){
        setExpression(expression.substring(0, expression.length) + operation);
        setNumber(operation)
        setIsNegative(true);
      }
    } else if(isEqual) {
      setExpression(number);
      setExpression(number + operation);
      setNumber(operation);


      setIsNumber(false);
      setIsOperation(true);
      setHasDecimal(false);
      setIsEqual(false);

    } else if(isNumber) {

      if(operation === 'x') {
        setExpression(expression + '*');
        setNumber('*');
      } else {
        setExpression(expression + operation);
        setNumber(operation);
      }

      setIsNumber(false);
      setIsOperation(true);
      setHasDecimal(false);
      setIsEqual(false);

    }
  }

  const handleClickDecimal = (event) => {
    if(isNumber && !hasDecimal) {
      let decimal = event.target.innerText;
      setExpression(expression + decimal);
      setNumber(number + decimal);
      setHasDecimal(true);
      setIsNumber(false);
      setIsEqual(false);
    }
  }

  const handleClickDigit = (event) => {
    let digit = event.target.innerText;
    setIsNumber(true);

    if(isOperation) {
      setExpression(expression + digit);
      setNumber(digit);
    } else if(isEqual) {
      setExpression(digit);
      setNumber(digit);
    } else {
      if(digit === '0' && number.match(/^[0]+$/) === null) {
        setExpression(expression + digit);
        setNumber(number + digit);
      } else if (digit !== '0') {
        setExpression(expression + digit);
        setNumber(number + digit);
      }
    }

    setIsNumber(true);
    setIsOperation(false);
    setIsEqual(false);
  }

  const handleClickEqual = (event) => {
    let operation = event.target.innerText;
    let solution = evaluate(expression).toString()
    setNumber(solution);
    setExpression(expression + operation + solution);
    setIsNumber(false);
    setIsEqual(true);
    setHasDecimal(false);
    console.log('equals: ', evaluate(expression));
  }

  return (
    <div class="box">
      <div class="grid-container">
        <div id="calculation" className="grid-item-display">
          <div id="expression">{expression === '' ? 0 : expression}</div>
          <div id="display">{number === '' ? 0 : number}</div>
        </div>
        <div id="clear" className="grid-item" onClick={handleClickClear}>AC</div>
        <div id="divide" className="grid-item" onClick={handleClickOperation}>/</div>
        <div id="multiply" className="grid-item" onClick={handleClickOperation}>x</div>
        <div id="seven" className="grid-item" onClick={handleClickDigit}>7</div>
        <div id="eight" className="grid-item" onClick={handleClickDigit}>8</div>
        <div id="nine" className="grid-item" onClick={handleClickDigit}>9</div>
        <div id="subtract" className="grid-item" onClick={handleClickOperation}>-</div>
        <div id="four" className="grid-item" onClick={handleClickDigit}>4</div>
        <div id="five" className="grid-item" onClick={handleClickDigit}>5</div>
        <div id="six" className="grid-item" onClick={handleClickDigit}>6</div>
        <div id="add" className="grid-item" onClick={handleClickOperation}>+</div>
        <div id="one" className="grid-item" onClick={handleClickDigit}>1</div>
        <div id="two" className="grid-item" onClick={handleClickDigit}>2</div>
        <div id="three" className="grid-item" onClick={handleClickDigit}>3</div>
        <div id="zero" className="grid-item" onClick={handleClickDigit}>0</div>
        <div id="decimal" className="grid-item" onClick={handleClickDecimal}>.</div>
        <div id="equals" className="grid-item" onClick={handleClickEqual}>=</div>
      </div>
    </div>
  );
}

export default App;
