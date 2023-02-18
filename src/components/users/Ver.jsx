import React, { Component } from 'react';
import {Grid,Label,Segment,List,Icon, Card, Image, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";


class Ver extends Component {
    state ={};
    componentDidMount(){
    const users = this.props.users.filter(p=>p.cedula == this.props.cc );    
    this.setState(users[0]);
    console.log(this.props.users);
    console.log(this.props.cc);
    console.log(users);

    }
    render() {
        return (
        <div>
        <MenuNav/>
        <Segment>
        <Grid style={{ marginTop: '9em' }} columns={2} stackable>
            <Grid.Column>
            <Segment>
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
                        <List.Header></List.Header>
                        <List.Description>
                            <Link to={`/VerEjercicios/${this.state._id}`}><Button primary  size='small' > Ejercicios</Button></Link>
                            <Link to={`/AgregarEjercicio/${this.state._id}`}><Button floated='left' icon labelPosition='left' primary  size='small'><Icon name='clipboard' />Agregar</Button></Link>
                            <Link to="/Users"><Button >Regresar</Button></Link>
                        </List.Description>
                    </List.Content>
                    </List.Item>
                </List>
            </Segment>
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
export default connect(mapStateToProp,null)(Ver);  