import React, { Component } from 'react';
import User from "./User"
import {Table, Button, Grid, Segment, Label, Input} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import { URL } from '../../actions/url.js';
import '../../styles/pagination_style.css';

class Users extends Component {
  state = {
    patients: {},
    pageCount: 1,
    currentPage: 0,
    patientsPerPage: 5,
    filteredPatients: []
  };

  componentDidMount() {
    const { id_user } = this.props;
    
    fetch(URL+'getPatientbyUser', {
        method: 'POST',
        body: JSON.stringify({id_user}),
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(error => {
          throw new Error(error.msg);
        });
      }
    })
    .then(resp => {        
        const patients = resp;
        const pageCount = Math.ceil(patients.length / this.state.patientsPerPage); // Calcula el número de páginas
        this.setState({ patients, pageCount });
    })
    .catch(err => {
      alert('Error al consultar paciente. ' + err.message);
    }); 
  }

  handlePageClick = ({ selected }) => {
    this.setState({ currentPage: selected }, () => {
      const { patients, currentPage, patientsPerPage, filteredPatients } = this.state;
      const offset = currentPage * patientsPerPage;
      const currentPatients = filteredPatients.length > 0 ?
        filteredPatients.slice(offset, offset + patientsPerPage)
        : patients.slice(offset, offset + patientsPerPage);
      this.setState({ currentPatients });
    });
  };

  handleNameFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredPatients = this.state.patients.filter((patient) =>
      patient.nombre.toLowerCase().includes(filterValue)
    );
    
    this.setState({
      currentPage: 0,
      filteredPatients,
      pageCount: Math.ceil(filteredPatients.length / this.state.patientsPerPage)
    });
  };

  render() {
    const { patients, currentPage, patientsPerPage, filteredPatients } = this.state;
    const offset = currentPage * patientsPerPage;
    let currentPatients = 0;
    
    if (patients.length > 0)
      currentPatients = filteredPatients.length > 0 ? 
        filteredPatients.slice(offset, offset + patientsPerPage)
        : patients.slice(offset, offset + patientsPerPage);

    return (
      <div>
        <MenuNav/> 
        <Grid stackable style={{ marginTop: '6em' }}>
          <Grid.Column>
            <Segment raised>
              <Label ribbon style={{color:"#28367b"}}>
                Lista de pacientes
              </Label>
              <Input
                  icon='search'
                  iconPosition='left'
                  placeholder='Filtrar por nombre...'
                  onChange={this.handleNameFilter}
              />
              <Table celled compact definition unstackable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Cédula</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    currentPatients.length > 0 ?
                      currentPatients.map((patient, index) => (
                        <User key={index} patient={patient}/>
                      ))
                      :
                      ( 
                        <Table.Row>
                          <Table.Cell colSpan={3}>No hay pacientes disponibles.</Table.Cell>
                        </Table.Row> 
                      )
                  }
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='2'>
                      <Link to={`/AgregarPaciente/${this.props.id_user}`}>
                        <Button floated='right' style={{ backgroundColor: '#eb5a25', color:"white" }}>Agregar</Button>
                      </Link>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Segment>
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
              activeLinkClassName={"active-link"}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null)(withRouter(Users));