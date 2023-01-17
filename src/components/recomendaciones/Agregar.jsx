import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid,TextArea } from 'semantic-ui-react';
import {Link} from "react-router-dom";

class Agregar extends Component {
    render() {
        return (
            <div>
            <MenuNav/>
            <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='teal' ribbon>
                Registro Recomendacion
                </Label>
                <Form style={{ marginTop: '1em' }}>
                    <Form.Field>
                    <label>Titulo</label>
                    <input placeholder='Titulo' />
                    </Form.Field>
                    <Form.Field>
                    <label>Descripción</label>
                    <TextArea placeholder='Detalle las actividades' style={{ minHeight: 100 }} />
                    </Form.Field>
                    <Form.Field>
                    <label>Adjuntos:</label>
                    <input placeholder='Adjuntos' />
                    </Form.Field>
                    <Button primary type='submit'>Agregar</Button>
                    <Link to="/VerRecomendaciones"><Button type='submit'>Regresar</Button></Link>
                </Form>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default Agregar;