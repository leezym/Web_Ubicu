import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid, Confirm } from 'semantic-ui-react';
import {crearPatient} from "../../actions/patientsAction";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import ciudades from '../../colombia.json';
import { URL } from '../../actions/url.js';

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
        departamento: "",
        ciudad:"",
        password: "",
        id_user: this.props.id_user,
        openConfirm: false,
        confirmMessage: '',
    };
    
    handleSave = async (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        try {
            const { crearPatient, id_user } = this.props;
            const {
                nombre, cedula, telefono, email,
                edad, sexo, peso, altura, direccion, departamento, ciudad
            } = this.state;

            const resp = await crearPatient({
                nombre,
                cedula,
                telefono,
                email,
                edad,
                sexo,
                peso,
                altura,
                direccion,
                ciudad: `${departamento}, ${ciudad}`,
                password: (telefono % 10000).toString(),
                id_user
            });

            this.setState({
                openConfirm: true,
                confirmMessage: 'Paciente creado',
            });

            this.props.history.push({
                pathname: `/AgregarEjercicio/${resp._id}`,
                nombre_terapia: "Predeterminado",
                state: { id_user }
            });

        } catch (err) {
            this.setState({
                openConfirm: true,
                confirmMessage:
                    'Error al crear paciente. ' +
                    (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
        } finally {
            submitButton.disabled = false;
        }
    };
    
    changeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        if (name === "departamento") {
            this.setState({ ciudad: "" });
        }
    }

    handleCancel = () => {
        this.setState({ openConfirm: false });
    };

    render() {
        const { id_user, openConfirm, confirmMessage, departamento } = this.state;
        const availableCities = departamento !== "" ? ciudades.find(l => l.departamento === departamento)?.ciudades || [] : [];

        return (
            <>
                <MenuNav/>
                <Grid stackable style={{ marginTop: '3em' }} columns={1}>
                    <Grid.Column>
                        <Segment raised>
                            <Label ribbon style={{color:"#28367b"}}>
                            Registrar Paciente
                            </Label>
                            <Form onSubmit={this.handleSave} style={{ marginTop: '1em' }}>
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
                                <label>Cedula *</label>
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
                                <label>Edad *</label>
                                <input 
                                    name="edad"
                                    placeholder='Edad'
                                    type='number'
                                    min="1"
                                    max="100"
                                    step="1"
                                    onChange={this.changeInput}
                                    required/>
                                </Form.Field>
                                <Form.Field>
                                <label>Sexo *</label>
                                <select
                                    name="sexo"
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
                                <label>Dirección *</label>
                                <input
                                    name="direccion"
                                    placeholder='Dirección'
                                    type='text'
                                    onChange={this.changeInput}
                                    required/>
                                </Form.Field>
                                <Form.Field>
                                <label>Departamento *</label>
                                <select
                                    name="departamento"
                                    value={departamento}
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
                                <Form.Field>
                                <label>Ciudad *</label>
                                <select
                                    name="ciudad"
                                    value={this.state.ciudad}
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
                                
                                <Button type='submit' style={{ backgroundColor: '#46bee0', color:"white" }}>Agregar</Button>
                                <Link to={`/Fisioterapeuta/${id_user}`}><Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
                
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

export default connect(null,{crearPatient})(withRouter(AgregarPaciente));