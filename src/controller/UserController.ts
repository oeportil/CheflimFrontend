import axios, { AxiosError } from "axios";
import { SafeParseSuccess } from "zod";
import { IUser } from "../libs/types";

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
          Authorization: 'Bearer ' + userData().token.toString()
        }
}