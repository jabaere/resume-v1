import React, { useEffect, useState } from 'react';

interface PageDimensions {
  width: number;
  height: number;
}

function getWindowDimensions(): any {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<PageDimensions>(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
