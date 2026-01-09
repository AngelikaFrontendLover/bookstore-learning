import React, { createContext, useContext, useState, useEffect } from 'react';

type Notification = {
  type: 'error' | 'success' | 'info';
  message: string;
};

type NotificationContextType = {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (n: Notification) => {
    setNotification(n);
  };

  const clearNotification = () => setNotification(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};
