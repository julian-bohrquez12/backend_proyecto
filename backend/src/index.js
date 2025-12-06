import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reporteventasRoutes from "./routes/reporteVentas.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Rutas REALES
app.use("/api/reporteventas", reporteventasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
