import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import LoginForm from "./users/LoginForm";
import NoRuta from "./pages/NoRuta";
import Users from "./users/Users";
import Agregar from "./users/Agregar";
import AgregarPaciente from "./users/AgregarPaciente";
import Ver from "./users/Ver";
import Ejercicios from "./ejercicios/Ejercicios";
import AgregarEjercicio from "./ejercicios/Agregar";
import VerResultados from "./ejercicios/VerResultados";
import VerPerfil from "./users/VerPerfil";

class Router extends Component {
  render() {
    return (
      <Container>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={LoginForm} />

            <Route
              exact
              path="/Fisioterapeuta/:id_user"
              render={(props) => {
                const id_user = props.match.params.id_user;
                return <Users id_user={id_user} />;
              }}
            />

            <Route exact path="/AgregarFisioterapeuta" component={Agregar} />

            <Route
              exact
              path="/VerPerfil/:id_user"
              render={(props) => {
                const id_user = props.match.params.id_user;
                return <VerPerfil id_user={id_user} />;
              }}
            />

            <Route
              exact
              path="/AgregarPaciente/:id_user"
              render={(props) => {
                const id_user = props.match.params.id_user;
                return <AgregarPaciente id_user={id_user} />;
              }}
            />

            <Route
              exact
              path="/VerPaciente/:id_patient"
              render={(props) => {
                const id_patient = props.match.params.id_patient;
                return <Ver id_patient={id_patient} />;
              }}
            />

            <Route
              exact
              path="/AgregarEjercicio/:id_patient"
              render={(props) => {
                const id_patient = props.match.params.id_patient;

                // Si lo mandas con history.push({ pathname, state: { nombre_terapia } })
                const nombre_terapia = props.location?.state?.nombre_terapia;

                return (
                  <AgregarEjercicio
                    id_patient={id_patient}
                    nombre_terapia={nombre_terapia}
                  />
                );
              }}
            />

            <Route
              exact
              path="/VerEjercicios/:id_patient"
              render={(props) => {
                const id_patient = props.match.params.id_patient || 0;
                return <Ejercicios id_patient={id_patient} />;
              }}
            />

            <Route
              exact
              path="/VerResultados/:id_patient/:id_ejercicio"
              render={(props) => {
                const id_patient = props.match.params.id_patient || 0;
                const id_ejercicio = props.match.params.id_ejercicio || 0;

                return (
                  <VerResultados
                    id_patient={id_patient}
                    id_ejercicio={id_ejercicio}
                  />
                );
              }}
            />

            <Route component={NoRuta} />
          </Switch>
        </HashRouter>
      </Container>
    );
  }
}

export default Router;