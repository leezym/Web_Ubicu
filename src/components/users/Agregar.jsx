import React, { Component } from 'react';
import MenuNav from '../pages/MenuNav';
import { Form,Button,Segment,Label,Grid } from 'semantic-ui-react';
import {crearUser} from "../../actions/usersAction";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';


class Agregar extends Component {

    state ={
        nombre: "",
        cedula: "",
        ciudad: "",
        telefono: "",
        email: "",
        password:"",
        type:"fisioterapeuta"
    };
    handleSave = (e) => {
        e.preventDefault();
        this.props.crearUser({
            nombre: this.state.nombre,
            cedula: this.state.cedula,
            telefono: this.state.telefono,
            email: this.state.email,
            password:this.state.password,
            type:this.state.type
        }).then(resp => {
           
            console.log(resp);
            this.props.history.push("/Users");
          })
          .catch(err => {
            console.log(err);
            alert('Error create user try again');
          });
        
    }
    changeInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    render() {
        return (
            <div>
            <MenuNav/>
            <Grid style={{ marginTop: '7em' }} columns={1}>
            <Grid.Column>
            <Segment raised>
                <Label color='teal' ribbon>
                Registro de Usuario
                </Label>
                <Form style={{ marginTop: '1em' }}>
                    <Form.Field>
                    <label>Nombre</label>
                    <input  name="nombre" placeholder='Nombre' onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Telefono</label>
                    <input 
                        name="telefono"
                        placeholder='Teléfono'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input 
                        name="email"
                        placeholder='Email'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Cedula</label>
                    <input 
                        name="cedula"
                        placeholder='Cédula'
                        type='number'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input 
                        name="password"
                        placeholder='Password'
                        type='password'
                        onChange={this.changeInput} />
                    </Form.Field>
                    <Button onClick={this.handleSave} primary type='submit'>Agregar</Button>
                    <Link to="/Users"><Button type='submit'>Regresar</Button></Link>
                </Form>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default connect(null,{crearUser})(Agregar);