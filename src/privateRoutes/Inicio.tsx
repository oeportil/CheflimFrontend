import { useState, useEffect } from "react";
import CrearRecetaBoton from "../components/CrearRecetaBoton";
import Recetas from "../components/Recetas";

const Inicio = () => {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [userSession, setuserSession] = useState<any>(null);

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
  return (
    <main className="container">
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-sm-row flex-column align-items-center justify-content-between">
        <div>
          <h3>Bienvenido</h3>
          {userSession && <h5>{userSession.nombre}</h5>}
        </div>
        <CrearRecetaBoton />
      </div>

      <div className="my-2">
        {recetas.length > 0 ? (
          recetas.map((receta) => (
            <Recetas
              key={receta.id_receta}
              titulo={receta.nombre}
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
    </main>
  );
};

export default Inicio;
