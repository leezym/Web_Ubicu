import React,{ Component }  from 'react'
import {Container,Dropdown,Image,Menu} from 'semantic-ui-react'
import logo from '../../logo.png'; // Tell Webpack this JS file uses this image
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


class MenuNav extends Component {
  
  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    this.props.history.push('/');
  };

  render() {
    const id_user = localStorage.getItem('id_user');
    
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
            <Link to={`/Users/${id_user}`} style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
              <span>UBICU</span>
            </Link>                
            </Menu.Item>
            <Dropdown item simple text='Mi Cuenta'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {this.props.history.push(`/VerPerfil/${id_user}`)}}>Ver perfil</Dropdown.Item>
                <Dropdown.Item onClick={this.handleLogout}>Cerrar Sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default connect(null)(withRouter(MenuNav));
