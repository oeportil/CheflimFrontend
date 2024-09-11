import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import './styles/registerStyles.css';

const Register = () => {
  return (
    <>
      <div className="bg-red d-flex  gap-3 p-4 text-white ">
          <Link to={"/login"} className="text-white fs-4 fw-bolder"> {"<"} </Link>
          <h2 className="">Crea tu cuenta</h2>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Form className="register-max-w">
          <Form.Group className="mb-3" controlId="email.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombre.ControlInput1">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="ejemplo" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombre.ControlInput1">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="Cheflim34" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password.ControlInput">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder='...' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password.ControlInput">
            <Form.Label>Repetir Password</Form.Label>
            <Form.Control type="password" placeholder='...' />
          </Form.Group>
          <Button className='bg-red bg-red-hover border-0 rounded-5 w-100'>Iniciar Sesión</Button>
        </Form>
      </div>
    </>
  )
}

export default Register