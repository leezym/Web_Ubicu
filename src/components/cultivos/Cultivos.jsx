import React, { Component } from 'react';
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import {Link} from "react-router-dom";
import{allCultivosByUser} from "../../actions/cultivosAction";
import Cultivo from './Cultivo';
import {connect} from "react-redux";


class Cultivos extends Component {

  componentDidMount(){
    this.props.allCultivosByUser({id_user:this.props.id_user});
  }

    render() {
      const {cultivos} = this.props;
        return (
          <div>
          <MenuNav/> 
          <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='blue' ribbon>
                Lista de Cultivos
                </Label>
                <Table  celled compact definition>
                  <Table.Header  fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Finca</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                  </Table.Header>
                  {cultivos.map((cultivo,index)=>{
                    return (<Cultivo 
                      key={index} cultivo={cultivo}></Cultivo>)
                  })}
                  <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='3'>
                     <Link to="/Users">
                      <Button floated='right' icon labelPosition='left'  size='small'>
                      Regresar>
                      </Button>
                    </Link> 
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
                </Table>
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
export default connect(mapStateToProp,{allCultivosByUser})(Cultivos);
