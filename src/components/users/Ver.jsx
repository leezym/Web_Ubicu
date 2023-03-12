import React, { Component } from 'react';
import {Grid,Label,Segment,List,Icon, Card, Image, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {getPatientbyId} from "../../actions/patientsAction";
import {connect} from "react-redux";


class Ver extends Component {
    state ={};
    componentDidMount(){
        
        fetch('https://server.ubicu.co/getPatientbyId', {
        //fetch('http://localhost:5000/getPatientbyId', {
        method: 'POST',
        body: JSON.stringify({id_patient:this.props.id}),
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
        console.log("resp: ",resp);
        this.setState(resp);

      })
      .catch(err => {
            console.error(err);
    });
    }
    render() {
        return (
        <div>
        <MenuNav/>
        <Segment>
        <Grid style={{ marginTop: '9em' }} columns={2} stackable>
            <Grid.Column>
                <Label color='blue' ribbon>
                Paciente
                </Label>
                <span>Datos del paciente</span>
                <List>
                    <List.Item>
                        <List.Content>
                            <List.Header>Nombre</List.Header>
                            <List.Description>{this.state.nombre}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>    
                        <List.Content>
                            <List.Header>Cédula</List.Header>
                            <List.Description>{this.state.cedula}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Edad</List.Header>
                            <List.Description>{this.state.edad}</List.Description>
                        </List.Content>
                    </List.Item>    
                    <List.Item>
                        <List.Content>
                            <List.Header>Sexo</List.Header>
                            <List.Description>{this.state.sexo}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Peso (kg)</List.Header>
                            <List.Description>{this.state.peso}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Altura (cm)</List.Header>
                            <List.Description>{this.state.altura}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>    
                        <List.Content>
                            <List.Header>Teléfono</List.Header>
                            <List.Description>{this.state.telefono}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Email</List.Header>
                            <List.Description>{this.state.email}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>    
                        <List.Content>
                            <List.Header>Dirección</List.Header>
                            <List.Description>{this.state.direccion}</List.Description>
                        </List.Content>
                    </List.Item>                    
                    <List.Item>    
                        <List.Content>
                            <List.Header>Ciudad</List.Header>
                            <List.Description>{this.state.ciudad}</List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item style={{ marginTop: '1em' }}>    
                    <List.Content>
                        <List.Description>
                            <Link to={`/VerEjercicios/${this.state._id}`}><Button primary  size='small' > Ejercicios</Button></Link>
                            <Link to="/Users"><Button >Regresar</Button></Link>
                        </List.Description>
                    </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
        </Grid> 
        </Segment>   
        </div>
        );
    }
}
const mapStateToProp =(state)=>{
    return{
        users: state.users.users
    };
}
export default connect(mapStateToProp,{getPatientbyId})(Ver);  