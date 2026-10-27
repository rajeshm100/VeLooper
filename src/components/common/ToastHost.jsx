import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ToastHost.module.css';

const ToastContext = createContext(() => {});

// Wrap the app once. Any component can then call useToast()('message').
export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const toast = useCallback((text) => {
    setMessage(text);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={clsx(styles.toast, show && styles.show)} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
