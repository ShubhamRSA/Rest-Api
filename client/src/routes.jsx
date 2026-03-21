import { Navigate } from "react-router-dom";
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
    path: "/persons",
    element: <PersonPage />,
  },
  {
    path: "/person/:personId",
    element: <PersonDetailPage />,
  },
  {
    path: "/cars",
    element: <CarPage />,
  },
  {
    path: "/car/:carId",
    element: <CarDetailPage />,
  },
];
