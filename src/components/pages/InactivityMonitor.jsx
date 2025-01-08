import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const InactivityMonitor = ({ timeout, onInactive }) => {
  const [timer, setTimer] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const resetTimer = () => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      if (onInactive) onInactive();
    }, timeout));
  };

  useEffect(() => {
    // Si estamos en la página "/". No iniciar el temporizador.
    if (location.pathname === "/") {
      return;
    }

    // Escucha eventos de actividad
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Inicia el temporizador
    resetTimer();

    return () => {
      // Limpia eventos y temporizador al desmontar
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [timeout, onInactive, location.pathname]);

  return null; // Este componente no renderiza nada
};

export default InactivityMonitor;