import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaUtensils,
  FaDrumstickBite,
  FaMoon,
  FaCookieBite,
  FaCoffee,
  FaBreadSlice,
  FaFish,
  FaLeaf,
  FaBirthdayCake,
} from "react-icons/fa"; // Íconos de ejemplo
import { MdSoupKitchen } from "react-icons/md";
import api from "../libs/axios";

import Recetas from "../components/Recetas";

const Descubre = () => {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [filteredRecetas, setFilteredRecetas] = useState<any[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const { data } = await api(`/receta`);
        setRecetas(data);
        setFilteredRecetas(data); // Iniciar con todas las recetas
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      }
    };
    fetchRecetas();
  }, []);

  // Función para filtrar recetas por categoría
  const handleFilter = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
    if (categoria === "") {
      setFilteredRecetas(recetas); // Mostrar todas si no hay filtro
    } else {
      const recetasFiltradas = recetas.filter((receta) =>
        receta.TiposRecetas.some((tipoReceta) =>
          tipoReceta.Tipos.nombre
            .toLowerCase()
            .includes(categoria.toLowerCase())
        )
      );
      setFilteredRecetas(recetasFiltradas);
    }
  };

  // Estilo de los botones
  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "100px",
    backgroundColor: "#f8f9fa", // Fondo claro
    border: "none",
    display: "flex",
    flexDirection: "column", // Específico
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#343a40", // Texto oscuro
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Sombra
  };

  return (
    <>
      <h1 className="px-5 py-4">Categorías</h1>

      <section className="bg-green text-white my-2 mx-5 py-2 px-4 rounded-3 d-flex flex-sm-row flex-column align-items-center justify-content-evenly">
        <h2>Elige una categoría</h2>
      </section>

      <Container className="">
        {/* Fila superior con 4 botones */}
        <Row className="d-flex justify-content-evenly gap-2 my-4">
          <Col xs={5} md={2}>
            <button
              style={buttonStyle}
              onClick={() => handleFilter("desayuno")}
            >
              <FaUtensils size={40} />
              Desayunos
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button
              style={buttonStyle}
              onClick={() => handleFilter("almuerzo")}
            >
              <FaDrumstickBite size={40} />
              Almuerzos
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle} onClick={() => handleFilter("cena")}>
              <FaMoon size={40} />
              Cenas
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button
              style={buttonStyle}
              onClick={() => handleFilter("meriendas")}
            >
              <FaCookieBite size={40} />
              Meriendas
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle} onClick={() => handleFilter("bebida")}>
              <FaCoffee size={40} />
              Bebida
            </button>
          </Col>
        </Row>

        {/* Fila inferior con 6 botones */}
        <Row className="d-flex justify-content-evenly gap-2 my-4">
          <Col xs={5} md={2}>
            <button
              style={buttonStyle}
              onClick={() => handleFilter("sandwiches")}
            >
              <FaBreadSlice size={40} />
              Sandwiches
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle} onClick={() => handleFilter("sopa")}>
              <MdSoupKitchen size={40} />
              Sopa
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle} onClick={() => handleFilter("carnes")}>
              <FaFish size={40} />
              Carnes
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button
              style={buttonStyle}
              onClick={() => handleFilter("vegetarianos")}
            >
              <FaLeaf size={40} />
              Vegetarianos
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button
              style={buttonStyle}
              onClick={() => handleFilter("panaderia")}
            >
              <FaBirthdayCake size={40} />
              Panadería
            </button>
          </Col>
        </Row>
      </Container>
      <main>
        <div className="my-2 p-5">
          {filteredRecetas.length > 0 ? (
            filteredRecetas.map((receta) => (
              <Recetas
                key={receta.id_receta}
                id_receta={receta.id_receta}
                creador={receta.Usuarios.nombre}
                descripcion={receta.descripcion}
                calificacion={receta.calificacion}
                porciones={receta.porciones}
                resenas={receta.promedioResenas}
                cresenas={receta.cantidadResenas}
                vistas={receta.vistas}
                tiempo={receta.tiempo_preparacion}
                url={
                  receta.Imagenes.length > 0
                    ? receta.Imagenes[0].url_imagen
                    : "default.jpg"
                }
              />
            ))
          ) : (
            <p>No hay recetas disponibles</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Descubre;
