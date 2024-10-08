import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Inicio from "./privateRoutes/Inicio";
import Lista from "./privateRoutes/Lista";
import Descubre from "./privateRoutes/Descubre";
import Perfil from "./privateRoutes/Perfil";
import MisRecetas from "./privateRoutes/PerfilSections/MisRecetas";
import Favoritos from "./privateRoutes/PerfilSections/Favoritos";
import Datos from "./privateRoutes/PerfilSections/Datos";
import Receta from "./privateRoutes/Receta";
import CrearReceta from "./privateRoutes/CrearReceta";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Inicio />,
          },
          {
            path: "list",
            element: <Lista />,
          },
          {
            path: "discover",
            element: <Descubre />,
          },
          {
            path: "recipe/:recipe",
            element: <Receta />,
          },
          {
            path: "user",
            element: <Perfil />,
            children: [
              { index: true, element: <MisRecetas /> },
              { path: "favs", element: <Favoritos /> },
              { path: "datos", element: <Datos /> },
            ],
          },
          {
            path: "crear-receta",
            element: <CrearReceta />,
          },
          {
            path: "editar-receta/:id",
            element: <CrearReceta />,
          }
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
]);
