import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>
    },
    {
      path: "login",
      element: <Login/>,
      
    },
    {
      path: "register",
      element: <Register/>
    }
  ]);