import { useEffect, useState } from "react"
import CrearRecetaBoton from "../../components/CrearRecetaBoton"
import MisRecetasCard from "./components/MisRecetasCard"
import { Receta } from "../../libs/types"
import { toast } from "react-toastify"
import { obtenerRecetasUser } from "../../controller/RecetasController"
import { userData } from "../../controller/UserController"



const MisRecetas = () => {
  const [recetas, setRecetas] = useState<Receta>({})
  useEffect(() => {
    try {
        
        const respuesta = obtenerRecetasUser(userData().id_usuario)      
    } catch (error) {
      toast.error("Ocurrio un error"+error)
    }
  }, [])
  
  return (
    <>
    <div className="d-flex flex-column gap-2">
        {[1,2,3,4,5,6,7,8,9,10].map((i) => (
          <MisRecetasCard 
          key={i}
          titulo="Empanadas Argentinas"
          calficacion={4.9}
          descripcion="Empanadas de la concha de su madre"
          porciones={9}
          resenas={50}
          tiempo={30}
        />
        ))}
    </div>
     

      <div className="position-fixed end-0 bottom-0 m-2 m-md-4">
          <CrearRecetaBoton/>
      </div>
    </>
  )
}

export default MisRecetas