import { useEffect, useState } from 'react';

const useResize = (callback?: () => void): { windowWidth: number, windowHeight: number } => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  const onResize = (): void => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line
  }, []);

  return {
    windowWidth,
    windowHeight,
  };
};

export default useResize;
