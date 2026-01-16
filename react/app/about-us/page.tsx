'use client';
import React from 'react';

function AboutUs() {
  const [count, setCount] = React.useState(0);

  const addCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const minusCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div>
      <button onClick={addCount}>Add</button>
      <button onClick={minusCount}>Minus</button>
      <p>Button clicked {count} times</p>
    </div>
  );
}

export default AboutUs;
