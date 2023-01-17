import React, { Component } from 'react'
import { Icon, Card,Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";


class PanelPaciente extends Component {   
  state = { activeItem: 'users' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    <div  style={{ marginTop: '7em' }}>
    <Header as='h1'>Bienvenido</Header>
        
      
    <Card.Group itemsPerRow={3}>
        <Card
          align='center'
          style={{ padding: '5em 5em' }}
          color="blue"
          name='recomendacion'
          onClick={this.handleItemClick} >
          <Link to="/GestionRecomendaciones">
          <Card.Content align="center">
          <Icon  color="blue" size="huge" name='hospital' />
          <Card.Header style={{ margin: '3em 0em' }} >Mis prescripciones</Card.Header>
          </Card.Content>
          </Link>
        </Card>

        <Card
          align='center'
          style={{ padding: '7em 7em' }}
          color="blue"
          name='estadistica'
          onClick={this.handleItemClick}
        >
        <Card.Content align="center">
          <Icon  color="blue" size="huge" name='chart line' />
          <Card.Header style={{ margin: '1em 0em' }}>Ver Estadisticas</Card.Header>
        </Card.Content> 
        </Card>
      </Card.Group>
      </div>
    )
  }
}
export default PanelPaciente;
