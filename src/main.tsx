import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import ClientErrorBoundary from "./components/ErrorBoundary";
import { init, browserTracingIntegration } from "@sentry/react";

const tracePropagationTargets =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "localhost"
    : import.meta.env.VITE_BASE_URL;

init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  integrations: [browserTracingIntegration()],
  tracesSampler: () => {
    // Sample all transactions in development
    if (import.meta.env.VITE_NODE_ENV === "development") {
      return 1.0;
    }

    // Sample 5% in production
    else {
      return 0.05;
    }
  },

  tracePropagationTargets: [tracePropagationTargets],
});

// type assertion mean when you have information about the type of a value that TypeScript can’t know about.
// ! -> (Non-null assertion operator)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClientErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ClientErrorBoundary>
  </StrictMode>
);
