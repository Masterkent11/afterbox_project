// index.tsx
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import componentsRoutes from "./componentsRoutes";

const routes = [...authRoutes, ...componentsRoutes];

const router = createBrowserRouter(routes);

export default router;
