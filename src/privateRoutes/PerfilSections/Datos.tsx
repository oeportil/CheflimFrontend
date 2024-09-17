import { Link } from "react-router-dom";
import { IUser } from "../../libs/types";
import { useEffect, useState } from "react";
import EditUserInfoForm from "./components/EditUserInfoForm";

const Datos = () => {
  //state para manejar los datos del usuario
  const [user, setUser] = useState<IUser | "">("");

  const [EditUserInfoModal, setEditUserInfoModal] = useState<boolean>(false);

  //esto revisa los datos del localStorage y los parsea
  useEffect(() => {
    const userData = localStorage.getItem("userSession");
    if (userData) {
      setUser(JSON.parse(userData) as IUser);
    } else {
      console.log("No hay datos en la sesión de usuario.");
    }
  }, []);

  if (!user) {
    return <p>No se encontraron datos del usuario.</p>;
  }
  const { correo, nombre, usuario } = user;

  const toogleEditModal = () => {
    setEditUserInfoModal(!EditUserInfoModal);
  };

  return (
    <>
      <p className="fw-bold">
        Nombre: <span className="fw-normal">{nombre}</span>
      </p>
      <p className="fw-bold">
        Nickname: <span className="fw-normal">{usuario}</span>
      </p>
      <p className="fw-bold">
        Correo: <span className="fw-normal">{correo}</span>
      </p>
      <div className="d-flex gap-2 text-center flex-column flex-sm-row">
        <button
          onClick={toogleEditModal}
          className="bg-red text-white py-2 w-100 rounded-5 fw-bold"
        >
          Editar Datos
        </button>
        <Link
          to={"#"}
          className="bg-red text-white py-2 w-100 rounded-5 fw-bold"
        >
          Cambiar Contraseña
        </Link>
      </div>
      <section className="mt-5 border border- rounded-3">
        <div>
          {EditUserInfoModal && (
            <>
              <EditUserInfoForm setEditUserInfoModal={setEditUserInfoModal} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Datos;
