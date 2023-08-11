import React, { Component } from 'react';
import { Button, Table, Grid, Segment, Label, Card, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from 'react-router-dom';
import Ejercicio from './Ejercicio';
import { connect } from 'react-redux';
import moment from "moment";
import ReactPaginate from 'react-paginate';
import '../../styles/pagination_style.css';

class Ejercicios extends Component {
  state = {
    user: {},
    capacidad_vital: 0, 
    ejercicios: {},
    pageCount: 1,
    currentPage: 0,
    exercisesPerPage: 5
  };

  componentDidMount() {
    const { id_patient } = this.props;

    fetch('https://server.ubicu.co/getPatientbyId', {
    //fetch('http://localhost:5000/getPatientbyId', {
        method: 'POST',
        body: JSON.stringify({id_patient}),
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
        const user = resp;
        const capacidad_vital = this.getCapacidadVital(user).toFixed(2);
        this.setState({ user, capacidad_vital });
      })
      .catch(err => {
            console.error(err);
    });
    
    fetch('https://server.ubicu.co/allEjerciciosByPatient', {
    //fetch('http://localhost:5000/allEjerciciosByPatient', {
        method: 'POST',
        body: JSON.stringify({id_patient}),
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
        const ejercicios = resp;
        const pageCount = Math.ceil(ejercicios.length / this.state.exercisesPerPage); // Calcula el número de páginas
        this.setState({ ejercicios, pageCount });
      })
      .catch(err => {
            console.error(err);
    });

  };

  getCapacidadVital = (user) => {
    if (user.sexo === 'M') {
      return 27.63 - 0.112 * user.edad * (user.altura / 100);
    } else if (user.sexo === 'F') {
      return 21.78 - 0.101 * user.edad * (user.altura / 100);
    } else {
      return 0;
    }
  };  

  handlePageClick = ({ selected }) => {
    this.setState({ currentPage: selected });
  };

  render() {
    const { user, capacidad_vital, ejercicios, currentPage, exercisesPerPage } = this.state;
    const offset = currentPage * exercisesPerPage;
    let currentExercises = 0;
    
    if (ejercicios.length > 0)
      currentExercises = ejercicios.slice(offset, offset + exercisesPerPage);
    
    return (
      <div>
        <MenuNav />
        <Grid style={{ marginTop: '7em' }} columns={1}>
          <Grid.Column>
            <Segment raised>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Nombre del paciente</TableCell>
                    <TableCell>{user.nombre}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Altura:</TableCell>
                    <TableCell>{user.altura}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Edad:</TableCell>
                    <TableCell>{user.edad}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sexo:</TableCell>
                    <TableCell>{user.sexo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Capacidad vital:</TableCell>
                    <TableCell>{capacidad_vital}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {
                ejercicios.length === 0 || (ejercicios.length > 0 && moment().isAfter(moment(ejercicios[ejercicios.length - 1].fecha_fin, 'DD/MM/YYYY'))) ?
                  <Link to={`/AgregarEjercicio/${user._id}`}><Button primary type='submit'>Agregar</Button></Link> : ""
              }
              <Link to={`/VerUser/${user._id}`}><Button >Regresar</Button></Link>
            </Segment>
            <Segment raised>
              <Label color="blue" ribbon>
                Prescripción
              </Label>
              <Card.Group>
                {                  
                  currentExercises.length > 0 ?
                    currentExercises.map((ejercicio, index) => {
                      return <Ejercicio key={index} ejercicio={ejercicio} />;
                    })
                  :
                    ( <p>No hay ejercicios disponibles.</p> )
                }
              </Card.Group>
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
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(null)(Ejercicios));