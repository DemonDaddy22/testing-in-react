/**
 * Create a counter app with Increment / Decrement buttons.
 * Write tests to check:
 * Initial value is `0`.
 * Buttons work as expected
 */

'use client';

import { useState } from 'react';

const Counter: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(prev => prev + 1)}>Increment</button>
      <button onClick={() => setCounter(prev => prev - 1)}>Decrement</button>
    </section>
  );
};

export default Counter;
