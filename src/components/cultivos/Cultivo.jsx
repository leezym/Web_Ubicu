import React, { Component } from 'react';
import {Table,Button,Icon} from 'semantic-ui-react'
import {Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';


class Cultivo extends Component {
    componentDidMount(){
        //this.props.deleteUser();
    }

    handleDelete = (e) => {
    /*    e.preventDefault();
       
        this.props.deleteUser({
          cedula: e.target.value
        }).then(()=>{
            this.props.mostrarPatients()
        });;
    */
    }
    render() {
        const {cultivo} = this.props;
        return (
        <Table.Body>
        <Table.Row>
            <Table.Cell>{cultivo.nombreFinca}</Table.Cell>
            <Table.Cell>{cultivo.nombreCultivo}</Table.Cell>
            <Table.Cell>
                <Link to={`/VerCultivo/${cultivo._id}`}>
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

export default connect(null,null)(withRouter(Cultivo));
