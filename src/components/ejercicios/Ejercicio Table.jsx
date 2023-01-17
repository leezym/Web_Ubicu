import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';


class Ejercicio extends Component {
    componentDidMount(){
        //this.props.deleteUser();
    }

    handleDelete = (e) => {
    /*    e.preventDefault();
       
        this.props.deleteUser({
          cedula: e.target.value
        }).then(()=>{
            this.props.mostrarUsers()
        });;
    */
    }
    render() {
        const {ejercicio} = this.props;
        return (
        <Table.Body>
        <Table.Row>
            <Table.Cell>{ejercicio.nombreEjercicio}</Table.Cell>
            <Table.Cell>{ejercicio.apnea}</Table.Cell>
            <Table.Cell>{ejercicio.duracion}</Table.Cell>
            <Table.Cell>{ejercicio.flujo}</Table.Cell>
            <Table.Cell>{ejercicio.fraccion}</Table.Cell>
            <Table.Cell>{ejercicio.frecuencia}</Table.Cell>
            <Table.Cell>{ejercicio.repeticion}</Table.Cell>
            <Table.Cell>{ejercicio.series}</Table.Cell>
            <Table.Cell>{ejercicio.sesiones}</Table.Cell>
            <Table.Cell>
                <Link to={`/VerEjercicio/${ejercicio._id}`}>
                <Button primary floated='right'>
                    Ver
                <Icon name='right chevron' />
                </Button>
                </Link>
            </Table.Cell>
        </Table.Row>
        </Table.Body>
        );
    }
}

export default connect(null,null)(withRouter(Ejercicio));
