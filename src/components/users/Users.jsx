import React, { Component } from 'react';
import User from "./User"
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Users extends Component {
  state = {
    patients: {}
  };

  componentDidMount() {
    const { id_user } = this.props;
    
    fetch('https://server.ubicu.co/getPatientbyUser', {
    //fetch('http://localhost:5000/getPatientbyUser', {
        method: 'POST',
        body: JSON.stringify({id_user}),
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
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
        const patients = resp;
        this.setState({ patients });
    })
    .catch(err => {
            console.error(err);
    });
  }

  render() {
    const { patients } = this.state;
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
                  {
                    patients.length > 0 ?
                      patients.map((patient, index) => (
                        <User key={index} patient={patient}/>
                      ))
                    :
                      ""
                  }
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

export default connect(null)(withRouter(Users));