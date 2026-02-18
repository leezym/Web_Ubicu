import React from 'react';
import { Form, Grid, Button, Segment, Confirm } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Chart from 'react-apexcharts'
import moment from "moment";
import MenuNav from '../pages/MenuNav';
import { URL } from '../../actions/url.js';
import pako from "pako";

function fillGraph(data) {
  const seriesGraph = [];
  // Add series to options
  for (let i = 0; i < data.length; i++) {
    const series = {
      name: "Serie " + (i + 1),
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
  while (i < ((12 / hourInterval) + 1)) {
    hours.push(currentHour);
    currentHour += hourInterval
    i++;
  }
  return hours;
}

async function fetchAndParseGz(downloadUrl) {
  const r = await fetch(downloadUrl);
  if (!r.ok) throw new Error("No se pudo descargar el archivo de S3");

  const arrayBuffer = await r.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  // gunzip -> string
  const jsonText = pako.ungzip(uint8, { to: "string" });

  // parse JSON
  return JSON.parse(jsonText);
}

function downloadJSON(data, filename = "result.json") {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function toCSV(series) {
  let lines = ["serie,punto,tiempo,flujo"];
  series.forEach((s, si) => {
    const n = Math.min(s.tiempo.length, s.flujo.length);
    for (let i = 0; i < n; i++) {
      lines.push(`${si},${i},${s.tiempo[i]},${s.flujo[i]}`);
    }
  });
  return lines.join("\n");
}

function downloadCSV(series, filename = "result.csv") {
  const csv = toCSV(series);
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

class VerResultados extends React.Component {
  state = {
    flujo: "",
    hora: "",
    fecha: "",
    dates: [],
    hours: [],
    available: {},      // { fecha: [hora1, hora2, ...] } (se conserva tal cual para el UI)
    availableIds: {},   // { fecha: { hora: resultId } } (nuevo: para pedir downloadUrl)
    selectedDate: "",
    selectedHour: "",
    msg: "",
    series: [],
    rawData: null,      // ahora será ARRAY ya parseado (no string)
    openConfirm: false,
    confirmMessage: '',
    options: {
      chart: {
        stacked: false,
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      export: {
        csv: {
          enabled: false
        }
      },
      grid: {
        padding: {
          top: 20
        }
      },
      tooltip: {
        followCursor: true,
        x: {
          formatter: function (value) {
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
            style: {
              color: "#fff",
              background: 'red'
            }
          }
        }]
      }
    }
  };

  getIdPatient = () => this.props.id_patient || this.props.match?.params?.id_patient || null;
  getIdEjercicio = () => this.props.id_ejercicio || this.props.match?.params?.id_ejercicio || null;

  componentDidMount() {
    const id_ejercicio = this.getIdEjercicio();

    fetch(URL + 'getEjerciciobyId', {
      method: 'POST',
      body: JSON.stringify({ id_ejercicio }),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(error => { throw new Error(error.msg); });
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
          flujo: ejercicio.flujo,
          dates: dates,
          hours: hours
        });

        // IMPORTANTE: backend real => /results/allResultsByDate
        fetch(URL + 'allResultsByDate', {
          method: 'POST',
          body: JSON.stringify({ id_ejercicio }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          }
        })
          .then(res => res.json())
          .then(resp => {
            const available = {};
            const availableIds = {};

            resp.forEach(result => {
              const date = result.fecha;
              const hour = result.hora;

              // Para UI: array de horas (igual que antes)
              if (!available[date]) available[date] = [];
              if (result.hasData === true && !available[date].includes(hour)) {
                available[date].push(hour);
              }

              // Para lógica S3: mapa hora -> _id
              if (!availableIds[date]) availableIds[date] = {};
              if (result.hasData === true) {
                availableIds[date][hour] = result._id;
              }
            });

            this.setState({ available, availableIds });
          })
      })
      .catch(err => {
        this.setState({
          openConfirm: true,
          confirmMessage: 'Error al consultar ejercicio. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
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
          availableIds: {},
          dates: [],
          hours: [],
          flujo: ""
        },
        () => this.componentDidMount()
      );
    }
  }

  // Nueva lógica: cargar completo desde S3 según fecha/hora seleccionada
  handleClick = async () => {
    const { flujo, fecha, hora, availableIds } = this.state;

    // Set meta line (igual que antes)
    this.setState(prevState => {
      let options = { ...prevState.options };
      options.annotations.yaxis[0].y = flujo;
      return { options };
    });

    try {
      const resultId = availableIds?.[fecha]?.[hora];

      if (!resultId) {
        this.setState({
          series: [],
          rawData: null,
          msg: "No hay información"
        });
        return;
      }

      // 1) pedir presigned GET al backend
      const r1 = await fetch(URL + `${resultId}/downloadUrl`, {
        method: "GET",
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      const j1 = await r1.json();
      if (!r1.ok || !j1.ok) {
        throw new Error(j1.msg || j1.error || "No se pudo obtener el link de descarga");
      }

      // 2) bajar .json.gz de S3 y parsear
      const data = await fetchAndParseGz(j1.url); // array de series

      // 3) graficar completo
      this.setState({
        series: fillGraph(data),
        rawData: data,
        msg: ""
      });

      this.forceUpdate();
    } catch (err) {
      this.setState({
        openConfirm: true,
        confirmMessage: 'Error al consultar resultados. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
      });
    }
  }

  handleSelectDate = (date) => {
    this.setState({ selectedDate: date, hora: '', fecha: date, selectedHour: '', series: [], rawData: null, msg: "" });
  }

  handleSelectHour = (hour) => {
    this.setState({ hora: hour, selectedHour: hour }, () => {
      this.handleClick();
    });
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel = () => {
    this.setState({ openConfirm: false });
  };

  // ✅ Descargas ahora usan rawData ya parseado (array)
  handleDownloadCSV = () => {
    const { rawData } = this.state;
    if (!rawData) {
      this.setState({
        openConfirm: true,
        confirmMessage: 'No hay datos disponibles para descargar.'
      });
      return;
    }
    downloadCSV(rawData, "chart_data.csv");
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
    downloadJSON(rawData, "chart_data.json");
  };

  render() {
    const id_patient = this.getIdPatient();
    const { series, options, dates, hours, available, selectedDate, selectedHour, msg, openConfirm, confirmMessage } = this.state;

    return (
      <>
        { !this.props.embedded && <MenuNav /> }

        <Segment raised>
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

          {msg}

          <Chart type="area" height={350} series={series} options={options} />
          <div style={{ marginTop: '1em', display: 'flex', gap: '1em' }}>
            <Button onClick={this.handleDownloadCSV} style={{ backgroundColor: '#46bee0', color: 'white' }}>Descargar CSV</Button>
            <Button onClick={this.handleDownloadJSON} style={{ backgroundColor: '#46bee0', color: 'white' }}>Descargar JSON</Button>
            {
              this.props.onBack ? (
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
              )
            }
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

export default connect(null, null)(withRouter(VerResultados));
