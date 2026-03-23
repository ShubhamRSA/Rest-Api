import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { PersonPage } from "./pages/PersonPage";
import { CarPage } from "./pages/CarPage";
import { PersonDetailPage } from "./pages/PersonDetailPage";
import { CarDetailPage } from "./pages/CarDetailPage";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/persons" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/persons",
    element: <ProtectedRoute element={<PersonPage />} />,
  },
  {
    path: "/person/:personId",
    element: <ProtectedRoute element={<PersonDetailPage />} />,
  },
  {
    path: "/cars",
    element: <ProtectedRoute element={<CarPage />} />,
  },
  {
    path: "/car/:carId",
    element: <ProtectedRoute element={<CarDetailPage />} />,
  },
];
