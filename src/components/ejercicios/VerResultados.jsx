import React from 'react';
import {Form, Grid, Button, Card, Segment} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import {connect} from "react-redux";
import{allResultsByEjercicio} from "../../actions/resultsAction";
import Chart from 'react-apexcharts'
import moment from "moment";
import MenuNav from '../pages/MenuNav';

function fillGraph(data) {
  const seriesGraph = [];
  // Add series to options
  for (let i = 0; i < data.length; i++) {
    const series = {
      name: "Serie "+(i+1),
      data: []
    };

    // Add data to series
    for (let j = 0; j < data[i].flujo.length; j++) {
      const tiempo = data[i].tiempo[j].toFixed(1) * 1000;
      const flujo = data[i].flujo[j].toFixed(1);
      series.data.push([tiempo, flujo]);
    }

    /*for (let j = 0; j < data[i].flujo.length; j++) {
      let tiempo = data[i].tiempo[j].toFixed(2) * 1000;
      moment.utc(tiempo).format("HH:mm:ss")
      const flujo = data[i].flujo[j].toFixed(1);
      series.data.push([tiempo, flujo]);

      j === data[i].flujo.length - 1 ?
        tiempo = (data[i].tiempo[j] + 1) * 1000
      :
        tiempo = ((data[i].tiempo[j]) + (data[i].tiempo[j+1] - data[i].tiempo[j])/2) * 1000

      moment.utc(tiempo).format("HH:mm:ss")
      series.data.push([tiempo, 0]);
    }*/

    seriesGraph.push(series);
  }
  return seriesGraph;
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
  while (i < ((12/hourInterval)+1)){
    hours.push(currentHour);
    currentHour+=hourInterval
    i++;
  }
  return hours;
}
      
class VerResultados extends React.Component {
  state = {
    id_patient: this.props.id_patient,
    id_ejercicio: this.props.id_ejercicio,
    flujo: "",
    hora: "",
    fecha: "",
    dateOptions: "",
    hourOptions: "",
    msg: "",
    series: [],    
    options:{
      chart: {
        stacked: false
      },
      tooltip:{
        followCursor: true,
        x: {
          formatter: function(value) {
            return moment.utc(value).format("HH:mm:ss");
          }
        }
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
      },
      annotations: {
        yaxis: [{
          y: 0,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Meta',
            style: {
              color: "#fff",
              background: 'red'
            }
          }
        }]
      }
    }
  };
  
  componentDidMount(){
    fetch('https://server.ubicu.co/getEjerciciobyId', {
    //fetch('http://localhost:5000/getEjerciciobyId', {
        method: 'POST',
        body: JSON.stringify({id_ejercicio:this.state.id_ejercicio}),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
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
        const ejercicio = resp;
        
        const dateOptions = getDatesBetween(ejercicio.fecha_inicio, ejercicio.fecha_fin).map(date => (
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
        const hourOptions = getHoursOptions(ejercicio.hora_inicio, ejercicio.frecuencia_horas).map(hour => (
          <option value={hour}>
            {hour > 12 ? (hour - 12)+":00 pm" : hour < 12 ? hour+":00 am": hour+":00 pm"}
          </option>
        ));
        
        this.setState({
          flujo:ejercicio.flujo,
          dateOptions:dateOptions,
          hourOptions:hourOptions
        });
      })
      .catch(err => {
        console.error(err);
    });
  }

  handleClick = () => {
    const { id_ejercicio, allResultsByEjercicio } = this.props;
    const { flujo, fecha, hora } = this.state;
    this.setState(prevState => {
      let options = {...prevState.options};
      options.annotations.yaxis[0].y = flujo;
      return {
        options: options
      };
    });
    
    allResultsByEjercicio({ id_ejercicio, fecha, hora }).then(resp => {
      if(resp.datos === "")
        this.setState({
          series:[],
          msg:resp.msg
        })
        else
        this.setState({
          series:fillGraph(JSON.parse(resp.datos)),
          msg:""
        });
      
      this.forceUpdate();
    }).catch(error => {
      console.log(error);
    }); 
  }
  
  changeInput = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  render() {
    const { id_patient, series, options, dateOptions, hourOptions, msg } = this.state;

    return (
      <div>
        <MenuNav />
        <Grid style={{ marginTop: '5em' }} columns={1}>
          <Grid.Column>
            <Segment raised>
                <Form >
                  <label>Para ver la gráfica de la fisioterapia por favor selecciona el día de la semana y la hora del día:</label>
                  <Form.Group style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '1em' }}>
                    <Form.Field style={{ marginRight: '3em' }}>
                      <label>Fecha de la fisioterapia</label>
                      <select name="fecha" onChange={this.changeInput}>
                        <option value={0}>Seleccione una opción</option>
                        {dateOptions}
                      </select>
                    </Form.Field>
                    <Form.Field style={{ marginRight: '3em' }}>
                      <label>Hora de la fisioterapia</label>
                      <select name="hora" onChange={this.changeInput}>
                        <option value={0}>Seleccione una opción</option>
                        {hourOptions}
                      </select>
                    </Form.Field>                    
                  </Form.Group>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2em' }}>
                    <Button onClick={this.handleClick} type='submit' style={{ backgroundColor: '#46bee0', color:"white" }}>Buscar</Button>
                    <Link to={`/VerEjercicios/${id_patient}`}><Button type='submit' style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                  </div>
                </Form>
            </Segment>
            <Segment raised>
              {msg}
              <Chart type="area" height={350} series={series} options={options}></Chart>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null,{ allResultsByEjercicio })(withRouter(VerResultados));

