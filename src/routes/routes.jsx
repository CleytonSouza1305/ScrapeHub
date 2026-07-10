import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoutes";
import Update from "../pages/Update/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <LoginPage/>,
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        element: <Home/>,
        path: '/home'
      },
      {
        element: <Update/>,
        path: '/update/:id'
      }
    ]
  }
]);

export default router;
