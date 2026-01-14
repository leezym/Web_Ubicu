import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Router from './components/Router.jsx';
import store from './store.js';
import Footer from './components/pages/Footer';

class App extends Component {
  componentDidMount() {
    document.title = 'UBICU';
  }

  render() {
    return (
      <Provider store={store}>
        <div className="app-layout">
          <div className="app-content">
            <Router />
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;