import { Form } from "react-bootstrap"
import { FaSearch } from "react-icons/fa";
import Recetas from "../../components/Recetas";
import { useEffect, useState } from "react";
import { obtenerFavs } from "../../controller/FavsController";
import { IFav } from "../../libs/types";

const Favoritos = () => {
  //lo sampo any porque no se en exactitud que devuelve, cuando sepa lo cambio a type
  const [favs, setFavs] = useState<Array<IFav>>([]);

  useEffect(() => {
    const getFavs = async()=> {
      const fa = await obtenerFavs();
    
      setFavs(fa);
    }
    getFavs()
  }, [])
  console.log(favs[1])
  return (
    <>
      <Form>
          <Form.Group className="d-flex align-items-center gap-2">
             <FaSearch/> <Form.Control type="text" placeholder={`Buscar Receta`}/>
          </Form.Group>
      </Form>
      <div className="py-3 ms-4">
        {favs.length != 0 ? favs.map((fav, i) => (
          <Recetas
          key={i}
          creador={fav.Recetas.Usuarios.nombre}
          calificacion={fav.Recetas.userResena}
          descripcion={fav.Recetas.descripcion}
          porciones={fav.Recetas.porciones}
          resenas={89}
          tiempo={fav.Recetas.tiempo} 
          cresenas={ 0 } 
          vistas={0} 
          url={""}/>
        )) :
          <div className="text-center text-black-50">
            <h5>Aun no hay Favoritos</h5>
          </div>
        }
      </div>
    </>
  )
}

export default Favoritos