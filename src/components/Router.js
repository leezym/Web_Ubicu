import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./users/LoginForm";
import NoRuta from "./pages/NoRuta";
import Users from "./users/Users";
import Agregar from "./users/Agregar";
import AgregarPaciente from "./users/AgregarPaciente";
import Ver from "./users/Ver";
import Ejercicios from './ejercicios/Ejercicios';
import AgregarEjercicio from "./ejercicios/Agregar";
import VerResultados from "./ejercicios/VerResultados";
import withAuth from './withAuth';
import { isNull } from "util";


class Router extends Component {
    render() {
        //const token = localStorage.getItem('token');

        return (
        <Container>     
        <BrowserRouter>
        <Switch>
            <Route
                exact path="/"
                component ={LoginForm}/>

            {/*token ? (<Route
            exact path="/Users/:id_user"
            render={ props => {
                const { match } = props;
                let id_user = match.params.id_user;
                return <Users id_user={id_user} />;
            }} />) : this.forceUpdate()*/}
            <Route
            exact path="/Users/:id_user"
            render={ props => {
                const { match } = props;
                let id_user = match.params.id_user;
                return <Users id_user={id_user} />;
            }} />

            <Route
                exact path="/AgregarFisioterapeuta"
                component ={Agregar}/>
            
            <Route
                exact path="/AgregarPaciente/:id_user"
                render={ props => {
                    const { match } = props;
                    let id_user = match.params.id_user;
                    return <AgregarPaciente id_user={id_user} />;
                }} />
            
            <Route
                exact path="/VerUser/:id_patient"
                render={ props => {
                    const { match } = props;
                    let id_patient = match.params.id_patient;
                    return <Ver id_patient={id_patient} />;
                }} />
            
            <Route
                exact path="/AgregarEjercicio/:id_patient"
                render={ props => {
                    const { match } = props;
                    let id_patient = match.params.id_patient;
                    return <AgregarEjercicio id_patient={id_patient} />;
                }} />            
                                                                                                        
            <Route
                exact path="/VerEjercicios/:id_patient"
                render={ props => {
                    const { match } = props;
                    let id_patient = !isNull(match.params.id_patient)
                    ? match.params.id_patient
                    : 0;
                    return <Ejercicios id_patient={id_patient} />;
                }} />
            
            <Route
                exact path="/VerResultados/:id_patient/:id_ejercicio"
                render={ props => {
                    const { match } = props;
                    let id_patient = !isNull(match.params.id_patient)
                    ? match.params.id_patient
                    : 0;
                    let id_ejercicio = !isNull(match.params.id_ejercicio)
                    ? match.params.id_ejercicio
                    : 0;
                    return <VerResultados id_patient={id_patient} id_ejercicio={id_ejercicio} />;
                  }} />
            
            <Route
                component={NoRuta} />
            
            
        </Switch>
        </BrowserRouter>
        </Container>     
        );
    }
}
export default Router;