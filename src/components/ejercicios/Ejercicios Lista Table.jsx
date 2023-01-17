import React, { Component } from 'react';
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import {Link} from "react-router-dom";
import{allEjerciciosByUser} from "../../actions/ejerciciosAction";
import Ejercicio from './Ejercicio';
import {connect} from "react-redux";


class Ejercicios extends Component {

  componentDidMount(){
    this.props.allEjerciciosByUser({id_user:this.props.id_user});
  }

    render() {
      const {ejercicios} = this.props;
        return (
          <div>
          <MenuNav/> 
          <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='blue' ribbon>
                Lista de Ejercicios
                </Label>
                <Table  celled compact definition>
                  <Table.Header  fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Apnea</Table.HeaderCell>
                    <Table.HeaderCell>Durecion</Table.HeaderCell>
                    <Table.HeaderCell>Flujo</Table.HeaderCell>
                    <Table.HeaderCell>Fraccion</Table.HeaderCell>
                    <Table.HeaderCell>Frecuencia</Table.HeaderCell>
                    <Table.HeaderCell>Repeticion</Table.HeaderCell>
                    <Table.HeaderCell>Series</Table.HeaderCell>
                    <Table.HeaderCell>Sesiones</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                  </Table.Header>
                  {ejercicios.map((ejercicio,index)=>{
                    return (<Ejercicio 
                      key={index} ejercicio={ejercicio}></Ejercicio>)
                  })}
                  <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='3'>
                     <Link to="/Users">
                      <Button floated='right' icon labelPosition='left'  size='small'>
                      Regresar
                      </Button>
                    </Link> 
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
                </Table>
          </Segment>
          </Grid.Column>
          </Grid>
          </div>
        );
    }
}
const mapStateToProp =(state)=>{
  return{
    ejercicios: state.ejercicios.ejercicios
  };
}
export default connect(mapStateToProp,{allEjerciciosByUser})(Ejercicios);
