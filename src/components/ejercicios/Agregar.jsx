import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid, Dropdown } from 'semantic-ui-react';
import {crearEjercicio} from "../../actions/ejerciciosAction";
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';


class Agregar extends Component {

    
    
    state ={
        nombreEjercicio: null,
        duracion: null,
        sesiones: null,
        repeticion:  null,
        frecuencia: null,
        series: null,
        apnea: null,
        fraccion: null,
        flujo: null,
        last_update:null,
        id_user:this.props.id
    };
    
    handleSave = (e) => {
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        e.preventDefault();
        this.props.crearEjercicio({
           nombreEjercicio: this.state.nombreEjercicio,
            duracion: this.state.duracion,
            sesiones: this.state.sesiones,
            repeticion:  this.state.repeticion,
            frecuencia: this.state.frecuencia,
            series: this.state.series,
            apnea: this.state.apnea,
            fraccion: this.state.fraccion,
            flujo: this.state.flujo,
            last_update:date,
            id_user:this.state.id_user
        }).then(resp => {
            console.log(resp);
            this.props.history.push(`/VerEjercicios/${this.state.id_user}`);
        });
    }
    changeInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    
    render() {
        
      

        const typeOptions = [
              {
                key: 'nombreEjercicio',
                text: 'Patron diafragmatico',
                value: 'patronDiafragmatico',
              },
              {
                key: 'nombreEjercicio',
                text: 'Inspiracion profunda',
                value: 'inspiracionProfunda',
              },
              {
                key: 'nombreEjercicio',
                text: 'Inspiracion fraccionada en tiempo',
                value: 'inspiracionftiempo',
              },
              {
                key: 'nombreEjercicio',
                text: 'Suspiros inspiratorios',
                value: 'suspirosInspiratorios',
              },
              {
                key: 'nombreEjercicio',
                text: 'Espiracion Abreviada',
                value: 'espiracionAbre',
              },
              {
                key: 'nombreEjercicio',
                text: 'Ciclo Activo',
                value: 'cicloActivo',
              },
            
          ]
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
                    <label>Nombre</label>
                    <Dropdown
                        name="nombreEjercicio"
                        placeholder='Select Ejercicio'
                        fluid
                        selection
                        options={typeOptions}
                        onChange={this.changeInput}
                        />
                    </Form.Field>
                    <Form.Field>
                    <label>Duracion</label>
                    <input  name="duracion" placeholder='duracion' onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Sesiones</label>
                    <input 
                        name="sesiones"
                        placeholder='sesiones'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Repeticion</label>
                    <input 
                        name="repeticion"
                        placeholder='repeticion'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Frecuencia</label>
                    <input 
                        name="frecuencia"
                        placeholder='frecuencia'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Series</label>
                    <input 
                        name="series"
                        placeholder='series'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Apnea</label>
                    <input 
                        name="apnea"
                        placeholder='apnea'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    {/*<Form.Field>
                    <label>Fraccion</label>
                    <input 
                        name="fraccion"
                        placeholder='fraccion'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field> */
                    <Form.Field>
                    <label>Flujo</label>
                    <input 
                        name="flujo"
                        placeholder='flujo'
                        onChange={this.changeInput} />
                    </Form.Field> }
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