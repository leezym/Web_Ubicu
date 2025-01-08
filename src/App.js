import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import Router from "./components/Router.jsx";
import store from "./store.js";
import Footer from "../src/components/pages/Footer";
import InactivityMonitor from "../src/components/pages/InactivityMonitor";

const App = () => {
  const handleInactivity = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    alert("Te has desconectado por inactividad.");
    window.location.href = "/";
  };

  useEffect(() => {
    document.title = "UBICU: Sistema Incentivo Respiratorio";
  }, []);

  return (
    <Provider store={store}>
      <InactivityMonitor timeout={300000} onInactive={handleInactivity} />
      <Router />
      <Footer />
    </Provider>
  );
};

export default App;