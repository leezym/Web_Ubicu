import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Image, Icon, Input, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import logo from '../../logo_grande.svg';
import { URL } from '../../actions/url.js';

class ResetPassword extends Component {
    state = {
        password_nueva: '',
        repeat_password_nueva: '',
        showPassword: { nueva: false, repeat: false },
        loading: false,
        openConfirm: false,
        confirmMessage: '',
        success: false,
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    toggleVisibility = (field) => {
        this.setState(prev => ({
            showPassword: { ...prev.showPassword, [field]: !prev.showPassword[field] }
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { password_nueva, repeat_password_nueva } = this.state;
        const { token } = this.props;

        if (password_nueva !== repeat_password_nueva) {
            this.setState({
                openConfirm: true,
                confirmMessage: 'Las contraseñas no coinciden.',
            });
            return;
        }

        this.setState({ loading: true });

        fetch(URL + 'resetPassword', {
            method: 'POST',
            body: JSON.stringify({ token, password_nueva }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
            this.setState({
                loading: false,
                openConfirm: true,
                confirmMessage: data.msg || (ok ? 'Contraseña actualizada.' : 'Error al actualizar contraseña.'),
                success: ok,
            });
        })
        .catch(() => {
            this.setState({
                loading: false,
                openConfirm: true,
                confirmMessage: 'Error de conexión. Intente nuevamente.',
                success: false,
            });
        });
    };

    handleConfirm = () => {
        this.setState({ openConfirm: false });
        if (this.state.success) {
            this.props.history.push('/');
        }
    };

    render() {
        const { password_nueva, repeat_password_nueva, showPassword, loading } = this.state;
        const isValid = password_nueva.length >= 8 && repeat_password_nueva.length >= 8;

        return (
            <>
                <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Image src={logo} centered style={{ width: '350px', height: 'auto' }} />
                        <Header as="h2" textAlign="center" style={{ color: '#28367b' }}>
                            Nueva Contraseña
                        </Header>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '1em' }}>
                                    La contraseña debe contener al menos una mayúscula, un número y un carácter especial.
                                </p>
                                <Form.Field>
                                    <Input
                                        fluid
                                        name="password_nueva"
                                        placeholder="Nueva contraseña"
                                        type={showPassword.nueva ? 'text' : 'password'}
                                        minLength="8"
                                        pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                        value={password_nueva}
                                        onChange={this.handleChange}
                                        required
                                        icon={
                                            <Icon
                                                name={showPassword.nueva ? 'eye' : 'eye slash'}
                                                link
                                                onClick={() => this.toggleVisibility('nueva')}
                                            />
                                        }
                                        iconPosition="right"
                                    />
                                </Form.Field>
                                <Form.Field style={{ marginBottom: '1em' }}>
                                    <Input
                                        fluid
                                        name="repeat_password_nueva"
                                        placeholder="Repita nueva contraseña"
                                        type={showPassword.repeat ? 'text' : 'password'}
                                        minLength="8"
                                        pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                                        value={repeat_password_nueva}
                                        onChange={this.handleChange}
                                        required
                                        icon={
                                            <Icon
                                                name={showPassword.repeat ? 'eye' : 'eye slash'}
                                                link
                                                onClick={() => this.toggleVisibility('repeat')}
                                            />
                                        }
                                        iconPosition="right"
                                    />
                                </Form.Field>
                                <Button
                                    type="submit"
                                    fluid
                                    size="large"
                                    className="btn-brand"
                                    disabled={!isValid || loading}
                                    loading={loading}
                                >
                                    Guardar nueva contraseña
                                </Button>
                            </Segment>
                        </Form>
                        <p style={{ textAlign: 'center' }}>
                            <Link to="/">Volver al inicio de sesión</Link>
                        </p>
                    </Grid.Column>
                </Grid>

                <Confirm
                    open={this.state.openConfirm}
                    content={this.state.confirmMessage}
                    confirmButton="Aceptar"
                    cancelButton={null}
                    onConfirm={this.handleConfirm}
                />
            </>
        );
    }
}

export default ResetPassword;
