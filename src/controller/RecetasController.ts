import axios, { AxiosError } from "axios";
import { authHeader } from "./UserController";

const api = import.meta.env.VITE_API;

export const obtenerRecetasUser = async(id: number) =>{
    try {
        const respuesta = await axios.get(`${api}/recetauser/${id}`, {headers: authHeader()});
        console.log(respuesta)
        return respuesta
    } catch (error:  AxiosError | any) {
            throw new Error(error.response.data.error)
    }
}