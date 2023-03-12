import React, { Component } from 'react';
import {Table,Button,Icon,Grid,Segment,Label, Card, TableHeader, TableBody, TableCell, TableRow} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import {Link,withRouter} from "react-router-dom";
import Ejercicio from './Ejercicio';
import {connect} from "react-redux";

const capacidad_vital = 0
const user =  [
  {}
];
const ejercicios =  [
  {}
];
const initialState ={
  user,
  capacidad_vital,
  ejercicios
}


class Ejercicios extends Component { 
  state = initialState;
  componentDidMount(){

    fetch('https://server.ubicu.co/getPatientbyId', {
    //fetch('http://localhost:5000/getPatientbyId', {
        method: 'POST',
        body: JSON.stringify({id_patient:this.props.id_user}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then(resp => {        
        const user = resp;
        const capacidad_vital = getCapacidadVital(resp);
                
        fetch('https://server.ubicu.co/allEjerciciosByUser', {
        //fetch('http://localhost:5000/allEjerciciosByUser', {
            method: 'POST',
            body: JSON.stringify({id_user:this.props.id_user}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
              return res.json();
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .then(resp => {      
            const ejercicios = resp;
            const newState = {
              user,
              capacidad_vital,
              ejercicios
            };
            
            this.setState(newState)
            
            console.log("state user data: ",this.state);
          })
          .catch(err => {
                console.error(err);
        });  

      })
      .catch(err => {
            console.error(err);
    });

    
    
    function getCapacidadVital(user){
      if(user.sexo = "M")
      return (27.63 - ((0.112 * user.edad)*(user.altura/100)));
      if(user.sexo = "F")
      return (21.78 - ((0.101 * user.edad)*(user.altura/100)));
    }
  }

    render() { 
      return (
          <div>
          <MenuNav/> 
          
          <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>  
              <Segment raised>
                  <Table>               
                    <TableBody>
                    <TableRow>
                    <TableCell>Nombre del paciente </TableCell>
                    <TableCell>{this.state.user.nombre}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Altura:</TableCell>
                    <TableCell>{this.state.user.altura}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Edad:</TableCell>
                    <TableCell>{this.state.user.edad}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Sexo:</TableCell>
                    <TableCell>{this.state.user.sexo}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Capacidad vital:</TableCell>
                    <TableCell>{this.state.capacidad_vital}</TableCell>
                    </TableRow>
                    </TableBody>
                  </Table>
                  <Link to={`/VerUser/${this.state.user._id}`}><Button type='submit'>Regresar</Button></Link>                  
              </Segment>  

              <Segment raised>
                  <Label color='blue' ribbon>Prescripción</Label>
                  <Card.Group>
                    {this.state.ejercicios.map((ejercicio,index)=>{
                      return (<Ejercicio 
                        key={index} ejercicio={ejercicio}></Ejercicio>)
                    })}
                  </Card.Group>
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
export default withRouter(connect(mapStateToProp,null)(Ejercicios));

