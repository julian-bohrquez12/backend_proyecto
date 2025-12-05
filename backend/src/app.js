import express from "express";
import cors from "cors";
import reporteventasroutes from "./routes/reporteVentas.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";
import ajustesRoutes from "./routes/ajustes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas válidas
app.use("/perfil", perfilRoutes);
app.use("/reporteventas", reporteventasroutes);
app.use("/ajustes", ajustesRoutes);

app.get("/", (req, res) => {
  res.send("✅ Bienvenido a la API de Emprendly");
});

export default app;
