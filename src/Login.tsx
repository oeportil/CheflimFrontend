import { Link, useNavigate } from 'react-router-dom'
import logo from './img/logo.png'
import { Button, Card, Form } from "react-bootstrap"
import { LoginSchema } from './libs/Schemas';
import { toast } from "react-toastify";
import { login } from './controller/UserController';



const Login = () => {
  const navigate = useNavigate();

  const Logearse = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      correo: formData.get("email"),
      contrasena: formData.get("password")
    }

    const user = LoginSchema.safeParse(data)

    if (!user.success) {
      user.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    try {
        const respuesta = await login(user);
        if(respuesta == 200){
          navigate("/");
        }
    } catch (e) { 
      toast.error("Ocurrio algo inesperado " + e);
    }

}

  return (
    <div className='d-flex justify-content-center align-items-center mt-5 mx-4'>
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" className='w-50 mx-auto' src={logo} alt="Cheflim Logo"/>
          <Card.Body>
            <Card.Title className="text-uppercase text-center text-danger fw-bolder">Cheflim</Card.Title>
            <div>
              <Form onSubmit={Logearse}>
                <Form.Group className="mb-3" controlId="email.ControlInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password.ControlInput">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name='password' placeholder='...' />
                </Form.Group>
                <Button type='submit' className='bg-red bg-red-hover border-0 rounded-5 w-100'>Iniciar Sesión</Button>
              </Form>
              <hr />
              <div className='d-flex justify-content-center'>
                <Link to={"/register"} className='text-green fw-semibold'>Crear Cuenta</Link>
              </div>
              {/* <div className='d-flex justify-content-center'>
                <Link to={"/forgot-password"} className='text-red fw-semibold'>Olvidaste tu contraseña?</Link>
              </div> */}
            </div>
          </Card.Body>
        </Card>
    </div>
  )
}

export default Login