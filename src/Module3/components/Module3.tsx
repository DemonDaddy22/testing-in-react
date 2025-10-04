'use client';

import { useState } from 'react';

const Module3: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '10rem' }}>
      <input value={input} onChange={e => setInput(e.currentTarget.value)} />
      <input defaultValue='default' />
      <button onClick={() => setInput('')}>Click Me</button>
    </section>
  );
};

export default Module3;
