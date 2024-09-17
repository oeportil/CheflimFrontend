import { Form } from "react-bootstrap"

const Lista = () => {
  return (
    <main className="container mx-auto">
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-sm-row flex-column align-items-center justify-content-between">
        <div>
          <h3>Lista de Ingredientes</h3>
          <Form.Control type="text" placeholder="Buscar ingrediente" style={{width: "100%"}}/>
        </div>
      </div>
    </main>
  )
}

export default Lista