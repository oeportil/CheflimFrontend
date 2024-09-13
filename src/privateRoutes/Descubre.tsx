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
  FaSearch,
} from "react-icons/fa"; // Íconos de ejemplo
import { MdSoupKitchen } from "react-icons/md";

const Descubre = () => {
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
        <h2>Busca una categoría</h2>
        <div className="d-flex justify-content-center gap-5 ">
          <input type="text" className="rounded-1 border-0" />
          <FaSearch size={30} />
        </div>
      </section>

      <Container className="">
        {/* Fila superior con 4 botones */}
        <Row className="d-flex justify-content-evenly gap-2 my-4">
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaUtensils size={40} />
              Desayunos
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaDrumstickBite size={40} />
              Almuerzos
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaMoon size={40} />
              Cenas
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaCookieBite size={40} />
              Meriendas
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaCoffee size={40} />
              Bebida
            </button>
          </Col>
        </Row>

        {/* Fila inferior con 6 botones */}
        <Row className="d-flex justify-content-evenly gap-2 my-4">
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaBreadSlice size={40} />
              Sandwiches
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <MdSoupKitchen size={40} />
              Sopa
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaFish size={40} />
              Carnes
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaLeaf size={40} />
              Vegetarianos
            </button>
          </Col>
          <Col xs={5} md={2}>
            <button style={buttonStyle}>
              <FaBirthdayCake size={40} />
              Panadería
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Descubre;
