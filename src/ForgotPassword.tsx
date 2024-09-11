import { Link } from "react-router-dom"
import { RiShieldUserLine } from "react-icons/ri";
import { Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
  return (
    <>
        <div className="bg-red d-flex  gap-3 p-4 text-white ">
          <Link to={"/login"} className="text-white fs-4 fw-bolder"> {"<"} </Link>
          <h2 className="">Olvidaste tu Contraseña?</h2>
      </div>
      <div className="d-flex justify-content-center text-center">
        <div className="my-4">
             <RiShieldUserLine size={100} className="text-red mx-auto"/>
             <Form>
                <Form.Group>
                    <h2 className="fs-5 fw-bold">Problemas para Iniciar Sesión?</h2>
                    <p>Escribe tu correo y te enviaremos un link para cambiar su contraseña</p>
                    <Form.Control type="email" className="rounded-5" placeholder="email" />
                    <Button className="bg-red bg-red-hover mt-2 w-100 rounded-5 fw-bolder">Enviar Link</Button>
                </Form.Group>
             </Form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword