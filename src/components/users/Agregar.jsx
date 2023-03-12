import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid } from 'semantic-ui-react';
import {crearUser} from "../../actions/usersAction";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';


class Agregar extends Component {

    state ={
        nombre: "",
        cedula: "",
        telefono: "",
        email: "",
        password:"",
        tipo:"fisioterapeuta"
    };
    handleSubmit = (e) => {
        e.preventDefault();
        
        //fetch('http://localhost:5000/createUser', {
        fetch('https://server.ubicu.co/createUser', {
            method: 'POST',
            body: JSON.stringify(this.state),
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
            console.log(resp);
            alert('Usuario creado');
            this.props.history.push("/");
        })
        .catch(err => {
            console.log(err);
            alert('Error al crear usuario');
        });
        
    }
    
    changeInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    render() {
        return (
            <div>
                <MenuNav/>
                <Grid style={{ marginTop: '7em' }} columns={1}>
                <Grid.Column>
                <Segment raised>
                    <Label color='teal' ribbon>
                    Registro de Usuario
                    </Label>
                    <Form style={{ marginTop: '1em' }}>
                        <Form.Field>
                        <label>Nombre</label>
                        <input  name="nombre"
                            placeholder='Nombre'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Cédula</label>
                        <input 
                            name="cedula"
                            placeholder='Cédula'
                            type='number'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Teléfono</label>
                        <input 
                            name="telefono"
                            placeholder='Teléfono'
                            type='number'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Email</label>
                        <input 
                            name="email"
                            placeholder='Email'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Contraseña</label>
                        <input 
                            name="password"
                            placeholder='Contraseña'
                            type='password'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Button onClick={this.handleSubmit} primary type='submit'>Agregar</Button>
                        <Link to="/"><Button type='submit'>Regresar</Button></Link>
                    </Form>
                </Segment>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(null,{crearUser})(Agregar);