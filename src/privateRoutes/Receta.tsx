import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

//For ratings
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { useNavigate, useParams } from "react-router-dom";
import { IReceta } from "../libs/types";
import { Calificar, getReceta } from "../controller/RecetasController";
import { userData } from "../controller/UserController";
import { toast } from "react-toastify";

//para indicar que es favorito
import { FaBookmark } from "react-icons/fa";
import { AddFav } from "../controller/FavsController";

const Receta = () => {
    const navigate = useNavigate();
    const { recipe } = useParams();
    
    const [receta, setReceta] = useState<IReceta>({descripcion: "", 
      Ingredientes: [],  isFavorito: false, Pasos: [], 
      porciones: 0, tiempo: 0, userResena: 0, Usuarios: {nombre: ""}, Imagenes:"", id_receta:0});

    useEffect(() =>{
        const tenerreceta = async() => {
            const rect = await getReceta(userData().id_usuario, parseInt(recipe!));
            await setReceta(rect)    
            await setRating(rect.userResena)         
        } 
        tenerreceta()
    }, [])
    const [rating, setRating] = useState<number>(0);

        const publicstaticvoid = async(e: number)=> {
          try {
            const resena = {
              id_usuario: userData().id_usuario,
              id_receta: parseInt(recipe!),
              valor: e
            }
            const respuesta = await Calificar(resena)
            if(respuesta.status == 200){
              setRating(e)
              toast.success("Calificado con exito")
            }
          } catch (error) {
            console.log(error)
          } 
        }
 
  const AgregaroEliminar = async() =>{
      const obj = {
        idUsuario: userData().id_usuario,
        idReceta: receta.id_receta
      }
      try {
        const resultado = await AddFav(obj)
        toast.success(resultado.data.mensaje)
      } catch (error) {
        toast.error(`${error}`)
      }
      setReceta({...receta, isFavorito: !receta.isFavorito})
  }

  return (
    <main className="container">
      <div className="text-start mt-2" style={{cursor: "pointer"}} onClick={() => navigate(-1)}>
            <FaArrowLeft size={30}/>
      </div>
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-column align-items-center">
        <div className="d-flex ms-auto my-2">
          <FaBookmark size={35} className={`${receta.isFavorito ? "text-musto" : "text-black-50"}`} onClick={AgregaroEliminar} style={{cursor: "pointer"}}/>
        </div>
        <div className="mx-auto text-center">
          <h3>{receta.descripcion}</h3>
          <h5>{receta.Usuarios.nombre}</h5>
        </div>
        <img className="rounded-3" src={`${import.meta.env.VITE_API}/obtenerimg/${receta.Imagenes[0]?.url_imagen}`} alt={`imagen de ${receta.descripcion}`} style={{width: "90%", maxWidth: "300px"}}/>       
        <Rating style={{maxWidth: 180}} value={rating} onChange={publicstaticvoid}/>
      </div>  
      <div>
        <h3 className="text-center">{receta.porciones} Porciones</h3>
        <div>
            <div className="d-flex justify-content-center">
                <button className="bg-red bg-red-hover p-2 text-white rounded-5 " style={{maxWidth: "20rem", width: "95%"}}>
                    Agregar a la Lista
                </button>     
            </div>           
            <h4>Ingredientes: </h4>
            <ul>
                {receta.Ingredientes.map( (i, k) =>(
                  <li key={k}>{i.ingrediente}</li>
                ))}
            </ul>
        </div>
        <div>
            <h4>Instrucciones: </h4>
            <ol>
                {receta.Pasos.map( (p, k) =>(
                  <li key={k}>{p.paso}</li>
                ))}
            </ol>
        </div>
      </div>
    </main>
  )
}

export default Receta