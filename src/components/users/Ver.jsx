import React, { Component } from 'react';
import { Grid, Label, Segment, Button, Form, Card} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import MenuNav from '../pages/MenuNav';
import { connect } from 'react-redux';
import { updatePatient } from '../../actions/patientsAction';
import ciudades from '../../colombia.json';
import { URL } from '../../actions/url.js';

class Ver extends Component {
    state = {
        readOnly: true,
        original: {},
        patient: {}
    };

    componentDidMount() {
        const { id_patient } = this.props;
        fetch(URL+'getPatientbyId', {
            method: 'POST',
            body: JSON.stringify({id_patient}),
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
            const patient = resp;
            this.setState({ patient });
        })
        .catch(err => {
            alert('Error al consultar paciente. ' + err.response.data.msg);
        });
    }

    handleEdit (value) {
        this.setState({ readOnly: value });
    }

    handleSave = (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        
        const { patient } = this.state;

        this.handleEdit(true);
        patient.password = patient.telefono.toString().slice(-4);
        this.props.updatePatient(patient).then(resp => {
            submitButton.disabled = false;
            alert('Paciente actualizado.');
        }).catch(err => {
            submitButton.disabled = false;
            alert('Error al actualizar paciente. ' + err.response.data.msg);         
        });
    }

    copyOriginal = () => {
        this.setState({
            original: {
                ...this.state.patient
            }
        });
    }

    pasteOriginal = () => {
        this.setState({
            patient: {
                ...this.state.original
            }
        });
    }

    changeInput = (event) => {
        this.setState({
            patient: {
            ...this.state.patient,
            [event.target.name]: event.target.value
          }
        });
    }

    render() {
        const { readOnly, patient } = this.state;

        return (
            <div>
                <MenuNav/>
                <Segment style={{ marginTop: '6em' }} >
                    <Grid stackable>
                        <Grid.Column>
                            <Label ribbon style={{color:"#28367b"}}>
                            Paciente
                            </Label>
                            <Card fluid color="blue" >
                                <Card.Content >
                                    <Card.Description width="100%">                        
                                        <Form onSubmit={this.handleSave}>
                                            <Form.Group widths='equal'>
                                                <Form.Field >
                                                <label>Nombre *
                                                    <input  
                                                        name="nombre"
                                                        placeholder='Nombre'
                                                        type='text'
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.nombre : null}
                                                        autocomplete='text'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                                <Form.Field >
                                                <label>Cédula *
                                                    <input  
                                                        name="cedula"
                                                        placeholder='Cédula'
                                                        type='number'
                                                        min="1"
                                                        max="9999999999"
                                                        step="1"
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.cedula : null}
                                                        autocomplete='number'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                            </Form.Group >
                                            <Form.Group widths='equal'>
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
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.edad : null}
                                                        autocomplete='number'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Sexo *
                                                    <select
                                                        name="sexo" 
                                                        value={readOnly ? patient.sexo : null} 
                                                        disabled={readOnly} 
                                                        onChange={this.changeInput}
                                                        required>
                                                        <option value="-">Seleccione una opción</option>
                                                        <option value="F">Femenino</option>
                                                        <option value="M">Masculino</option>
                                                    </select>
                                                </label>
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Peso (kg) *
                                                    <input  
                                                        name="peso"
                                                        placeholder='Peso'
                                                        type='number'
                                                        min="1"
                                                        max="999"
                                                        step="0.01"
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.peso : null}
                                                        autocomplete='number'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Altura (cm) *
                                                    <input  
                                                        name="altura"
                                                        placeholder='Altura'
                                                        type='number'
                                                        min="1"
                                                        max="999"
                                                        step="1"
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.altura : null}
                                                        autocomplete='number'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                            </Form.Group >
                                            <Form.Group widths='equal'>
                                                <Form.Field style={{ width: '400px' }}>
                                                <label>Teléfono *
                                                    <input
                                                        name="telefono"
                                                        placeholder='Teléfono'
                                                        type='tel'
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.telefono : null}
                                                        autocomplete='tel'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                                <Form.Field style={{ width: '800px' }}>
                                                <label>Correo *
                                                    <input 
                                                        name="email"
                                                        placeholder='Correo'
                                                        type='email'
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.email : null}
                                                        autocomplete='email'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                            </Form.Group >
                                            <Form.Group widths='equal' style={{ marginBottom: '20px' }}>
                                                <Form.Field >
                                                <label>Dirección *
                                                    <input  
                                                        name="direccion"
                                                        placeholder='Dirección'
                                                        type='text'
                                                        onChange={this.changeInput}
                                                        disabled={readOnly}
                                                        value={readOnly ? patient.direccion : null}
                                                        autocomplete='text'
                                                        required/>
                                                </label>
                                                </Form.Field>
                                                <Form.Field >
                                                <label>Ciudad *
                                                    <select 
                                                        name="ciudad" 
                                                        value={readOnly ? patient.ciudad : null} 
                                                        disabled={readOnly} 
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
                                            </Form.Group >
                                            { readOnly ?
                                                <Button onClick={()=>{ this.handleEdit(false); this.copyOriginal(); }} type="button" style={{ backgroundColor: '#eb5a25', color:"white" }}>Editar</Button>
                                                :
                                                <>
                                                    <Button type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Guardar</Button>
                                                    <Button onClick={()=>{this.handleEdit(true); this.pasteOriginal(); }} type='button' style={{ backgroundColor: '#eb5a25', color:"white" }}>Cancelar</Button>
                                                </>
                                            }
                                        </Form>
                                    </Card.Description>
                                </Card.Content >
                            </Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link to={`/VerEjercicios/${patient._id}`}>
                                    <Button style={{ backgroundColor: '#46bee0', color:"white" }}>Ejercicios</Button>
                                </Link>
                                <Link to={`/Users/${patient.id_user}`}>
                                    <Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button>
                                </Link>
                            </div>
                        </Grid.Column>            
                    </Grid> 
                </Segment>   
            </div>
        );
    }
}
export default withRouter(connect(null, { updatePatient })(Ver));