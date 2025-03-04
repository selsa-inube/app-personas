import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@inube/auth";
import { ITimeContext } from "./types";

const TimeContext = createContext<ITimeContext>({ time: 0 });

interface TimeProviderProps {
  children: React.ReactNode;
}

function TimeProvider(props: TimeProviderProps) {
  const { children } = props;
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number>();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated]);

  const contextValue = useMemo(() => ({ time }), [time]);

  return (
    <TimeContext.Provider value={contextValue}>{children}</TimeContext.Provider>
  );
}

export { TimeContext, TimeProvider };
