import { AxiosError, AxiosResponse } from "axios";
// Asegúrate de importar el cliente axios configurado con el interceptor

import api from "../libs/axios";

export const obtenerRecetasUser = async (id: number) => {
  try {
    const respuesta: AxiosResponse = await api.get(`/recetauser/${id}`);
    return respuesta.data;
  } catch (error: AxiosError | any) {
    throw new Error("Error" + error);
  }
};

export const obtenerTags = async () => {
  try {
    const respuesta: AxiosResponse = await api.get(`/gettags`);
    return respuesta.data;
  } catch (error: AxiosError | any) {
    throw new Error("Error");
  }
};

export const crearReceta = async (receta: any) => {
  try {
    const respuesta: AxiosResponse = await api.post(`/createreceta`, receta);
    return respuesta.data;
  } catch (error: AxiosError | any) {
    throw new Error("Error" + error);
  }
};

export const CrearImagen = async (imagen: File, id_receta: number) => {
  try {
    const formData = new FormData();
    formData.append("imagenes", imagen);
    const respuesta: AxiosResponse = await api.post(
      `/subir/${id_receta}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return respuesta;
  } catch (error: AxiosError | any) {
    throw new Error("Error" + error);
  }
};

export const getReceta = async(iduser: number, idReceta: number) => {
  try {
    const respuesta: AxiosResponse = await api.get(`/recetadetalle/${iduser}/${idReceta}`);
    return respuesta.data;
  } catch (error: AxiosError | any) {
    throw new Error("Error" + error);
  }
}

export const Calificar = async(resena: any) => {
  try {
    const respuesta: AxiosResponse = await api.post(`/resena`, resena);
    return respuesta;
  } catch (error: AxiosError | any) {
    throw new Error("Error" + error);
  }
}

export const Denunciar = async({id, id_usuario}: {id:number, id_usuario: number}) => {
  try {
    const respuesta: AxiosResponse = await api.post(`/receta/${id}/denunciar`, {id_usuario});
    return respuesta;
  } catch (error: AxiosError | any) {
    console.log(error)
    throw new Error("Error" + error);
  }
}

export const editarReceta = async (receta: any, id: number) => {
  try {
    const respuesta: AxiosResponse = await api.put(`/updatereceta/${id}`, receta);
    return respuesta.data;
  } catch (error: AxiosError | any) {
    console.log(error)
    throw new Error("Error" + error);
  }
};