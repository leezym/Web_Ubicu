import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authenticateUser } from '../../actions/usersAction';
import 'semantic-ui-css/semantic.min.css';

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

  handleSubmit = (event) => {
    event.preventDefault();
    //fetch('http://localhost:5000/authenticateUser', {
    fetch('https://server.ubicu.co/authenticateUser', {
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
      localStorage.setItem('token', resp.token);
      if(localStorage.getItem('token'))
        this.props.history.push(`/Users/${resp.user._id}`);
    })
    .catch(err => {
      console.log(err);
      alert('Error al iniciar sesión');
    });
  }

  render() {
    const { cedula, password } = this.state;
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="blue" textAlign="center" size="huge">
            Fisioterapia Respiratoria
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
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
              <Button color="blue" fluid size="large" disabled={!this.validateForm()}>
                Entrar
              </Button>
            </Segment>
          </Form>
          <Message>
            ¿Nuevo Usuario? <Link to="/AgregarFisioterapeuta">Registrarse</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { authenticateUser })(LoginForm);