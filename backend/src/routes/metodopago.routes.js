import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  pool.query("SELECT * FROM metodos_pago", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { nombre } = req.body;
  pool.query("INSERT INTO metodos_pago (nombre) VALUES (?)", [nombre], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Método de pago agregado", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  pool.query("UPDATE metodos_pago SET nombre = ? WHERE id = ?", [nombre, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Método de pago actualizado" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM metodos_pago WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Método de pago eliminado" });
  });
});

export default router;
