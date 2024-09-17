import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../libs/axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type ICardInfo = {
  id_receta: number;
  titulo: string;
  porciones: number;
  tiempo: number;
  resenas: number;
  calficacion: number;
  image: string;
};

const MisRecetasCard = ({
  id_receta,
  titulo,
  calficacion,
  porciones,
  resenas,
  tiempo,
  image,
}: ICardInfo) => {
  const popOutWindow = () => {
    Swal.fire({
      title: "¿Deseas Eliminar la receta?",
      text: "Esta acción no se podra revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7edf66",
      cancelButtonColor: "#dc3254",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarReceta(id_receta);
      }
    });
  };

  const eliminarReceta = async (id: number) => {
    try {
      const response = await api.delete(`/deletereceta/${id}`);
      toast.success(response.data.mensaje);
    } catch (e) {
      toast.error("Error al eliminar la receta:" + e);
    }
  };
  return (
    <Card>
      <Card.Body className="d-flex flex-column flex-sm-row">
        <div className="bg-red"></div>
        <div>
          <Link to={`/recipe/${id_receta}`} className="text-black">
            <Card.Title>{titulo}</Card.Title>
          </Link>

          <div className="d-flex gap-1">
            <div style={{ width: "200px" }}>
              <Card.Img
                src={`${import.meta.env.VITE_API}/obtenerimg/${image}`}
                alt={titulo}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="mt-2">
              <p className="my-0">
                {porciones} porciones | {tiempo} minutos{" "}
              </p>
              <p className="text-gris d-flex align-items-center">
                <FaStar className="text-yellow" />
                {calficacion} ({resenas}) Reseñas{" "}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 align-items-center justify-content-center">
                <Link
                  className="btn btn-success fw-bold px-4 py-2 text-center"
                  to={`/recipe/${id_receta}`}
                >
                  Ver receta
                </Link>
                <button
                  onClick={popOutWindow}
                  className="btn btn-danger fw-bold px-4 py-2 text-center"
                >
                  Eliminar Receta
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MisRecetasCard;
