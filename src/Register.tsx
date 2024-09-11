import { Link } from "react-router-dom"

const Register = () => {
  return (
    <>
      <div className="bg-red d-flex align-items-center p-4 text-white ">
          <Link to={"/login"} > {"<"} </Link>
          <h2 className="">Crea tu cuenta</h2>
      </div>
    </>
  )
}

export default Register