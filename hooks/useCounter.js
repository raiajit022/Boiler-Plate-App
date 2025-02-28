import { useState, useEffect } from 'react';

function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return {
    count,
    increment
  };
}

export default useCounter;
