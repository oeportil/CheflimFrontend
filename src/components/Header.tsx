import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png'

function Header() {
  return (
    <>
      <Navbar className='bg-red'>
        <Container className='d-flex flex-sm-row flex-column align-items-center'>
          <Navbar.Brand className='mx-auto m-sm-0'>
            <Link to={"/"}>
              <img src={logo} alt="" style={{maxWidth: 75}}/>
            </Link>
          </Navbar.Brand>
          <Nav className="my-auto flex-column flex-sm-row d-md-flex gap-3 text-center">
            <Link to={"/"} className=' text-white'>Inicio</Link>
            <Link to={"/list"} className=' text-white'>Lista</Link>
            <Link to={"/discovered"} className=' text-white'>Descubre</Link>
            <Link to={"/user"} className=' text-white'>Perfil</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;