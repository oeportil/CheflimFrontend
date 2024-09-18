import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { DeleteListItem, filtrarLista, obtenerLista } from "../controller/ListaController"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

type Lista = {
  id_lista: number
  id_usuario: number
  item: string
}

const Lista = () => {
  const [lista, setLista] = useState<Array<Lista>>([])

  useEffect(() => {
      const getLista = async()=> {
       try {
        const respuesta = await obtenerLista();
        if(respuesta.status != 200){
            throw new Error(respuesta.data.error!);            
        }
        setLista(respuesta.data)
       } catch (error) {
          toast.error(`${error}`)
       }
      } 
      getLista()
  }, [])
  
  const BuscarItem = async(e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value)
      const nombre = e.target.value ?? "";
      try {
        const resultado = await filtrarLista(nombre)
        if(resultado.status != 200){
            throw new Error("Error inesperado");           
        }
        setLista(resultado.data)
      } catch (error) {
        toast.error(`${error}`)
      }
  }

  const EliminarItem = (id: number) => {
    Swal.fire({
      title: "Deseas Eliminar El item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await DeleteListItem(id);
          if(respuesta.status != 200){
              throw new Error(respuesta.data.error!);            
          }
          const adobe = await obtenerLista();
            if(adobe.status != 200){
                throw new Error(adobe.data.error!);            
            }
            setLista(adobe.data)
            toast.success("Se Elimino el item de la lista")
         } catch (error) {
            toast.error(`${error}`)
         }
        }
    }); 
  }

  return (
    <main className="container mx-auto">
      <div className="bg-green text-white my-2 py-3 px-4 rounded-3">
        <div>
          <h3>Lista de Ingredientes</h3>
          <Form.Control type="text" placeholder="Buscar ingrediente" style={{width: "100%"}} onChange={BuscarItem}/>
        </div>
      </div>
      <div>
        {lista.length != 0 ? lista.map((item, i) => (
          <div key={i} className="bg-white p-3 my-2 d-flex justify-content-between rounded-3 border-3 border-black ">
            <p>{item.item}</p>
            <button onClick={() => EliminarItem(item.id_lista)} className="bg-red bg-red-hover py-2 text-white rounded-5 px-4">
                Eliminar
            </button>
          </div>
        )):
          <div className="text-center text-black-50">
              <h3>Aun no hay Items en la Lista</h3>
          </div>
        }
      </div>
    </main>
  )
}

export default Lista