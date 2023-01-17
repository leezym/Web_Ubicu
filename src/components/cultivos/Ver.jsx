import React, { Component } from 'react';
import {Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import MenuNav from '../pages/MenuNav';
import {connect} from "react-redux";

class Ver extends Component {
    state ={};
    componentDidMount(){
     const cultivos = this.props.cultivos.filter(p=>p._id == this.props.id_cultivo );    
     this.setState(cultivos[0]);
     console.log(this.props.cultivos);
     console.log(this.props._id);
     console.log(cultivos);

    }
    render() {
        return (
        <div>
        <MenuNav/>
        <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='green' ribbon>
                Cultivo
                </Label>
                <span>Detalles</span>
                <List>
                    <List.Item>
                    <List.Content>
                        <List.Header>Finca</List.Header>
                        <List.Description>{this.state.nombreFinca}</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Ubicación</List.Header>
                        <List.Description>{this.state.ubicacion}</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Nombre</List.Header>
                        <List.Description>{this.state.nombreCultivo}</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Numero de Cafetos</List.Header>
                        <List.Description>{this.state.numeroCafetos}</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Extensión</List.Header>
                        <List.Description>{this.state.extension} m2</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Fecha de Siembra</List.Header>
                        <List.Description>{this.state.fechaSiembra}</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item style={{ marginTop: '1em' }}>    
                    <List.Content>
                        <List.Header></List.Header>
                        <List.Description>
                            <Link to="/VerRecomendaciones"><Button primary >Recomendaciones</Button></Link>
                            <Link to="/VerNovedades"><Button primary >Novedades</Button></Link>
                            <Link to={`/VerCultivos/${this.state.id_user}`}><Button >Regresar</Button></Link>
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
        cultivos: state.cultivos.cultivos
    };
}
export default connect(mapStateToProp,null)(Ver);
