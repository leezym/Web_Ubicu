import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid, Dropdown } from 'semantic-ui-react';
import {crearEjercicio} from "../../actions/ejerciciosAction";
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';


class Agregar extends Component {    
    
    state ={
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
        id_user: this.props.id
    };
    
    handleSave = (e) => {
        e.preventDefault();
        const date = new Date(this.state.fecha_fin);
        this.props.crearEjercicio({
            nombre: this.state.nombre,
            duracion_total: this.state.duracion_total,
            frecuencia_dias: this.state.frecuencia_dias,
            frecuencia_horas:  this.state.frecuencia_horas,
            repeticiones: this.state.repeticiones,
            series: this.state.series,
            periodos_descanso: this.state.periodos_descanso,
            fecha_inicio: this.state.fecha_inicio,
            fecha_fin: date + date.setDate(date.getDate() + this.state.frecuencia_dias), // fecha_inicio + frecuencia dias
            apnea: this.state.apnea,
            flujo: this.state.flujo,
            hora_inicio: this.state.hora_inicio,
            id_user: this.state.id_user
        }).then(resp => {
            console.log(resp);
            this.props.history.push(`/VerEjercicios/${this.state.id_user}`);
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
                    <input 
                        name="frecuencia_dias"
                        placeholder='Frecuencia en días'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Frecuencia (cuantas horas al día)</label>
                    <input 
                        name="frecuencia_horas"
                        placeholder='Frecuencia en horas'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Repeticiones</label>
                    <input 
                        name="repeticiones"
                        placeholder='Repeticiones'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Series</label>
                    <input 
                        name="series"
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
                    <input  name="fecha_inicio"
                        placeholder='Fecha de inicio'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Apnea (seg)</label>
                        <select name="apnea" onChange={this.changeInput}>
                            <option value="-">Select option</option>
                            <option value="1">1 seg</option>
                            <option value="2">2 seg</option>
                            <option value="3">3 seg</option>
                        </select>
                    </Form.Field>                    
                    <Form.Field>
                    <label>Flujo (ml)</label>
                        <select name="apnea" onChange={this.changeInput}>
                            <option value="-">Select option</option>
                            <option value="600">600 ml</option>
                            <option value="900">900 ml</option>
                            <option value="1200">1200 ml</option>
                            <option value="1500">1500 ml</option>
                            <option value="1800">1800 ml</option>
                            <option value="2100">2100 ml</option>
                            <option value="2400">2400 ml</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                    <label>Hora de inicio de la terapia</label>
                        <select name="hora_inicio" onChange={this.changeInput}>
                            <option value="-">Select option</option>
                            <option value="1">1 am</option>
                            <option value="2">2 am</option>
                            <option value="3">3 am</option>
                            <option value="4">4 am</option>
                            <option value="5">5 am</option>
                            <option value="6">6 am</option>
                            <option value="7">7 am</option>
                            <option value="8">8 am</option>
                            <option value="9">9 am</option>
                            <option value="10">10 am</option>
                            <option value="11">11 am</option>
                            <option value="12">12 pm</option>
                            <option value="13">1 pm</option>
                            <option value="14">2 pm</option>
                            <option value="15">3 pm</option>
                            <option value="16">4 pm</option>
                            <option value="17">5 pm</option>
                        </select>
                    </Form.Field>
                    <Button onClick={this.handleSave} primary type='submit'>Agregar</Button>
                    <Link to={`/VerUser/${this.props.id}`}><Button type='submit'>Regresar</Button></Link>
                </Form>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default withRouter(connect(null,{crearEjercicio})(Agregar));