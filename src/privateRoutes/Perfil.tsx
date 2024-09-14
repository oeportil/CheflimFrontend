import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Perfil = () => {
  const location = useLocation();
  return (
    <main className="container">
    <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-sm-row flex-column align-items-center justify-content-between">
      <div>
        <h3>Bryan Avila</h3>
      </div>
    </div>
    <div className='card px-3 pt-2 pb-3 my-2 '>
      <Nav variant="underline" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href='/user' disabled={location.pathname == "/user"} className={`text-black ${location.pathname == "/user" ? 'text-black-50' : ''}`} eventKey="/user">Mis Recetas</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/user/favs' disabled={location.pathname == "/user/favs"} className={`text-black ${location.pathname == "/user/favs" ? 'text-black-50' : ''}`} eventKey="/user/favs">Favoritos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/user/datos' disabled={location.pathname == "/user/datos"} className={`text-black ${location.pathname == "/user/datos" ? 'text-black-50' : ''}`} eventKey="/user/datos">
            Mis Datos
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      <div>
        <Outlet/>
      </div>
    </div>
  </main>
  )
}

export default Perfil