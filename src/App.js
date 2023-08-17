import React, { Component } from 'react';
import './App.css';
import { Provider } from "react-redux";
import Router from "./components/Router.jsx";
import store from "./store.js";
import Footer from "../src/components/pages/Footer"

class App extends Component {
    componentDidMount() {
        document.title = 'UBICU'; // Cambia 'Nuevo Título de Página' al título que desees
    }

    render() {
        return ( 
            <Provider store = { store } >
            <Router/>
            <Footer/>
            </Provider>
        );
    }
}

export default App;