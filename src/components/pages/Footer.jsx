import React, { Component } from 'react';
import {Container,Image,List,Segment,} from 'semantic-ui-react'
import logo from '../../logo.png'; // Tell Webpack this JS file uses this image



class Footer extends Component {
    render() {
        return (
            <div >
                <Segment fixed='bottom' textAlign='center' inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em', backgroundColor: "#28367b" }}>
                    <Image centered size='mini' src={logo} />
                    <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='https://blog.ubicu.co' target="_blank" rel="noopener noreferrer">
                        Blog
                    </List.Item>
                    <List.Item as='a' href='https://blog.ubicu.co/contact' target="_blank" rel="noopener noreferrer">
                        Contáctenos
                    </List.Item>
                    <List.Item as='a' href='https://blog.ubicu.co/about' target="_blank" rel="noopener noreferrer">
                        Quiénes somos
                    </List.Item>
                    </List>
                </Segment>    
            </div>
        );
    }
}

export default Footer;