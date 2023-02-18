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
import VerCultivo from './cultivos/Ver';

import VerRecomendacion from "./recomendaciones/Ver";
import Cultivos from "./cultivos/Cultivos";
import Recomendaciones from "./recomendaciones/Recomendaciones";
import AgregarRecomendacion from "./recomendaciones/Agregar";
import Novedades from "./novedades/Novedades";
import VerNovedad from "./novedades/Ver";
import GestionRecomendaciones from "./recomendaciones/GestionRecomendaciones";
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
                exact path="/VerUser/:cc"
                render={ props => {
                    const { match } = props;
                    let cc = !isNaN(parseInt(match.params.cc))
                    ? parseInt(match.params.cc)
                    : 0;
                    return <Ver cc={cc} />;
                }} />
            
            <Route
                exact path="/AgregarEjercicio/:id"
                render={ props => {
                    const { match } = props;
                    let id = match.params.id;
                    return <AgregarEjercicio id={id} />;
                }} />
            
            <Route
                exact path="/VerCultivos/:id_user"
                render={ props => {
                    const { match } = props;
                    let id_user = !isNull(match.params.id_user)
                    ? match.params.id_user
                    : 0;
                    return <Cultivos id_user={id_user} />;
                  }} />
            
            <Route
                exact path="/VerCultivo/:id_cultivo"
                render={ props => {
                    const { match } = props;
                    let id_cultivo = !isNull(match.params.id_cultivo)
                    ? match.params.id_cultivo
                    : 0;
                    return <VerCultivo id_cultivo={id_cultivo} />;
                  }} />
            
            <Route
                exact path="/VerRecomendaciones"
                component ={Recomendaciones}/>
            
            <Route
                exact path="/VerRecomendacion"
                component ={VerRecomendacion}/>
            
            <Route
                exact path="/AgregarRecomendacion"
                component ={AgregarRecomendacion}/>
            
            <Route
                exact path="/VerNovedades"
                component ={Novedades}/>
            
            <Route
                exact path="/VerNovedad"
                component ={VerNovedad}/>
            
            <Route
                exact path="/GestionRecomendaciones"
                component ={GestionRecomendaciones}/>
            
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
                exact path="/VerResultados/:id_ejercicio/:id_user/:dato"
                render={ props => {
                    const { match } = props;
                    let id_ejercicio = !isNull(match.params.id_ejercicio)
                    ? match.params.id_ejercicio
                    : 0;
                    let id_user = !isNull(match.params.id_user)
                    ? match.params.id_user
                    : 0;
                    let dato = !isNull(match.params.dato)
                    ? match.params.dato
                    : null;
                    return <VerResultados id_ejercicio={id_ejercicio} id_user={id_user} dato={dato} />;
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