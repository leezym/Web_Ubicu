import React, { Component } from 'react';
import { Grid, Label, Segment, Button, Icon, Form, Card, Input} from 'semantic-ui-react';
import { connect } from 'react-redux';
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from 'react-router-dom';
import { updateUser, updatePassword } from '../../actions/usersAction';
import { URL } from '../../actions/url.js';

class VerPerfil extends Component {

    state = {
        readOnly: true,
        original: {},
        user: {},
        showPassword: {
            current: false,
            nueva: false,
            repeat: false
        }
    };

    componentDidMount() {
        const { id_user } = this.props;        

        fetch(URL+'getUserbyId', {
            method: 'POST',
            body: JSON.stringify({id_user}),
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then(error => {
                throw new Error(error.msg);
              });
            }
        })
        .then(resp => {        
            const user = {
                ...resp,
                password_actual: "",
                password_nueva: "",
                repeat_password_nueva: ""
            };

            this.setState({ user });
        })
        .catch(err => {
            alert('Error al consultar fisioterapeuta. ' + err.response.data.msg);
          });
    }

    togglePasswordVisibility = (fieldName) => {
        this.setState(prevState => ({
            showPassword: {
                ...prevState.showPassword,
                [fieldName]: !prevState.showPassword[fieldName]
            }
        }));
    };

    handleEdit (value) {
        this.setState({ readOnly: value });
    }   

    handleSave = (e) => {
        e.preventDefault();

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const { user } = this.state;

        this.handleEdit(true);
        this.props.updateUser(user).then(resp => {
            submitButton.disabled = false;
            alert('Usuario actualizado.');
        }).catch(err => {
            submitButton.disabled = false;

            alert('Error al actualizar usuario. ' + err.response.data.msg);
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const { user } = this.state;
    
        this.props.updatePassword(user).then(resp => {
            if(resp.password)
                user.password = resp.password;

            this.setState({
                user: {
                    password_actual: '',
                    password_nueva: '',
                    repeat_password_nueva: ''
                }
            });
            
            alert(resp.msg);
        }).catch(err => {
            alert('Error al actualizar contraseña. ' + err.response.data.msg);         
        });
    }

    copyOriginal = () => {
        this.setState({
            original: {
                ...this.state.user
            }
        });
    }

    pasteOriginal = () => {
        this.setState({
            user: {
                ...this.state.original
            }
        });
    }

    changeInputUser = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }
    changeInputPass = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }

    render() {
        const { readOnly, user, showPassword } = this.state;

        return (
        <div>
            <MenuNav/>
            <Segment style={{ marginTop: '6em' }}>
                <Grid stackable>
                    <Grid.Column>
                        <Label ribbon style={{color:"#28367b"}}>
                        Perfil
                        </Label>
                        <Card fluid color="blue" >
                            <Card.Content >
                                <Card.Description width="100%">                        
                                    <Form onSubmit={this.handleSave}>
                                        <Form.Group widths='equal'>
                                            <Form.Field style={{ width: '300px' }}>
                                            <label class="required">Nombre </label>
                                                <input  
                                                    name="nombre"
                                                    placeholder='Nombre'
                                                    type='text'
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.nombre : null}
                                                    autocomplete='text'
                                                    required/>
                                            </Form.Field>
                                            <Form.Field style={{ width: '300px' }}>
                                            <label class="required">Cédula </label>
                                                <input  
                                                    name="cedula"
                                                    placeholder='Cédula'
                                                    type='number'
                                                    min="1"
                                                    max="9999999999"
                                                    step="1"
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.cedula : null}
                                                    autocomplete='number'
                                                    required/>
                                            </Form.Field>
                                            <Form.Field style={{ width: '300px' }}>
                                            <label class="required">Teléfono </label>
                                                <input
                                                    name="telefono"
                                                    placeholder='Teléfono'
                                                    type='tel'
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.telefono : null}
                                                    autocomplete='tel'
                                                    required/>
                                            </Form.Field>
                                            <Form.Field style={{ width: '300px' }}>
                                            <label class="required">Correo </label>
                                                <input
                                                    name="email"
                                                    placeholder='Correo'
                                                    type='email'
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.email : null}
                                                    autocomplete='email'
                                                    required/>
                                            </Form.Field>                                        
                                        </Form.Group >
                                        { readOnly ?
                                            <Button onClick={()=>{ this.handleEdit(false); this.copyOriginal(); }} type='button' style={{ backgroundColor: '#eb5a25', color:"white" }}>Editar</Button>
                                            :
                                            <>
                                                <Button type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Guardar</Button>
                                                <Button onClick={()=>{ this.handleEdit(true); this.pasteOriginal(); }} type='button' style={{ backgroundColor: '#eb5a25', color:"white" }}>Cancelar</Button>
                                            </>
                                        }                                   
                                    </Form>
                                </Card.Description>
                            </Card.Content >
                        </Card> 

                        <Card fluid color="blue" >
                            <Card.Content >
                                <Card.Description width="100%">   
                                    <span style={{ color: 'blue', fontSize: 'small'}}>La contraseña debe contener al menos una mayúscula, un número y un carácter especial</span>                        
                                    <Form onSubmit={this.handleUpdate} style={{ marginTop: '10px'}}>
                                        <Form.Group widths='equal'>
                                            <Form.Field style={{ width: '400px' }}>
                                            <label class="required">Contraseña actual </label>
                                                <Input 
                                                    name="password_actual"
                                                    placeholder='Contraseña actual'
                                                    type={showPassword.current ? 'text' : 'password'}
                                                    onChange={this.changeInputPass}
                                                    value={user.password_actual}
                                                    autocomplete='password'
                                                    required
                                                    icon={<Icon name={showPassword.current ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('current')} />}
                                                    iconPosition="right"
                                                />           
                                            </Form.Field>
                                            <Form.Field style={{ width: '400px' }}> 
                                            <label class="required">Nueva contraseña </label>
                                                <Input 
                                                    name="password_nueva"
                                                    placeholder='Contraseña nueva'
                                                    type={showPassword.nueva ? 'text' : 'password'}
                                                    minLength="8"
                                                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                                    onChange={this.changeInputPass}
                                                    value={user.password_nueva}
                                                    autocomplete='password'
                                                    required
                                                    icon={<Icon name={showPassword.nueva ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('nueva')} />}
                                                />
                                            </Form.Field>
                                            <Form.Field style={{ marginBottom: '20px', width: '400px' }}>
                                            <label class="required">Repita nueva contraseña </label>
                                                <Input 
                                                    name="repeat_password_nueva"
                                                    placeholder='Repita nueva contraseña'
                                                    type={showPassword.repeat ? 'text' : 'password'}
                                                    minLength="8"
                                                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                                    onChange={this.changeInputPass}
                                                    value={user.repeat_password_nueva}
                                                    autocomplete='password'
                                                    required
                                                    icon={<Icon name={showPassword.repeat ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('repeat')} />}
                                                />
                                            </Form.Field>
                                        </Form.Group>    
                                        <Button type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Actualizar</Button>
                                    </Form>
                                </Card.Description>
                            </Card.Content >
                        </Card> 
                            <Link to={`/Users/${user._id}`}><Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                        </Grid.Column>            
                    </Grid> 
            </Segment> 
        </div>
        );
    }
}

export default connect(null, { updateUser, updatePassword })(withRouter(VerPerfil));
