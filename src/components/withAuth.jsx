
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Confirm } from 'semantic-ui-react';
import { URL } from '../actions/url.js';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        openConfirm: false,
        confirmMessage: '',
      };
    }
    componentDidMount() {
      fetch(URL+'checkToken', {
        method: 'GET',
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
      .catch(err => {
        this.setState({
          loading: false,
          redirect: true,
          openConfirm: true,
          confirmMessage: 'Error al autenticar. ' + (err?.response?.data?.msg || err.message || 'Error desconocido.')
        });
      });
    }
    handleCancel = () => {
      this.setState({ openConfirm: false });
    };

    render() {
      const { loading, redirect, openConfirm, confirmMessage } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
          
          <Confirm
            open={openConfirm}
            content={confirmMessage}
            confirmButton='Aceptar'
            cancelButton={null}
            onConfirm={this.handleCancel}
          />
        </React.Fragment>
      );
    }
  }
}