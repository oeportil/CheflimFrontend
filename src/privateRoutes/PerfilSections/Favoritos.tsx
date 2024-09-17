import { Form } from "react-bootstrap"
import { FaSearch } from "react-icons/fa";
import Recetas from "../../components/Recetas";
import { useEffect, useState } from "react";
import { obtenerFavs } from "../../controller/FavsController";

const Favoritos = () => {
  //lo sampo any porque no se en exactitud que devuelve, cuando sepa lo cambio a type
  const [favs, setFavs] = useState<Array<any>>([]);

  useEffect(() => {
    const getFavs = async()=> {
      const fa = await obtenerFavs();
      console.log(fa)
      setFavs(fa);
    }
    getFavs()
  }, [])
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
          creador="Xavier Vasquez"
          calificacion={4.5}
          descripcion="Unas pupusas bien buenardas"
          porciones={85}
          resenas={-32}
          tiempo={0.01} 
          id_receta={0} 
          cresenas={0} 
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