// ================================
//  IMPORTACIONES
// ================================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rutas
import reporteventasRoutes from "./routes/reporteVentas.routes.js";
import perfilRoutes from "./routes/perfil.routes.js";
import ajustesRoutes from "./routes/ajustes.routes.js";


// ================================
//  CONFIGURACIONES INICIALES
// ================================
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Permitir JSON


// ================================
//  RUTA PRINCIPAL DE PRUEBA
// ================================
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});


// ================================
//  RUTAS REALES
// ================================
app.use("/api/reporteventas", reporteventasRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/ajustes", ajustesRoutes);


// ================================
//  INICIO DEL SERVIDOR
// ================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
