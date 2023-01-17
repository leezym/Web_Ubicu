import React ,{Component}from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css"
import logo from '../../logo.svg';
import {authenticateUser} from "../../actions/usersAction";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class LoginForm extends Component{
  state = {
    cedula: "1061234234",
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
    /*fetch('http://127.0.0.1:5000/authenticateUser', {*/
    fetch('https://d2yaaz8bde1qj3.cloudfront.net/authenticateUser', {
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
      console.log(resp);
      sessionStorage.setItem('tipo_user', resp.user.type);
      if(resp.user.type == "fisio"){
        this.props.history.push('/HomeAdmin');
      }
      if(resp.user.type == "paciente"){
        this.props.history.push('/HomePaciente');
      }
    })
    .catch(err => {
      console.log(err);
      alert('Error logging in please try again');
    });
    /*this.props.authenticateUser({
      cedula: this.state.cedula,
      password:this.state.password
    }).then(()=>{
      this.props.history.push('/HomeAdmin');
    }
     
    ).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });*/
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
        ¿Nuevo Usuario? <Link to="/AgregarUser">Registrarse</Link>
      </Message>
    </Grid.Column>
  </Grid>
  );
  }
}

export default connect(null,{authenticateUser})(LoginForm);