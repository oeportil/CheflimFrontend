export type Paso = {
  paso: string;
  orden: number;
};

export type Receta = {
  id_receta: number;
  cantidadResenas: number;
  porciones: number;
  tiempo: number;
  calificacion: number;
  descripcion: string;
  Imagenes: any;
};

export interface IUser {
  id_usuario: number;
  correo: string;
  nombre: string;
  token: string;
  usuario: string;
}

export interface IReceta {
  descripcion: string;
  userResena: number;
  isFavorito: boolean;
  porciones: number;
  tiempo: number;
  Ingredientes: Array<{ ingrediente: string }>;
  Pasos: Array<{ paso: string }>;
  Usuarios: { nombre: string };
  Imagenes: any;
  id_receta?: number
}
