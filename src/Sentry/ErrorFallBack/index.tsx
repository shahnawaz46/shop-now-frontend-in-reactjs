import "./style.css";

const ErrorFallback = () => {
  return (
    <div className="error-fallback">
      <h2>Oops! Something went wrong.</h2>
      <p>We encountered an unexpected error. Please try the following:</p>
      <ul>
        <li>Check your internet connection.</li>
        <li>Refresh the page.</li>
        <li>
          If the problem persists,{" "}
          <a href="mailto:shahnawaz85748@gmail.com" className="error-anchor">
            Contact us
          </a>
          .
        </li>
      </ul>
    </div>
  );
};

export default ErrorFallback;
