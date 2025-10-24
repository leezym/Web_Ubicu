import React, { Component } from 'react';
import { Grid, Label, Segment, Button, Icon, Form, Card, Input, Confirm} from 'semantic-ui-react';
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
        },
        openConfirm: false,
        confirmMessage: '',
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
            this.setState({
                openConfirm: true,
                confirmMessage: 'Error al consultar fisioterapeuta. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
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
            this.setState({
                openConfirm: true,
                confirmMessage: 'Usuario actualizado.'
            });
        }).catch(err => {
            submitButton.disabled = false;

            this.setState({
                openConfirm: true,
                confirmMessage: 'Error al actualizar usuario. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
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

            this.setState({
                openConfirm: true,
                confirmMessage: resp.msg
            });
        }).catch(err => {
            this.setState({
                openConfirm: true,
                confirmMessage: 'Error al actualizar contraseña. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
            });
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

    handleCancel = () => {
        this.setState({ openConfirm: false });
    };

    render() {
        const { readOnly, user, showPassword, openConfirm, confirmMessage } = this.state;

        return (
            <>
                <MenuNav/>
                <Segment style={{ marginTop: '6em' }}>
                    <Grid stackable>
                        <Grid.Column>
                            <Label ribbon style={{color:"#28367b"}}>
                            Perfil
                            </Label>
                            <Card fluid color="blue" >
                                <Card.Content >
                                    <Card.Header textAlign="center" style={{ marginBottom: '1em' }}>
                                        <h3 style={{ color: '#28367b', margin: 0 }}>Actualizar Datos</h3>
                                    </Card.Header>

                                    <Card.Description width="100%">                        
                                        <Form onSubmit={this.handleSave}>
                                            <Form.Group widths='equal'>
                                                <Form.Field style={{ width: '300px' }}>
                                                <label>Nombre *</label>
                                                <input  
                                                    name="nombre"
                                                    placeholder='Nombre'
                                                    type='text'
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.nombre : null}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field style={{ width: '300px' }}>
                                                <label>Cédula *</label>
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
                                                    required/>
                                                </Form.Field>
                                                <Form.Field style={{ width: '300px' }}>
                                                <label>Teléfono *</label>
                                                <input
                                                    name="telefono"
                                                    placeholder='Teléfono'
                                                    type='number'
                                                    min="1000000000"
                                                    max="9999999999"
                                                    step="1"
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.telefono : null}
                                                    required/>
                                                </Form.Field>
                                                <Form.Field style={{ width: '300px' }}>
                                                <label>Correo *</label>
                                                <input
                                                    name="email"
                                                    placeholder='Correo'
                                                    type='email'
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                    onChange={this.changeInputUser}
                                                    disabled={readOnly}
                                                    value={readOnly ? user.email : null}
                                                    required/>
                                                    
                                                </Form.Field>                                        
                                            </Form.Group >
                                            { readOnly ?
                                                <Button onClick={()=>{ this.handleEdit(false); this.copyOriginal(); }} type='button' style={{ backgroundColor: '#46bee0', color:"white" }}>Actualizar</Button>
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
                                    <Card.Header textAlign="center" style={{ marginBottom: '1em' }}>
                                        <h3 style={{ color: '#28367b', margin: 0 }}>Actualizar Contraseña</h3>
                                    </Card.Header>
                                    <Card.Description width="100%">   
                                        <span style={{ color: 'blue', fontSize: 'small'}}>La contraseña debe contener al menos una mayúscula, un número y un caracter especial.</span>                        
                                        <Form onSubmit={this.handleUpdate} style={{ marginTop: '10px'}}>
                                            <Form.Group widths='equal'>
                                                <Form.Field style={{ width: '400px' }}>
                                                <label>Contraseña actual *</label>
                                                <Input 
                                                    name="password_actual"
                                                    placeholder='Contraseña actual'
                                                    type={showPassword.current ? 'text' : 'password'}
                                                    onChange={this.changeInputPass}
                                                    value={user.password_actual}
                                                    required
                                                    icon={<Icon name={showPassword.current ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('current')} />}
                                                    iconPosition="right"
                                                />                      
                                                </Form.Field>
                                                <Form.Field style={{ width: '400px' }}> 
                                                <label>Nueva contraseña *</label>
                                                <Input 
                                                    name="password_nueva"
                                                    placeholder='Contraseña nueva'
                                                    type={showPassword.nueva ? 'text' : 'password'}
                                                    minLength="8"
                                                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                                    onChange={this.changeInputPass}
                                                    value={user.password_nueva}
                                                    required
                                                    icon={<Icon name={showPassword.nueva ? 'eye' : 'eye slash'} link onClick={() => this.togglePasswordVisibility('nueva')} />}
                                                />
                                                </Form.Field>
                                                <Form.Field style={{ marginBottom: '20px', width: '400px' }}>
                                                <label>Repita nueva contraseña *</label>
                                                <Input 
                                                    name="repeat_password_nueva"
                                                    placeholder='Repita nueva contraseña'
                                                    type={showPassword.repeat ? 'text' : 'password'}
                                                    minLength="8"
                                                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                                    onChange={this.changeInputPass}
                                                    value={user.repeat_password_nueva}
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
                        
                            <Link to={`/Fisioterapeuta/${user._id}`}><Button style={{ backgroundColor: '#eb5a25', color:"white" }}>Regresar</Button></Link>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Confirm
                    open={openConfirm}
                    content={confirmMessage}
                    confirmButton='Aceptar'
                    cancelButton={null}
                    onConfirm={this.handleCancel}
                />            
            </>
        );
    }
}

export default connect(null, { updateUser, updatePassword })(withRouter(VerPerfil));
