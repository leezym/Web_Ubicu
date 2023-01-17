import React, { Component } from 'react';
import MenuNav from './MenuNav';
import Footer from './Footer';
import PanelAdmin from './PanelAdmin';
import { Container } from 'semantic-ui-react';

export default class HomeAdmin extends Component {

  render() {
    return (
    <div>
      <MenuNav />
      <PanelAdmin />
    </div>  
    )
  }
}
