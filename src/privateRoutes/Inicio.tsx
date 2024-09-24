import { useState, useEffect } from "react";
import CrearRecetaBoton from "../components/CrearRecetaBoton";
import Recetas from "../components/Recetas";
import { IUser } from "../libs/types";

const Inicio = () => {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [userSession, setuserSession] = useState<IUser>({
    correo: "",
    id_usuario: 0,
    nombre: "",
    token: "",
    usuario: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recetasPerPage = 5;

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/receta`);
        const data = await response.json();
        setRecetas(data);
        const local = localStorage.getItem("userSession");

        if (local) {
          setuserSession(JSON.parse(local));
        }
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      }
    };

    fetchRecetas();
    console.log(recetas);
  }, []);

  const indexOfLastReceta = currentPage * recetasPerPage;
  const indexOfFirstReceta = indexOfLastReceta - recetasPerPage;
  const currentRecetas = recetas.slice(indexOfFirstReceta, indexOfLastReceta);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recetas.length / recetasPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="container">
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-sm-row flex-column align-items-center justify-content-between">
        <div>
          <h3>Bienvenido</h3>
          <h6> {userSession.usuario}</h6>
          {userSession && <h5>{userSession.nombre}</h5>}
        </div>
        <CrearRecetaBoton />
      </div>

      <div className="my-2">
        {currentRecetas.length > 0 ? (
          currentRecetas.map((receta) => (
            <Recetas
              key={receta.id_receta}
              id_receta={receta.id_receta}
              creador={receta.Usuarios.nombre}
              descripcion={receta.descripcion}
              calificacion={receta.calificacion}
              porciones={receta.porciones}
              resenas={receta.promedioResenas}
              cresenas={receta.cantidadResenas}
              vistas={receta.vistas}
              tiempo={receta.tiempo_preparacion}
              url={
                receta.Imagenes.length > 0
                  ? receta.Imagenes[0].url_imagen
                  : "default.jpg"
              }
            />
          ))
        ) : (
          <p>No hay recetas disponibles</p>
        )}
      </div>

      <div className="d-flex justify-content-center my-3">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button
                className="fs-4 bg-white border-1 rounded-3 mx-1"
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <br />
    </main>
  );
};

export default Inicio;
