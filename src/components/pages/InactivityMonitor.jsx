import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const InactivityMonitor = ({ timeout, onInactive }) => {
  const location = useLocation();
  const timerRef = useRef(null);

  const resetTimer = () => {
    // Obtén la ruta actual considerando el hash
    const currentPath = location.hash || "#/";
    console.log("Ruta actual:", currentPath);

    // Si estamos en la página raíz ("/"), no iniciamos el temporizador
    if (currentPath === "#/") {
      console.log("No se ejecuta el temporizador en la página raíz.");
      return;
    }

    clearTimeout(timerRef.current);
    console.log("Reiniciando temporizador...");
    timerRef.current = setTimeout(() => {
      console.log("Llamando a onInactive...");
      if (onInactive) onInactive();
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const handleActivity = () => {
      console.log("Actividad detectada, reiniciando temporizador.");
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Inicia el temporizador al montar
    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [timeout, onInactive, location.hash]); // Escucha cambios en el hash

  return null; // Este componente no renderiza nada
};

export default InactivityMonitor;
