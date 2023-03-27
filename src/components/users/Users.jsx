import React, { Component } from 'react';
import User from "./User"
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import { mostrarPatients } from "../../actions/patientsAction";
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Users extends Component {

  componentDidMount() {
    this.props.mostrarPatients({id_user:this.props.id_user});
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <MenuNav/> 
        <Grid style={{ marginTop: '7em' }} columns={1}>
          <Grid.Column>
            <Segment raised>
              <Label color='blue' ribbon>
                Lista de pacientes
              </Label>
              <Table celled compact definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Cédula</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map((user, index) => (
                    <User key={index} user={user} id={this.props.id_user}/>
                  ))}
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='2'>
                      <Link to={`/AgregarPaciente/${this.props.id_user}`}>
                        <Button floated='right' icon labelPosition='left' primary size='small'>
                          <Icon name='user' />
                          Agregar
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

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps, { mostrarPatients })(withRouter(Users));