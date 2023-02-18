import React ,{Component}from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css"
import logo from '../../logo.svg';
import {authenticateUser} from "../../actions/usersAction";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class LoginForm extends Component{
  state = {
    cedula: "",
    password: ""
  };
  changeInput = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }
  validateForm () {
    return this.state.cedula.length > 0 && this.state.password.length > 0;
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/authenticateUser', {
    //fetch('https://server.ubicu.co/authenticateUser', {
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
      this.props.history.push('/Users');
    })
    .catch(err => {
      console.log(err);
      alert('Error al iniciar sesión');
    });
  }

  render() {
    return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h1' color='blue' textAlign='center' size='huge'>
        Fisioterapia Respiratoria
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Cedula'
            name='cedula'
            type='text'
            pattern="[0-9]*"
            onChange={this.changeInput} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
            onChange={this.changeInput} />

          <Button 
            disabled = {!this.validateForm()}
            color='blue' 
            fluid size='large'
            onClick={this.onSubmit}>
            Entrar
          </Button>
        </Segment>
      </Form>
      <Message>
        ¿Nuevo Usuario? <Link to="/AgregarFisio">Registrarse</Link>
      </Message>
    </Grid.Column>
  </Grid>
  );
  }
}

export default connect(null,{authenticateUser})(LoginForm);