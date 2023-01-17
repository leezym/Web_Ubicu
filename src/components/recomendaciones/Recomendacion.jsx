import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";


class Recomendacion extends Component {
    render() {
        return (
        <Table.Body>
        <Table.Row>
            <Table.Cell>10-09-2021</Table.Cell>
            <Table.Cell>Comentarios</Table.Cell>
            <Table.Cell>
                <Link to="/VerRecomendacion">
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

export default Recomendacion;