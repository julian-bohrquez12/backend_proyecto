import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Obtener todos los métodos de pago
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Metodo_pago");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener métodos de pago:", err);
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo método de pago
router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Metodo_pago (nombre) VALUES (?)",
      [nombre]
    );
    res.json({ message: "Método de pago agregado", id: result.insertId });
  } catch (err) {
    console.error("Error al insertar método de pago:", err);
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un método de pago
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    await pool.query("UPDATE Metodo_pago SET nombre = ? WHERE id = ?", [
      nombre,
      id,
    ]);
    res.json({ message: "Método de pago actualizado" });
  } catch (err) {
    console.error("Error al actualizar método de pago:", err);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un método de pago
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM metodos_pago WHERE id = ?", [id]);
    res.json({ message: "Método de pago eliminado" });
  } catch (err) {
    console.error("Error al eliminar método de pago:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
