import React, { Component } from 'react';
import logo from '../../logo.svg';
import '../../styles/footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="u-footer">
        <div className="u-footer-top">
          <div className="u-footer-brand">
            <div className="u-footer-brand-mark">
              <img src={logo} alt="Ubicu" />
              <span>ubicu</span>
            </div>
            <p className="u-footer-blurb">
              Producto de apoyo para la fisioterapia respiratoria con incentivo.
              Ejercicios desde casa, datos en la nube.
            </p>
          </div>

          <div className="u-footer-cols">
            <div className="u-footer-col">
              <h4>Plataforma</h4>
              <a href="https://blog.ubicu.co/#how" target="_blank" rel="noopener noreferrer">Cómo funciona</a>
              <a href="https://blog.ubicu.co/#features" target="_blank" rel="noopener noreferrer">Características</a>
              <a href="https://blog.ubicu.co/#video" target="_blank" rel="noopener noreferrer">Demo</a>
            </div>

            <div className="u-footer-col">
              <h4>Compañía</h4>
              <a href="https://blog.ubicu.co/about" target="_blank" rel="noopener noreferrer">Quiénes somos</a>
              <a href="https://blog.ubicu.co/contact" target="_blank" rel="noopener noreferrer">Contacto</a>
              <a href="https://blog.ubicu.co" target="_blank" rel="noopener noreferrer">Blog</a>
            </div>
          </div>
        </div>

        <div className="u-footer-bottom">
          <span>© {new Date().getFullYear()} Ubicu. Todos los derechos reservados.</span>
          <span>Cali, Colombia</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
