import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Paso } from "../libs/types";
import { Reorder } from "framer-motion";
import {
  CrearImagen,
  crearReceta,
  obtenerTags,
} from "../controller/RecetasController";
import { toast } from "react-toastify";
import { userData } from "../controller/UserController";

const CrearReceta = () => {
  const navigate = useNavigate();
  const [Ingredientes, setIngredientes] = useState<Array<string>>([]);
  const [Pasos, setPasos] = useState<Array<Paso>>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [tags, setTags] = useState<Array<{ id_tipo: number; nombre: string }>>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<
    Array<{ id_tipo: number; nombre: string }>
  >([]);

  useEffect(() => {
    try {
      const llenarTags = async () => {
        const resultado = await obtenerTags();
        setTags(resultado);
      };
      llenarTags();
    } catch (error) {
      toast.error(`${error}`);
    }
  }, []);

  const AgregarIngrediente = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const i = formData.get("ingrediente")!;
    if (!i) return;
    setIngredientes([...Ingredientes, i.toString()]);
    e.currentTarget.reset();
  };
  const DeleteIngrediente = (ingrediente: string) => {
    const nuevosIngredientes = Ingredientes.filter((i) => i != ingrediente);
    setIngredientes(nuevosIngredientes);
  };

  const AgregarPaso = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const paso = new FormData(e.currentTarget);
    if (!paso.get("paso")) return;
    const nuevoPaso: Paso = {
      paso: paso.get("paso")!.toString(),
      orden: Pasos.length + 1,
    };
    setPasos([...Pasos, nuevoPaso]);
    e.currentTarget.reset();
  };

  const cambiarOrden = (nuevosPasos: Array<Paso>) => {
    const pasosActualizados = nuevosPasos.map((paso, index) => ({
      ...paso,
      orden: index + 1,
    }));
    setPasos(pasosActualizados);
  };

  const DeletePaso = (orden: number) => {
    const nuevosPasos = Pasos.filter((p) => p.orden !== orden);
    setPasos(nuevosPasos);
  };

  const CrearReceta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tagsId = selectedTags.map((tag) => tag.id_tipo);
    const formData = new FormData(e.currentTarget);

    const error: Array<string> = [];
    if (!titulo) error.push("El titulo debe de ser Obligatorio");
    if (formData.get("porciones")!.toString().length == 0)
      error.push("El numero de porciones es Obligatorio");
    if (formData.get("tiempo")!.toString().length == 0)
      error.push("El tiempo es Obligatorio");
    if (formData.get("img")!.name.length == 0)
      error.push("La Imagen es Obligatoria");
    if (Ingredientes.length == 0) error.push("Agrege almenos un Ingrediente");
    if (Pasos.length == 0) error.push("Agrege almenos un Paso");
    if (tagsId.length == 0) error.push("Agrege almenos un Tag");

    if (error.length != 0) {
      error.forEach((err) => toast.error(err));
      return;
    }

    const newReceta = {
      Ingredientes,
      Pasos,
      Tags: tagsId,
      id_usuario: userData().id_usuario,
      descripcion: titulo,
      porciones: parseInt(formData.get("porciones")!.toString()),
      tiempo: parseInt(formData.get("tiempo")!.toString()),
      video: formData.get("link") ?? "",
    };
    try {
      const idReceta = await crearReceta(newReceta);
      await CrearImagen(formData.get("img") as File, idReceta.id_receta);
      toast.success("Receta creada con exito");
      navigate(-1);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const AddTags = (e: React.ChangeEvent<HTMLSelectElement>) => {
    for (let index = 0; index < Object.keys(selectedTags).length; index++) {
      if (selectedTags[index].id_tipo === JSON.parse(e.target.value).id_tipo) {
        toast.error("No se pueden agregar tags existentes");
        return;
      }
    }
    setSelectedTags([...selectedTags, JSON.parse(e.target.value)]);
  };
  const eliminarTag = (i: number) => {
    const nuevosTags = selectedTags.filter((p) => p.id_tipo !== i);
    setSelectedTags(nuevosTags);
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
      <div className="bg-green text-white my-2 py-3 px-4 rounded-3">
        <h2>Crear Receta</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre Receta"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div>
        <h4>Lista de Ingredientes</h4>
        <Form onSubmit={AgregarIngrediente} className="d-md-flex gap-2 my-2">
          <Form.Control type="text" name="ingrediente" />
          <button
            type="submit"
            className="bg-red bg-red-hover py-2 px-4 text-white  my-2 rounded-5"
          >
            Agregar
          </button>
        </Form>
        <ul>
          {Ingredientes.map((ingrediente, i) => (
            <li key={i} className="d-flex justify-content-between my-2 ">
              <p>{ingrediente}</p>
              <button
                className="btn btn-danger"
                onClick={() => DeleteIngrediente(ingrediente)}
              >
                Elminar
              </button>
            </li>
          ))}
        </ul>

        <h4>Pasos de Preparacion</h4>
        <Form onSubmit={AgregarPaso} className="d-md-flex gap-2 my-2">
          <Form.Control type="text" name="paso" />
          <button
            type="submit"
            className="bg-red bg-red-hover py-2 px-4 text-white  my-2 rounded-5"
          >
            Agregar
          </button>
        </Form>

        <Reorder.Group axis="y" values={Pasos} onReorder={cambiarOrden}>
          {Pasos.map((paso) => (
            <Reorder.Item
              key={paso.orden}
              value={paso}
              className="d-flex align-items-center justify-content-between my-2 bg-white p-4 rounded-3 "
              style={{ cursor: "move" }}
            >
              {paso.paso}
              <button
                className="btn btn-danger"
                onClick={() => DeletePaso(paso.orden)}
              >
                Eliminar
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <h4>Informacion Adicional</h4>
        <Form onSubmit={CrearReceta}>
          <Form.Control type="file" name="img" />
          <Form.Group className="mt-2">
            <Form.Label>Link de video(Opcional)</Form.Label>
            <Form.Control type="text" name="link" accept="image/*" />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Porciones</Form.Label>
            <Form.Control type="number" name="porciones" />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Tiempo de preparacion (minutos)</Form.Label>
            <Form.Control type="number" name="tiempo" />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Tag</Form.Label>
            <Form.Select name="tag" onChange={AddTags}>
              <option disabled>--Selecciona un tag--</option>
              {tags.map((tag) => (
                <option key={tag.id_tipo} value={JSON.stringify(tag)}>
                  {tag.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div>
            {selectedTags.map((tag) => (
              <div
                key={tag.id_tipo}
                className="d-flex justify-content-between my-2"
              >
                <p> {tag.nombre}</p>
                <Button
                  variant="danger"
                  onClick={() => eliminarTag(tag.id_tipo)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center ">
            <button
              type="submit"
              className="bg-red bg-red-hover py-2 px-4 text-white  my-2 rounded-5"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              Crear y Publicar
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default CrearReceta;
