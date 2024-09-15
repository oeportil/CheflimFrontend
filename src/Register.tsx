import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los íconos necesarios
import { useState } from "react";
import "./styles/registerStyles.css";
import { registerSchema } from "./libs/Schemas";

const Register = () => {
  //states para ver las passwords
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  //función de registro
  const registerAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email"),
      nombreCompleto: formData.get("nombreCompleto"),
      nombreUsuario: formData.get("nombreUsuario"),
      password: formData.get("password"),
    };

    const userData = registerSchema.safeParse(data);
    //si algo no cuadra tira error
    if (!userData.success) {
      userData.error.issues.forEach((issue) => {
        console.log(issue.message);
      });
      return;
    }

    const repetirPassword = formData.get("repetirPassword");

    if (repetirPassword != data.password) {
      console.log("AAAAAAA");
      return;
    }
  };

  return (
    <>
      <div className="bg-red d-flex gap-3 p-4 text-white">
        <Link to={"/login"} className="text-white fs-4 fw-bolder">
          {" "}
          {"<"}{" "}
        </Link>
        <h2 className="">Crea tu cuenta</h2>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Form className="register-max-w" onSubmit={registerAccount}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="ejemplo"
                name="nombreCompleto"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cheflim34"
                name="nombreUsuario"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "Password" : "*****"}
                name="password"
              />
              <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repetir Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showRepeatPassword ? "text" : "password"}
                placeholder={showRepeatPassword ? "Repetir password" : "*****"}
                name="repetirPassword"
              />
              <InputGroup.Text
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button
            type="submit"
            className="bg-red bg-red-hover border-0 rounded-5 w-100"
          >
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
