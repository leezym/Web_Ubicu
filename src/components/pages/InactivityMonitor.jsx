import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const InactivityMonitor = ({ timeout, onInactive }) => {
  const location = useLocation();
  const timerRef = useRef(null);

  const resetTimer = () => {
    const currentPath = location.hash || "#/";

    if (currentPath === "#/") {
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (onInactive) onInactive();
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [timeout, onInactive, location.hash]);

  return null;
};

export default InactivityMonitor;
