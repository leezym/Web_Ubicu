import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import {deleteUser} from "../../actions/usersAction";
import {connect} from "react-redux";




class User extends Component {

    componentDidMount(){
        this.props.deleteUser();
    }

    handleDelete = (e) => {
        e.preventDefault();
        console.log(this.props.mostrarUsers());
       
        this.props.deleteUser({
          cedula: e.target.value
        }).then(()=>{
            this.props.mostrarUsers();
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
                <Link to={`/VerUser/${user.cedula}`}>
                <Button primary floated='right'>
                    Ver
                <Icon name='right chevron' />
                </Button>
                </Link>
                <Button value={user.cedula} onClick={this.handleDelete} secondary floated='right'>
                    Eliminar
                <Icon name='right chevron' />
                </Button>
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
export default connect(mapStateToProp,{deleteUser})(withRouter(User));
