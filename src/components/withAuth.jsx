
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
        alert('Error al autenticar. ' + err.message);
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