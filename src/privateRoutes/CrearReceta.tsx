import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Paso } from "../libs/types";
import {Reorder} from 'framer-motion'


const CrearReceta = () => {
    const navigate = useNavigate();
    const [Ingredientes, setIngredientes] = useState<Array<string>>([]);
    const [Pasos, setPasos] = useState<Array<Paso>>([]);
    const [titulo, setTitulo] = useState<string>("");

    const AgregarIngrediente = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const i = formData.get("ingrediente")!
        if(!i) return
        setIngredientes([...Ingredientes, i.toString()])
        e.currentTarget.reset();
    }
    const DeleteIngrediente = (ingrediente: string) => {
        const nuevosIngredientes = Ingredientes.filter((i) => 
            i != ingrediente
        )
        setIngredientes(nuevosIngredientes);
    }

    const AgregarPaso = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const paso = new FormData(e.currentTarget);
        if(!paso.get("paso")) return
        const nuevoPaso: Paso = {
            paso: paso.get("paso")!.toString(),
            orden: Pasos.length + 1
        }
        setPasos([...Pasos, nuevoPaso]);
        e.currentTarget.reset();
    }

    const cambiarOrden = (nuevosPasos: Array<Paso>) => {       
        const pasosActualizados = nuevosPasos.map((paso, index) => ({
            ...paso,
            orden: index + 1 
        }));
        console.log(pasosActualizados)
        setPasos(pasosActualizados);
    }

    const DeletePaso = (orden: number) => {
        const nuevosPasos = Pasos.filter((p) => p.orden !== orden);
        setPasos(nuevosPasos);
    }
    const CrearReceta = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    }

  return (
    <main className="container">
        <div className="text-start mt-2" style={{cursor: "pointer"}} onClick={() => navigate(-1)}>
            <FaArrowLeft size={30}/>
        </div>
        <div className="bg-green text-white my-2 py-3 px-4 rounded-3">
            <h2>Crear Receta</h2>
            <input type="text" className="form-control" placeholder="juja" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
        </div> 
        <div>
            <h4>Lista de Ingredientes</h4>
            <Form onSubmit={AgregarIngrediente} className="d-md-flex gap-2 my-2">
                <Form.Control type="text" name="ingrediente" />
                <button type="submit" className="bg-red bg-red-hover py-2 px-4 text-white  my-2 rounded-5">
                    Agregar
                </button>
            </Form>
            <ul>
                {Ingredientes.map((ingrediente, i) =>(
                    <li key={i} className="d-flex justify-content-between my-2 ">
                        <p>{ingrediente}</p>
                        <button className="btn btn-danger" onClick={() => DeleteIngrediente(ingrediente)}>Elminar</button>
                    </li>
                ))}
            </ul>

            <h4>Pasos de Preparacion</h4>
            <Form onSubmit={AgregarPaso} className="d-md-flex gap-2 my-2">
                <Form.Control type="text" name="paso" />
                <button type="submit" className="bg-red bg-red-hover py-2 px-4 text-white  my-2 rounded-5">
                    Agregar
                </button>
            </Form>
        
            <Reorder.Group axis="y" values={Pasos} onReorder={cambiarOrden}>
            {Pasos.map((paso) =>(
                <Reorder.Item key={paso.orden} value={paso} className="d-flex align-items-center justify-content-between my-2 bg-white p-4 rounded-3 " style={{cursor: "move"}}>
                    {paso.paso}
                    <button className="btn btn-danger" onClick={() => DeletePaso(paso.orden)}>Eliminar</button>
                </Reorder.Item>
            
            ))}
            </Reorder.Group>

            <h4>Informacion Adicional</h4>
            <Form onSubmit={CrearReceta}>
                <Form.Control type="file" name="img"/>
                <Form.Group className="mt-2">
                    <Form.Label>Link de video(Opcional)</Form.Label>
                    <Form.Control type="text" name="link"/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Porciones</Form.Label>
                    <Form.Control type="number" name="porciones"/>
                </Form.Group>
               <div className="d-flex justify-content-center ">
                    <button type="submit" className="bg-red bg-red-hover py-2 px-4 text-white  my-2 rounded-5" style={{width:"100%", maxWidth:"300px"}}>
                        Crear y Publicar
                    </button>
               </div>
            </Form>
        </div>
    </main>
  )
}

export default CrearReceta