import { Form } from "react-bootstrap"
import { FaSearch } from "react-icons/fa";
import Recetas from "../../components/Recetas";
import { useEffect, useState } from "react";
import { obtenerFavs } from "../../controller/FavsController";
import { IReceta } from "../../libs/types";

const Favoritos = () => {
  //lo sampo any porque no se en exactitud que devuelve, cuando sepa lo cambio a type
  const [favs, setFavs] = useState<Array<IReceta>>([]);

  useEffect(() => {
    const getFavs = async()=> {
      const fa = await obtenerFavs();  
      console.log(fa)  
      setFavs(fa);
    }
    getFavs()
  }, [])
  //console.log(favs[1])
  return (
    <>
      <div className="py-3 ms-4">
        {favs.length != 0 ? favs.map((fav, i) => (
          <Recetas
          key={i}
          id_receta={fav.id_receta}
          creador={fav.Usuarios.nombre}
          calificacion={fav.promedioResenas!}
          descripcion={fav.descripcion}
          porciones={fav.porciones}
          resenas={fav.promedioResenas!}
          tiempo={fav.tiempo} 
          cresenas={ fav.cantidadResenas! } 
          vistas={fav.vistas!} 
          url={fav.Imagenes[0].url_imagen}/>
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