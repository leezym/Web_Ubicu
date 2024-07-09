import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { URL } from '../../actions/url.js';

class RecuperarContrasena extends Component {
  state = {
    cedula: '',
    mensaje: '',
    error: '',
    isLoading: false
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, mensaje: '', error: '' });

    try {
      const response = await fetch(`${URL}recoveryPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula: this.state.cedula }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ mensaje: data.msg, isLoading: false });
      } else {
        this.setState({ error: data.msg, isLoading: false });
      }
    } catch (err) {
      this.setState({ 
        error: 'Ocurrió un error al procesar la solicitud.', 
        isLoading: false 
      });
    }
  };

  render() {
    const { cedula, mensaje, error, isLoading } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Recuperar Contraseña
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Cédula"
                name="cedula"
                value={cedula}
                onChange={this.handleChange}
              />
              <Button color="blue" fluid size="large" loading={isLoading}>
                Enviar Solicitud
              </Button>
            </Segment>
          </Form>
          {mensaje && <Message positive>{mensaje}</Message>}
          {error && <Message negative>{error}</Message>}
        </Grid.Column>
      </Grid>
    );
  }
}

export default RecuperarContrasena;