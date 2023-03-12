import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./users/LoginForm";
import NoRuta from "./pages/NoRuta";
import HomeAdmin from "./pages/HomeAdmin";
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

        return (
        <Container>     
        <BrowserRouter>
        <Switch>
            <Route
                exact path="/"
                component ={LoginForm}/>
            
            <Route
                exact path="/HomeAdmin"
                component ={withAuth(HomeAdmin)}/>
            
            <Route
                exact path="/Users"
                component ={withAuth(Users)}/>
            
            <Route
                exact path="/AgregarFisio"
                component ={Agregar}/>
            
            <Route
                exact path="/AgregarPaciente"
                component ={AgregarPaciente}/>
            
            <Route
                exact path="/VerUser/:id"
                render={ props => {
                    const { match } = props;
                    let id = match.params.id;
                    return <Ver id={id} />;
                }} />
            
            <Route
                exact path="/AgregarEjercicio/:id"
                render={ props => {
                    const { match } = props;
                    let id = match.params.id;
                    return <AgregarEjercicio id={id} />;
                }} />            
                                                                                                        
            <Route
                exact path="/VerEjercicios/:id_user"
                render={ props => {
                    const { match } = props;
                    let id_user = !isNull(match.params.id_user)
                    ? match.params.id_user
                    : 0;
                    return <Ejercicios id_user={id_user} />;
                  }} />
            
            <Route
                exact path="/VerResultados/:id_user/:id_ejercicio"
                render={ props => {
                    const { match } = props;
                    let id_user = !isNull(match.params.id_user)
                    ? match.params.id_user
                    : 0;
                    let id_ejercicio = !isNull(match.params.id_ejercicio)
                    ? match.params.id_ejercicio
                    : 0;
                    return <VerResultados id_user={id_user} id_ejercicio={id_ejercicio} />;
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