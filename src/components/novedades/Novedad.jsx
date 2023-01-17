import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";


class Novedad extends Component {
    render() {
        return (
        <Table.Body>
        <Table.Row>
            <Table.Cell>10-02-2018</Table.Cell>
            <Table.Cell>Rporte de infección</Table.Cell>
            <Table.Cell>
                <Link to="/VerNovedad">
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

export default Novedad;