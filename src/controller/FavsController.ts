import { AxiosError, AxiosResponse } from "axios";
import api from "../libs/axios";
import { userData } from "./UserController";



export const obtenerFavs = async () => {
    try {
      const respuesta: AxiosResponse = await api.get(`/obtenerfav/${userData().id_usuario}`);
      return respuesta.data;
    } catch (error: AxiosError | any) {
      throw new Error(`${error}`);
    }
  };
  