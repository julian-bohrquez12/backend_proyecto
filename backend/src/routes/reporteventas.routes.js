import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// 🔹 Obtener reporte de ventas COMPLETO
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        rv.Id_Venta,
        p.Nombre AS Producto,
        p.Precio,
        rv.Cantidad,
        rv.Fecha AS Fecha_Venta,
        mp.Nombre AS MetodoPago
      FROM Registro_Ventas rv
      JOIN Productos p ON rv.Id_Productos = p.Id_Productos
      JOIN Metodo_Pago mp ON rv.Id_Metodo = mp.Id_Metodo
      ORDER BY rv.Fecha DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo reporte de ventas" });
  }
});

export default router;
