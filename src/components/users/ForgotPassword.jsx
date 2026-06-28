import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Image, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import logo from '../../logo_grande.svg';
import { URL } from '../../actions/url.js';

class ForgotPassword extends Component {
    state = {
        email: '',
        loading: false,
        openConfirm: false,
        confirmMessage: '',
        success: false,
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        fetch(URL + 'forgotPassword', {
            method: 'POST',
            body: JSON.stringify({ email: this.state.email }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
            this.setState({
                loading: false,
                openConfirm: true,
                confirmMessage: data.msg || (ok ? 'Correo enviado.' : 'Error al enviar correo.'),
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
        const { email, loading } = this.state;

        return (
            <>
                <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Image src={logo} centered style={{ width: '350px', height: 'auto' }} />
                        <Header as="h2" textAlign="center" style={{ color: '#28367b' }}>
                            Recuperar Contraseña
                        </Header>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="Correo electrónico"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Button
                                    type="submit"
                                    fluid
                                    size="large"
                                    className="btn-brand"
                                    disabled={!email || loading}
                                    loading={loading}
                                >
                                    Enviar enlace de recuperación
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <Link to="/">Volver al inicio de sesión</Link>
                        </Message>
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

export default ForgotPassword;
