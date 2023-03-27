import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePatient, mostrarPatients } from '../../actions/patientsAction';

class User extends Component {
    handleDelete = (e) => {
        e.preventDefault();

        this.props
            .deletePatient({ cedula: e.target.value })
            .then(() => {
                this.props.mostrarPatients({id_user:this.props.id_user});
            });
    };

    render() {
        const { user } = this.props;

        return (
        <Table.Row>
            <Table.Cell>{user.cedula}</Table.Cell>
            <Table.Cell>{user.nombre}</Table.Cell>
            <Table.Cell>
            <Link to={`/VerUser/${user._id}`}>
                <Button primary floated="right">
                Ver
                <Icon name="right chevron" />
                </Button>
            </Link>
            <Button
                value={user.cedula}
                onClick={this.handleDelete}
                secondary
                floated="right"
            >
                Eliminar
                <Icon name="right chevron" />
            </Button>
            </Table.Cell>
        </Table.Row>
        );
    }
}

export default connect(null, { deletePatient, mostrarPatients })(withRouter(User));