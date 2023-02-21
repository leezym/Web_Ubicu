import React, { Component } from 'react';
import {Item,Button,Icon,Dropdown, Image, Form, Input,Card} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';

class Ejercicio extends Component {
    
    state = {};

    componentDidMount(){
        this.setState(this.props.ejercicio);
        console.log(this.state);

        //this.props.deleteUser();
        //fetch('https://server.ubicu.co/allResultsByEjercicio', {
        fetch('http://localhost:5000/allResultsByEjercicio', {
            method: 'POST',
            body: JSON.stringify({id_ejercicio:this.props.ejercicio._id}),
            headers: {
                'Content-Type': 'application/json'
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
            console.log(resp);               
            console.log(this.state);
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        const {ejercicio} = this.props;
        const { enlace } = this.state;
        return (
            <Card fluid color="blue" >
            <Card.Content >
           {/*  <Icon style={{float:'right'}}
                name='trash'
            /> */}
                <Card.Header></Card.Header>
                <Card.Description width="60%">
                <Form>
                <Form.Group >
                    <Form.Field
                        id='form-input-control-nombre'
                        control={Input}
                        editable = {false}
                        label='Nombre ejercicio'
                        placeholder='Nombre ejercicio'
                        value={ejercicio.nombre}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-duracion-total'
                        control={Input}
                        editable = {false}
                        label='Duración total (días)'
                        placeholder='Duración total'
                        value={ejercicio.duracion_total}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-frecuencia-dias'
                        control={Input}
                        editable = {false}
                        label='Frecuencia días'
                        placeholder='Frecuencia días'
                        value={ejercicio.frecuencia_dias}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-frecuencia-horas'
                        control={Input}
                        editable = {false}
                        label='Frecuencia horas'
                        placeholder='Frecuencia horas'
                        value={ejercicio.frecuencia_horas}
                        width={6}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Field
                        id='form-input-control-repeticiones'
                        control={Input}
                        editable = {false}
                        label='Repeticiones'
                        placeholder='Repeticiones'
                        value={ejercicio.repeticiones}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-series'
                        control={Input}
                        editable = {false}
                        label='Series'
                        placeholder='Series'
                        value={ejercicio.series}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-periodos-descanso'
                        control={Input}
                        editable = {false}
                        label='Periodo de descanso (seg)'
                        placeholder='Periodo de descanso'
                        value={ejercicio.periodos_descanso}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-fecha-inicio'
                        control={Input}
                        editable = {false}
                        label='Fecha inicio'
                        placeholder='Fecha inicio'
                        value={ejercicio.fecha_inicio}
                        width={6}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Field
                        id='form-input-control-fecha-fin'
                        control={Input}
                        editable = {false}
                        label='Fecha fin'
                        placeholder='Fecha fin'
                        value={ejercicio.fecha_fin}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-apnea'
                        control={Input}
                        editable = {false}
                        label='Apnea (seg)'
                        placeholder='Apnea'
                        value={ejercicio.apnea}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-flujo'
                        control={Input}
                        editable = {false}
                        label='Flujo (mL)'
                        placeholder='Flujo'
                        value={ejercicio.flujo}
                        width={6}
                    />
                    <Form.Field
                        id='form-input-control-hora-inicio'
                        control={Input}
                        editable = {false}
                        label='Hora inicio'
                        placeholder='Hora inicio'
                        value={ejercicio.hora_inicio}
                        width={6}
                    />
                </Form.Group>
                </Form>
                </Card.Description>
                <Card.Content extra>
                {/*<Link to={`/updateEjercicio/${ejercicio._id}`}>
                <Button primary floated='right'>
                    Actualizar
                <Icon name='right chevron' />
                </Button>
                </Link>*/}
                <Link to={`/verResultados/${ejercicio.id_user}/${ejercicio._id}`}>
                <Button secundary floated='right'>
                    Ver Grafica
                <Icon name='right chevron' />
                </Button>
                </Link>
                </Card.Content>
            </Card.Content>
            </Card>       
        );
    }
}

export default connect(null,null)(withRouter(Ejercicio));
