import express from "express";
import pool from "../db.js";

const router = express.Router();

// 🔹 Obtener un perfil por usuario
router.get("/:usuario", async (req, res) => {
  const { usuario } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Perfil WHERE Usuario = ?",
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// 🔹 Editar perfil
router.post("/editar", async (req, res) => {
  const { nombre, apellido, correo, usuario } = req.body;

  try {
    await pool.query(
      "UPDATE Perfil SET Nombre=?, Apellido=?, Correo=? WHERE Usuario=?",
      [nombre, apellido, correo, usuario]
    );

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
});

// 🔹 Eliminar cuenta
router.delete("/eliminar", async (req, res) => {
  const { usuario } = req.body;

  try {
    await pool.query("DELETE FROM Perfil WHERE Usuario=?", [usuario]);

    res.json({ message: "Cuenta eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar la cuenta" });
  }
});

export default router;
