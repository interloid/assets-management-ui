import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the fallback UI is rendered.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log diagnostic information for development.
    console.error("Unexpected application error:", error);
    console.error("Component stack:", errorInfo.componentStack);

    // In production, send this information to your error-monitoring service.
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <main
            role="alert"
            className="flex w-full h-full flex-col items-center justify-center gap-3 p-6 text-center"
          >
              <h1 className="text-xl font-semibold">Something went wrong</h1>

              <p className="max-w-md text-sm text-muted-foreground">
                An unexpected error occurred. Please try again.
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground cursor-pointer"
              >
                Reload application
              </button>
          </main>
        )
      );
    }

    return this.props.children;
  }
}
