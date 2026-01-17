'use client';
import React, { useEffect } from 'react';

function Playground() {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  );
}
export default Playground;
