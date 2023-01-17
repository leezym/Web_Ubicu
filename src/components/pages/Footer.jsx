import React, { Component } from 'react';
import {Container,Image,List,Segment,} from 'semantic-ui-react'
import logo from '../../logo.png'; // Tell Webpack this JS file uses this image



class Footer extends Component {
    render() {
        return (
            <div >
            <Segment fixed='bottom' textAlign='center' inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                <Image centered size='mini' src={logo} />
                <List horizontal inverted divided link size='small'>
                <List.Item as='a' href='#'>
                    Site Map
                </List.Item>
                <List.Item as='a' href='#'>
                    Contact Us
                </List.Item>
                <List.Item as='a' href='#'>
                    Terms and Conditions
                </List.Item>
                <List.Item as='a' href='#'>
                    Privacy Policy
                </List.Item>
                </List>
            </Segment>    
            </div>
        );
    }
}

export default Footer;