import { useEffect, useState } from 'react';

export function useCooldown(key: string) {
  const [time, setTime] = useState(() => {
    const end = sessionStorage.getItem(key);
    if (!end) return 0;

    const remaining = Math.floor((+end - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });

  const start = (seconds: number) => {
    const end = Date.now() + seconds * 1000;
    sessionStorage.setItem(key, end.toString());
    setTime(seconds);
  };

  const reset = () => {
    sessionStorage.removeItem(key);
    setTime(0);
  };

  useEffect(() => {
    if (time <= 0) return;

    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          sessionStorage.removeItem(key);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [time, key]);

  return { time, start, reset };
}
