import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Html } from '@react-three/drei';
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Can't load sound files");
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Html
          as="p"
          fullscreen
          style={{
            color: 'orange',
            marginLeft: '10px',
            marginTop: '10px',
            fontFamily: 'Segoe UI',
            letterSpacing: '0.5px',
          }}
        >
          Sound unavailable!
        </Html>
      ); // Render an error message
    }

    return this.props.children;
  }
}
