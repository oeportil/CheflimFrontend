import axios from "axios";
import { IUser } from "./types";

// Crea un cliente de axios con una URL base
const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// --INTERCEPTORS-- REQUEST: Antes de la solicitud
api.interceptors.request.use((config) => {
  // Recuperar la cadena almacenada en localStorage y convertirla a un objeto
  const storedUserData = localStorage.getItem("userSession");

  // Manejar el caso en el que no haya datos en localStorage
  if (storedUserData) {
    try {
      // Parsear el objeto JSON a un objeto tipado IUser
      const userData: IUser = JSON.parse(storedUserData);

      // Si el objeto tiene el token, agregarlo a los headers
      const JWtoken = userData.token;
      if (JWtoken) {
        config.headers.Authorization = `Bearer ${JWtoken}`;
      }
    } catch (error) {
      console.error("Error parsing userSession from localStorage:", error);
    }
  }

  return config;
});

export default api;
