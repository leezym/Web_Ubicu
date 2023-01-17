import React, { Component } from 'react';
import {Table,Button,Icon,Grid,Segment,Label} from 'semantic-ui-react'
import MenuNav from '../pages/MenuNav';
import {Link} from "react-router-dom";
import Novedad from './Novedad';


class Novedades extends Component {
    render() {
        return (
          <div>
          <MenuNav/> 
          <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='blue' ribbon>
                Novedades
                </Label>
                <Table  celled compact definition>
                  <Table.Header  fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                  </Table.Row>
                  </Table.Header>
                  <Novedad/>
                  <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='3'>
                    <Link to="/VerCultivo">
                      <Button floated='right' icon labelPosition='left'  size='small'>
                      Regresar>
                      </Button>
                    </Link>
                    {/* <Link to="/AgregarRecomendacion">
                      <Button floated='right' icon labelPosition='left' primary  size='small'>
                      <Icon name='chess knight' />
                      Agregar>
                      </Button>
                    </Link> */}
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

export default Novedades;