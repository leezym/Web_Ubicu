import React, { Component } from 'react';
import { Grid, Label, Segment, Button, Icon, Form, Card} from 'semantic-ui-react';
import { connect } from 'react-redux';
import MenuNav from '../pages/MenuNav';
import { Link, withRouter } from 'react-router-dom';
import { updateUser, updatePassword } from '../../actions/usersAction';

class VerPerfil extends Component {

    state = {
        readOnly: true,
        original: {},
        user: {}
    };

    componentDidMount() {
        const { id_user } = this.props;
        fetch('https://server.ubicu.co/getUserbyId', {
        //fetch('http://localhost:5000/getUserbyId', {
            method: 'POST',
            body: JSON.stringify({id_user}),
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
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
            const user = resp;
            this.setState({ user });
        })
        .catch(err => {
                console.error(err);
        });

    }

    handleEdit (value) {
        this.setState({ readOnly: value });
    }   

    handleSave = (e) => {
        this.handleEdit(true);
        e.preventDefault();
        const { user } = this.state;
        this.props.updateUser(user);
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const { user } = this.state;
        if (!user.password_actual || !user.password_nueva || !user.repeat_password_nueva) {
            alert('Por favor proporcione la información requerida para cambiar la contraseña');
        }

        this.props.updatePassword(user).then(resp => {
            if(resp.password)
                user.password = resp.password;
            alert(resp.msg);
        }).catch(error => {
            console.log(error);
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

    changeInput = (event) => {
        this.setState({
            user: {
            ...this.state.user,
            [event.target.name]: event.target.value
        }
        });
    }

    render() {
        const { readOnly, user } = this.state;
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
                                        <Form.Group >
                                            <Form.Field>
                                            <label>Nombre</label>
                                            <input  name="nombre"
                                                placeholder='Nombre'
                                                type='text'
                                                onChange={this.changeInput}
                                                disabled={readOnly}
                                                value={readOnly ? user.nombre : null}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Cédula</label>
                                            <input  name="cedula"
                                                placeholder='Cédula'
                                                type='number'
                                                onChange={this.changeInput}
                                                disabled={readOnly}
                                                value={readOnly ? user.cedula : null}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Teléfono</label>
                                            <input  name="telefono"
                                                placeholder='Teléfono'
                                                type='number'
                                                onChange={this.changeInput}
                                                disabled={readOnly}
                                                value={readOnly ? user.telefono : null}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Email</label>
                                            <input  name="email"
                                                placeholder='Email'
                                                type='email'
                                                onChange={this.changeInput}
                                                disabled={readOnly}
                                                value={readOnly ? user.email : null}/>
                                            </Form.Field>                                        
                                        </Form.Group >                                        
                                    </Form>
                                </Card.Description>
                                <Card.Content >
                                    { readOnly ?
                                        <Button onClick={()=>{this.handleEdit(false); this.copyOriginal()}} style={{ backgroundColor: '#eb5a25', color:"white" }}>Editar</Button>
                                        :
                                        <>
                                            <Button onClick={this.handleSave} type="submit" style={{ backgroundColor: '#46bee0', color:"white" }}>Guardar</Button>
                                            <Button onClick={()=>{this.handleEdit(true); this.pasteOriginal()}} type='submit' style={{ backgroundColor: '#eb5a25', color:"white" }}>Cancelar</Button>
                                        </>
                                    }
                                </Card.Content>
                            </Card.Content >
                        </Card> 

                        <Card fluid color="blue" >
                            <Card.Content >
                                <Card.Description width="100%">                        
                                    <Form onSubmit={this.handleUpdate}>
                                        <Form.Group >
                                            <Form.Field>
                                            <label>Contraseña actual</label>
                                            <input  name="password_actual"
                                                placeholder='Contraseña actual'
                                                type='password'
                                                onChange={this.changeInput}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Nueva contraseña</label>
                                            <input  name="password_nueva"
                                                placeholder='Contraseña nueva'
                                                type='password'
                                                onChange={this.changeInput}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Repita nueva contraseña</label>
                                            <input  name="repeat_password_nueva"
                                                placeholder='Repita nueva contraseña'
                                                type='password'
                                                onChange={this.changeInput}/>
                                            </Form.Field>
                                        </Form.Group>                                   
                                    </Form>
                                </Card.Description>
                                <Card.Content >
                                    <Button onClick={this.handleUpdate} style={{ backgroundColor: '#46bee0', color:"white" }}>Actualizar</Button>
                                </Card.Content>
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

export default withRouter(connect(null, { updateUser, updatePassword })(VerPerfil));
