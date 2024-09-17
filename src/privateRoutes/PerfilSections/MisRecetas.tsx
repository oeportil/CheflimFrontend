import { useEffect, useState } from "react";
import CrearRecetaBoton from "../../components/CrearRecetaBoton";
import MisRecetasCard from "./components/MisRecetasCard";
import { Receta } from "../../libs/types";
import { toast } from "react-toastify";
import { obtenerRecetasUser } from "../../controller/RecetasController";
import { userData } from "../../controller/UserController";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const MisRecetas = () => {
  const [recetas, setRecetas] = useState<Array<Receta>>([]);

  useEffect(() => {
    const getRecetas = async () => {
      try {
        const respuesta = await obtenerRecetasUser(userData().id_usuario);
        //se valida si es un array para que se empiece a mapear
        if (Array.isArray(respuesta)) {
          setRecetas(respuesta);
        } else {
          return;
        }
      } catch (error) {
        toast.error("Ocurrió un error: " + error);
      }
    };
    getRecetas();
  }, []);

  return (
    <>
      <div className="d-flex flex-column gap-2">
        {recetas.length > 0 ? (
          recetas.map((receta, i) => (
            <MisRecetasCard
              key={i}
              image={receta.Imagenes?.[0]?.url_imagen || "default-image.jpg"}
              titulo={receta.descripcion}
              calficacion={receta.calificacion}
              porciones={receta.porciones}
              resenas={receta.cantidadResenas}
              tiempo={receta.tiempo}
            />
          ))
        ) : (
          <>
            <h5>No tienes recetas aún.</h5>
            <p>
              Puedes agregar una en el icono{" "}
              <span className="text-red">
                <FaPlusCircle size={20} />{" "}
              </span>
              en la esquina o desde <Link to={"/"}>inicio</Link>
            </p>
          </>
        )}
      </div>

      <div className="position-fixed end-0 bottom-0 m-2 m-md-4">
        <CrearRecetaBoton />
      </div>
    </>
  );
};

export default MisRecetas;
