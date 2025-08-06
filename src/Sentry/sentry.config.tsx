import { init, reactRouterV7BrowserTracingIntegration } from "@sentry/react";
import { useEffect } from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router";

init({
  // DSN (Data Source Name): Connects this app to your Sentry project
  dsn: import.meta.env.VITE_SENTRY_DSN,

  // Send user info like IP and email (if available)
  // sendDefaultPii: true,

  // Set the current environment (development, production, etc.)
  environment: import.meta.env.VITE_NODE_ENV,

  // Enable automatic tracking for React Router V7 (page load, navigation, etc.)
  integrations: [
    reactRouterV7BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],

  // Sampling rate: Controls how much tracing data is sent to Sentry
  // 1.0 = 100% of requests traced in dev; 0.1 = 10% in prod to reduce noise
  tracesSampleRate: import.meta.env.VITE_NODE_ENV === "development" ? 1.0 : 0.1,

  // Add trace headers only to these requests (frontend → backend)
  tracePropagationTargets: [
    "localhost", // Allow tracing to local backend during development
    new RegExp(import.meta.env.VITE_BASE_URL), // Match your deployed backend URL from env
  ],
});
