import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

//For ratings
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { useNavigate, useParams } from "react-router-dom";
import { IReceta } from "../libs/types";
import { Calificar, Denunciar, getReceta } from "../controller/RecetasController";
import { userData } from "../controller/UserController";
import { toast } from "react-toastify";

//para indicar que es favorito
import { FaBookmark } from "react-icons/fa";
import { AddFav } from "../controller/FavsController";
import { addList } from "../controller/ListaController";

//Icono de la concha de la lora
import { MdBlockFlipped } from "react-icons/md";
import Swal from "sweetalert2";

const Receta = () => {
    const navigate = useNavigate();
    const { recipe } = useParams();
    
    const [receta, setReceta] = useState<IReceta>({descripcion: "", 
      Ingredientes: [],  isFavorito: false, Pasos: [], 
      porciones: 0, tiempo: 0, userResena: 0, Usuarios: {nombre: ""}, Imagenes:"", id_receta:0, denunciado: false});

    useEffect(() =>{
        const tenerreceta = async() => {
            const rect = await getReceta(userData().id_usuario, parseInt(recipe!));
            console.log(rect)
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
  const AgregarLista = async()=> {
    const obj = {
      id_usuario: userData().id_usuario, 
      id_receta: receta.id_receta
    }
    try {
      const respuesta = await addList(obj)
      if(respuesta.status != 200){
        throw new Error(respuesta.data.error!);    
      }
      toast.success("Se añadieron a la lista correctamente")
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  const ToggleDenuncia = ()=> {
      if(!receta.denunciado){
        Swal.fire({
          title: "Deseas Denunciar esta Receta?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            DenunciarFun()
          }
        });
      } else {
        DenunciarFun()        
      }
  }
  async function DenunciarFun(){
    try {
      
      const resultado = await Denunciar({id: receta.id_receta!, id_usuario: userData().id_usuario});
      if(resultado.status != 200){
          throw new Error("Error al hacer la denuncia");          
      }
      setReceta({...receta, denunciado: !receta.denunciado})
      toast.success("Se Cambio el estado de la denuncia")
    } catch (error) {
      toast.error(`${error}`)
    }
  } 

  return (
    <main className="container">
      <div className="text-start mt-2" style={{cursor: "pointer"}} onClick={() => navigate(-1)}>
            <FaArrowLeft size={30}/>
      </div>
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 ">
        <div className="d-flex justify-content-between my-2">
          <MdBlockFlipped size={35} onClick={ToggleDenuncia} className={`${receta.denunciado ? "text-red" : "text-black-50"}`} style={{cursor: "pointer"}} />
          <FaBookmark size={35} className={`${receta.isFavorito ? "text-musto" : "text-black-50"}`} onClick={AgregaroEliminar} style={{cursor: "pointer"}}/>
        </div>
        <div className="mx-auto text-center">
          <h3>{receta.descripcion}</h3>
          <h5>{receta.Usuarios.nombre}</h5>
        </div>
       <div className="d-flex flex-column align-items-center">
          <img className="rounded-3" src={`${import.meta.env.VITE_API}/obtenerimg/${receta.Imagenes[0]?.url_imagen}`} alt={`imagen de ${receta.descripcion}`} style={{width: "90%", maxWidth: "300px"}}/>       
          <Rating style={{maxWidth: 180}} value={rating} onChange={publicstaticvoid}/>
       </div>
      </div>  
      <div>
        <h3 className="text-center">{receta.porciones} Porciones</h3>
        <div>
            <div className="d-flex justify-content-center">
                <button onClick={AgregarLista} className="bg-red bg-red-hover p-2 text-white rounded-5 " style={{maxWidth: "20rem", width: "95%"}}>
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