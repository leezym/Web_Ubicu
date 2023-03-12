import React, { Component } from 'react';
import {Item,Button,Icon,Dropdown, Image, Form, Input,Card} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";


let options = ""
const optionsHours = {
    '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    '2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    '3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    '4': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    '6': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
}

const readOnly = "";
const ejercicio = "";
const initialState = {
    readOnly,
    ejercicio
}

class Ejercicio extends Component {
    
    state = initialState;

    componentDidMount(){              

        //this.props.deleteUser();
    }

    handleEdit(value) {
        this.setState({ readOnly: value });
    }

    handleSave(ejercicio){
        const date = new Date(moment(ejercicio.fecha_inicio, 'MM/DD/YYYY').format('DD/MM/YYYY')); 
        ejercicio.fecha_fin = new Date(date.setDate(date.getDate() + ejercicio.frecuencia_dias - 1)).toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          }).toString()

        this.props.updateEjercicio(ejercicio)/*.then(resp => {
            this.forceUpdate();
        })*/
    }

    changeInput = (event) => {
        if(event.target.name == "frecuencia_horas"){
            options = optionsHours[event.target.value].map(hour => (
                <option value={hour}>
                  {hour > 12 ? (hour - 12)+":00 pm" : hour < 12 ? hour+":00 am": hour+":00 pm"}
                </option>
              ));
        }    
        //this.setState({[event.target.name]:event.target.value});
    }

    render() {
        this.state.readOnly = true;
        this.state.ejercicio = this.props.ejercicio

        if(Object.keys(this.props.ejercicio).length !=  0)
            options = optionsHours[this.state.ejercicio.frecuencia_horas].map(hour => (
                <option value={hour}>
                {hour > 12 ? (hour - 12)+":00 pm" : hour < 12 ? hour+":00 am": hour+":00 pm"}
                </option>
            ))
        
        
        return (
            <Card fluid color="blue" >
                <Card.Content >
                    <Card.Header></Card.Header>
                    <Card.Description width="60%">
                    <Form>
                    <Form.Group >
                        <Form.Field>
                        <label>Nombre</label>
                        <input  name="nombre"
                            placeholder='Nombre'
                            type='text'
                            disabled={true}
                            value={this.state.readOnly ? this.state.ejercicio.nombre : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Duración total de la terapia (días)</label>
                        <input  name="duracion_total"
                            placeholder='Duración total'
                            type='number'
                            onChange={this.changeInput}
                            disabled={this.state.readOnly}
                            value={this.state.readOnly ? this.state.ejercicio.duracion_total : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Frecuencia (cuantos días a la semana)</label>
                        <select name="frecuencia_dias" value={this.state.readOnly ? this.state.ejercicio.frecuencia_dias : null} disabled={this.state.readOnly} onChange={this.changeInput}>
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
                            <select name="frecuencia_horas" value={this.state.readOnly ? this.state.ejercicio.frecuencia_horas : null} disabled={this.state.readOnly} onChange={this.changeInput}>
                            <option value="-">Select option</option>
                            <option value="1">Cada 1h</option>
                            <option value="2">Cada 2h</option>
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
                            disabled={this.state.readOnly}
                            value={this.state.readOnly ? this.state.ejercicio.repeticiones : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Series</label>
                        <input 
                            name="series"
                            placeholder='Series'
                            type='number'
                            onChange={this.changeInput} 
                            disabled={this.state.readOnly}
                            value={this.state.readOnly ? this.state.ejercicio.series : null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Periodo de descanso (seg)</label>
                        <input 
                            name="periodos_descanso"
                            placeholder='Periodo de descanso'
                            type='number'
                            onChange={this.changeInput} 
                            disabled={this.state.readOnly}
                            value={this.state.readOnly ? this.state.ejercicio.periodos_descanso: null}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Fecha de inicio</label>
                        <input name="fecha_inicio"
                            type="date"
                            onChange={this.changeInput}
                            placeholder='DD/MM/AAAA'
                            disabled={this.state.readOnly}
                            value={this.state.readOnly ? moment(this.state.ejercicio.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD') : null}/>
                        </Form.Field>
                        </Form.Group>
                        <Form.Group>
                        <Form.Field>
                        <label>Fecha de fin</label>
                        <input  name="fecha_fin"
                            type='text'
                            disabled={true}
                            value={this.state.ejercicio.fecha_fin}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Apnea (seg)</label>
                        <select name="apnea" value={this.state.readOnly ? this.state.ejercicio.apnea : null} disabled={this.state.readOnly} onChange={this.changeInput}>
                            <option value="-">Select option</option>
                            <option value="1">1 seg</option>
                            <option value="2">2 seg</option>
                            <option value="3">3 seg</option>
                        </select>
                        </Form.Field>                    
                        <Form.Field>
                        <label>Flujo (mL)</label>
                        <select name="flujo" value={this.state.readOnly ? this.state.ejercicio.flujo : null} disabled={this.state.readOnly} onChange={this.changeInput}>
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
                        <select name="hora_inicio" value={this.state.readOnly ? this.state.ejercicio.hora_inicio : null} disabled={this.state.readOnly} onChange={this.changeInput}>
                            {options}
                        </select>
                        </Form.Field>
                        </Form.Group>
                    </Form>
                    </Card.Description>
                    <Card.Content extra>
                    <Link to={`/VerResultados/${this.state.ejercicio.id_user}/${this.state.ejercicio._id}`}>
                    <Button secundary floated='right'>
                        Ver Gráfica
                    <Icon name='right chevron' />
                    </Button>
                    </Link>
                    {/* pdte revisar el metodo guardar
                        this.state.readOnly ? 
                        <Button onClick={()=>this.handleEdit(false)} floated='left' icon labelPosition='left' primary  size='small'><Icon name='clipboard' />Editar</Button>
                        :
                        <Button onClick={()=>{this.handleEdit(true); this.handleSave(ejercicio);}} floated='left' icon labelPosition='left' primary  size='small'><Icon name='clipboard' />Guardar</Button>*/
                    }
                    </Card.Content>
                </Card.Content>
            </Card>       
        );
    }
}

export default connect(null,null)(withRouter(Ejercicio));

