import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid } from 'semantic-ui-react';
import {crearPatient} from "../../actions/patientsAction";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import ciudades from '../../colombia.json';
import AgregarEjercicio from "../ejercicios/Agregar";
import { URL } from '../../actions/url.js';

class AgregarPaciente extends Component {
    state = {
        createUser: false,
        nombre: "",
        cedula: "",
        telefono: "",
        email: "",
        edad: "",
        sexo: "-",
        peso: "",
        altura: "",
        direccion: "",
        ciudad:"-",
        password: "",
        id_user: this.props.id_user,
        id_patient: ""
    };
    
    handleSave = async (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const { crearPatient, id_user, } = this.props;
        const { nombre, cedula, telefono, email, edad, sexo, peso, altura, direccion, ciudad } = this.state;

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
            submitButton.disabled = false;
            alert('Paciente creado'); 
            
            fetch(URL+'getPatientbyCc', {
                method: 'POST',
                body: JSON.stringify({cedula}),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  return res.json().then(error => {
                    throw new Error(error.msg);
                  });
                }
            })
            .then(resp => {
                this.setState({
                    id_patient: resp._id,
                    createUser: true
                });

                fetch(URL+'createRewards', {
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
                        id_patient: resp._id
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    if (res.ok) {
                      return res.json();
                    } else {
                      return res.json().then(error => {
                        throw new Error(error.msg);
                      });
                    }
                })
                .catch(err => {
                    alert('Error al crear recompensas. ' + err.response.data.msg);
                });

                fetch(URL+'createCustomizations', {
                    method: 'POST',
                    body: JSON.stringify({
                        id_customization: 0,
                        id_item_fondos_array: "0,-1,-1,-1,-1", //5 temas, el primero es gratis
                        id_item_figuras_array: "0,-1,-1,-1,-1", //5 temas, el primero es gratis
                        all_fondos_items_array: "1,1,1;0,0,0;0,0,0;0,0,0;0,0,0;", //3 items por cada 5 temas, el primero es gratis
                        all_figuras_items_array: "1,1,1;0,0,0;0,0,0;0,0,0;0,0,0;", //3 items por cada 5 temas, el primero es gratis
                        id_patient: resp._id
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    if (res.ok) {
                      return res.json();
                    } else {
                      return res.json().then(error => {
                        throw new Error(error.msg);
                      });
                    }
                })
                .catch(err => {
                    alert('Error al crear personalización. ' + err.message);
                });
            })
            .catch(err => {
                alert('Error al consultar paciente. ' + err.message);
            });
        })
        .catch(err => {
            submitButton.disabled = false;
            alert('Error al crear paciente. ' + err.message);           
        });
    };
    
    changeInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    render() {
        const { id_patient, id_user } = this.state;

        return (
            <div>
                <MenuNav/>
                <Grid style={{ marginTop: '7em' }} columns={1}>
                <Grid.Column>
                    {
                        !this.state.createUser ? 
                        <Segment raised>
                            <Label ribbon style={{color:"#28367b"}}>
                            Registrar Paciente
                            </Label>
                            <Form onSubmit={this.handleSave} style={{ marginTop: '1em' }}>
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
                                <label>Cedula *
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
                                <label>Edad *
                                    <input 
                                        name="edad"
                                        placeholder='Edad'
                                        type='number'
                                        min="1"
                                        max="100"
                                        step="1"
                                        onChange={this.changeInput}
                                        autocomplete='number'
                                        required/>
                                </label>
                                </Form.Field>
                                <Form.Field>
                                <label>Sexo *
                                    <select
                                        name="sexo"
                                        onChange={this.changeInput}
                                        required>                                        
                                        <option value="-">Seleccione una opción</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                </label>
                                </Form.Field>
                                <Form.Field>
                                <label>Peso (kg)
                                    <input 
                                        name="peso"
                                        placeholder='Peso'
                                        type='number'
                                        min="1"
                                        max="999"
                                        step="0.01"
                                        onChange={this.changeInput}
                                        autocomplete='number'
                                        required/>
                                </label>
                                </Form.Field>
                                <Form.Field>
                                <label>Altura (cm)
                                    <input 
                                        name="altura"
                                        placeholder='Altura'
                                        type='number'
                                        min="1"
                                        max="999"
                                        step="1"
                                        onChange={this.changeInput}
                                        autocomplete='number'
                                        required/>
                                </label>
                                </Form.Field>
                                <Form.Field>
                                <label>Teléfono
                                    <input 
                                        name="telefono"
                                        placeholder='Teléfono'
                                        type='tel'
                                        onChange={this.changeInput}
                                        autocomplete='tel'
                                        required/>
                                </label>
                                </Form.Field>
                                <Form.Field>
                                <label>Correo
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
                                <label>Dirección
                                    <input 
                                        name="direccion"
                                        placeholder='Dirección'
                                        type='text'
                                        onChange={this.changeInput}
                                        autocomplete='text'
                                        required/>
                                </label>
                                </Form.Field>
                                <Form.Field>
                                <label>Ciudad
                                    <select
                                        name="ciudad"
                                        onChange={this.changeInput}
                                        required>
                                        <option value="-">Seleccione una opción</option>
                                        {
                                        ciudades.map((lugar, index) => (
                                            lugar.ciudades.map((ciudad, index) => (
                                                <option key={index} value={lugar.departamento+", "+ciudad}>
                                                    {lugar.departamento+", "+ciudad}
                                                </option>
                                                
                                            ))                            
                                        ))}
                                    </select>
                                </label>
                                </Form.Field>
                                <Button type='submit' style={{ backgroundColor: '#46bee0', color:"white" }}>Agregar</Button>
                                <Link to={`/Users/${this.props.id_user}`}><Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                            </Form>
                        </Segment>
                        :
                        <AgregarEjercicio id_patient={id_patient} nombre_terapia={"Predeterminado"} id_user={id_user}/>
                    }
                
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(null,{crearPatient})(withRouter(AgregarPaciente));