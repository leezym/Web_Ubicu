import React, { Component } from 'react';
import { Grid, Label, Segment, Button, Form, Card, Confirm} from 'semantic-ui-react';
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
        patient: {},
        departamento: "",
        ciudad: "",
        openConfirm: false,
        confirmMessage: '',
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
            if (patient.ciudad) {
                const [dep, city] = patient.ciudad.split(', ');
                this.setState({
                    departamento: dep || "",
                    ciudad: city || ""
                })
            } else {
                this.setState({
                    departamento: "",
                    ciudad: ""
                })
            }
            this.setState({ patient });
        })
        .catch(err => {
            this.setState({
                openConfirm: true,
                confirmMessage: 'Error al consultar paciente. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
        });
    }

    handleEdit (value) {
        this.setState({ readOnly: value });
    }

    handleSave = (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        
        const { patient, departamento, ciudad } = this.state;

        this.handleEdit(true);
        patient.password = (patient.telefono % 10000).toString();        
        patient.ciudad = `${departamento}, ${ciudad}`;
        
        this.props.updatePatient(patient).then(resp => {
            submitButton.disabled = false;
            this.setState({
                openConfirm: true,
                confirmMessage: 'Paciente actualizado.'
            });
        }).catch(err => {
            submitButton.disabled = false;
            this.setState({
                openConfirm: true,
                confirmMessage: 'Error al actualizar paciente. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
        });
    }

    copyOriginal = () => {
        this.setState({
            original: {
                ...this.state.patient,
                departamento: this.state.departamento,
                ciudad: this.state.ciudad
            }
        });
    }

    pasteOriginal = () => {
        this.setState({
            patient: {
                ...this.state.original
            },
            departamento: this.state.original.departamento,
            ciudad: this.state.original.ciudad
        });
    }

    changeInput = (event) => {
        const { name, value } = event.target;
        this.setState({
            patient: {
            ...this.state.patient,
            [name]: value
          }
        });
        if (name === "departamento") {
            this.setState({
                ...this.state,
                departamento: value,
                ciudad: ""
            });
        }
        if (name === "ciudad") {
            this.setState({
                ...this.state,
                ciudad: value
            });
        }
    }

    handleCancel = () => {
        this.setState({ openConfirm: false });
    };

    render() {
        const { readOnly, patient, departamento, ciudad, openConfirm, confirmMessage } = this.state;
        const availableCities = departamento !== "" ? ciudades.find(l => l.departamento === departamento)?.ciudades || [] : [];

        return (
            <>
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
                                                <label>Nombre *</label>
                                                <input
                                                    name="nombre"
                                                    placeholder='Nombre'
                                                    type='text'
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.nombre}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field >
                                                <label>Cédula *</label>
                                                <input
                                                    name="cedula"
                                                    placeholder='Cédula'
                                                    type='number'
                                                    min="1"
                                                    max="9999999999"
                                                    step="1"
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.cedula}
                                                    required/>
                                                </Form.Field>
                                            </Form.Group >
                                            <Form.Group widths='equal'>
                                                <Form.Field>
                                                <label>Edad *</label>
                                                <input
                                                    name="edad"
                                                    placeholder='Edad'
                                                    type='number'
                                                    min="1"
                                                    max="100"
                                                    step="1"
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.edad}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Sexo *</label>
                                                <select
                                                    name="sexo"
                                                    value={patient.sexo}
                                                    disabled={readOnly}
                                                    onChange={this.changeInput}
                                                    required>
                                                    <option value="">Seleccione una opción</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="M">Masculino</option>
                                                </select>
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Peso (kg) *</label>
                                                <input
                                                    name="peso"
                                                    placeholder='Peso'
                                                    type='number'
                                                    min="1"
                                                    max="999"
                                                    step="0.01"
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.peso}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Altura (cm) *</label>
                                                <input
                                                    name="altura"
                                                    placeholder='Altura'
                                                    type='number'
                                                    min="1"
                                                    max="999"
                                                    step="1"
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.altura}
                                                    required/>
                                                </Form.Field>
                                            </Form.Group >
                                            <Form.Group widths='equal'>
                                                <Form.Field style={{ width: '400px' }}>
                                                <label>Teléfono *</label>
                                                <input
                                                    name="telefono"
                                                    placeholder='Teléfono'
                                                    type='number'
                                                    min="1000000000"
                                                    max="9999999999"
                                                    step="1"
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.telefono}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field style={{ width: '800px' }}>
                                                <label>Correo *</label>
                                                <input
                                                    name="email"
                                                    placeholder='Correo'
                                                    type='email'
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.email}
                                                    required/>
                                                </Form.Field>
                                            </Form.Group >
                                            <Form.Group widths='equal' style={{ marginBottom: '20px' }}>
                                                <Form.Field >
                                                <label>Dirección *</label>
                                                <input
                                                    name="direccion"
                                                    placeholder='Dirección'
                                                    type='text'
                                                    onChange={this.changeInput}
                                                    disabled={readOnly}
                                                    value={patient.direccion}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field >
                                                <label>Departamento *</label>
                                                <select
                                                    name="departamento"
                                                    value={departamento}
                                                    disabled={readOnly}
                                                    onChange={this.changeInput}
                                                    required>
                                                    <option value="">Seleccione un departamento</option>
                                                    {
                                                    ciudades.map((lugar, index) => (
                                                        <option key={index} value={lugar.departamento}>
                                                            {lugar.departamento}
                                                        </option>
                                                    ))}
                                                </select>
                                                </Form.Field>
                                                <Form.Field >
                                                <label>Ciudad *</label>
                                                <select
                                                    name="ciudad"
                                                    value={ciudad}
                                                    disabled={readOnly}
                                                    onChange={this.changeInput}
                                                    required>
                                                    <option value="">Seleccione una ciudad</option>
                                                    {
                                                    availableCities.map((ciudad, index) => (
                                                        <option key={index} value={ciudad}>
                                                            {ciudad}
                                                        </option>
                                                    ))}
                                                </select>
                                                </Form.Field>
                                            </Form.Group >
                                            { readOnly ?
                                                <Button onClick={()=>{ this.handleEdit(false); this.copyOriginal(); }} type="button" style={{ backgroundColor: '#46bee0', color:"white" }}>Editar</Button>
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
                                <Link to={{ pathname: `/VerEjercicios/${patient._id}`, state: { id_user: patient.id_user }}}>
                                    <Button style={{ backgroundColor: '#46bee0', color:"white" }}>Ejercicios</Button>
                                </Link>
                                <Link to={`/Fisioterapeuta/${patient.id_user}`}>
                                    <Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button>
                                </Link>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Confirm
                    open={openConfirm}
                    content={confirmMessage}
                    confirmButton='Aceptar'
                    cancelButton={null}
                    onConfirm={this.handleCancel}
                />
            </>
        );
    }
}
export default withRouter(connect(null, { updatePatient })(Ver));