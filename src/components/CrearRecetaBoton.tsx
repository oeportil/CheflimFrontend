import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const CrearRecetaBoton = () => {
  return (
    <div className="bg-white text-red rounded-5">
        <Link to={"/crear-receta"} className="text-red">
            <FaPlusCircle size={40}/> 
        </Link>
    </div>
  )
}

export default CrearRecetaBoton