import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoutes";

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
      }
    ]
  }
]);

export default router;
