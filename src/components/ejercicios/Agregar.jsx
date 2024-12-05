import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form, Button, Segment, Label, Grid } from 'semantic-ui-react';
import {crearEjercicio} from "../../actions/ejerciciosAction";
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";
import '../../styles/label_style.css';

class Agregar extends Component {        
    state = {
        nombre: this.props.nombre_terapia,
        duracion_total: "",
        frecuencia_dias: "-",
        frecuencia_horas: "-",
        repeticiones: "",
        series: "",
        periodos_descanso: "",
        fecha_inicio: null,
        fecha_fin: null,
        apnea: "-",
        flujo: "-",
        hora_inicio: "-",
        id_patient: this.props.id_patient,
        id_user: this.props.id_user
    };
    
    handleSave = async (e) => {
        e.preventDefault();
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const { nombre, duracion_total, frecuencia_dias, frecuencia_horas, repeticiones, series, periodos_descanso, fecha_inicio, apnea, flujo, hora_inicio, id_patient, id_user } = this.state;
        const inicio = nombre === "Predeterminado" ? null : moment(fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY').toString();
        const fin = nombre === "Predeterminado" ? null : moment(fecha_inicio, 'YYYY-MM-DD').add(frecuencia_dias - 1, 'days').format('DD/MM/YYYY').toString();
        
        this.props.crearEjercicio({
            nombre,
            duracion_total,
            frecuencia_dias,
            frecuencia_horas,
            repeticiones,
            series,
            periodos_descanso,
            fecha_inicio: inicio,
            fecha_fin: fin, // fecha_inicio + frecuencia dias - 1
            apnea,
            flujo,
            hora_inicio,
            id_patient
        }).then(resp => {
            submitButton.disabled = false;
            alert('Ejercicio creado.');
            this.props.history.push(`/VerEjercicios/${id_patient}`);
        })
        .catch(err => {
            submitButton.disabled = false;
            alert('Error al crear ejercicio. ' + (err?.response?.data?.msg || err.message));
        });        
    }

    changeInput = (event) => {    
        this.setState({[event.target.name]:event.target.value});
    }
    
    render() {
        const { nombre, id_patient } = this.state;

        return (
            <div>
            <MenuNav/>
            <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label ribbon style={{color:"#28367b"}}>
                {
                    nombre !== "Predeterminado" ?
                        "Registrar Ejercicio Nuevo"
                    :
                        "Registrar Ejercicio Pretederminado"
                }
                </Label>
                <Form onSubmit={this.handleSave} style={{ marginTop: '1em' }}>
                    <Form.Field>
                    <label class="required">Duración total de la terapia (días)</label>
                        <input 
                            name="duracion_total"
                            placeholder='Duración total'
                            type='number'
                            min="1"
                            max="999"
                            step="1"
                            onChange={this.changeInput}
                            autocomplete='number'
                            required/>
                    </Form.Field>
                    <Form.Field>
                    <label class="required">Frecuencia (cuantos días a la semana)</label>
                        <select
                            name="frecuencia_dias"
                            onChange={this.changeInput}
                            onBlur={this.validarFrecuenciaDias}
                            required>
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
                    <label class="required">Frecuencia (cada cuantas horas al día)</label>
                        <select 
                            name="frecuencia_horas"
                            onChange={this.changeInput}
                            onBlur={this.validarFrecuenciaHoras}
                            required>
                            <option value="-">Seleccione una opción</option>
                            <option value="3">Cada 3h</option>
                            <option value="4">Cada 4h</option>
                            <option value="6">Cada 6h</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                    <label class="required">Repeticiones </label>
                        <input
                            name="repeticiones"
                            type = 'number'                    
                            placeholder='Repeticiones'
                            min="1"
                            max="15"
                            step="1"
                            onChange={this.changeInput}
                            autocomplete='number'
                            required/>
                    </Form.Field>
                    <Form.Field>
                    <label class="required">Series </label>
                        <input
                            name="series"
                            placeholder='Series'
                            type='number'
                            min="1"
                            max="99"
                            step="1"
                            onChange={this.changeInput}
                            autocomplete='number'
                            required/>
                    </Form.Field>
                    <Form.Field>
                    <label class="required">Periodo de descanso (seg) </label>
                        <input 
                            name="periodos_descanso"
                            placeholder='Periodo de descanso'
                            type='number'
                            min="1"
                            max="99"
                            step="1"
                            onChange={this.changeInput}
                            autocomplete='number'
                            required/>
                    </Form.Field>
                    {
                        nombre !== "Predeterminado" ? 
                            <Form.Field>
                            <label class="required">Fecha de inicio </label>
                                <input
                                    name="fecha_inicio"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={this.changeInput}
                                    placeholder='DD/MM/AAAA'
                                    autocomplete='date'
                                    required/>
                            </Form.Field>
                        :
                            <></>
                    }
                    <Form.Field>
                    <label class="required">Apnea (seg) </label>
                        <select
                            name="apnea"
                            onChange={this.changeInput}
                            required>
                            <option value="-">Seleccione una opción</option>
                            <option value="1">1 seg</option>
                            <option value="2">2 seg</option>
                            <option value="3">3 seg</option>
                        </select>
                    </Form.Field>                    
                    <Form.Field>
                    <label class="required">Flujo (mL) </label>
                        <select
                            name="flujo"
                            onChange={this.changeInput}
                            required>
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
                    <label class="required">Hora de inicio de la terapia </label>
                        <select
                            id="hora_inicio_select"
                            name="hora_inicio"
                            onChange={this.changeInput}
                            required>
                            <option value={"-"}>Seleccione una opción</option>
                            <option value="6">6:00 am</option>
                            <option value="7">7:00 am</option>
                            <option value="8">8:00 am</option>
                            <option value="9">9:00 am</option>
                            <option value="10">10:00 am</option>
                            <option value="11">11:00 am</option>
                        </select>
                    </Form.Field>
                    <Button type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Agregar</Button>
                    <Link to={`/VerEjercicios/${id_patient}`}>
                    <Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                </Form>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default withRouter(connect(null,{crearEjercicio})(Agregar));
