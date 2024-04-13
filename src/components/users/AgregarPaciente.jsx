import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid } from 'semantic-ui-react';
import {crearPatient} from "../../actions/patientsAction";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import ciudades from '../../colombia.json';

class AgregarPaciente extends Component {
    state = {
        nombre: "",
        cedula: "",
        telefono: "",
        email: "",
        edad: "",
        sexo: "",
        peso: "",
        altura: "",
        direccion: "",
        ciudad:"",
        password: "",
        id_user: this.props.id_user
    };
    
    handleSave = (e) => {
        e.preventDefault();
        const { crearPatient, history, id_user } = this.props;
        const { nombre, cedula, telefono, email, edad, sexo, peso, altura, direccion, ciudad } = this.state;
        if (!nombre || !cedula || !telefono || !email || !edad || !sexo || !peso || !altura || !direccion || !ciudad ) {
            alert('Por favor proporcione la información requerida');
            return;
        }
        
        crearPatient({
            nombre,
            cedula,
            telefono,
            email,
            edad,
            sexo,
            peso,
            altura,
            direccion,
            ciudad,
            password: (telefono % 10000).toString(),
            id_user: id_user
        }).then(resp => {
            alert('Paciente creado');
            history.push(`/Users/${id_user}`);
            
            fetch('https://server.ubicu.co/getPatientbyCc', {
            //fetch('http://localhost:5000/getPatientbyCc', {
                method: 'POST',
                body: JSON.stringify({cedula}),
                headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
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
                fetch('https://server.ubicu.co/createRewards', {
                //fetch('http://localhost:5000/createRewards', {
                    method: 'POST',
                    body: JSON.stringify({
                        all_badges_array: "0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;", //7 isnignias por 4 items
                        session_reward: 0,
                        day_reward: 0,
                        total_reward: 0,
                        total_series: 0,
                        total_sessions: 0,
                        total_days: 0,
                        total_weeks: 0,
                        id_patient: resp.cedula
                    }),
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
                .catch(err => {
                        console.error(err);
                });

                fetch('https://server.ubicu.co/createCustomizations', {
                //fetch('http://localhost:5000/createCustomizations', {
                    method: 'POST',
                    body: JSON.stringify({
                        id_customization: 0,
                        id_item_fondos_array: "0,-1,-1,-1,-1", //5 temas, el primero es gratis
                        id_item_figuras_array: "0,-1,-1,-1,-1", //5 temas, el primero es gratis
                        all_fondos_items_array: "1,1,1;0,0,0;0,0,0;0,0,0;0,0,0;", //3 items por cada 5 temas, el primero es gratis
                        all_figuras_items_array: "1,1,1;0,0,0;0,0,0;0,0,0;0,0,0;", //3 items por cada 5 temas, el primero es gratis
                        id_patient: resp.cedula
                    }),
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
                .catch(err => {
                        console.error(err);
                });
            })
            .catch(err => {
                    console.error(err);
            });

        })
        .catch(err => {
            console.log(err);
            alert('Error al crear paciente');
        });
    };
    
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
                            <option value="-">Seleccione una opción</option>
                            <option value="F">Femenino</option>
                            <option value="M">Masculino</option>
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
                            type='email'
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
                        <select name="ciudad" onChange={this.changeInput}>
                            <option value="-">Seleccione una opción</option>
                            {
                            ciudades.map((lugar, index) => (
                                lugar.ciudades.map((ciudad, index) => (
                                    <option key={index} value={ciudad+", "+lugar.departamento}>
                                        {ciudad+", "+lugar.departamento}
                                    </option>
                                    
                                ))                            
                            ))}
                        </select>
                        </Form.Field>
                        <Button onClick={this.handleSave} primary type='submit'>Agregar</Button>
                        <Link to={`/Users/${this.props.id_user}`}><Button type='submit'>Regresar</Button></Link>
                    </Form>
                </Segment>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(null,{crearPatient})(withRouter(AgregarPaciente));