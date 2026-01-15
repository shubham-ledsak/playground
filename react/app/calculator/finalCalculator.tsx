'use client';
import { useState } from 'react';

export default function Calculator() {
  const [value, setValue] = useState('');

  const handleClick = (button: string) => {
    if (button === 'C') {
      setValue('');
      return;
    }
    if (button === '⌫') {
      setValue(value.slice(0, -1));
      return;
    }
    if (button === '=') {
      try {
        // Replace symbols for evaluation
        const sanitizedValue = value
          .replace(/÷/g, '/')
          .replace(/x/g, '*')
          .replace(/−/g, '-');
        // eslint-disable-next-line no-eval
        const result = eval(sanitizedValue);
        setValue(result.toString());
      } catch {
        setValue('Error');
      }
      return;
    }
    setValue(value + button);
  };

  const buttons = [
    'C',
    '⌫',
    '%',
    '÷',
    '7',
    '8',
    '9',
    'x',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 bg-white rounded-2xl shadow-lg p-4">
        {/* Display */}
        <div className="bg-black text-white text-right text-3xl p-4 rounded-xl mb-4 overflow-hidden">
          {value || '0'}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => {
            const isEqual = btn === '=';
            const isOperator = ['+', '-', 'x', '÷'].includes(btn);

            let btnClasses =
              'h-14 rounded-xl text-lg font-semibold hover:opacity-80 transition ';

            if (isEqual) {
              btnClasses += 'bg-blue-600 text-white col-span-2';
            } else if (isOperator) {
              btnClasses += 'bg-orange-500 text-white';
            } else {
              btnClasses += 'bg-gray-100 text-gray-900';
            }

            return (
              <button
                onClick={() => handleClick(btn)}
                key={index}
                className={btnClasses}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
