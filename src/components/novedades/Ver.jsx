import React, { Component } from 'react';
import {Grid,Label,Segment,List, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import MenuNav from '../pages/MenuNav';

class Ver extends Component {
    render() {
        return (
        <div>
        <MenuNav/>
        <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='green' ribbon>
                Novedad
                </Label>
                <span>Detalles</span>
                <List>
                    <List.Item>
                    <List.Content>
                        <List.Header>Fecha</List.Header>
                        <List.Description>10-01-2018</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Cultivo 1:</List.Header>
                        <List.Description>Reporte de Infección</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Numero de Cafetos Infectados:</List.Header>
                        <List.Description>200</List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Descripción</List.Header>
                        <List.Description>Lorem ipsum, orlipsumas it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
|                       </List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item>    
                    <List.Content>
                        <List.Header>Adjuntos:</List.Header>
                        <List.Description></List.Description>
                    </List.Content>
                    </List.Item>
                    <List.Item style={{ marginTop: '1em' }}>    
                    <List.Content>
                        <List.Header></List.Header>
                        <List.Description>
                            <Link to="/VerNovedades"><Button >Regresar</Button></Link>
                        </List.Description>
                    </List.Content>
                    </List.Item>
                </List>
            </Segment>
            </Grid.Column>
        </Grid>    
        </div>
        );
    }
}

export default Ver;