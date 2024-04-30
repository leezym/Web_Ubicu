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

        e.target.disabled = true;

        const { crearUser, history } = this.props;
        const { nombre, cedula, telefono, email, password } = this.state;

        crearUser({
            nombre,
            cedula,
            telefono,
            email,
            password
        }).then(resp => {
            e.target.disabled = false;
            alert('Fisioterapeuta creado');
            history.push('/');
        })
        .catch(err => {
            e.target.disabled = false;
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
                        <label>Nombre *</label>
                        <input 
                            name="nombre"
                            placeholder='Nombre'
                            type='text'
                            onChange={this.changeInput}
                            required/>
                        </Form.Field>
                        <Form.Field>
                        <label>Cédula *</label>
                        <input 
                            name="cedula"
                            placeholder='Cédula'
                            type='number'
                            min="1"
                            max="9999999999"
                            step="1"
                            onChange={this.changeInput}
                            required/>
                        </Form.Field>
                        <Form.Field>
                        <label>Teléfono *</label>
                        <input 
                            name="telefono"
                            placeholder='Teléfono'
                            type='number'
                            min="1000000000"
                            max="9999999999"
                            step="1"
                            onChange={this.changeInput}
                            required/>
                        </Form.Field>
                        <Form.Field>
                        <label>Correo *</label>
                        <input 
                            name="email"
                            placeholder='Correo'
                            type='email'
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange={this.changeInput}
                            required/>
                        </Form.Field>
                        <Form.Field>
                        <label>Contraseña *</label>
                        <Input 
                            name="password"
                            placeholder='Contraseña'
                            type={showPassword ? 'text' : 'password'}
                            minLength="8"
                            pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                            onChange={this.changeInput}
                            required
                            icon={<Icon name={showPassword ? 'eye' : 'eye slash'} link onClick={this.togglePasswordVisibility} />}
                        />
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