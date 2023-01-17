import React, { Component } from 'react';
import User from "./User"
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import{mostrarUsers} from "../../actions/usersAction";
import MenuNav from '../pages/MenuNav';
import {Link,withRouter} from "react-router-dom";
import {connect} from "react-redux";



class Users extends Component {

  componentDidMount(){
    this.props.mostrarUsers();
  }

    render() {
      const {users} = this.props;
        return (
          <div>
          <MenuNav/> 
          <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='blue' ribbon>
                Lista de pacientes
                </Label>
                <Table  celled compact definition>
                  <Table.Header  fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Cedula</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                  </Table.Header>
                  {users.map((user,index)=>{
                    return (<User 
                      mostrarUsers={()=>{this.props.mostrarUsers()}}
                      key={index} user={user}></User>)
                  })}
                  <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='3'>
                    <Link to="/AgregarUser">
                      <Button floated='right' icon labelPosition='left' primary  size='small'>
                      <Icon name='user' />
                      Agregar>
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
    users: state.users.users 
  };
}
export default connect(mapStateToProp,{mostrarUsers})(withRouter(Users));