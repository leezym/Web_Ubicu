import React, { Component } from 'react';
import {Button, Form, Card, Confirm} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";
import { updateEjercicio } from '../../actions/ejerciciosAction';


class Ejercicio extends Component {
    state = {
        readOnly: true,
        original: {},
        ejercicio: this.props.ejercicio,
        disabledEdit: false,
        openConfirm: false,
        confirmMessage: '',
        id_user: this.props.id_user
    };
    
    componentDidUpdate(prevProps) {
        if (prevProps.ejercicio !== this.props.ejercicio) {
            const { ejercicio } = this.props;
            const fechaInicio = moment(ejercicio.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD').toString();
            const fechaFin = moment(ejercicio.fecha_fin, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const isDisabled = moment(fechaFin).isBefore(moment(), 'day') && ejercicio.nombre !== "Predeterminado";

            this.setState({
                ejercicio: {
                    ...ejercicio,
                    fecha_inicio: fechaInicio
                },
                disabledEdit: isDisabled
            });
        }
    }
    
    componentDidMount() {
        const { ejercicio } = this.state;
        const fechaInicio = moment(ejercicio.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD').toString();
        const fechaFin = moment(ejercicio.fecha_fin, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const isDisabled = moment(fechaFin).isBefore(moment(), 'day') && ejercicio.nombre !== "Predeterminado";

        this.setState({
            disabledEdit: isDisabled,
            ejercicio: {
                ...this.state.ejercicio,
                fecha_inicio: fechaInicio
            }
        });
}

    handleEdit (value) {
        this.setState({ readOnly: value });
    }

    handleSave = (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const { ejercicio } = this.state;

        this.handleEdit(true);
        ejercicio.fecha_fin = moment(ejercicio.fecha_inicio, 'YYYY-MM-DD').add(ejercicio.frecuencia_dias - 1, 'days').format('DD/MM/YYYY').toString();
        const nuevo = { ...ejercicio };
        nuevo.fecha_inicio = moment(ejercicio.fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY').toString();
        
        this.props.updateEjercicio(nuevo).then(resp => {
            submitButton.disabled = false;
            this.setState({
                openConfirm: true,
                confirmMessage: 'Ejercicio actualizado.'
            });
        }).catch(err => {
            submitButton.disabled = false;
            this.setState({
                openConfirm: true,
                confirmMessage: 'Error al actualizar ejercicio. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
        });
    }

    copyOriginal = () => {
        this.setState({
            original: {
                ...this.state.ejercicio
            }
        });
    }

    pasteOriginal = () => {
        this.setState({
            ejercicio: {
                ...this.state.original
            }
        });
    }

    changeInput = (event) => {
        this.setState({
            ejercicio: {
            ...this.state.ejercicio,
            [event.target.name]: event.target.value
          }
        });
    }

    handleCancel = () => {
        this.setState({ openConfirm: false });
    };

    render() {
        const { readOnly, ejercicio, disabledEdit, openConfirm, confirmMessage, id_user } = this.state;

        return (
            <>
                <Card fluid color="blue" >
                    <Card.Content >
                        <Card.Header></Card.Header>
                        <Card.Description width="60%">
                            <Form onSubmit={this.handleSave}>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                <label>Nombre *</label>
                                <input
                                    name="nombre"
                                    placeholder='Nombre'
                                    type='text'
                                    disabled={true}
                                    value={ejercicio.nombre}/>
                                </Form.Field>
                                {
                                    ejercicio.nombre !== "Predeterminado" ?
                                        <Form.Field>
                                        <label>Duración total de la terapia (días) *</label>
                                        <input
                                            name="duracion_total"
                                            placeholder='Duración total'
                                            type='number'
                                            min="1"
                                            max="999"
                                            step="1"
                                            onChange={this.changeInput}
                                            disabled={readOnly}
                                            value={readOnly ? ejercicio.duracion_total : null}
                                            required/>                            
                                        </Form.Field>
                                    :
                                        <></>
                                }
                                <Form.Field>
                                <label>Frecuencia (cuantos días a la semana) *</label>
                                <select
                                    name="frecuencia_dias"
                                    value={readOnly ? ejercicio.frecuencia_dias : null}
                                    disabled={readOnly}
                                    onChange={this.changeInput}
                                    required>
                                    <option value="">Seleccione una opción</option>
                                    <option value="1">1 día</option>
                                    <option value="2">2 días</option>
                                    <option value="3">3 días</option>
                                    <option value="4">4 días</option>
                                    <option value="5">5 días</option>
                                    <option value="6">6 días</option>
                                    <option value="7">7 días</option>
                                </select>
                                </Form.Field>
                                <Form.Field>
                                <label>Frecuencia (cada cuantas horas al día) *</label>
                                    <select
                                        name="frecuencia_horas"
                                        value={readOnly ? ejercicio.frecuencia_horas : null}
                                        disabled={readOnly}
                                        onChange={this.changeInput}
                                        required>
                                    <option value="">Seleccione una opción</option>
                                    <option value="3">Cada 3h</option>
                                    <option value="4">Cada 4h</option>
                                    <option value="6">Cada 6h</option>
                                </select>
                                </Form.Field>
                            </Form.Group >
                            <Form.Group widths='equal'>                        
                                <Form.Field>
                                <label>Repeticiones *</label>
                                <input
                                    name="repeticiones"
                                    type = 'number'                        
                                    placeholder='Repeticiones'
                                    min="1"
                                    max="50"
                                    step="1"
                                    onChange={this.changeInput} 
                                    disabled={readOnly}
                                    value={readOnly ? ejercicio.repeticiones : null}
                                    required/>
                                </Form.Field>
                                <Form.Field>
                                <label>Series</label>
                                <input 
                                    name="series"
                                    placeholder='Series'
                                    type='number'
                                    min="1"
                                    max="99"
                                    step="1"
                                    onChange={this.changeInput} 
                                    disabled={readOnly}
                                    value={readOnly ? ejercicio.series : null}
                                    required/>
                                </Form.Field>
                                <Form.Field>
                                <label>Periodo de descanso (seg) *</label>
                                <input 
                                    name="periodos_descanso"
                                    placeholder='Periodo de descanso'
                                    type='number'
                                    min="1"
                                    max="99"
                                    step="1"
                                    onChange={this.changeInput} 
                                    disabled={readOnly}
                                    value={readOnly ? ejercicio.periodos_descanso: null}
                                    required/>
                                </Form.Field>
                                {
                                    ejercicio.nombre !== "Predeterminado" ?
                                        <Form.Field>
                                        <label>Fecha de inicio *</label>
                                        <input name="fecha_inicio"
                                            type="date"
                                            onChange={this.changeInput}
                                            placeholder='DD/MM/AAAA'
                                            min={new Date().toISOString().split('T')[0]}
                                            disabled={readOnly}
                                            value={readOnly ? ejercicio.fecha_inicio : null}
                                            required/>
                                        </Form.Field>
                                    :
                                        <></>
                                }
                            </Form.Group>
                            <Form.Group widths='equal'>
                                {
                                    ejercicio.nombre !== "Predeterminado" ?
                                        <Form.Field>
                                        <label>Fecha de fin *</label>
                                        <input  name="fecha_fin"
                                            type='text'
                                            disabled={true}
                                            value={ejercicio.fecha_fin || null}/>
                                        </Form.Field>
                                    :
                                        <></>
                                }
                                <Form.Field>
                                    <label>Apnea (seg) *</label>
                                    <select
                                        name="apnea"
                                        value={readOnly ? ejercicio.apnea : null}
                                        disabled={readOnly}
                                        onChange={this.changeInput}
                                        required>
                                        <option value="">Seleccione una opción</option>
                                        <option value="1">1 seg</option>
                                        <option value="2">2 seg</option>
                                        <option value="3">3 seg</option>
                                    </select>
                                </Form.Field>                    
                                <Form.Field>
                                    <label>Flujo (mL) *</label>
                                    <select
                                        name="flujo"
                                        value={readOnly ? ejercicio.flujo : null}
                                        disabled={readOnly}
                                        onChange={this.changeInput}
                                        required>
                                        <option value="">Seleccione una opción</option>
                                        <option value="600">600 mL</option>
                                        <option value="900">900 mL</option>
                                        <option value="1200">1200 mL</option>
                                        <option value="1500">1500 mL</option>
                                        <option value="1800">1800 mL</option>
                                        <option value="2100">2100 mL</option>
                                        <option value="2400">2400 mL</option>
                                    </select>
                                </Form.Field>
                                <Form.Field style={{marginBottom: '20px'}}>
                                    <label>Hora de inicio de la terapia *</label>
                                    <select
                                        name="hora_inicio"
                                        value={readOnly ? ejercicio.hora_inicio : null}
                                        disabled={readOnly}
                                        onChange={this.changeInput}
                                        required>
                                        <option value="">Seleccione una opción</option>
                                        <option value="6">6:00 am</option>
                                        <option value="7">7:00 am</option>
                                        <option value="8">8:00 am</option>
                                        <option value="9">9:00 am</option>
                                        <option value="10">10:00 am</option>
                                        <option value="11">11:00 am</option>
                                    </select>
                                </Form.Field>
                            </Form.Group>

                            {
                            readOnly ?
                                <Button disabled={disabledEdit} onClick={()=>{ this.handleEdit(false); this.copyOriginal() }} type="button" style={{ backgroundColor: '#46bee0', color:"white" }}>Editar</Button>
                                :
                                <>
                                    <Button type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Guardar</Button>
                                    <Button onClick={()=>{ this.handleEdit(true); this.pasteOriginal(); }} type='button' style={{ backgroundColor: '#eb5a25', color:"white" }}>Cancelar</Button>
                                </>
                            }
                            {
                            ejercicio.nombre !== "Predeterminado" ?
                                <Link to={{ pathname: `/VerResultados/${ejercicio.id_patient}/${ejercicio._id}`, state: { id_user: id_user }}}>
                                    <Button style={{ backgroundColor: '#46bee0', color:"white" }} floated='right'>
                                        Ver Gráfica
                                    </Button>
                                </Link>
                                :
                                null              
                            }
                        </Form>
                    </Card.Description>
                </Card.Content>
            </Card>

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

export default connect(null,{ updateEjercicio })(withRouter(Ejercicio));