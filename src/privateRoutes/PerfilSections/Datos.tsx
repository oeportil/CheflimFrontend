import { Link } from "react-router-dom"

const Datos = () => {
  return (
    <div>
        <p className="fw-bold">Nombre: <span className="fw-normal">Bryan Daniel Avila Villanueva</span></p>
        <p className="fw-bold">Nickname: <span className="fw-normal">Bryan Avila</span></p>
        <p className="fw-bold">Correo: <span className="fw-normal">Daniel@Villanueva.kevin</span></p>
        <div className="d-flex gap-2 text-center flex-column flex-sm-row">
            <Link to={"#"} className="bg-red text-white py-2 w-100 rounded-5 fw-bold">Editar Datos</Link>
            <Link to={"#"} className="bg-red text-white py-2 w-100 rounded-5 fw-bold">Cambiar Contraseña</Link>
        </div>
    </div>
  )
}

export default Datos