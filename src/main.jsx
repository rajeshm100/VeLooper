import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { PlayerProvider } from './context/PlayerContext';
import { ToastProvider } from './components/common/ToastHost';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </PlayerProvider>
  </StrictMode>,
);
