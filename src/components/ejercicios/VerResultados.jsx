import React from 'react';
import {Form, Grid, Button, Segment, Confirm} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import {connect} from "react-redux";
import{allResultsByEjercicio} from "../../actions/resultsAction";
import Chart from 'react-apexcharts'
import moment from "moment";
import MenuNav from '../pages/MenuNav';
import { URL } from '../../actions/url.js';

function fillGraph(data) {
  const seriesGraph = [];
  // Add series to options
  for (let i = 0; i < data.length; i++) {
    const series = {
      name: "Serie "+ (i + 1),
      data: []
    };

    // Add data to series
    for (let j = 0; j < data[i].flujo.length; j++) {
      const tiempo = data[i].tiempo[j] * 1000;
      const flujo = data[i].flujo[j];
      series.data.push([tiempo, flujo]);
    }

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
    id_user: this.props.location.state.id_user,
    flujo: "",
    hora: "",
    fecha: "",
    dates: [],
    hours: [],
    available: {},
    selectedDate: "",
    selectedHour: "",
    msg: "",
    series: [],
    rawData: null,
    openConfirm: false,
    confirmMessage: '',
    options:{
      chart: {
        stacked: false,
        toolbar: {
          show: true,
          tools: {
            download: false
          }
        }
      },
      grid: {
        padding: {
          top: 20
        }
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
    fetch(URL+'getEjerciciobyId', {
        method: 'POST',
        body: JSON.stringify({id_ejercicio:this.state.id_ejercicio}),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(error => {
            throw new Error(error.msg);
          });
        }
      })
      .then(resp => {
        const ejercicio = resp;
        
        const dates = getDatesBetween(ejercicio.fecha_inicio, ejercicio.fecha_fin).map(date =>
          date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        );
        const hours = getHoursOptions(ejercicio.hora_inicio, ejercicio.frecuencia_horas);

        this.setState({
          flujo:ejercicio.flujo,
          dates: dates,
          hours: hours
        });

        fetch(URL+'allResultsByDate', {
          method: 'POST',
          body: JSON.stringify({id_ejercicio:this.state.id_ejercicio}),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          }
        })
        .then(res => res.json())
        .then(resp => {
          const available = {};
          resp.forEach(result => {
            const date = result.fecha;
            const hour = result.hora;
            if (!available[date]) available[date] = [];
            if (!available[date].includes(hour) && result.datos !== "") available[date].push(hour);
          });
          this.setState({ available });
        })
      })
      .catch(err => {
        this.setState({
          openConfirm: true,
          confirmMessage: 'Error al consultar ejercicio. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
        });
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
          rawData: null,
          msg:resp.msg
        })
        else
        this.setState({
          series:fillGraph(JSON.parse(resp.datos)),
          rawData: resp.datos,
          msg:""
        });

      this.forceUpdate();
    }).catch(err => {
      this.setState({
        openConfirm: true,
        confirmMessage: 'Error al consultar resultados. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
      });
    });
  }
  
  handleSelectDate = (date) => {
    this.setState({ selectedDate: date, hora: '', fecha: date, selectedHour: '' });
  }

  handleSelectHour = (hour) => {
    this.setState({ hora: hour, selectedHour: hour }, () => {
      this.handleClick();
    });
  }

  changeInput = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  handleCancel = () => {
    this.setState({ openConfirm: false });
  };

  handleDownloadCSV = () => {
    const { rawData } = this.state;
    if (!rawData) {
      this.setState({
        openConfirm: true,
        confirmMessage: 'No hay datos disponibles para descargar.'
      });
      return;
    }
    const data = JSON.parse(rawData);
    const csvData = [['Series Name', 'Time', 'Flow']];
    data.forEach((serie, index) => {
      serie.flujo.forEach((flow, j) => {
        csvData.push([`Serie ${index + 1}`, serie.tiempo[j], flow]);
      });
    });
    const csvString = csvData.map(row => row.map(cell => `${cell}`).join('|')).join('\n');
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'chart_data.csv';
    a.click();
  };

  handleDownloadJSON = () => {
    const { rawData } = this.state;
    if (!rawData) {
      this.setState({
        openConfirm: true,
        confirmMessage: 'No hay datos disponibles para descargar.'
      });
      return;
    }
    const data = JSON.parse(rawData);
    const adjustedData = data.map((serie, index) => ({
      name: `Serie ${index + 1}`,
      tiempo: serie.tiempo,
      flujo: serie.flujo
    }));
    const jsonString = JSON.stringify(adjustedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonString);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'chart_data.json';
    a.click();
  };

  render() {
    const { id_patient, id_user, series, options, dates, hours, available, selectedDate, selectedHour, msg, openConfirm, confirmMessage } = this.state;

    return (
      <>
        <MenuNav />
        <Grid style={{ marginTop: '5em' }} columns={1}>
          <Grid.Column>
            <Segment raised>
                <Form >
                  <label>Para ver la gráfica de la fisioterapia por favor selecciona el día de la semana y la hora del día.</label>
                  <div style={{ marginTop: '1em' }}>
                    <label>Fecha de la fisioterapia:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5em' }}>
                      {dates.map(date => {
                        return (
                          <Button
                            key={date}
                            onClick={() => this.handleSelectDate(date)}
                            style={{
                              backgroundColor: selectedDate === date ? '#28a745' : '#46bee0',
                              color: 'white',
                              margin: '0.5em'
                            }}
                            type='button'
                          >
                            {date}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  {selectedDate && (
                    <div style={{ marginTop: '1em' }}>
                      <label>Hora de la fisioterapia:</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5em' }}>
                        {hours.map(hour => {
                          const hasData = available[selectedDate] && available[selectedDate].includes(hour);
                          return (
                            <Button
                              key={hour}
                              onClick={() => this.handleSelectHour(hour)}
                              style={{
                                backgroundColor: selectedHour === hour ? '#28a745' : hasData ? '#46bee0' : '#ccc',
                                color: 'white',
                                margin: '0.5em'
                              }}
                              type='button'
                            >
                              {hour > 12 ? (hour - 12) + ":00 pm" : hour < 12 ? hour + ":00 am" : hour + ":00 pm"}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2em' }}>
                    <Link to={{ pathname: `/VerEjercicios/${id_patient}`, state: { id_user: id_user }}}>
                      <Button type='submit' style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button>
                    </Link>
                  </div>
                </Form>
            </Segment>
            <Segment raised>
              {msg}
              <Chart type="area" height={350} series={series} options={options}/>
              <div style={{ marginTop: '1em', display: 'flex', gap: '1em' }}>
                <Button onClick={this.handleDownloadCSV} style={{ backgroundColor: '#46bee0', color: 'white' }}>Descargar CSV</Button>
                <Button onClick={this.handleDownloadJSON} style={{ backgroundColor: '#46bee0', color: 'white' }}>Descargar JSON</Button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
        
        <Confirm
          open={openConfirm}
          content={confirmMessage}
          confirmButton='Aceptar'
          cancelButton={null}
          onConfirm={this.handleCancel}
        />
      </>
    );
  }
}

export default connect(null,{ allResultsByEjercicio })(withRouter(VerResultados));

