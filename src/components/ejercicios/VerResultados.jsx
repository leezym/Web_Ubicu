import React, { Component } from 'react';
import {Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";
import{allResultsByUser} from "../../actions/resultsAction";
import ReactApexChart from 'react-apexcharts'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area, LabelList } from 'recharts';

import { PureComponent } from 'react';
import { ComposedChart, Bar } from 'recharts';    

  const initialState = {
    series: [
      {
        name: 'Serie 1',
        data: ('16:55:54', 1, {
          min: 0, 
          max: 5 //this.props.ejercicio.flujo
        })
      },
      {
        name: 'Serie 2',
        data: ('18:55:54', 2, {
          min: 0, 
          max: 5 //this.props.ejercicio.flujo
        })
      },
      {
        name: 'Serie 3',
        data: ('20:55:54', 3, {
          min: 0, 
          max: 5 //this.props.ejercicio.flujo
        })
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min))
          }
        },
      },
      colors: ['#008FFB', '#00E396', '#CED4DC'],
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
        type: 'datetime'
      }
    }
  };
      
class VerResultados extends Component {
  state = initialState;
  
  componentDidMount(){
    console.log(this.props.id_ejercicio);

    fetch('http://localhost:5000/allResultsByEjercicio', {
  //fetch('https://server.ubicu.co/allResultsByEjercicio', {
    method: 'POST',
    body: JSON.stringify({id_ejercicio:this.props.id_ejercicio}),
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
      //data03 = JSON.parse(resp[`${this.props.dato}`].datos);
      //const dataVolumen = getVol(data03);
      //console.log(dataVolumen);
      this.setState(this.state);
      console.log(this.state);

    })
    .catch(err => {
          console.error(err);
    });
    
  }
  render() {
    return (
      <div>
      <MenuNav/>
      <Grid style={{ marginTop: '7em' }} columns={1}>
        <Grid.Column>
          <Segment raised>
            <Label color='green' ribbon>
              Resultados
            </Label>
              
            {/* <div align= "center">
            <p>Gráficas de Flujo Respiratorio</p>
            </div> */}
            <p>Curva Flujo-Tiempo</p>
              

            <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
            </div>

            <List>
              <List.Item style={{ marginTop: '1em' }}>    
                <List.Content>
                    <List.Header></List.Header>
                    <List.Description>
                        <Link to={`/VerEjercicios/${this.props.id_user}`}><Button >Regresar</Button></Link>
                    </List.Description>
                </List.Content>
                </List.Item>
            </List>
          </Segment>
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

