import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";

interface IUser {

}

export default function Layout() {
  const[user, setUser] = useState<IUser>({});
  const[auth, setAuth] = useState<boolean>(true);

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")!))
      setAuth(true)
    }
  }, [])

  return auth ? (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  ) : (
    <Navigate to={"/login"}/>
  )
}
