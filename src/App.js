import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import Router from "./components/Router.js";
import store from "./store.js";
import Footer from "../src/components/pages/Footer"

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Footer/>
    </Provider>
  );
}

export default App;
