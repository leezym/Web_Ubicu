import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class User extends Component {

    state = {
        patient: this.props.patient
    }

    componentDidUpdate(prevProps) {
        if (prevProps.patient !== this.props.patient) {
            this.setState({
                patient: {
                    ...this.props.patient
                }
            });
        }
    }

    render() {
        const { patient } = this.state;

        return (
        <Table.Row>
            <Table.Cell>{patient.cedula}</Table.Cell>
            <Table.Cell>{patient.nombre}</Table.Cell>
            <Table.Cell>
            <Link to={`/VerUser/${patient._id}`}>
                <Button style={{ backgroundColor: '#46bee0', color:"white" }} floated="right">Ver</Button>
            </Link>
            </Table.Cell>
        </Table.Row>
        );
    }
}

export default connect(null)(withRouter(User));