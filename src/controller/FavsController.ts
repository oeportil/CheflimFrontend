import { AxiosError, AxiosResponse } from "axios";
import api from "../libs/axios";
import { userData } from "./UserController";



export const obtenerFavs = async () => {
    try {
      const respuesta: AxiosResponse = await api.get(`/recetafav/${userData().id_usuario}`);
      return respuesta.data;
    } catch (error: AxiosError | any) {
      throw new Error(`${error}`);
    }
  };

  export const AddFav = async(obj: any) => {
    try {
      const respuesta: AxiosResponse = await api.post(`/addfav`, obj);
      return respuesta;
    } catch (error: AxiosError | any) {
      throw new Error("Error" + error);
    }
  }