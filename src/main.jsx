import store from './redux/store/index.js';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ClientErrorBoundary from './components/ErrorBoundary/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ClientErrorBoundary>
  </StrictMode>
);
