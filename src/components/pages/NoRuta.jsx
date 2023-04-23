import React, { Component } from 'react';
import { Container,Segment } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";


class NoRuta extends Component {
    render() {
        return (
            <div>
                <Container><Segment>No existe la Ruta</Segment></Container>
            </div>
        );
    }
}

export default NoRuta;