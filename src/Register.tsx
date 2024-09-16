import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los íconos necesarios
import { useState } from "react";
import "./styles/registerStyles.css";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "./libs/Schemas";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  //states para ver las passwords
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  //función de registro
  const registerAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //se crea un formData tomando en cuenta el evento del form
    const formData = new FormData(event.currentTarget);
    //asi se toman los datos(con los names de los inputs)
    const data = {
      correo: formData.get("email"),
      nombre: formData.get("nombreCompleto"),
      usuario: formData.get("nombreUsuario"),
      contrasena: formData.get("password"),
    };
    //verifica que los datos cumplan con el esquema
    const userData = registerSchema.safeParse(data);
    //si algo no cuadra tira error
    if (!userData.success) {
      userData.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    //el campo de repetir password lo tomo aparte para validarlo despues
    const repetirPassword = formData.get("repetirPassword");

    if (repetirPassword != data.contrasena) {
      toast.warn("Las passwords no coinciden");
      return;
    }
    //acá se valida que el usuairo no exista y se crea si no esta
    try {
      const userExist = await axios.post(
        `${import.meta.env.VITE_API}/checkifuser`,
        userData.data
      );

      if (!userExist.data.validacion!) {
        //esta crea el usuario
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/createuser`,
          userData.data
        );
        console.log(data);
        const { token, id_usuario } = data; // Extrae el token y el ID del usuario

        // Guarda solo el token y el ID del usuario en el localStorage
        localStorage.setItem(
          "userSession",
          JSON.stringify({ token, id_usuario })
        );

        toast.success("Usuario creado correctamente");
        navigate("/");
        return;
      }
      toast.error("El usuario ya esta registrado");
    } catch (e) {
      toast.error("Ocurrio algo inesperado " + e);
    }
  };

  return (
    <>
      <div className="bg-red d-flex align-items-center gap-3 p-4 text-white shadow-sm">
        <Link to={"/login"} className="text-white fs-4 fw-bold">
          {"<"}
        </Link>
        <h2 className="m-0">Crea tu cuenta</h2>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Form
          className="register-max-w p-4 rounded-4 shadow-lg bg-light"
          onSubmit={registerAccount}
        >
          <h3 className="text-center mb-4 text-dark fw-bold">Registro</h3>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email" className="fw-semibold text-muted">
              Email
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <FaEnvelope className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                id="email"
                type="email"
                placeholder="name@example.com"
                name="email"
                className="border-start-0"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="name" className="fw-semibold text-muted">
              Nombre Completo
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <FaUser className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                id="name"
                type="text"
                placeholder="Ejemplo"
                name="nombreCompleto"
                className="border-start-0"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName" className="fw-semibold text-muted">
              Nombre de Usuario
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <FaUser className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                id="userName"
                type="text"
                placeholder="Cheflim34"
                name="nombreUsuario"
                className="border-start-0"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password" className="fw-semibold text-muted">
              Password
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <FaLock className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "Password" : "*****"}
                name="password"
                className="border-start-0"
              />
              <InputGroup.Text
                className="bg-white border-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-muted" />
                ) : (
                  <FaEye className="text-muted" />
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="repeatPassword"
              className="fw-semibold text-muted"
            >
              Repetir Password
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <FaLock className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                id="repeatPassword"
                type={showRepeatPassword ? "text" : "password"}
                placeholder={showRepeatPassword ? "Repetir password" : "*****"}
                name="repetirPassword"
                className="border-start-0 "
              />
              <InputGroup.Text
                className="bg-white border-0"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? (
                  <FaEyeSlash className="text-muted" />
                ) : (
                  <FaEye className="text-muted" />
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            className="bg-red border-0 rounded-pill w-100 py-2 text-white fw-bold "
          >
            Crear Cuenta
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
