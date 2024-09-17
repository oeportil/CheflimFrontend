import { Card } from "react-bootstrap";
import { FaStar, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

type ICardInfo = {
  id_receta?: number;
  descripcion: string;
  creador: string;
  porciones: number;
  tiempo: number;
  resenas: number;
  cresenas: number;
  vistas: number;
  calificacion: number;
  url: string;
};

const Recetas = ({
  id_receta,
  descripcion,
  calificacion,
  porciones,
  resenas,
  cresenas,
  vistas,
  tiempo,
  creador,
  url,
}: ICardInfo) => {
  return (
    <Link to={`/recipe/${id_receta}`} style={{ textDecoration: "none" }}>
      <Card className="mb-3">
        <Card.Body className="d-flex flex-column flex-sm-row">
          <div className="me-3">
            <Card.Img
              src={`${import.meta.env.VITE_API}/obtenerimg/${url}`}
              alt={descripcion}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <div>
            <Card.Title className="text-dark">{descripcion}</Card.Title>
            <div className="mt-2">
              <p className="my-0 text-dark">de {creador}</p>
              <p className="my-0 text-muted">
                {porciones} porciones | {tiempo} minutos
              </p>
              <div className="d-flex align-items-center text-warning">
                <FaStar className="me-1" />
                <span className="me-2">{calificacion}</span>
                <span className="text-muted">
                  ({resenas}) | {cresenas} Reseñas{" "}
                </span>
              </div>
              <div className="d-flex align-items-center mt-1 text-muted">
                <FaEye className="me-1" />
                <span>{vistas} vistas</span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Recetas;
