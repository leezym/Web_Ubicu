import React, { Component } from 'react';
import {Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";
import{allResultsByUser} from "../../actions/resultsAction";
import Chart from 'react-apexcharts'

import { PureComponent } from 'react';    

  const initialState = {
    series: [
      {
        name: 'Serie 1',
        data: [16, 1, { // valores eje X
          min: 0, 
          max: 5 //this.props.ejercicio.flujo
        }],
        color: '#008FFB'
      },
      {
        name: 'Serie 2',
        data: [18, 2, {
          min: 0, 
          max: 5 //this.props.ejercicio.flujo
        }],
        color: '#00E396'
      },
      {
        name: 'Serie 3',
        data: [20, 3, {
          min: 0, 
          max: 5 //this.props.ejercicio.flujo
        }],
        color: '#CED4DC'
      }
    ],    
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
        labels: {
          datetimeFormatter: {
            hour: 'HH:mm:ss'
          }
        }
      }
    }
  };

  /*var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();*/
      
class VerResultados extends React.Component {
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

              <Chart type="area" height={350} series={this.state.series} options={this.state.options}>
              </Chart>

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

