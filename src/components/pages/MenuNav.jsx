import React, { Component } from 'react';
import { Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../logo.svg';
import '../../styles/nav.css';

class MenuNav extends Component {
  state = { openConfirm: false };

  handleOpenConfirm = () => this.setState({ openConfirm: true });
  handleCancel     = () => this.setState({ openConfirm: false });

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
        <header className="u-nav">
          <div className="u-nav-inner">
            <Link className="u-brand" to={`/Fisioterapeuta/${id_user}`}>
              <img src={logo} alt="Ubicu" />
              ubicu 
            </Link>

            <div className="u-nav-right">
              <Link
                className="u-icon-btn"
                to={`/VerPerfil/${id_user}`}
                title="Ver perfil"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </Link>

              <button
                className="u-icon-btn"
                onClick={this.handleOpenConfirm}
                title="Cerrar sesión"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <Confirm
          open={openConfirm}
          content="¿Está seguro de que desea cerrar sesión?"
          cancelButton="No"
          confirmButton="Sí, cerrar sesión"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </>
    );
  }
}

export default connect(null)(withRouter(MenuNav));