import { Card } from "react-bootstrap"
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";


type ICardInfo = {
    titulo: string,
    porciones: number, 
    tiempo: number,
    resenas: number,
    calficacion: number
    image: string
    id_receta: number
}

const MisRecetasCard = ({titulo, calficacion, porciones, resenas, tiempo, image, id_receta}: ICardInfo) => {
  return (
    <Link to={`/recipe/${id_receta}`} style={{ textDecoration: "none" }}>
          <Card>
        <Card.Body className="d-flex flex-column flex-sm-row">
           <div className="bg-red">
               
           </div>
           <div>
                <Card.Title>{titulo}</Card.Title>
                <div className="d-flex gap-1">
                  <div style={{width: "200px"}}>
                  <Card.Img
                    src={`${import.meta.env.VITE_API}/obtenerimg/${image}`}
                    alt={titulo}
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  </div>
                    <div className="mt-2">
                        <p className="my-0">{porciones} porciones | {tiempo} minutos </p>
                        <p className="text-gris d-flex align-items-center"><FaStar className="text-yellow"/>{calficacion} ({resenas}) Reseñas </p>
                    </div>
                </div>
           </div>
        </Card.Body>
    </Card>
    </Link>

  )
}

export default MisRecetasCard