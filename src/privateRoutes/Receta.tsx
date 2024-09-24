import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { useEffect, useState } from "react";

//For ratings
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { useNavigate, useParams } from "react-router-dom";
import { IReceta } from "../libs/types";
import {
  Calificar,
  Denunciar,
  getReceta,
} from "../controller/RecetasController";
import { userData } from "../controller/UserController";
import { toast } from "react-toastify";

//para indicar que es favorito
import { FaBookmark } from "react-icons/fa";
import { AddFav } from "../controller/FavsController";
import { addList } from "../controller/ListaController";

//Icono de la concha de la lora
import { MdBlockFlipped } from "react-icons/md";
import Swal from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";
import { HiSpeakerphone } from "react-icons/hi";
import api from "../libs/axios";
import { CommentSchema } from "../libs/Schemas";

const Receta = () => {
  const navigate = useNavigate();
  const { recipe } = useParams();
  const [validarCambios, setValidarCambios] = useState<number>(0);
  const [receta, setReceta] = useState<IReceta>({
    descripcion: "",
    Ingredientes: [],
    isFavorito: false,
    Pasos: [],
    Comentarios: [],
    porciones: 0,
    tiempo: 0,
    userResena: 0,
    Usuarios: { nombre: "" },
    Imagenes: "",
    id_receta: 0,
    denunciado: false,
    video: "",
  });
  useEffect(() => {
    setValidarCambios(validarCambios + 1);
  }, []);
  useEffect(() => {
    const tenerreceta = async () => {
      const rect = await getReceta(userData().id_usuario, parseInt(recipe!));
      await setReceta(rect);
      await setRating(rect.userResena);
    };
    tenerreceta();
  }, [validarCambios]);
  const [rating, setRating] = useState<number>(0);

  const publicstaticvoid = async (e: number) => {
    try {
      const resena = {
        id_usuario: userData().id_usuario,
        id_receta: parseInt(recipe!),
        valor: e,
      };
      const respuesta = await Calificar(resena);
      if (respuesta.status == 200) {
        setRating(e);
        setValidarCambios(validarCambios + 1);
        toast.success("Calificado con exito");
      }
      setValidarCambios(validarCambios + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const AgregaroEliminar = async () => {
    const obj = {
      idUsuario: userData().id_usuario,
      idReceta: receta.id_receta,
    };
    try {
      const resultado = await AddFav(obj);
      toast.success(resultado.data.mensaje);
    } catch (error) {
      toast.error(`${error}`);
    }
    setReceta({ ...receta, isFavorito: !receta.isFavorito });
    setValidarCambios(validarCambios + 1);
  };
  const AgregarLista = async () => {
    const obj = {
      id_usuario: userData().id_usuario,
      id_receta: receta.id_receta,
    };
    try {
      const respuesta = await addList(obj);
      if (respuesta.status != 200) {
        throw new Error(respuesta.data.error!);
      }
      toast.success("Se añadieron a la lista correctamente");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const ToggleDenuncia = () => {
    if (!receta.denunciado) {
      Swal.fire({
        title: "Deseas Denunciar esta Receta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          DenunciarFun();
        }
      });
    } else {
      DenunciarFun();
    }
    setValidarCambios(validarCambios + 1);
  };

  async function DenunciarFun() {
    try {
      const resultado = await Denunciar({
        id: receta.id_receta!,
        id_usuario: userData().id_usuario,
      });
      if (resultado.status != 200) {
        throw new Error("Error al hacer la denuncia");
      }
      setReceta({ ...receta, denunciado: !receta.denunciado });
      toast.success(resultado.data.mensaje);
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  const SendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formFata = new FormData(e.currentTarget);
    const comment = formFata.get("comment");
    if (!comment) {
      toast.error("Debes ingresar un comentario");
      return;
    }
    const commentObj = {
      comentario: comment,
      id_usuario: userData().id_usuario,
    };
    const commentData = CommentSchema.safeParse(commentObj);
    try {
      const postComment = await api.post(
        `${import.meta.env.VITE_API}/receta/${receta.id_receta!}/comentario`,
        commentData.data
      );
      if (postComment.status === 202) {
        toast.success(postComment.data.message);
        setValidarCambios(validarCambios + 1);
        return;
      } else {
        toast.success("Se publicó tu comentario");
        setValidarCambios(validarCambios + 1);
        return;
      }
    } catch (error) {
      toast.error("Ocurrió una tragedia...");
      setValidarCambios(validarCambios + 1);
      console.error(error);
    }
  };

  return (
    <main className="container">
      <div
        className="text-start mt-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={30} />
      </div>
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 ">
        <div className="d-flex justify-content-between my-2">
          <MdBlockFlipped
            size={35}
            onClick={ToggleDenuncia}
            className={`${receta.denunciado ? "text-red" : "text-black-50"}`}
            style={{ cursor: "pointer" }}
          />
          <FaBookmark
            size={35}
            className={`${receta.isFavorito ? "text-musto" : "text-black-50"}`}
            onClick={AgregaroEliminar}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="mx-auto text-center">
          <h3>{receta.descripcion}</h3>
          <h5>{receta.Usuarios.nombre}</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <img
            className="rounded-3"
            src={`${import.meta.env.VITE_API}/obtenerimg/${
              receta.Imagenes[0]?.url_imagen
            }`}
            alt={`imagen de ${receta.descripcion}`}
            style={{ width: "90%", maxWidth: "300px" }}
          />
          {receta.video && (
            <a href={receta.video} className="my-2 text-white">
              Ver Video de Ejemplo
            </a>
          )}
          <Rating
            style={{ maxWidth: 180 }}
            value={rating}
            onChange={publicstaticvoid}
          />
        </div>
      </div>
      <section>
        <h3 className="text-center">{receta.porciones} Porciones</h3>
        <div>
          <div className="d-flex justify-content-center">
            <button
              onClick={AgregarLista}
              className="bg-red bg-red-hover p-2 text-white rounded-5 "
              style={{ maxWidth: "20rem", width: "95%" }}
            >
              Agregar a la Lista
            </button>
          </div>
          <h4>Ingredientes: </h4>
          <ul className="styled-list scrollable-list">
            {receta.Ingredientes.map((i, k) => (
              <li className="list-item" key={k}>
                {i.ingrediente}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Instrucciones: </h4>
          <ol className="styled-list scrollable-list">
            {receta.Pasos.map((p, k) => (
              <li key={k} className="list-item">
                {p.paso}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section>
        <h2 className="text-center my-4">¿Qué te parecio la receta?</h2>
        <Form
          className="row bg-white rounded-1 py-3 mx-0 mx-md-3"
          onSubmit={SendComment}
        >
          <Form.Group className="mb-3 col-12 col-md-7">
            <Form.Label htmlFor="coment" className="fw-semibold text-muted">
              Deja un comentario sobre ella
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <HiSpeakerphone className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                id="coment"
                as="textarea"
                placeholder="Esta receta es una..."
                style={{ minHeight: "100px", maxHeight: "200px" }}
                name="comment"
                className="border-start-0"
              />
            </InputGroup>
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center col-12 col-md-4 mt-3 mt-md-0">
            <button
              type="submit"
              className="bg-red bg-red-hover p-2 text-white rounded-5 w-100"
            >
              Comentar
            </button>
          </div>
        </Form>
      </section>
      <section>
        <h2 className="text-center my-3">Otros comentarios</h2>
        <ul className="list-group mb-5">
          {receta.Comentarios.length > 0 ? (
            receta.Comentarios.map((comentario, index) => (
              <li className="list-group-item" key={index}>
                <p>{comentario.comentario}</p>
                <small>
                  Por <strong>{comentario.Usuarios?.usuario}</strong> el{" "}
                  {new Date(comentario.fecha).toLocaleDateString()}
                </small>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center bg-light p-4">
              <FaRegComment size={24} className="mb-2 text-secondary" />
              <span className="d-block text-muted font-weight-bold">
                Aún no hay comentarios... ¡Puedes ser el primero!
              </span>
            </li>
          )}
        </ul>
      </section>
    </main>
  );
};

export default Receta;
