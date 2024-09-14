
import CrearRecetaBoton from "../components/CrearRecetaBoton";
import Recetas from "../components/Recetas";

const Inicio = () => {
  return (
    <main className="container">
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-sm-row flex-column align-items-center justify-content-between">
        <div>
          <h3>Bienvenido</h3>
          <h5>Bryan Avila</h5>
        </div>
        <CrearRecetaBoton/>
      </div>  

      <div className="my-2">
          <Recetas 
          titulo="Titulo Ejemplo" 
          creador="Pocho Avila"
          descripcion="Descripcion ejemplo"
          calficacion={4.3}
          porciones={8}
          resenas={53}
          tiempo={80}
          />
      </div>      
    </main>
  )
}

export default Inicio