import { AxiosError, AxiosResponse } from "axios";
import api from "../libs/axios";
import { userData } from "./UserController";

export const obtenerLista = async () => {
  try {
    const respuesta: AxiosResponse = await api.get(
      `/obtenerlista/${userData().id_usuario}`
    );
    return respuesta;
  } catch (error: AxiosError | any) {
    console.log(error);
    throw new Error(error);
  }
};

export const addList = async (obj: any) => {
  try {
    const respuesta: AxiosResponse = await api.post(`/anadirlista`, obj);
    return respuesta;
  } catch (error: AxiosError | any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DeleteListItem = async (id: number) => {
  try {
    const respuesta: AxiosResponse = await api.delete(`/eliminaritem/${id}`);
    return respuesta;
  } catch (error: AxiosError | any) {
    console.log(error);
    throw new Error(error);
  }
};

export const filtrarLista = async (nombre: string) => {
  try {
    const respuesta: AxiosResponse = await api.get(
      `/obtenerlista/${userData().id_usuario}?nombre=${nombre}`
    );
    return respuesta;
  } catch (error: AxiosError | any) {
    console.log(error);
    throw new Error(error);
  }
};
