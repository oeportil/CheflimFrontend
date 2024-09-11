import { Link } from 'react-router-dom'
import logo from './img/logo.png'
import { Button, Card, Form } from "react-bootstrap"

const Login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5 mx-4'>
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" className='w-50 mx-auto' src={logo} alt="Cheflim Logo"/>
          <Card.Body>
            <Card.Title className="text-uppercase text-center text-danger fw-bolder">Cheflim</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="email.ControlInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password.ControlInput">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder='...' />
                </Form.Group>
                <Button className='bg-red bg-red-hover border-0 rounded-5 w-100'>Iniciar Sesión</Button>
              </Form>
              <hr />
              <div className='d-flex justify-content-center'>
                <Link to={"/register"} className='text-green fw-semibold'>Crear Cuenta</Link>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  )
}

export default Login