import "./Sentry/sentry.config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { reactErrorHandler } from "@sentry/react";
import ClientErrorBoundary from "./components/ErrorBoundary";

// type assertion mean when you have information about the type of a value that TypeScript can’t know about.
// ! -> (Non-null assertion operator)
const container = document.getElementById("root");
const root = createRoot(container!, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: reactErrorHandler(),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: reactErrorHandler(),
});

root.render(
  <StrictMode>
    <ClientErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ClientErrorBoundary>
  </StrictMode>
);
