import React from "react";

export function useThrottle(callback: Function, limit: number) {
    const lastCall = React.useRef(0);
  
    const throttledCallback = React.useCallback((...args: any[]) => {
      const now = Date.now();
      if (now - lastCall.current >= limit) {
        lastCall.current = now;
        callback(...args);
      }
    }, [callback, limit]);
  
    return throttledCallback;
  }
  