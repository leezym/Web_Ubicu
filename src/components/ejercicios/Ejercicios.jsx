import React, { Component } from 'react';
import { Button, Table, Grid, Segment, Label, Card, TableBody, TableCell, TableRow, Confirm } from 'semantic-ui-react';
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from 'react-router-dom';
import Ejercicio from './Ejercicio';
import { connect } from 'react-redux';
import moment from "moment";
import ReactPaginate from 'react-paginate';
import '../../styles/pagination_style.css';
import { URL } from '../../actions/url.js';

class Ejercicios extends Component {
  state = {
    user: {},
    capacidad_vital: 0,
    ejercicios: [],
    ejercicioPredeterminado: null,
    pageCount: 1,
    currentPage: 0,
    exercisesPerPage: 5,
    openConfirm: false,
    confirmMessage: '',
  };

  componentDidMount() {
    const { id_patient } = this.props;

    fetch(URL+'getPatientbyId', {
        method: 'POST',
        body: JSON.stringify({id_patient}),
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
        const user = resp;
        const capacidad_vital = this.getCapacidadVital(user).toFixed(2) + "L";
        this.setState({ user, capacidad_vital });

        fetch(URL+'allEjerciciosByPatient', {
            method: 'POST',
            body: JSON.stringify({id_patient}),
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
            const ejercicios = resp.filter(ejercicio => ejercicio.nombre !== "Predeterminado")
            const ejercicioPredeterminado = resp.find(ejercicio => ejercicio.nombre === "Predeterminado");
            const pageCount = Math.ceil(ejercicios.length / this.state.exercisesPerPage); // Calcula el número de páginas
           
            this.setState({ ejercicios, ejercicioPredeterminado, pageCount });
          })
          .catch(err => {
            this.setState({
              openConfirm: true,
              confirmMessage: 'Error al consultar ejercicios. ' + err.response.data.msg
            });
        });
      })
      .catch(err => {
        this.setState({
          openConfirm: true,
          confirmMessage: 'Error al consultar paciente. ' + err.response.data.msg
        });
    });
  };

  getCapacidadVital = (user) => { // Valores en mL/kg
    if (user.sexo === 'M')
      return (27.63 - (0.112 * user.edad)) * user.altura;
    else if (user.sexo === 'F')
      return (21.78 - (0.101 * user.edad)) * user.altura;
    
    return 0;
  };  

  handlePageClick = ({ selected }) => {
    this.setState({ currentPage: selected }, () => {
      const { ejercicios, currentPage, exercisesPerPage } = this.state;
      const offset = currentPage * exercisesPerPage;
      let currentExercises = ejercicios.slice(offset, offset + exercisesPerPage);
      this.setState({ currentExercises });
    });
  };

  handleCancel = () => {
    this.setState({ openConfirm: false });
  };

  render() {
    const { user, capacidad_vital, ejercicios, ejercicioPredeterminado, currentPage, exercisesPerPage, openConfirm, confirmMessage } = this.state;
    const offset = currentPage * exercisesPerPage;
    let currentExercises = 0;
    
    if (ejercicios.length > 0)
      currentExercises = ejercicios.slice(offset, offset + exercisesPerPage);
    
    return (
      <>
        <MenuNav />
        <Grid style={{ marginTop: '7em' }} columns={1}>
          <Grid.Column>
            <Segment raised>
              <Label ribbon style={{color:"#28367b"}}>
                Paciente
              </Label>
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
                    <TableCell>{capacidad_vital} mL</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Label ribbon style={{color:"#28367b"}}>
                Ejercicio Predeterminado
              </Label>
              {
                ejercicioPredeterminado ?
                  <Ejercicio ejercicio={ejercicioPredeterminado} />
                :
                  (
                    <div>
                      <p style={{ marginBottom:"10px", marginTop:"10px" }}>No hay ejercicio predeterminado disponible, por favor agregar.</p>
                      <Link to={{ pathname: `/AgregarEjercicio/${user._id}`, nombre_terapia: "Predeterminado" }}>
                        <Button type='submit' style={{ backgroundColor: '#46bee0', color:"white" }}>Agregar ejercicio predeterminado</Button>
                      </Link>
                    </div>
                  )
              }              
            </Segment>
            <Segment raised>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "20px"}}>
                {
                  
                  ejercicios.length === 0 || (ejercicios.length > 0 && moment().isAfter(moment(ejercicios[ejercicios.length - 1].fecha_fin, 'DD/MM/YYYY'))) ? 
                    (
                      <Link to={{ pathname: `/AgregarEjercicio/${user._id}`, nombre_terapia: "Inspiración profunda" }}>
                        <Button type='submit' style={{ backgroundColor: '#46bee0', color:"white" }}>Agregar</Button>
                      </Link>
                    ) 
                  : 
                    <></>
                }
                <Link to={`/VerUser/${user._id}`}>
                  <Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button>
                </Link>
              </div>
              <Label ribbon style={{color:"#28367b"}}>
                Prescripciones
              </Label>
              <Card.Group style={{ marginTop: '1em' }}>
              {        
                currentExercises.length > 0 ?
                  currentExercises
                  //.filter(ejercicio => ejercicio.nombre !== "Predeterminado") // Filtrar el ejercicio predeterminado
                  .map((ejercicio, index) => {
                    return <Ejercicio key={index} ejercicio={ejercicio} />;
                  })
                :
                  <p style={{ marginBottom:"10px", marginTop:"10px" }}>No hay ejercicios disponibles.</p>
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
              activeLinkClassName={"active-link"}
            />
          </Grid.Column>
        </Grid>
        
        <Confirm
          open={openConfirm}
          content={confirmMessage}
          confirmButton='Aceptar'
          cancelButton={null}
          onConfirm={this.handleCancel}
        />
      </>
    );
  }
}

export default withRouter(connect(null)(Ejercicios));