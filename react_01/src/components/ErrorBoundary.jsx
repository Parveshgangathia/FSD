import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-600 mt-2">
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
