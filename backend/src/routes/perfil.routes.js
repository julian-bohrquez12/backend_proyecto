import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// 🔹 Obtener perfil por usuario
router.get("/:usuario", async (req, res) => {
  const { usuario } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE Usuario = ?",
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


// 🔹 Editar perfil (PUT)
router.put("/:usuario", async (req, res) => {
  const { usuario } = req.params;
  const { nombre, apellido, correo } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE Usuarios SET Nombre=?, Apellido=?, Correo=? WHERE Usuario=?",
      [nombre, apellido, correo, usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
});


// 🔹 Eliminar cuenta (DELETE)
router.delete("/:usuario", async (req, res) => {
  const { usuario } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM Usuarios WHERE Usuario=?",
      [usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Cuenta eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar la cuenta" });
  }
});

export default router;
