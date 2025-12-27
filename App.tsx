
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

// This is a simple reusable button component for our calculator keys
const CalcButton = ({ label, onClick, variant = 'default', className = '' }: any) => {
  const getStyles = () => {
    switch (variant) {
      case 'operator': return 'bg-pink-300 text-white hover:bg-pink-400';
      case 'action': return 'bg-purple-200 text-purple-700 hover:bg-purple-300';
      case 'equal': return 'bg-indigo-400 text-white hover:bg-indigo-500';
      default: return 'bg-white text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getStyles()} ${className} h-14 sm:h-16 rounded-2xl text-xl font-bold transition-all duration-100 kawaii-button-shadow flex items-center justify-center`}
    >
      {label}
    </button>
  );
};

const App: React.FC = () => {
  // 1. We use "useState" to remember numbers and operations
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldReset, setShouldReset] = useState(false);

  // 2. Function to add numbers when buttons are clicked
  const addNumber = (num: string) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(display + num);
    }
  };

  // 3. Function to handle operators like +, -, *, /
  const handleOp = (op: string) => {
    setPrevValue(display);
    setOperation(op);
    setShouldReset(true);
  };

  // 4. The math logic for the equals button
  const calculate = () => {
    if (!operation || prevValue === null) return;
    
    const firstNum = parseFloat(prevValue);
    const secondNum = parseFloat(display);
    let result = 0;

    if (operation === '+') result = firstNum + secondNum;
    if (operation === '-') result = firstNum - secondNum;
    if (operation === '*') result = firstNum * secondNum;
    if (operation === '/') result = secondNum !== 0 ? firstNum / secondNum : 0;

    setDisplay(result.toString());
    setPrevValue(null);
    setOperation(null);
    setShouldReset(true);
  };

  // 5. "AC" button to reset everything
  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setShouldReset(false);
  };

  // 6. "Remove" button (Backspace) logic
  const removeOne = () => {
    if (shouldReset) {
      clearAll();
    } else if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#fff5f8]"></div>
      
      <div className="w-full max-w-xs bg-white rounded-[2.5rem] p-6 shadow-2xl border-4 border-white relative">
        {/* Cute Header */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <Sparkles className="text-pink-400 w-4 h-4" />
          <h1 className="text-xs font-bold text-pink-500 uppercase tracking-widest">My Calculator</h1>
          <Sparkles className="text-pink-400 w-4 h-4" />
        </div>

        {/* Screen */}
        <div className="bg-gray-50 rounded-3xl p-5 mb-6 flex flex-col items-end justify-center min-h-[80px] border-2 border-pink-50">
          <div className="text-[10px] text-pink-200 font-bold mb-1 uppercase">
            {prevValue} {operation}
          </div>
          <div className="text-4xl font-bold text-gray-700 w-full text-right overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          <CalcButton label="AC" onClick={clearAll} variant="action" />
          <CalcButton label="⌫" onClick={removeOne} variant="action" />
          <CalcButton label="%" onClick={() => setDisplay((parseFloat(display)/100).toString())} variant="action" />
          <CalcButton label="÷" onClick={() => handleOp('/')} variant="operator" />

          <CalcButton label="7" onClick={() => addNumber('7')} />
          <CalcButton label="8" onClick={() => addNumber('8')} />
          <CalcButton label="9" onClick={() => addNumber('9')} />
          <CalcButton label="×" onClick={() => handleOp('*')} variant="operator" />

          <CalcButton label="4" onClick={() => addNumber('4')} />
          <CalcButton label="5" onClick={() => addNumber('5')} />
          <CalcButton label="6" onClick={() => addNumber('6')} />
          <CalcButton label="-" onClick={() => handleOp('-')} variant="operator" />

          <CalcButton label="1" onClick={() => addNumber('1')} />
          <CalcButton label="2" onClick={() => addNumber('2')} />
          <CalcButton label="3" onClick={() => addNumber('3')} />
          <CalcButton label="+" onClick={() => handleOp('+')} variant="operator" />

          <CalcButton label="0" onClick={() => addNumber('0')} className="col-span-2" />
          <CalcButton label="." onClick={() => !display.includes('.') && setDisplay(display + '.')} />
          <CalcButton label="=" onClick={calculate} variant="equal" />
        </div>
      </div>
      
      <p className="mt-8 text-pink-300 text-[10px] font-bold uppercase tracking-widest">
        Simple & Cute ✨
      </p>
    </div>
  );
};

export default App;
