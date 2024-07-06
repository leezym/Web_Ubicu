import React, { Component } from 'react';
import { Form,Button,Segment,Label,Grid, Icon, Input } from 'semantic-ui-react';
import {crearUser} from "../../actions/usersAction";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

class Agregar extends Component {

    state = {
        nombre: "",
        cedula: "",
        telefono: "",
        email: "",
        password:"",
        showPassword: false
    };

    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };
    
    handleSave = async (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const { crearUser, history } = this.props;
        const { nombre, cedula, telefono, email, password } = this.state;

        crearUser({
            nombre,
            cedula,
            telefono,
            email,
            password
        }).then(resp => {
            submitButton.disabled = false;
            alert('Fisioterapeuta creado');
            history.push('/');
        })
        .catch(err => {
            submitButton.disabled = false;
            alert('Error al crear el usuario. ' + err.response.data.msg);
        });
    };
    
    changeInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    
    render() {
        const { showPassword } = this.state;

        return (
            <div>
                <Grid style={{ marginTop: '3em' }} columns={1}>
                <Grid.Column>
                <Segment raised>
                    <Label ribbon style={{color:"#28367b"}}>
                    Registro de Fisioterapeuta
                    </Label>
                    <Form style={{ marginTop: '1em' }} onSubmit={this.handleSave}>
                        <Form.Field>
                        <label>Nombre *
                            <input 
                                name="nombre"
                                placeholder='Nombre'
                                type='text'
                                onChange={this.changeInput}
                                autocomplete='text'
                                required/>
                        </label>
                        </Form.Field>
                        <Form.Field>
                        <label>Cédula *
                            <input 
                                name="cedula"
                                placeholder='Cédula'
                                type='number'
                                min="1"
                                max="9999999999"
                                step="1"
                                onChange={this.changeInput}
                                autocomplete='number'
                                required/>
                        </label>
                        </Form.Field>
                        <Form.Field>
                        <label>Teléfono *
                            <input 
                                name="telefono"
                                placeholder='Teléfono'
                                type='tel'
                                min="1000000000"
                                max="9999999999"
                                step="1"
                                onChange={this.changeInput}
                                autocomplete='tel'
                                required/>
                        </label>
                        </Form.Field>
                        <Form.Field>
                        <label>Correo *
                            <input 
                                name="email"
                                placeholder='Correo'
                                type='email'
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={this.changeInput}
                                autocomplete='email'
                                required/>
                        </label>
                        </Form.Field>
                        <Form.Field>
                        <label>Contraseña *
                            <Input 
                                name="password"
                                placeholder='Contraseña'
                                type={showPassword ? 'text' : 'password'}
                                minLength="8"
                                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                onChange={this.changeInput}
                                autocomplete='password'
                                required
                                icon={<Icon name={showPassword ? 'eye' : 'eye slash'} link onClick={this.togglePasswordVisibility} />}
                            />
                        </label>
                        <span style={{ color: 'blue', fontSize: 'small' }}>La contraseña debe contener al menos una mayúscula, un número y un carácter especial</span>                        
                        </Form.Field>
                        <Button type='submit' style={{ backgroundColor: '#46bee0', color:"white" }}>Agregar</Button>
                        <Link to="/"><Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                    </Form>
                </Segment>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(null, { crearUser })(Agregar);