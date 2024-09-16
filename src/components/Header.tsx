import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { Logout } from "../controller/UserController";
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();
  const CerrarSesion = () =>{
    Swal.fire({
      title: "Deseas Cerrar la Sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Logout()
        navigate("/login");
      }
    });    
  }

  return (
    <>
      <Navbar className="bg-red">
        <Container className="d-flex flex-sm-row flex-column align-items-center">
          <Navbar.Brand className="mx-auto m-sm-0">
            <Link to={"/"}>
              <img src={logo} alt="" style={{ maxWidth: 75 }} />
            </Link>
          </Navbar.Brand>
          <Nav className="my-auto flex-column flex-sm-row d-md-flex gap-3 text-center">
            <Link to={"/"} className=" text-white">
              Inicio
            </Link>
            <Link to={"/list"} className=" text-white">
              Lista
            </Link>
            <Link to={"/discover"} className=" text-white">
              Descubre
            </Link>
            <Link to={"/user"} className=" text-white">
              Perfil
            </Link>
            <p onClick={CerrarSesion} className="text-white" style={{cursor: "pointer"}}>
              Cerrar Sesión
            </p>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
