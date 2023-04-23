import React, { Component } from 'react';
import { Grid, Label, Segment, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MenuNav from '../pages/MenuNav';
import { connect } from 'react-redux';


class Ver extends Component {
    state = {};

    componentDidMount() {
        if(this.props.users.length !== 0)
        {
            const user = this.props.users.find((user) => user._id === this.props.id_patient);
            this.setState({ ...user });
            localStorage.setItem('paciente', JSON.stringify(user));
        }
        else if (localStorage.getItem('paciente'))
            this.setState(JSON.parse(localStorage.getItem('paciente')));
    }

    render() {
        const { nombre, cedula, edad, sexo, peso, altura, telefono, email, direccion, ciudad, _id, id_user } = this.state;
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
                            <List.Description>{nombre}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>    
                        <List.Content>
                            <List.Header>Cédula</List.Header>
                            <List.Description>{cedula}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Edad</List.Header>
                            <List.Description>{edad}</List.Description>
                        </List.Content>
                    </List.Item>    
                    <List.Item>
                        <List.Content>
                            <List.Header>Sexo</List.Header>
                            <List.Description>{sexo}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Peso (kg)</List.Header>
                            <List.Description>{peso}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Altura (cm)</List.Header>
                            <List.Description>{altura}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>    
                        <List.Content>
                            <List.Header>Teléfono</List.Header>
                            <List.Description>{telefono}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Email</List.Header>
                            <List.Description>{email}</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>    
                        <List.Content>
                            <List.Header>Dirección</List.Header>
                            <List.Description>{direccion}</List.Description>
                        </List.Content>
                    </List.Item>                    
                    <List.Item>    
                        <List.Content>
                            <List.Header>Ciudad</List.Header>
                            <List.Description>{ciudad}</List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item style={{ marginTop: '1em' }}>    
                    <List.Content>
                        <List.Description>
                            <Link to={`/VerEjercicios/${_id}`}><Button primary  size='small' > Ejercicios</Button></Link>
                            <Link to={`/Users/${id_user}`}><Button >Regresar</Button></Link>
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
export default connect(mapStateToProp, null)(Ver);