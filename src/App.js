//test
//import React, {useEffect, useState} from 'react';
//import axios from "axios";
import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import Router from "./components/Router.js";
import store from "./store.js";
import Footer from "../src/components/pages/Footer"

//test
/*const App = ()=> {
    const [data, setData]=useState("");

    const getData=async ()=>{
        const response=await axios.get("https://server.ubicu.co/getData");
        setData(response.data);
    }
    useEffect(()=>{
        getData()
    },[]);

    return (
        <div>{data}</div>
    )
}*/

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Footer/>
    </Provider>
  );
}

export default App;
