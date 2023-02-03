import React,{ Component }  from 'react'
import {Container,Dropdown,Image,Menu,} from 'semantic-ui-react'
import logo from '../../logo.png'; // Tell Webpack this JS file uses this image
import { Link } from "react-router-dom";


class MenuNav extends Component {
    render() {
        return (
    <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          UBICU
        </Menu.Item>
        <Menu.Item><Link to="/HomeAdmin">Inicio</Link></Menu.Item>

        <Dropdown item simple text='Mi Cuenta'>
          <Dropdown.Menu>
            <Dropdown.Item>Cambiar Password</Dropdown.Item>
            <Dropdown.Item>Cerrar Sesion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  </div>
);
}
}

export default MenuNav
