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

    fetch(URL+'authenticateUser', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(resp => {
      submitButton.disabled = false;

      localStorage.setItem('token', resp.token);
      localStorage.setItem('id_user', resp.user._id);
      
      optionHeaders.headers['x-access-token'] = localStorage.getItem('token', resp.token)
      this.props.history.push(`/Users/${resp.user._id}`);
    })
    .catch(err => {
      submitButton.disabled = false;
      alert('Error al iniciar sesión.' + err.response.data.msg);
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
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Cedula"
                  name="cedula"
                  type="text"
                  pattern="[0-9]*"
                  value={cedula}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Button type="submit" fluid size="large" disabled={!this.validateForm()} style={{ backgroundColor: '#28367b', color: "white" }}>
                  Entrar
                </Button>
              </Segment>
            </Form>
            <Message>
              ¿Nuevo Usuario? <Link to="/AgregarFisioterapeuta">Registrarse</Link>
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