import React, { Component } from 'react';
import { Grid, Label, Segment, Button, Icon, Form, Card} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import MenuNav from '../pages/MenuNav';
import { connect } from 'react-redux';
import { updatePatient } from '../../actions/patientsAction';


class Ver extends Component {
    state = {
        readOnly: true,
        original: {},
        patient: {}
    };

    componentDidMount() {
        const { id_patient } = this.props;
        fetch('https://server.ubicu.co/getPatientbyId', {
        //fetch('http://localhost:5000/getPatientbyId', {
            method: 'POST',
            body: JSON.stringify({id_patient}),
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
            const patient = resp;
            this.setState({ patient });
        })
        .catch(err => {
                console.error(err);
        });

    }

    handleEdit (value) {
        this.setState({ readOnly: value });
    }

    handleSave = (e) => {
        this.handleEdit(true);
        e.preventDefault();
        const { patient } = this.state;
        patient.password = (patient.telefono % 10000).toString();
        console.log(patient);
        this.props.updatePatient(patient);
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
            <Segment>
            <Grid style={{ marginTop: '9em' }} stackable>
                <Grid.Column>
                    <Label color='blue' ribbon>
                    Paciente
                    </Label>
                    <span>Datos del paciente</span>
                    <Card fluid color="blue" >
                        <Card.Content >
                            <Card.Description width="100%">                        
                                <Form onSubmit={this.handleSave}>
                                    <Form.Group >
                                        <Form.Field>
                                        <label>Nombre</label>
                                        <input  name="nombre"
                                            placeholder='Nombre'
                                            type='text'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.nombre : null}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Cédula</label>
                                        <input  name="cedula"
                                            placeholder='Cédula'
                                            type='number'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.cedula : null}/>
                                        </Form.Field>
                                    </Form.Group >
                                    <Form.Group >
                                        <Form.Field>
                                        <label>Edad</label>
                                        <input  name="edad"
                                            placeholder='Edad'
                                            type='number'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.edad : null}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Sexo</label>
                                        <select name="sexo" value={readOnly ? patient.sexo : null} disabled={readOnly} onChange={this.changeInput}>
                                            <option value="-">Seleccione una opción</option>
                                            <option value="F">Femenino</option>
                                            <option value="M">Masculino</option>
                                        </select>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Peso (kg)</label>
                                        <input  name="peso"
                                            placeholder='Peso'
                                            type='number'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.peso : null}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Altura (cm)</label>
                                        <input  name="altura"
                                            placeholder='Altura'
                                            type='number'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.altura : null}/>
                                        </Form.Field>
                                    </Form.Group >
                                    <Form.Group >
                                        <Form.Field>
                                        <label>Teléfono</label>
                                        <input  name="telefono"
                                            placeholder='Teléfono'
                                            type='number'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.telefono : null}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Email</label>
                                        <input  name="email"
                                            placeholder='Email'
                                            type='email'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.email : null}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Dirección</label>
                                        <input  name="direccion"
                                            placeholder='Dirección'
                                            type='text'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.direccion : null}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Ciudad</label>
                                        <input  name="ciudad"
                                            placeholder='Ciudad'
                                            type='text'
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? patient.ciudad : null}/>
                                        </Form.Field>
                                    </Form.Group >
                                </Form>
                            </Card.Description>
                            <Card.Content >
                                { readOnly ?
                                    <Button onClick={()=>{this.handleEdit(false); this.copyOriginal()}} floated='left' icon labelPosition='left' primary  size='small'><Icon name='clipboard' />Editar</Button>
                                    :
                                    <>
                                        <Button onClick={this.handleSave} type="submit" floated='left' icon labelPosition='left' primary size='small'><Icon name='clipboard' />Guardar</Button>
                                        <Button onClick={()=>{this.handleEdit(true); this.pasteOriginal()}} type='submit'>Cancelar</Button>
                                    </>
                                }
                            </Card.Content>
                        </Card.Content >
                    </Card>
                        <Link to={`/VerEjercicios/${patient._id}`}><Button primary  size='small' > Ejercicios</Button></Link>
                        <Link to={`/Users/${patient.id_user}`}><Button >Regresar</Button></Link>
                    </Grid.Column>            
                </Grid> 
            </Segment>   
        </div>
        );
    }
}
export default withRouter(connect(null, { updatePatient })(Ver));