export type Paso = {
  paso: string;
  orden: number;
};

export type Receta = {
  id_receta: number;
  cantidadResenas: number;
  porciones: number;
  tiempo: number;
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
