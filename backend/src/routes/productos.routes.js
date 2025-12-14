import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Productos");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: err.message });
  }
});

// Agregar un producto
router.post("/", async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Productos (nombre, precio) VALUES (?, ?)",
      [nombre, precio]
    );
    res.json({ message: "Producto agregado", id: result.insertId });
  } catch (err) {
    console.error("Error al agregar producto:", err);
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    await pool.query(
      "UPDATE Productos SET nombre = ?, precio = ? WHERE id = ?",
      [nombre, precio, id]
    );
    res.json({ message: "Producto actualizado" });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
