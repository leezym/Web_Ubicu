import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid, Dropdown } from 'semantic-ui-react';
import {crearEjercicio} from "../../actions/ejerciciosAction";
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";


const optionsHours = {
    '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    '2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    '3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    '4': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    '6': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
}

let options = ""

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

    componentDidMount(){
        console.log("props agregar: ",this.props)
        console.log("state agregar: ",this.state);
    }

    
    handleSave = (e) => {
        e.preventDefault();
        this.props.crearEjercicio({
            nombre: this.state.nombre,
            duracion_total: this.state.duracion_total,
            frecuencia_dias: this.state.frecuencia_dias,
            frecuencia_horas:  this.state.frecuencia_horas,
            repeticiones: this.state.repeticiones,
            series: this.state.series,
            periodos_descanso: this.state.periodos_descanso,
            fecha_inicio: moment(this.state.fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY').toString(),
            fecha_fin: moment(this.state.fecha_inicio, 'YYYY-MM-DD').add(this.state.frecuencia_dias-1, 'days').format('DD/MM/YYYY').toString(), // fecha_inicio + frecuencia dias
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
        if(event.target.name == "frecuencia_horas"){
            options = optionsHours[event.target.value].map(hour => (
                <option value={hour}>
                  {hour > 12 ? (hour - 12)+":00 pm" : hour < 12 ? hour+":00 am": hour+":00 pm"}
                </option>
              ));
        }        
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
                        <option value="-">Select option</option>
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
                        <option value="-">Select option</option>
                        <option value="1">Cada 1h</option>
                        <option value="2">Cada 2h</option>
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
                        <option value="-">Select option</option>
                        <option value="1">1 seg</option>
                        <option value="2">2 seg</option>
                        <option value="3">3 seg</option>
                    </select>
                    </Form.Field>                    
                    <Form.Field>
                    <label>Flujo (mL)</label>
                    <select name="flujo" onChange={this.changeInput}>
                        <option value="-">Select option</option>
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
                        {options}
                    </select>
                    </Form.Field>
                    <Button onClick={this.handleSave} primary type='submit'>Agregar</Button>
                    <Link to={`/VerEjercicios/${this.state.id_user}`}><Button type='submit'>Regresar</Button></Link>
                </Form>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default withRouter(connect(null,{crearEjercicio})(Agregar));
