import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";


class GestionFila extends Component {
    render() {
        return (
        <Table.Body>
        <Table.Row>
            <Table.Cell>10-09-2021</Table.Cell>
            <Table.Cell>Diana Munoz</Table.Cell>
            <Table.Cell>Repetir Inspiración Profunda</Table.Cell>
            <Table.Cell>Una Serie</Table.Cell>
            <Table.Cell>NA</Table.Cell>
            <Table.Cell>
                <Link to="/VerRecomendacion">
                <Button primary floated='right'>
                    Ver
                <Icon name='right chevron' />
                </Button>
                </Link>
                <Link to="/EditarRecomendacion">
                <Button secondary floated='right'>
                    Editar
                <Icon name='right chevron' />
                </Button>
                </Link>
            </Table.Cell>
        </Table.Row>
        </Table.Body>
        );
    }
}

export default GestionFila;