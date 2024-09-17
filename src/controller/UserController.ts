import axios, { AxiosError, AxiosResponse } from "axios";
import { SafeParseSuccess } from "zod";
import { IUser } from "../libs/types";
import apiAxios from "../libs/axios";

const api = import.meta.env.VITE_API;

type User = SafeParseSuccess<{
    correo: string;
    contrasena: string;
}> 
export const login = async(user: User) =>{
    try {
        const resultado = await axios.post(`${api}/login`, user.data)
        console.log(resultado)
        if(resultado.status == 200){
            localStorage.setItem(
                "userSession",
                JSON.stringify(resultado.data)
              );
              return resultado.status
        }
    } catch (error: AxiosError | any) {
        throw new Error(error.response.data.error);
    }
}

export function userData(): IUser
{
    return JSON.parse(localStorage.getItem("userSession")!)
}

export function authHeader() {
    return {
          authorization: 'Bearer ' + userData().token.toString()
        }
}

export function Logout() {
    localStorage.removeItem("userSession")
}

export const changePass = async(pass: any, id:number) =>{
    try {
        const respuesta: AxiosResponse = await apiAxios.patch(`/changepass/${id}`, pass);
        return respuesta;
      } catch (error: AxiosError | any) {
        throw new Error(error.response.data.error);
      }
}

export const changeInfo = async(pass: any) =>{
    try {
        const respuesta: AxiosResponse = await apiAxios.patch(`/edituser/${userData().id_usuario}`, pass);
        return respuesta;
      } catch (error: AxiosError | any) {
        throw new Error(error.response.data.error);
      }
}