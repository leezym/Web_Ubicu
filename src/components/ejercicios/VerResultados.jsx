import React, { Component } from 'react';
import {Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";
import{allResultsByUser} from "../../actions/resultsAction";


import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area, LabelList } from 'recharts';

import { PureComponent } from 'react';
import { ComposedChart, Bar } from 'recharts';    


      const data03 =  [
        { "time": "16:55:54", "volume": 0 }
  ];
  const dataVolumen = [{ "time": "16:55:54", "volume": 0 }];

      const initialState = {
        data03,
        dataVolumen,
        opacity: 1,
        anotherState: false,
      };
      const renderSpecialDot: React.FunctionComponent<any> = (props: any) => {
        const { cx, cy, stroke, key } = props;
      
        if (cx === +cx && cy === +cy) {
          return <path d={`M${cx - 2},${cy - 2}h4v4h-4Z`} fill={stroke} key={key} />;
        }
      
        return null;
      };
      
class VerResultados extends Component {
    state = initialState;
    
    componentDidMount(){
      console.log(this.props.id_ejercicio);
     /* this.props.allResultsByUser({id:this.props.id_ejercicio}).then(function(result,res){
        console.log(res);
        console.log(result);
      });*/
     
     /* let rs=this.props.allResultsByUser({id:this.props.id_ejercicio});
      console.log("rsssss",rs);
      rs.then(function(respuesta) {
        console.log(respuesta) // undefined
     })*/

     fetch('https://d2yaaz8bde1qj3.cloudfront.net/allResultsByEjercicio', {
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
      data03 = JSON.parse(resp[`${this.props.dato}`].datos);
      const dataVolumen = getVol(data03);
      console.log(dataVolumen);
      const newState = {
        data03,
        dataVolumen,
        opacity: 1,
        anotherState: false,
      };
      this.setState(newState);
      console.log(this.state);

    })
    .catch(err => {
          console.error(err);
          //this.setState({ loading: false, redirect: true });
    });
       
    function getVol(arrayFlow) {
      let count  = 0;
      let inspiracion = 0;
      let arrayVol = new Array();
      arrayFlow.forEach(element => {
        if(count == 0){
          arrayVol[0] = element
        }

        if(count > 0){
          if( arrayVol[count-1].volume > 200 && element.volume < 200){
            inspiracion = 0;
          }else{
            inspiracion = 0;
          }
          //console.log(inspiracion);
          arrayVol[count] = {"time":  element['time'], 'volume' :  element['volume'] + (arrayVol[count-1]['volume'] * inspiracion)}
          
        }
        //console.log(element);
        count++;
      });
      return arrayVol;
    }

      
        //this.props.history.push(`/VerEjercicios/${this.state.id_user}`);
        //this.setState(res);  
      //this.props.allEjerciciosByUser({id_user:this.props.id_user});
     
     //console.log(this.props._id); 
     console.log(this.state);

    }
    render() {
        const { data03,dataVolumen, opacity } = this.state;
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
                
        <div className="line-chart-wrapper">
          <LineChart
            width={800} height={400} data={data03}
            margin={{ top: 40, right: 40, bottom: 20, left: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" label={false} />
            <YAxis domain={['auto', 'auto']} label={{ value: 'Flujo', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              wrapperStyle={{
                borderColor: 'white',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
              }}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
            <Line dataKey="volume" stroke="#ff7300" dot={false} />
            <Brush dataKey="time" startIndex={data03.length - 10}>
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={['auto', 'auto']} />
                <Area dataKey="volume" stroke="#ff7300" fill="#ff7300" dot={false} />
              </AreaChart>
            </Brush>
          </LineChart>
        </div>
       
        {/* <div align= "center">
        <p>Gráficas de Volumen Respiratorio</p>
        </div> */}
        <p>Curva Volumen-Tiempo</p>
        
<div className="line-chart-wrapper">
  <LineChart
    width={800} height={400} data={dataVolumen}
    margin={{ top: 40, right: 40, bottom: 20, left: 10 }}
  >
    <CartesianGrid vertical={false} />
    <XAxis dataKey="time" label={false} />
    <YAxis domain={['auto', 'auto']} label={{ value: 'Volume', angle: -90, position: 'insideLeft' }} />
    <Tooltip
      wrapperStyle={{
        borderColor: 'white',
        boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
      }}
      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      labelStyle={{ fontWeight: 'bold', color: '#666666' }}
    />
    <Line dataKey="volume" stroke="#ff7300" dot={false} />
    <Brush dataKey="time" startIndex={dataVolumen.length - 10}> 
      <AreaChart>
        <CartesianGrid />
        <YAxis hide domain={['auto', 'auto']} />
        <Area dataKey="volume" stroke="#ff7300" fill="#ff7300" dot={false} />
      </AreaChart>
    </Brush>
  </LineChart>
</div>

        <List>
            <List.Item style={{ marginTop: '1em' }}>    
            <List.Content>
                <List.Header></List.Header>
                <List.Description>
                    <Link to="/VerRecomendaciones"><Button primary >Recomendaciones</Button></Link>
                    <Link to="/VerNovedades"><Button primary >Novedades</Button></Link>
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

