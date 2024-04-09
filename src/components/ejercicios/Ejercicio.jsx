import React, { Component } from 'react';
import {Button,Icon, Form, Card} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";
import { updateEjercicio } from '../../actions/ejerciciosAction';


class Ejercicio extends Component {
    state = {
        readOnly: true,
        original: {},
        ejercicio: this.props.ejercicio
    };
    
    componentDidUpdate(prevProps) {
        if (prevProps.ejercicio !== this.props.ejercicio) {
            this.setState({
                ejercicio: {
                    ...this.props.ejercicio,
                    fecha_inicio: moment(this.props.ejercicio.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD').toString()
                }
            });
        }
    }
    
    componentDidMount() {
        const { ejercicio } = this.state;
        this.setState({
            ejercicio: {
                ...this.state.ejercicio,
                fecha_inicio: moment(ejercicio.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD').toString()
            }
        });
    }

    handleEdit (value) {
        this.setState({ readOnly: value });
    }

    handleSave = (e) => {
        this.handleEdit(true);
        e.preventDefault();
        const { ejercicio } = this.state;
        ejercicio.fecha_fin = moment(ejercicio.fecha_inicio, 'YYYY-MM-DD').add(ejercicio.frecuencia_dias - 1, 'days').format('DD/MM/YYYY').toString();
                
        const nuevo = { ...ejercicio };
        nuevo.fecha_inicio = moment(ejercicio.fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY').toString();

        this.props.updateEjercicio(nuevo);
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

    render() {
        const { readOnly, ejercicio } = this.state;
                        
        return (
            <Card fluid color="blue" >
                <Card.Content >
                    <Card.Header></Card.Header>
                    <Card.Description width="60%">
                    <Form onSubmit={this.handleSave}>
                    <Form.Group >
                        <Form.Field>
                        <label>Nombre</label>
                        <input  name="nombre"
                            placeholder='Nombre'
                            type='text'
                            disabled={true}
                            value={readOnly ? ejercicio.nombre : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Duración total de la terapia (días)</label>
                        <input  name="duracion_total"
                            placeholder='Duración total'
                            type='number'
                            onChange={this.changeInput}
                            disabled={readOnly}
                            value={readOnly ? ejercicio.duracion_total : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Frecuencia (cuantos días a la semana)</label>
                        <select name="frecuencia_dias" value={readOnly ? ejercicio.frecuencia_dias : null} disabled={readOnly} onChange={this.changeInput}>
                            <option value="-">Seleccione una opción</option>
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
                        <label>Frecuencia (cada cuantas horas al día)</label>
                            <select name="frecuencia_horas" value={readOnly ? ejercicio.frecuencia_horas : null} disabled={readOnly} onChange={this.changeInput}>
                            <option value="-">Seleccione una opción</option>
                            {/*<option value="1">Cada 1h</option>
                            <option value="2">Cada 2h</option>*/}
                            <option value="3">Cada 3h</option>
                            <option value="4">Cada 4h</option>
                            <option value="6">Cada 6h</option>
                        </select>
                        </Form.Field>
                        </Form.Group >
                        <Form.Group >                        
                        <Form.Field>
                        <label>Repeticiones</label>
                        <input name="repeticiones"
                            type = 'number'                        
                            placeholder='Repeticiones'
                            onChange={this.changeInput} 
                            disabled={readOnly}
                            value={readOnly ? ejercicio.repeticiones : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Series</label>
                        <input 
                            name="series"
                            placeholder='Series'
                            type='number'
                            onChange={this.changeInput} 
                            disabled={readOnly}
                            value={readOnly ? ejercicio.series : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Periodo de descanso (seg)</label>
                        <input 
                            name="periodos_descanso"
                            placeholder='Periodo de descanso'
                            type='number'
                            onChange={this.changeInput} 
                            disabled={readOnly}
                            value={readOnly ? ejercicio.periodos_descanso: null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Fecha de inicio</label>
                        <input name="fecha_inicio"
                            type="date"
                            onChange={this.changeInput}
                            placeholder='DD/MM/AAAA'
                            disabled={readOnly}
                            value={readOnly ? ejercicio.fecha_inicio : null}/>
                        </Form.Field>
                        </Form.Group>
                        <Form.Group>
                        <Form.Field>
                        <label>Fecha de fin</label>
                        <input  name="fecha_fin"
                            type='text'
                            disabled={true}
                            value={ejercicio.fecha_fin}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Apnea (seg)</label>
                        <select name="apnea" value={readOnly ? ejercicio.apnea : null} disabled={readOnly} onChange={this.changeInput}>
                            <option value="-">Seleccione una opción</option>
                            <option value="1">1 seg</option>
                            <option value="2">2 seg</option>
                            <option value="3">3 seg</option>
                        </select>
                        </Form.Field>                    
                        <Form.Field>
                        <label>Flujo (mL)</label>
                        <select name="flujo" value={readOnly ? ejercicio.flujo : null} disabled={readOnly} onChange={this.changeInput}>
                            <option value="-">Seleccione una opción</option>
                            <option value="600">600 mL</option>
                            <option value="900">900 mL</option>
                            <option value="1200">1200 mL</option>
                            <option value="1500">1500 mL</option>
                            <option value="1800">1800 mL</option>
                            <option value="2100">2100 mL</option>
                            <option value="2400">2400 mL</option>
                        </select>
                        </Form.Field>
                        <Form.Field>
                        <label>Hora de inicio de la terapia</label>
                        <select name="hora_inicio" value={readOnly ? ejercicio.hora_inicio : null} disabled={readOnly} onChange={this.changeInput}>
                            <option value={0}>Seleccione una opción</option>
                            {/*options*/}
                            <option value="6">6:00 am</option>
                            <option value="7">7:00 am</option>
                            <option value="8">8:00 am</option>
                            <option value="9">9:00 am</option>
                            <option value="10">10:00 am</option>
                            <option value="11">11:00 am</option>
                        </select>
                        </Form.Field>
                        </Form.Group>
                    </Form>
                    </Card.Description>
                    <Card.Content extra>
                    <Link to={`/VerResultados/${ejercicio.id_patient}/${ejercicio._id}`}>
                    <Button style={{ backgroundColor: '#46bee0', color:"white" }} floated='right'>
                        Ver Gráfica
                    <Icon name='right chevron' />
                    </Button>
                    </Link>
                    { readOnly ?
                        <Button onClick={()=>{this.handleEdit(false); this.copyOriginal()}} style={{ backgroundColor: '#eb5a25', color:"white" }}>Editar</Button>
                        :
                        <>
                            <Button onClick={this.handleSave} type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Guardar</Button>
                            <Button onClick={()=>{this.handleEdit(true); this.pasteOriginal()}} type='submit' style={{ backgroundColor: '#eb5a25', color:"white" }}>Cancelar</Button>
                        </>
                    }
                    </Card.Content>
                </Card.Content>
            </Card>       
        );
    }
}

export default connect(null,{ updateEjercicio })(withRouter(Ejercicio));

