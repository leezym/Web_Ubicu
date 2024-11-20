
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { URL } from '../actions/url.js';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
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
      .then(async res => {
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.msg || 'Error desconocido');
    }
    return res.json();
  })
      .catch(err => {
        alert('Error al autenticar. ' + (err?.response?.data?.msg || err.message));
        this.setState({ loading: false, redirect: true });
      });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}