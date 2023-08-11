import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid, Dropdown } from 'semantic-ui-react';
import {crearEjercicio} from "../../actions/ejerciciosAction";
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";

const optionsHours = { //13h de ejercicios 
    '1': [6, 7, 8, 9, 10, 11], // 13 sesiones
    '2': [6, 7, 8, 9, 10, 11], // 7 sesiones
    '3': [6, 7, 8, 9, 10, 11], // 5 sesiones
    '4': [6, 7, 8, 9, 10, 11], // 4 sesiones
    '6': [6, 7, 8, 9, 10, 11] // 3 sesiones
}

let options = ""

class Agregar extends Component {        
    state = {
        nombre: "Inspiración profunda",
        duracion_total: "",
        frecuencia_dias: "",
        frecuencia_horas: "",
        repeticiones: "",
        series: "",
        periodos_descanso: "",
        fecha_inicio: "",
        fecha_fin: "",
        apnea: "",
        flujo: "",
        hora_inicio: "",
        id_patient: this.props.id_patient
    };
    
    handleSave = (e) => {
        e.preventDefault();
        const { nombre, duracion_total, frecuencia_dias, frecuencia_horas, repeticiones, series, periodos_descanso, fecha_inicio, apnea, flujo, hora_inicio, id_patient } = this.state;
        if (!duracion_total || !frecuencia_dias || !frecuencia_horas || !repeticiones || !series || !periodos_descanso || !fecha_inicio || !apnea || !flujo || !hora_inicio) {
            alert('Por favor proporcione la información requerida');
            return;
        }

        this.props.crearEjercicio({
            nombre,
            duracion_total,
            frecuencia_dias,
            frecuencia_horas,
            repeticiones,
            series,
            periodos_descanso,
            fecha_inicio: moment(fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY').toString(),
            fecha_fin: moment(fecha_inicio, 'YYYY-MM-DD').add(frecuencia_dias - 1, 'days').format('DD/MM/YYYY').toString(), // fecha_inicio + frecuencia dias - 1
            apnea,
            flujo,
            hora_inicio,
            id_patient
        }).then(resp => {
            this.props.history.push(`/VerEjercicios/${id_patient}`);
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
                <Label color='blue' ribbon>
                Registrar Nuevo Ejercicio
                </Label>
                <Form style={{ marginTop: '1em' }}>
                    <Form.Field>
                    <label>Duración total de la terapia (días)</label>
                    <input  name="duracion_total"
                        placeholder='Duración total'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Frecuencia (cuantos días a la semana)</label>
                    <select name="frecuencia_dias" onChange={this.changeInput}>
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
                        <select name="frecuencia_horas" onChange={this.changeInput}>
                        <option value="-">Seleccione una opción</option>
                        {/*<option value="1">Cada 1h</option>
                        <option value="2">Cada 2h</option>*/}
                        <option value="3">Cada 3h</option>
                        <option value="4">Cada 4h</option>
                        <option value="6">Cada 6h</option>
                    </select>
                    </Form.Field>
                    <Form.Field>
                    <label>Repeticiones</label>
                    <input name="repeticiones"
                        type = 'number'                    
                        placeholder='Repeticiones'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Series</label>
                    <input name="series"
                        placeholder='Series'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Periodo de descanso (seg)</label>
                    <input 
                        name="periodos_descanso"
                        placeholder='Periodo de descanso'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Fecha de inicio</label>
                    <input name="fecha_inicio"
                        type="date"
                        onChange={this.changeInput}
                        placeholder='DD/MM/AAAA' />
                    </Form.Field>
                    <Form.Field>
                    <label>Apnea (seg)</label>
                    <select name="apnea" onChange={this.changeInput}>
                        <option value="-">Seleccione una opción</option>
                        <option value="1">1 seg</option>
                        <option value="2">2 seg</option>
                        <option value="3">3 seg</option>
                    </select>
                    </Form.Field>                    
                    <Form.Field>
                    <label>Flujo (mL)</label>
                    <select name="flujo" onChange={this.changeInput}>
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
                    <select id="hora_inicio_select" name="hora_inicio" onChange={this.changeInput}>
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
                    <Button onClick={this.handleSave} primary type='submit'>Agregar</Button>
                    <Link to={`/VerEjercicios/${this.state.id_patient}`}><Button type='submit'>Regresar</Button></Link>
                </Form>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default withRouter(connect(null,{crearEjercicio})(Agregar));
