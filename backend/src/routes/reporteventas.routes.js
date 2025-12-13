import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// 🔹 Obtener todas las ventas con producto y método de pago
router.get("/", (req, res) => {
  const query = `
    SELECT v.id, v.monto, v.fecha, 
           p.nombre AS producto, 
           m.nombre AS metodo_pago
    FROM ventas v
    JOIN productos p ON v.producto_id = p.id
    JOIN metodos_pago m ON v.metodo_pago_id = m.id
    ORDER BY v.fecha DESC
  `;
  pool.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 🔹 Obtener ventas por método de pago
router.get("/metodo/:id", (req, res) => {
  const metodoId = req.params.id;
  const query = `
    SELECT v.id, v.monto, v.fecha, 
           p.nombre AS Nombre, 
           p.precio AS Precio
    FROM ventas v
    JOIN productos p ON v.producto_id = p.id
    WHERE v.metodo_pago_id = ?
    ORDER BY v.fecha DESC
  `;
  pool.query(query, [metodoId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

export default router;
