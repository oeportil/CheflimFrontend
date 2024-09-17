import { Form } from "react-bootstrap"
import { FaSearch } from "react-icons/fa";
import Recetas from "../../components/Recetas";

const Favoritos = () => {
  return (
    <>
      <Form>
          <Form.Group className="d-flex align-items-center gap-2">
             <FaSearch/> <Form.Control type="text" placeholder={`Buscar Receta`}/>
          </Form.Group>
      </Form>
      <div className="py-3 ms-4">
        <Recetas
          creador="Xavier Vasquez"
          calificacion={4.5}
          descripcion="Unas pupusas bien buenardas"
          porciones={85}
          resenas={-32}
          tiempo={0.01} 
          id_receta={0} 
          cresenas={0} 
          vistas={0} 
          url={""}        />
      </div>
    </>
  )
}

export default Favoritos