import React, { useState, useEffect } from 'react';

export function ErrorBoundary({ children }: any) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [children]);

  try {
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  } catch (error) {
    console.error(error);
    setHasError(true);
  }
}
