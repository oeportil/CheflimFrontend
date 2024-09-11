import { Card } from "react-bootstrap"
import { FaStar } from "react-icons/fa";


type ICardInfo = {
    titulo: string,
    descripcion: string,
    creador: string
    porciones: number, 
    tiempo: number,
    resenas: number,
    calficacion: number
}

const Recetas = ({titulo, descripcion, calficacion, porciones, resenas, tiempo, creador}: ICardInfo) => {
  return (
    <Card>
        <Card.Body className="d-flex flex-column flex-sm-row">
           <div className="bg-red">
               
           </div>
           <div>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    <p className="my-0">{descripcion}</p>
                    <div className="mt-2">
                        <p className="my-0">de {creador}</p>
                        <p className="my-0">{porciones} porciones | {tiempo} minutos </p>
                        <p className="text-gris d-flex align-items-center"><FaStar className="text-yellow"/>{calficacion} ({resenas}) Reseñas </p>
                    </div>
                </Card.Text>
           </div>
        </Card.Body>
    </Card>
  )
}

export default Recetas