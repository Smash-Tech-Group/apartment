/**
 * Toast notification system
 * File: src/components/Toast.jsx
 *
 * Usage:
 *   1. Wrap your app in <ToastProvider> in App.jsx
 *   2. Call const { showToast } = useToast() in any component
 *   3. showToast('Your message')              → success (default)
 *      showToast('Something went wrong', 'error')  → error
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — fixed bottom-right, stacks upward */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lg
              text-sm font-medium min-w-[260px] max-w-[360px]
              animate-[fadeInUp_0.25s_ease-out]
              ${toast.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-white border border-[#FF7D0130] text-gray-800'}
            `}
          >
            {/* Icon */}
            {toast.type === 'error' ? (
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#FF7D01] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}

            {/* Message */}
            <span className="flex-1">{toast.message}</span>

            {/* Dismiss */}
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}