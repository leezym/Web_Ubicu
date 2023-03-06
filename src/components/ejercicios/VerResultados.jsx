import React, { Component } from 'react';
import {Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";
import{allResultsByUser} from "../../actions/resultsAction";
import Chart from 'react-apexcharts'
import moment from "moment";

  const data = [{flujo:"", tiempo: ""}]

  const initialState = {
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
        categories: [],
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          formatter: (value, timestamp) => {
            return moment.utc(value).format("HH:mm:ss");
          }
        }
      }
    }
  };
      
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
      data = JSON.parse(resp[`${this.props.dato}`].datos);
      console.log("data: ",data);
      this.setState(this.state);

    })
    .catch(err => {
          console.error(err);
    });

    // Unify all categories from all series
    const allCategories = [];
    for (let i = 0; i < data.series.length; i++) {
      for (let j = 0; j < data.series[i].tiempo.length; j++) {
        const category = data.series[i].tiempo[j];
        if (!allCategories.includes(category)) {
          allCategories.push(category);
        }
      }
    }

    // Convert seconds to milliseconds
    const categoriesInMilliseconds = allCategories.map(category => category * 1000);

    initialState.xaxis.categories = categoriesInMilliseconds;

    // Add series to options
    for (let i = 0; i < data.series.length; i++) {
      const series = {
        name: "Serie "+(i+1),
        data: []
      };

      // Add data to series
      for (let j = 0; j < categoriesInMilliseconds.length; j++) {
        const category = categoriesInMilliseconds[j];
        const value = data.series[i].data[data.series[i].tiempo.indexOf(category/1000)];
        series.data.push(value || 0);
      }

      initialState.series.push(series); 
      
    }
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

