import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rutas
import reporteventasRoutes from "./routes/reporteventas.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";
import ajustesRoutes from "./routes/ajustes.routes.js";
import metodopagoRoutes from "./routes/metodopago.routes.js";
import productosRoutes from "./routes/productos.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Rutas
app.use("/api/reporteventas", reporteventasRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/ajustes", ajustesRoutes);
app.use("/api/metodopago", metodopagoRoutes);
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
