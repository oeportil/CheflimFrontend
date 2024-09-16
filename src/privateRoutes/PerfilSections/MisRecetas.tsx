import { useEffect, useState } from "react"
import CrearRecetaBoton from "../../components/CrearRecetaBoton"
import MisRecetasCard from "./components/MisRecetasCard"
import { Receta } from "../../libs/types"
import { toast } from "react-toastify"
import { obtenerRecetasUser } from "../../controller/RecetasController"
import { userData } from "../../controller/UserController"



const MisRecetas = () => {
  const [recetas, setRecetas] = useState<Array<Receta>>([])
  useEffect(() => {
    const getRecetas = async() =>{
      try {        
          const respuesta = await obtenerRecetasUser(userData().id_usuario) 
          setRecetas(respuesta)     
      } catch (error) {
        toast.error("Ocurrio un error"+error)
      }
    }
    getRecetas()
  }, [])
  
  return (
    <>
    <div className="d-flex flex-column gap-2">
        {recetas.map((receta, i ) => (
          <MisRecetasCard 
          key={i}
          image= {receta.Imagenes[0].url_imagen}
          titulo={receta.descripcion}
          calficacion={4.9}
          porciones={receta.porciones}
          resenas={receta.cantidadResenas}
          tiempo={receta.tiempo}
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