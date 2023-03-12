import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import {deletePatient} from "../../actions/patientsAction";
import {connect} from "react-redux";

class User extends Component {

    componentDidMount(){
        this.props.mostrarPatients();
        this.props.deletePatient();
    }

    handleDelete = (e) => {
        e.preventDefault();
        console.log(this.props.mostrarPatients());

        this.props.deletePatient({
            cedula: e.target.value
        }).then(()=>{
            this.props.mostrarPatients();
        });;
    }
    render() {
        const {user} = this.props;
        return (
        <Table.Body>
        <Table.Row>
            <Table.Cell>{user.cedula}</Table.Cell>
            <Table.Cell>{user.nombre}</Table.Cell>
            <Table.Cell>
                <Link to={`/VerUser/${user._id}`}>
                <Button primary floated='right'>
                    Ver
                <Icon name='right chevron' />
                </Button>
                </Link>
                {/*<Button value={user.cedula} onClick={this.handleDelete} secondary floated='right'>
                    Eliminar
                <Icon name='right chevron' />
                </Button>*/}
            </Table.Cell>
        </Table.Row>
        </Table.Body>
        );
    }
}
const mapStateToProp =(state)=>{
    return{
        users: state.users.users
    };
}
export default connect(mapStateToProp,{deletePatient})(withRouter(User));
