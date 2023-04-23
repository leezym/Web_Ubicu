//test
//import React, {useEffect, useState} from 'react';
//import axios from "axios";
import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import Router from "./components/Router.jsx";
import store from "./store.js";
import Footer from "../src/components/pages/Footer"
import { Helmet } from 'react-helmet';

function App() {
    return ( 
        <div>
            <Helmet>
                <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
                <meta http-equiv="Pragma" content="no-cache" />
                <meta http-equiv="Expires" content="0" />
            </Helmet>
            <Provider store = { store } >
            <Router/>
            <Footer/>
            </Provider>
        </div>
    );
}

export default App;