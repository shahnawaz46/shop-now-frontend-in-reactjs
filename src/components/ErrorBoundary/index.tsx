import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { IChildren } from "../../types/interfaces";
import "./style.css";

const ClientErrorBoundary = ({ children }: IChildren) => {
  // return children;
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        import.meta.env.VITE_NODE_ENV === "development" && console.log(error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="error-fallback">
      <h2>Oops! Something went wrong.</h2>
      <p>We encountered an unexpected error. Please try the following:</p>
      <ul>
        <li>Check your internet connection.</li>
        <li>Refresh the page.</li>
      </ul>

      <button onClick={resetErrorBoundary} className="retry-button">
        Try Again
      </button>
    </div>
  );
};

export default ClientErrorBoundary;
