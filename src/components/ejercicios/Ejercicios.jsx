import React, { Component } from 'react';
import { Button, Table, Grid, Segment, Label, Card, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from 'react-router-dom';
import { allEjerciciosByPatient } from '../../actions/ejerciciosAction';
import Ejercicio from './Ejercicio';
import { connect } from 'react-redux';

class Ejercicios extends Component {
  state = {
    user: {},
    capacidad_vital: 0,
  };


  componentDidMount() {
    const { id_patient, allEjerciciosByPatient } = this.props;

    allEjerciciosByPatient({ id_patient });

    fetch('https://server.ubicu.co/getPatientbyId', {
    //fetch('http://localhost:5000/getPatientbyId', {
        method: 'POST',
        body: JSON.stringify({id_patient}),
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
        const user = resp;
        const capacidad_vital = this.getCapacidadVital(user).toFixed(2);
        this.setState({ user, capacidad_vital });
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

  render() {
    const { ejercicios } = this.props;
    const { user, capacidad_vital } = this.state;

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
              <Link to={`/VerUser/${user._id}`}><Button >Regresar</Button></Link>
            </Segment>
            <Segment raised>
              <Label color="blue" ribbon>
                Prescripción
              </Label>
              <Card.Group>
                {ejercicios.map((ejercicio, index) => {
                  return <Ejercicio key={index} ejercicio={ejercicio} />;
                })}
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ejercicios: state.ejercicios.ejercicios
  };
};

export default withRouter(connect(mapStateToProps, { allEjerciciosByPatient })(Ejercicios));