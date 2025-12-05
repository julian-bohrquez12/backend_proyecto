import { Router } from "express";
import pool from "../config/db.js"; 

const router = Router();

// =========================
//   OBTENER AJUSTES
// =========================
router.get("/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Buscar ajustes del usuario
    const [rows] = await pool.query(
      "SELECT * FROM Ajustes_Usuario WHERE id_usuario = ?",
      [id_usuario]
    );

    // Si NO existen, crearlos automáticamente
    if (rows.length === 0) {
      await pool.query(
        `INSERT INTO Ajustes_Usuario
        (id_usuario, notificaciones, idioma, admin_datos, actualizaciones)
        VALUES (?, TRUE, 'es', FALSE, TRUE)`,
        [id_usuario]
      );

      return res.json({
        id_usuario,
        notificaciones: true,
        idioma: "es",
        admin_datos: false,
        actualizaciones: true,
      });
    }

    // Si existen, devolverlos
    res.json(rows[0]);

  } catch (error) {
    console.error("Error en GET /ajustes:", error);
    res.status(500).json({ error: "Error al obtener los ajustes" });
  }
});

// =========================
//   ACTUALIZAR AJUSTES
// =========================
router.put("/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { notificaciones, idioma, admin_datos, actualizaciones } = req.body;

    await pool.query(
      `UPDATE Ajustes_Usuario
      SET notificaciones = ?,
          idioma = ?,
          admin_datos = ?,
          actualizaciones = ?
      WHERE id_usuario = ?`,
      [
        notificaciones,
        idioma,
        admin_datos,
        actualizaciones,
        id_usuario,
      ]
    );

    res.json({ mensaje: "Ajustes actualizados correctamente" });

  } catch (error) {
    console.error("Error en PUT /ajustes:", error);
    res.status(500).json({ error: "Error al actualizar los ajustes" });
  }
});

export default router;
