import express from "express";
import cors from "cors";
import reportesRoutes from "./routes/reportes.routes.js";

import reporteventasroutes from "./routes/reporteVentas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas

app.use("/api", reportesRoutes);

app.use("/usuarios", usuariosRoutes);
app.use("/reporteventas", reporteventasroutes);

// Ruta básica
app.get("/", (req, res) => {
  res.send("✅ Bienvenido a la API de Emprendly");
});

export default app;