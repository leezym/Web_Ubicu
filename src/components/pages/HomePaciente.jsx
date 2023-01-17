import React, { Component } from 'react';
import MenuNav from './MenuNav';
import Footer from './Footer';
import PanelPaciente from './PanelPaciente';
import { Container } from 'semantic-ui-react';

export default class HomePaciente extends Component {

  render() {
    return (
    <div>
      <MenuNav />
      <PanelPaciente />
    </div>  
    )
  }
}
