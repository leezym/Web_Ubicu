import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authenticateUser } from '../../actions/usersAction';
import 'semantic-ui-css/semantic.min.css';
import { optionHeaders } from '../../actions/headers.js';
import logo from '../../logo_grande.svg';
import { URL } from '../../actions/url.js';
//import Apk from '../../ubicu_28_09_2023_v2022.1.23_final.apk';

class LoginForm extends Component {
  state = {
    cedula: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm = () => {
    const { cedula, password } = this.state;
    return cedula.length > 0 && password.length > 0;
  };

  handleSave = async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    fetch(URL + 'authenticateUser', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async res => {
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.msg || 'Error desconocido');
    }
    return res.json();
  })
    .then(resp => {
      submitButton.disabled = false;
    
      localStorage.setItem('token', resp.token);
      localStorage.setItem('id_user', resp.user._id);
    
      optionHeaders.headers['x-access-token'] = localStorage.getItem('token');
      this.props.history.push(`/Users/${resp.user._id}`);
    })
    .catch(err => {
      submitButton.disabled = false;
      alert('Error al iniciar sesión. ' + err.message);
    });    
  }

  render() {
    const { cedula, password } = this.state;
    
    return (
      <div>
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={logo} centered style={{ width: '350px', height: 'auto' }} />
            <Header as="h1" textAlign="center" size="large" style={{ color: '#28367b' }}>
              Fisioterapia Respiratoria
            </Header>
            <Form size="large" onSubmit={this.handleSave}>
              <Segment stacked>
                <Form.Input
                  name="cedula"
                  placeholder="Cedula"
                  type="number"
                  value={cedula}
                  onChange={this.handleChange}
                  autocomplete='number'
                  fluid
                  icon="user"
                  iconPosition="left"
                />
                <Form.Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  autocomplete='password'
                  fluid
                  iconPosition="left"
                  icon="lock"
                />
                <Button type="submit" fluid size="large" disabled={!this.validateForm()} style={{ backgroundColor: '#28367b', color: "white" }}>
                  Entrar
                </Button>
              </Segment>
            </Form>
            <Message>
              ¿Nuevo Usuario? <Link to="/AgregarFisioterapeuta">Registrarse</Link>
            </Message>
            <Message>
              <Link to="/RecuperarContrasena">¿Olvidaste tu contraseña?</Link>
            </Message>
          </Grid.Column>
        </Grid>
        {/*<Grid textAlign="center" style={{ height: '20vh' }} verticalAlign="middle">
            <a href={Apk} download>          
              {' '}
              <button>Descargar App</button>
            </a>
        </Grid>*/}
      </div>
    );
  }
}

export default connect(null, { authenticateUser })(LoginForm);