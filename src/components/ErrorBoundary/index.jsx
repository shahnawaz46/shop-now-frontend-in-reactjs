import { ErrorBoundary } from 'react-error-boundary';
import './style.css';

const ClientErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

const ErrorFallback = ({ error, resetBoundary }) => {
  // console.log('ErrorFallback:', error);

  return (
    <div className="error-fallback">
      <h2>Oops! Something went wrong.</h2>
      <p>We encountered an unexpected error. Please try the following:</p>
      <ul>
        <li>Check your internet connection.</li>
        <li>Refresh the page.</li>
        <li>
          If the problem persists,{' '}
          <a href="mailto:shahnawaz85748@gmail.com" className="error-anchor">
            Contact us
          </a>
          .
        </li>
      </ul>

      <button onClick={resetBoundary} className="retry-button">
        Try Again
      </button>
    </div>
  );
};

export default ClientErrorBoundary;
