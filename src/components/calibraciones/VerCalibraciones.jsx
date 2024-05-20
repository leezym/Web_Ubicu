import React from 'react';
import {Form, Grid, Button} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Chart from 'react-apexcharts'
import moment from "moment";
import ReactPaginate from 'react-paginate';
import '../../styles/pagination_style.css';
import { URL } from '../../actions/url.js';

function fillGraph(data) {
  const seriesGraph = [];
  
  // Add series to options
  const seriesFlujo = {
    name: "Flujo",
    data: []
  };

  const seriesVolumen = { //ISABELLA
    name: "Volumen",
    data: []
  };
  
  // Add data to series
  for (let j = 0; j < data.flujo.length; j++) {
    const flujo = data.flujo[j].toFixed(1);
    const volumen = data.volumen[j].toFixed(1); //ISABELLA
    const tiempo = data.tiempo[j].toFixed(1) * 1000;

    seriesFlujo.data.push([tiempo, flujo]);
    seriesVolumen.data.push([tiempo, volumen]); //ISABELLA
  }

  seriesGraph.push(seriesFlujo);
  seriesGraph.push(seriesVolumen); //ISABELLA
  
  return seriesGraph;
}
      
class VerCalibraciones extends React.Component {

  state = {
    graph: {},
    pageCount: 1,
    currentPage: 0,
    graphsPerPage: 10,
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
          text: "Datos" //ISABELLA
        },
        type: 'numeric'
      }
    }
  };

  componentDidMount() 
  {
    fetch(URL+'allCalibrations', {
        method: 'GET',
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
        const graph = resp.sort((a, b) => {
          const [dayA, monthA, yearA] = a.fecha.split('/').map(Number); // Parsea la fecha
          const [dayB, monthB, yearB] = b.fecha.split('/').map(Number); // Parsea la fecha

          const dateA = new Date(yearA, monthA - 1, dayA, a.hora, a.minutos);
          const dateB = new Date(yearB, monthB - 1, dayB, b.hora, b.minutos);
          return dateB - dateA;
        });

        const pageCount = Math.ceil(graph.length / this.state.graphsPerPage); // Calcula el número de páginas
  
        this.setState({ graph, pageCount });
      })
      .catch(err => {
        console.error(err);
    });
  }

  handlePageClick = ({ selected }) => {
    this.setState({ currentPage: selected });
  };

  
  changeInput = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  render() {
    const { graph, options, currentPage, graphsPerPage } = this.state;
    const offset = currentPage * graphsPerPage;
    let currentGraphs = 0;
    
    if (graph.length > 0)
      currentGraphs = graph.slice(offset, offset + graphsPerPage);

    return (
      <div>
        <Grid style={{ marginTop: '7em' }} columns={1}>
          <Grid.Column>
            {       
              currentGraphs.length > 0 ?
                currentGraphs.map((data, index) => {
                  return (
                    <div>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>Fecha:</span> {data.fecha} &nbsp;
                        <span style={{ fontWeight: 'bold' }}>Hora:</span> {data.hora}:{data.minutos}
                      </p>
                      <Chart key={index} type="area" height={350} series={fillGraph(JSON.parse(data.datos))} options={options}></Chart>
                    </div>
                  )
                })
              :
                ( <p>No hay gráficas para mostrar.</p> )
            }
          </Grid.Column>
        </Grid>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          />
      </div>
    );
  }
}

export default connect(null)(withRouter(VerCalibraciones));

