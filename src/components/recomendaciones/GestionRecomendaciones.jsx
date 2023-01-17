import React, { Component } from 'react';
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import {Link} from "react-router-dom";
import GestionFila from './GestionFila';


class GestionRecomendaciones extends Component {
    render() {
        return (
          <div>
          <MenuNav/> 
          <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='blue' ribbon>
                Gestion de Recomendaciones
                </Label>
                <Table  celled compact definition>
                  <Table.Header  fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.HeaderCell>Para</Table.HeaderCell>
                    <Table.HeaderCell>Indicación</Table.HeaderCell>
                    <Table.HeaderCell>Pendiente</Table.HeaderCell>
                    <Table.HeaderCell>Adicional</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                  </Table.Header>
                  <GestionFila/>
                  <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='6'>
                    <Link to="/HomeAdmin">
                      <Button floated='right' icon labelPosition='left'  size='small'>
                      Regresar>
                      </Button>
                    </Link>
                    <Link to="/AgregarRecomendacion">
                      <Button floated='right' icon labelPosition='left' primary  size='small'>
                      <Icon name='clipboard check' />
                      Agregar>
                      </Button>
                    </Link>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
                </Table>
          </Segment>
          </Grid.Column>
          </Grid>
          </div>
        );
    }
}

export default GestionRecomendaciones;