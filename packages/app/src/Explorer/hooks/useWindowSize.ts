import { useEffect, useState } from 'react';

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  };
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const resizeHandler = () => {
    setWindowSize(getWindowSize());
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return windowSize;
};
