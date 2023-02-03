import React, { Component } from 'react';
import {Item,Button,Icon,Dropdown, Image, Form, Input,Card} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';


const stateOptions = [
    {key: ""},
    {text: ""},
    {value: ""}
];

const enlace = "";

const initialState = {
    stateOptions,
    enlace
};
    

class Ejercicio extends Component {
    state = initialState;
    handleChange = (e, { value }) => {
        const newState = {
            stateOptions:this.state.stateOptions,
            enlace:value
            }; 
        console.log(value);
       this.setState(newState);
       console.log(this.state);
    }

    componentDidMount(){
        //this.props.deleteUser();
        fetch('https://server.ubicu.co/allResultsByEjercicio', {
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
      let count = 0;
      let arrayVol = new Array();
      resp.forEach(element => {
        arrayVol[count] = {"key":  count, 'text' :  element['last_update'], 'value' : count}  
        count++;
      });
      const newState = {
        stateOptions:arrayVol,
        enlace:this.state.enlace
        };
      this.setState(newState);
      console.log(this.state);

    })
    .catch(err => {
          console.error(err);
          //this.setState({ loading: false, redirect: true });
    });
    
    const handleDelete = (e) => {
    /*    e.preventDefault();
       
        this.props.deleteUser({
          cedula: e.target.value
        }).then(()=>{
            this.props.mostrarUsers()
        });;
    */
    }
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
                {ejercicio.last_update == null ? '' :
                    <Form.Field
                        id='form-input-control-last_update'
                        control={Input}
                        editable = {false}
                        label='Last update'
                        placeholder='last update'
                        value={ejercicio.last_update}
                        width={6}
                    />
                }    
                {ejercicio.nombreEjercicio== null ? '' :
                    <Form.Field
                        id='form-input-control-nombreEjercicio'
                        control={Input}
                        editable = {false}
                        label='Nombre Ejercicio'
                        placeholder='nombre'
                        value={ejercicio.nombreEjercicio}
                        width={6}
                    />
                }  
                {ejercicio.apnea == null ? '' :
                    <Form.Field
                        id='form-input-control-apnea'
                        control={Input}
                        label='apnea'
                        placeholder='apnea'
                        value={ejercicio.apnea}
                        width={6}
                    />
                }
                {ejercicio.duracion == null ? '' :
                    <Form.Field
                        id='form-input-control-duracion'
                        control={Input}
                        label='duracion'
                        placeholder='duracion'
                        value={ejercicio.duracion}
                        width={6}
                    />
                }
                {ejercicio.fraccion == null ? '' :
                     <Form.Field
                        id='form-input-control-fraccion'
                        control={Input}
                        label='fraccion'
                        placeholder='fraccion'
                        value={ejercicio.fraccion}
                        width={6}
                    />
                }
                {ejercicio.frecuencia == null ? '' :
                     <Form.Field
                        id='form-input-control-frecuencia'
                        control={Input}
                        label='frecuencia'
                        placeholder='frecuencia'
                        value={ejercicio.frecuencia}
                        width={6}
                    />
                }
                {ejercicio.repeticion == null ? '' :
                    <Form.Field
                        id='form-input-control-repeticion'
                        control={Input}
                        label='repeticion'
                        placeholder='repeticion'
                        value={ejercicio.repeticion}
                        width={6}
                    />
                }
                {ejercicio.series == null ? '' :
                    <Form.Field
                        id='form-input-control-series'
                        control={Input}
                        label='series'
                        placeholder='series'
                        value={ejercicio.series}
                        width={6}
                    />
                }
                {ejercicio.flujo == null ? '' :
                    <Form.Field
                        id='form-input-control-flujo'
                        control={Input}
                        label='flujo'
                        placeholder='flujo'
                        value={ejercicio.flujo}
                        width={6}
                    />
                }
                {ejercicio.sesiones == null ? '' :
                    <Form.Field
                        id='form-input-control-sesiones'
                        control={Input}
                        label='sesiones'
                        placeholder='sesiones'
                        value={ejercicio.sesiones}
                        width={6}
                    />
                }
                {ejercicio.type == "cicloActivo" ?
                    <Form.Field
                        id='form-input-control-sesiones'
                        control={Input}
                        label='Ejercicio anterior'
                        placeholder='Ejercicio anterior'
                        value={ejercicio.id_user}
                        width={6}
                    /> : ''
                }
                    </Form.Group>
                </Form>
                </Card.Description>
                <Card.Content extra>
                <Link to={`/updateEjercicio/${ejercicio._id}`}>
                <Button primary floated='right'>
                    Actualizar
                <Icon name='right chevron' />
                </Button>
                </Link>
                <Link to={`/verResultados/${ejercicio._id}/${ejercicio.id_user}/${enlace}`}>
                <Button secundary floated='right'>
                    Ver Grafica
                <Icon name='right chevron' />
                </Button>
                </Link>
                <Dropdown direction='right' placeholder='Seleccione datos' selection options={this.state.stateOptions} onChange={this.handleChange}/>
                </Card.Content>
            </Card.Content>
            </Card>
          
   
       
        );
    }
}

export default connect(null,null)(withRouter(Ejercicio));
