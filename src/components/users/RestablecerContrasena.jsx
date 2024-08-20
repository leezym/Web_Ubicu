import React, { Component } from 'react';
import { Icon, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { URL } from '../../actions/url.js';

class RestablecerContrasena extends Component {
  state = {
    nuevaContrasena: '',
    confirmarContrasena: '',
    mensaje: '',
    error: '',
    isLoading: false,
    showPassword: {
      nueva: false,
      repeat: false
    },
    token: this.props.token
  };

  togglePasswordVisibility = (fieldName) => {
    this.setState(prevState => ({
        showPassword: {
            ...prevState.showPassword,
            [fieldName]: !prevState.showPassword[fieldName]
        }
    }));
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { token, nuevaContrasena, confirmarContrasena } = this.state;

    this.setState({ mensaje: '', error: '', isLoading: true });

    if (nuevaContrasena !== confirmarContrasena) {
      this.setState({ error: 'Las contraseñas no coinciden.', isLoading: false });
      return;
    }

    try {
      const response = await fetch(`${URL}restablishPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, nuevaContrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ mensaje: data.msg, nuevaContrasena: '', confirmarContrasena: '' });
      } else {
        this.setState({ error: data.msg });
      }
    } catch (err) {
      console.error('Error al restablecer la contraseña:', err);
      this.setState({ error: 'Ocurrió un error al procesar la solicitud.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { showPassword, nuevaContrasena, confirmarContrasena, mensaje, error, isLoading } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Restablecer Contraseña
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="nuevaContrasena"
                placeholder="Nueva Contraseña"
                type={showPassword.nueva ? 'text' : 'password'}
                minLength="8"
                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                value={nuevaContrasena}
                onChange={this.handleChange}
                autocomplete='password'
                required
                icon={<Icon name={showPassword.nueva ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('nueva')} />}
                />
              <Form.Input
                fluid
                name="confirmarContrasena"
                placeholder="Confirmar Nueva Contraseña"
                type={showPassword.repeat ? 'text' : 'password'}
                minLength="8"
                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                value={confirmarContrasena}
                onChange={this.handleChange}
                autocomplete='password'
                required
                icon={<Icon name={showPassword.repeat ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('repeat')} />}
              />
              <Button color="blue" fluid size="large" loading={isLoading} style={{ backgroundColor: '#46bee0', color:"white"}}>
                Restablecer Contraseña
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

export default RestablecerContrasena;