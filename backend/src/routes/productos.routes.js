import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", (req, res) => {
  pool.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Agregar un producto
router.post("/", (req, res) => {
  const { nombre, precio } = req.body;
  pool.query(
    "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
    [nombre, precio],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Producto agregado", id: result.insertId });
    }
  );
});

// Actualizar un producto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  pool.query(
    "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
    [nombre, precio, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Producto actualizado" });
    }
  );
});

// Eliminar un producto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Producto eliminado" });
  });
});

export default router;
