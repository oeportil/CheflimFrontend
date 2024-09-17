type EditUserInfoFormProps = {
  setEditUserInfoModal: (value: boolean) => void;
};
function EditUserInfoForm({ setEditUserInfoModal }: EditUserInfoFormProps) {
  return (
    <>
      <h2 className="text-center mt-4">EDITA TUS DATOS</h2>
      <form className="p-5 pt-0">
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre</label>
          <input type="text" className="form-control" name="nombre" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Nickname</label>
          <input type="text" className="form-control" name="usuario" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Correo</label>
          <input type="email" className="form-control" name="correo" />
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="bg-green text-white py-2 w-100 rounded-5 fw-bold"
          >
            Confirmar
          </button>
          <button
            type="button"
            className="bg-red text-white py-2 w-100 rounded-5 fw-bold"
            onClick={() => setEditUserInfoModal(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default EditUserInfoForm;
