import { Card } from "react-bootstrap"
import { FaStar } from "react-icons/fa";


type ICardInfo = {
    titulo: string,
    descripcion: string,
    porciones: number, 
    tiempo: number,
    resenas: number,
    calficacion: number
}

const MisRecetasCard = ({titulo, descripcion, calficacion, porciones, resenas, tiempo}: ICardInfo) => {
  return (
    <Card>
        <Card.Body className="d-flex flex-column flex-sm-row">
           <div className="bg-red">
               
           </div>
           <div>
                <Card.Title>{titulo}</Card.Title>
                <div>
                    <p className="my-0">{descripcion}</p>
                    <div className="mt-2">
                        <p className="my-0">{porciones} porciones | {tiempo} minutos </p>
                        <p className="text-gris d-flex align-items-center"><FaStar className="text-yellow"/>{calficacion} ({resenas}) Reseñas </p>
                    </div>
                </div>
           </div>
        </Card.Body>
    </Card>
  )
}

export default MisRecetasCard