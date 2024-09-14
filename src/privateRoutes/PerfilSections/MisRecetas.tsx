import MisRecetasCard from "./components/MisRecetasCard"

const MisRecetas = () => {
  return (
    <>
      <MisRecetasCard 
        titulo="Empanadas Argentinas"
        calficacion={4.9}
        descripcion="Empanadas de la concha de su madre"
        porciones={9}
        resenas={50}
        tiempo={30}
      />
    </>
  )
}

export default MisRecetas