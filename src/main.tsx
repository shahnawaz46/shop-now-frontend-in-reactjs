import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import ClientErrorBoundary from "./components/ErrorBoundary";

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
