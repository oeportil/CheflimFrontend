import React ,{useRef} from "react"
import { Form } from "react-bootstrap"
import { toast } from "react-toastify"
import { changePass, userData } from "../../../controller/UserController"

const EditPassword = () => {
    const formRef = useRef<HTMLFormElement>(null); 

const cambiarContrasena = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const oldpassword = formData.get("oldpassword")
    const newpassword = formData.get("newpassword")
    const repeatpasword = formData.get("repeatpasword")

    if (!oldpassword || !newpassword || !repeatpasword) {
        toast.warning("Por favor, completa todos los campos.");
        return;
    }

    if(newpassword != repeatpasword){
        toast.warning("Las contraseñas deben de ser iguales")
        return
    }
    const changePassword = {
        oldpassword,
        newpassword
    }
    try {
        await changePass(changePassword, userData().id_usuario);
        toast.success("Se cambio con exito la contraseña")
        formRef.current?.reset()
    } catch (error) {
        toast.error(`${error}`)
    }
}
  return (
   <div style={{width: "90%"}} className="mx-auto my-4">
        <h2>Cambio de Contraseña</h2>
         <Form ref={formRef} onSubmit={cambiarContrasena}>
            <Form.Group>
                <Form.Label>Ingresa tu contraseña Actual</Form.Label>
                <Form.Control type="password" name="oldpassword" required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ingresa tu contraseña Nueva</Form.Label>
                <Form.Control type="password" name="newpassword" required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Repite tu contraseña Nueva</Form.Label>
                <Form.Control type="password" name="repeatpasword" required/>
            </Form.Group>
            <button type="submit" className="bg-red bg-red-hover py-2 my-2 rounded-5 text-white px-5">
                Guardar Cambios
            </button>
        </Form>    
   </div>
  )
}

export default EditPassword