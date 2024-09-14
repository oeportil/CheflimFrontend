import Nav from 'react-bootstrap/Nav';
import { Link, Outlet } from 'react-router-dom';
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
          <Link to='/user' className={`text-black ${location.pathname == "/user" ? 'text-black-50' : ''}`} >Mis Recetas</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to='/user/favs' className={`text-black ${location.pathname == "/user/favs" ? 'text-black-50' : ''}`} >Favoritos</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to='/user/datos' className={`text-black ${location.pathname == "/user/datos" ? 'text-black-50' : ''}`}>
            Mis Datos
          </Link>
        </Nav.Item>
      </Nav>
      <hr />
      <div>
        <Outlet/>
      </div>
    </div>
    <Link to={""}>

    </Link>
  </main>
  )
}

export default Perfil