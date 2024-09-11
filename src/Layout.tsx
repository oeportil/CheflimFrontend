import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";

interface IUser {

}

export default function Layout() {
  const[user, setUser] = useState<IUser>({});
  const[auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")!))
      setAuth(true)
    }
  }, [])

  return auth ? (
    <>
    <Header/>
    <Footer/>
    </>
  ) : (
    <Navigate to={"/login"}/>
  )
}
