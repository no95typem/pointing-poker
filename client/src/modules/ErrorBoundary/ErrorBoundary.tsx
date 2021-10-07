import React from 'react';

export class ErrorBoundary extends React.Component {
  state: {
    hasError: boolean;
  };

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    setTimeout(() => {
      window.location.href = `${window.location.origin}${BASENAME}`;
    }, 1_000);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Something went wrong. Executing a hard reset...</h2>
        </div>
      );
    }

    return this.props.children;
  }
}
