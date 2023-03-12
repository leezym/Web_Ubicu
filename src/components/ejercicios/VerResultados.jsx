import React, { Component } from 'react';
import {Form,Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";
import{allResultsByUser} from "../../actions/resultsAction";
import Chart from 'react-apexcharts'
import moment from "moment";


let data = []
let hourOptions = "";
let dateOptions = ""
const optionsHours = {
  '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  '2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  '3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  '4': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  '6': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
}

  const initialState = {
    id_user: "",
    id_ejercicio: "",
    hora: "",
    fecha: "",
    series: [],    
    options:{
      chart: {
        stacked: false,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min))
          }
        },
      },
      tooltip:{
        followCursor: true
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      xaxis: {
        title: {
          text: "Tiempo"
        },
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: "Flujo"
        },
        type: 'numeric'
      }
    }
  };

  function fillGraph(state) {
    // Add series to options
    for (let i = 0; i < data.length; i++) {
      const series = {
        name: "Serie "+(i+1),
        data: []
      };

      // Add data to series
      for (let j = 0; j < data[i].flujo.length; j++) {
        const tiempo = data[i].tiempo[j] * 1000;
        moment.utc(tiempo).format("HH:mm:ss")
        const flujo = data[i].flujo[j];
        series.data.push([tiempo, flujo]);
      }

      state.series.push(series);
    }
    console.log("fillGraph, ", state)
  }

  function getDatesBetween(startDate, endDate) {
    const startDateArr = startDate.split("/");
    const endDateArr = endDate.split("/");
    const startDateFormatted = `${startDateArr[1]}/${startDateArr[0]}/${startDateArr[2]}`;
    const endDateFormatted = `${endDateArr[1]}/${endDateArr[0]}/${endDateArr[2]}`;
    
    const dates = [];
    let currentDate = new Date(startDateFormatted);
    
    while (currentDate <= new Date(endDateFormatted)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  function getHoursOptions(startHour, hourInterval) {
    const hours = [];  
    let currentHour = startHour;
    let i = 0
    while (i < (12/hourInterval)){
      hours.push(currentHour);
      currentHour+=hourInterval
      i++;
    }
    return hours;
  }
      
class VerResultados extends React.Component {
  state = initialState;  
  
  componentDidMount(){
    this.state.id_ejercicio = this.props.id_ejercicio
    this.state.series = []
    data = ""
    
    fetch('https://server.ubicu.co/getEjerciciobyId', {
    //fetch('http://localhost:5000/getEjerciciobyId', {
        method: 'POST',
        body: JSON.stringify({id_ejercicio:this.state.id_ejercicio}),
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
        console.log("resp: ",resp);
        const ejercicio = resp;
        
        dateOptions = getDatesBetween(ejercicio.fecha_inicio, ejercicio.fecha_fin).map(date => (
          <option value={date.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          }).toString()}>
            {date.toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            }).toString()}
          </option>
        ));
        hourOptions = getHoursOptions(ejercicio.hora_inicio, ejercicio.frecuencia_horas).map(hour => (
          <option value={hour}>
            {hour > 12 ? (hour - 12)+":00 pm" : hour < 12 ? hour+":00 am": hour+":00 pm"}
          </option>
        ));
        
        this.state.id_user = ejercicio.id_user;
        this.setState(this.state);
      })
      .catch(err => {
        console.error(err);
    });    
  }

  handleClick = () => {
    //fetch('http://localhost:5000/allResultsByEjercicio', {
    fetch('https://server.ubicu.co/allResultsByEjercicio', {
      method: 'POST',
      body: JSON.stringify({id_ejercicio:this.state.id_ejercicio, fecha:this.state.fecha, hora:this.state.hora}),
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
      console.log("resp", resp)
      if(resp.datos != ""){
        data = JSON.parse(resp.datos);
        fillGraph(this.state)
      }
      else
      {
        data = resp.msg;
      }
      this.forceUpdate();

    })
    .catch(err => {
        console.error(err);
    });
    
  }
  
  changeInput = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  render() {
    return (
      <div>
        <Grid >
        <Grid.Column>
          <Grid.Row>
          <Form style={{ marginTop: '1em' }}>
          <Form.Field>
            <label>Para ver la gráfica de la fisioterapia por favor selecciona el día de la semana y la hora del día:</label>              
            </Form.Field>
            <Form.Group >
                          <Form.Field>
                <label>Fecha de la fisioterapia</label>
                <select name="fecha" onChange={this.changeInput}>
                <option value={0}></option>
                  {dateOptions}
                </select>
                </Form.Field>
                <Form.Field>
                <label>Hora de la fisioterapia</label>
                <select name="hora" onChange={this.changeInput}>
                <option value={0}></option>
                  {hourOptions}
                </select>
                </Form.Field>
                <Button onClick={this.handleClick} primary type='submit'>Buscar</Button>                
            </Form.Group >
            </Form>
          </Grid.Row>
          <Grid.Row>
            {
              this.state.series.length != 0 ? 
                <Chart type="area" height={350} series={this.state.series} options={this.state.options}>
                </Chart> 
                : 
                data
            }
          </Grid.Row>
          <Grid.Row>
            <Link to={`/VerEjercicios/${this.state.id_user}`}><Button type='submit'>Regresar</Button></Link>
          </Grid.Row>
        </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProp =(state)=>{
    return{
        results: state.results.results
    };
}
export default connect(mapStateToProp,{allResultsByUser})(withRouter(VerResultados));

