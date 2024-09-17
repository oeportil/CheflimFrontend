import { toast } from "react-toastify";
import { IUser } from "../../../libs/types";
import { changeInfo } from "../../../controller/UserController";

type Props = {
  user: IUser
  setUser: (user: IUser | "") => void
}

function EditUserInfoForm({user, setUser}: Props) {
  const CambiarDatos = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user)
    const {correo, nombre, usuario} = user
    if(!correo || !nombre || !usuario){
      toast.warning("Faltan campos que llenar")
    }
    const newUser = { correo, nombre, usuario }
    try {
      await changeInfo(newUser)
      toast.success("Los Cambios han sido guardados, veras estos cuando vuelvas a iniciar sesión")
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <>
      <h2 className="text-center mt-4">Edita tus Datos</h2>
      <form className="p-5 pt-0" onSubmit={CambiarDatos}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre</label>
          <input required type="text" className="form-control" name="nombre" 
          value={user.nombre} onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}/>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Nickname</label>
          <input required type="text" className="form-control" name="usuario" 
          value={user.usuario} onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}/>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Correo</label>
          <input required type="email" className="form-control" name="correo" 
          value={user.correo} onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}/>
        </div>
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="bg-green text-white py-2 w-100 rounded-5 fw-bold border-0"
          >
            Confirmar
          </button>
        </div>
      </form>
    </>
  );
}

export default EditUserInfoForm;
