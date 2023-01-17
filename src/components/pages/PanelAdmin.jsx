import React, { Component } from 'react'
import { Icon, Card,Header } from 'semantic-ui-react'
import { Link,withRouter } from "react-router-dom";


class PanelAdmin extends Component {   
  state = { activeItem: 'users' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    <div  style={{ marginTop: '9em' }}>
    <Header as='h1'>Bienvenido</Header>
        
      
    <Card.Group itemsPerRow={3}>
        <Card align='center'
          style={{ padding: '7em 7em' }}
          color="blue"  name='users' onClick={this.handleItemClick}>
          <Link to="/Users">
            <Card.Content align="center">
            <Icon  color="blue" size="huge" name='user' />
            <Card.Header style={{ margin: '3em 0em' }}>Gestion de Pacientes</Card.Header>
            </Card.Content>
          </Link>
        </Card>

        <Card
          align='center'
          style={{ padding: '7em 7em' }}
          color="blue"
          name='recomendacion'
          onClick={this.handleItemClick} >
          <Link to="/GestionRecomendaciones">
          <Card.Content align="center">
          <Icon  color="blue" size="huge" name='clipboard check' />
          <Card.Header style={{ margin: '3em 0em' }} >Gestionar Ejercicios</Card.Header>
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
          <Card.Header style={{ margin: '3em 0em' }}>Ver Estadisticas</Card.Header>
        </Card.Content> 
        </Card>
      </Card.Group>
      </div>
    )
  }
}
export default withRouter(PanelAdmin);
