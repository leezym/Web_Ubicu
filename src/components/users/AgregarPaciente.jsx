import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid } from 'semantic-ui-react';
import {crearPatient} from "../../actions/patientsAction";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';


class AgregarPaciente extends Component {

    state ={
        nombre: "",
        cedula: "",
        telefono: "",
        email: "",
        tipo:"paciente",
        edad: "",
        sexo: "",
        peso: "",
        altura: "",
        direccion: "",
        ciudad:"",
        password: ""
    };
    handleSave = (e) => {
        e.preventDefault();
        this.state.password = this.state.telefono % 10000;
        this.props.crearPatient(JSON.stringify(this.state)).then(resp => {
            console.log(resp);
            alert('Paciente creado');
            this.props.history.push("/Users");
        })
        .catch(err => {
            console.log(err);
            alert('Error al crear paciente');
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
                        <input  name="nombre" placeholder='Nombre' onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Cedula</label>
                        <input 
                            name="cedula"
                            placeholder='Cédula'
                            type='number'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Edad</label>
                        <input 
                            name="edad"
                            placeholder='Edad'
                            type='number'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Sexo</label>
                        <select name="sexo" onChange={this.changeInput}>
                            <option value="-">Select option</option>
                            <option value="F">Femenino</option>
                            <option value="M">Masculino</option>
                            <option value="O">Otro</option>
                        </select>
                        </Form.Field>
                        <Form.Field>
                        <label>Peso (kg)</label>
                        <input 
                            name="peso"
                            placeholder='Peso'
                            type='number'
                            onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Altura (cm)</label>
                        <input 
                            name="altura"
                            placeholder='Altura'
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
                        <label>Dirección</label>
                        <input  name="direccion"
                                placeholder='Dirección'
                                onChange={this.changeInput} />
                        </Form.Field>
                        <Form.Field>
                        <label>Ciudad</label>
                        <input  name="ciudad"
                                placeholder='Ciudad'
                                onChange={this.changeInput} />
                        </Form.Field>
                        <Button onClick={this.handleSave} primary type='submit'>Agregar</Button>
                        <Link to="/Users"><Button type='submit'>Regresar</Button></Link>
                    </Form>
                </Segment>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(null,{crearPatient})(AgregarPaciente);