import axios, { AxiosError, AxiosResponse } from "axios";
import { authHeader } from "./UserController";

const api = import.meta.env.VITE_API;

export const obtenerRecetasUser = async(id: number) =>{
    try {
        const respuesta: AxiosResponse = await axios.get(`${api}/recetauser/${id}`, {headers: authHeader()});
        console.log(respuesta)
        return respuesta.data
    } catch (error:  AxiosError | any) {
            throw new Error("Error"+error)
    }
}

export const obtenerTags = async() =>{
    try {
        const respuesta: AxiosResponse = await axios.get(`${api}/gettags`);
        return respuesta.data
    } catch (error:  AxiosError | any) {
            throw new Error("Error")
    }
}

export const crearReceta = async(receta: any) =>{
    try {
        const respuesta: AxiosResponse = await axios.post(`${api}/createreceta`, receta, {headers: authHeader()})
        return respuesta.data
    } catch (error:  AxiosError | any) {
        throw new Error("Error"+error)
    }
}

export const CrearImagen = async(imagen: File, id_receta: number) => {
    try {
        const formData = new FormData();
        formData.append('imagenes', imagen); 
        const respuesta: AxiosResponse = await axios.post(`${api}/subir/${id_receta}`, formData, 
            {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'multipart/form-data',
                },
            })
        return respuesta;
    } catch (error:  AxiosError | any) {
        throw new Error("Error"+error)
    }
}