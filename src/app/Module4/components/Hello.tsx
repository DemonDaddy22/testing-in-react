import { useEffect, useState } from 'react';
import { getRandomData } from '@/utils/Module4/getRandomData';

const Hello: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setTimeout(() => {
      setCount(prev => prev + 1);
    }, 250);
  };

  useEffect(() => {
    setTimeout(() => {
      setName('Rohan');
    }, 1000);
  }, []);

  useEffect(() => {
    getRandomData()
      .then(() => setStatus('Success'))
      .catch(() => setStatus('Error'));
  }, []);

  return (
    <>
      <h1>Hello {name}</h1>
      {status && <p>{status}</p>}
      <h3>{count}</h3>
      <button onClick={handleButtonClick}>Increase</button>
    </>
  );
};

export default Hello;
