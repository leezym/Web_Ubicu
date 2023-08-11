import React,{ Component }  from 'react'
import {Container,Dropdown,Image,Menu} from 'semantic-ui-react'
import logo from '../../logo.png'; // Tell Webpack this JS file uses this image
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


class MenuNav extends Component {
  
  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  render() {
    const { id_user } = this.props.match.params;
    
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                UBICU
            </Menu.Item>
            <Dropdown item simple text='Mi Cuenta'>
              <Dropdown.Menu>
                <Dropdown.Item><Link to={`/VerPerfil/${id_user}`} style={{ color: 'black' }}>Ver perfil</Link></Dropdown.Item>
                <Dropdown.Item onClick={this.handleLogout}>Cerrar Sesion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default connect(null)(withRouter(MenuNav));
