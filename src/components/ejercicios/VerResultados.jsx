import React from 'react';
import { Button, Segment, Confirm } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Chart from 'react-apexcharts';
import moment from "moment";
import MenuNav from '../pages/MenuNav';
import { URL } from '../../actions/url.js';
import { allResultsByEjercicio } from "../../actions/resultsAction";

function fillGraph(data) {
  const seriesGraph = [];

  for (let i = 0; i < data.length; i++) {
    const series = {
      name: "Serie " + (i + 1),
      data: []
    };

    const n = Math.min(data[i]?.flujo?.length || 0, data[i]?.tiempo?.length || 0);

    for (let j = 0; j < n; j++) {
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
  let i = 0;
  while (i < ((12 / hourInterval) + 1)) {
    hours.push(currentHour);
    currentHour += hourInterval;
    i++;
  }
  return hours;
}

class VerResultados extends React.Component {
  state = {
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
    options: {
      chart: {
        stacked: false,
        toolbar: {
          show: true,
          tools: {
            download: false,
            customIcons: [
              {
                icon: `
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                `,
                title: 'Descargar PNG',
                class: 'apexcharts-custom-download',
                index: -1,
                click: (chart) => {
                  chart.dataURI().then(({ imgURI }) => {
                    const a = document.createElement('a');
                    a.href = imgURI;
                    a.download = `${this.props.nombre_paciente}.${this.state.fecha}.${this.state.hora}.png`;
                    a.click();
                  });
                }
              }
            ]
          }
        }
      },
      grid: {
        padding: { top: 20 }
      },
      tooltip: {
        followCursor: true,
        x: {
          formatter: function (value) {
            return moment.utc(value).format("HH:mm:ss");
          }
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      fill: {
        type: 'gradient',
        gradient: { opacityFrom: 0.6, opacityTo: 0.8 }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      xaxis: {
        title: { text: "Tiempo" },
        type: 'datetime'
      },
      yaxis: {
        title: { text: "Flujo" },
        type: 'numeric',
        min: 0
      },
      annotations: {
        yaxis: [{
          y: 0,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Meta',
            style: { color: "#fff", background: 'red' }
          }
        }]
      }
    }
  };

  getIdPatient = () => this.props.id_patient || this.props.match?.params?.id_patient || null;
  getIdEjercicio = () => this.props.id_ejercicio || this.props.match?.params?.id_ejercicio || null;

  componentDidMount() {
    const id_ejercicio = this.getIdEjercicio();
    if (!id_ejercicio) return;

    fetch(URL + 'getEjerciciobyId', {
      method: 'POST',
      body: JSON.stringify({ id_ejercicio }),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(res => res.ok ? res.json() : res.json().then(error => { throw new Error(error.msg); }))
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
          flujo: ejercicio.flujo,
          dates,
          hours
        });

        return fetch(URL + 'allResultsByDate', {
          method: 'POST',
          body: JSON.stringify({ id_ejercicio }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          }
        });
      })
      .then(res => res ? res.json() : null)
      .then(resp => {
        if (!resp) return;

        const available = {};
        resp.forEach(result => {
          const date = result.fecha;
          const hour = result.hora;

          if (!available[date]) available[date] = [];
          if (!available[date].includes(hour) && result.hasData === true) {
            available[date].push(hour);
          }
        });

        this.setState({ available });
      })
      .catch(err => {
        this.setState({
          openConfirm: true,
          confirmMessage: 'Error al consultar ejercicio. ' + (err?.message || 'Error desconocido.')
        });
      });
  }

  componentDidUpdate(prevProps) {
    const prev = prevProps.id_ejercicio || prevProps.match?.params?.id_ejercicio;
    const now = this.props.id_ejercicio || this.props.match?.params?.id_ejercicio;

    if (prev !== now) {
      this.setState(
        {
          series: [],
          rawData: null,
          msg: "",
          selectedDate: "",
          selectedHour: "",
          available: {},
          dates: [],
          hours: [],
          flujo: ""
        },
        () => this.componentDidMount()
      );
    }
  }

  handleClick = () => {
    const id_ejercicio = this.getIdEjercicio();
    const { allResultsByEjercicio } = this.props;
    const { flujo, fecha, hora } = this.state;

    if (!id_ejercicio || !fecha || hora === "") return;

    this.setState(prevState => {
      const options = { ...prevState.options };
      options.annotations.yaxis[0].y = flujo;
      return { options };
    });

    allResultsByEjercicio({ id_ejercicio, fecha, hora })
      .then(resp => {
        console.log('[VerResultados] resp:', resp);
        if (!resp || !resp.hasData || !resp.s3Key) {
          this.setState({
            series: [],
            rawData: null,
            msg: resp?.msg || "No hay información"
          });
          return null;
        }

        const resultId = resp._id?.$oid ?? resp._id;

        return fetch(URL + resultId + '/downloadUrl', {
          headers: { 'x-access-token': localStorage.getItem('token') }
        })
          .then(res => res.ok
            ? res.json()
            : res.text().then(text => { throw new Error(text || `Error ${res.status} en downloadUrl`); })
          )
          .then(({ url }) => fetch(url))
          .then(res => res.ok
            ? res.json()
            : res.text().then(text => { throw new Error('Error al descargar de S3: ' + (text?.slice(0, 120) || res.status)); })
          )
          .then(data => {
            this.setState({
              series: fillGraph(data),
              rawData: JSON.stringify(data),
              msg: ""
            });
            this.forceUpdate();
          });
      })
      .catch(err => {
        this.setState({
          openConfirm: true,
          confirmMessage: 'Error al consultar resultados. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
        });
      });
  }

  handleSelectDate = (date) => {
    this.setState({
      selectedDate: date,
      hora: '',
      fecha: date,
      selectedHour: '',
      series: [],
      rawData: null,
      msg: ""
    });
  }

  handleSelectHour = (hour) => {
    this.setState({ hora: hour, selectedHour: hour }, () => {
      this.handleClick();
    });
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
      const n = Math.min(serie.tiempo.length, serie.flujo.length);
      for (let j = 0; j < n; j++) {
        csvData.push([`Serie ${index + 1}`, serie.tiempo[j], serie.flujo[j]]);
      }
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
    const id_patient = this.getIdPatient();
    const {
      series, options, dates, hours, available,
      selectedDate, selectedHour, msg, openConfirm, confirmMessage
    } = this.state;

    return (
      <>
        {!this.props.embedded && <MenuNav />}

        <Segment raised>
          <label>Para ver la gráfica de la fisioterapia por favor selecciona el día de la semana y la hora del día.</label>

          <div style={{ marginTop: '1em' }}>
            <label>Fecha de la fisioterapia:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5em' }}>
              {dates.map(date => (
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
              ))}
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

          {msg}

          <Chart type="area" height={350} series={series} options={options} />

          <div style={{ marginTop: '1em', display: 'flex', gap: '1em' }}>
            <Button onClick={this.handleDownloadCSV} style={{ backgroundColor: '#46bee0', color: 'white' }}>
              Descargar CSV
            </Button>
            <Button onClick={this.handleDownloadJSON} style={{ backgroundColor: '#46bee0', color: 'white' }}>
              Descargar JSON
            </Button>

            {this.props.onBack ? (
              <Button
                type='button'
                onClick={this.props.onBack}
                style={{ backgroundColor: '#eb5a25', color: "white" }}
              >
                Regresar
              </Button>
            ) : (
              <Link to={`/VerEjercicios/${id_patient}`}>
                <Button type='button' style={{ backgroundColor: '#eb5a25', color: "white" }}>
                  Regresar
                </Button>
              </Link>
            )}
          </div>
        </Segment>

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

export default connect(null, { allResultsByEjercicio })(withRouter(VerResultados));
