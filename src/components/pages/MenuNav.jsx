import React, { Component } from 'react';
import { Container, Image, Menu, Icon, Confirm } from 'semantic-ui-react';
import logo from '../../logo.png';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class MenuNav extends Component {
  state = {
    openConfirm: false, // controla el popup
  };

  handleOpenConfirm = () => {
    this.setState({ openConfirm: true });
  };

  handleCancel = () => {
    this.setState({ openConfirm: false });
  };

  handleConfirm = () => {
    this.setState({ openConfirm: false });
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    this.props.history.push('/');
  };

  render() {
    const id_user = localStorage.getItem('id_user');
    const { openConfirm } = this.state;

    return (
      <>
        <Menu fixed='top' inverted style={{ backgroundColor: "#28367b" }}>
          <Container>
            
            <Menu.Item as={Link} to={`/Fisioterapeuta/${id_user}`} header>
              <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
              UBICU
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item
                as={Link}
                to={`/VerPerfil/${id_user}`}
                title="Ver perfil"
              >
                <Icon name='user circle' size='large' />
              </Menu.Item>

              <Menu.Item
                onClick={this.handleOpenConfirm}
                title="Cerrar sesión"
              >
                <Icon name='sign-out' size='large' />
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>

        <Confirm
          open={openConfirm}
          content='¿Está seguro de que desea cerrar sesión?'
          cancelButton='No'
          confirmButton='Sí, cerrar sesión'
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </>
    );
  }
}

export default connect(null)(withRouter(MenuNav));