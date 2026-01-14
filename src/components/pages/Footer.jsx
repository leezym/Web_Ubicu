import React, { Component } from 'react';
import { Image, List, Segment } from 'semantic-ui-react';
import logo from '../../logo.png';

class Footer extends Component {
  render() {
    return (
      <Segment
        textAlign="center"
        inverted
        vertical
        style={{
          marginTop: '3em',
          padding: '2em 0em',
          backgroundColor: '#28367b'
        }}
      >
        <Image centered size="mini" src={logo} alt="Ubicu logo" />

        <List horizontal inverted divided link size="small">
          <List.Item
            as="a"
            href="https://blog.ubicu.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </List.Item>

          <List.Item
            as="a"
            href="https://blog.ubicu.co/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contáctenos
          </List.Item>

          <List.Item
            as="a"
            href="https://blog.ubicu.co/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiénes somos
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default Footer;