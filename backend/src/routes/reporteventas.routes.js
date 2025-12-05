import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/* 🟩 1. OBTENER TODOS LOS REPORTES DE VENTAS */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        rv.Id_Reporte,
        rv.Fecha_Reporte,
        u.Nombre AS Usuario,
        p.Nombre AS Producto,
        r.Id_Venta,
        r.Cantidad,
        r.Fecha AS Fecha_Venta
      FROM Reporte_ventas rv
      JOIN Usuarios u ON rv.Id_Usuarios = u.Id_Usuarios
      JOIN Productos p ON rv.Id_Productos = p.Id_Productos
      JOIN Registro_Ventas r ON rv.Id_Venta = r.Id_Venta
      ORDER BY rv.Id_Reporte;
    `);

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo los reportes de ventas" });
  }
});


/* 🟩 2. OBTENER UN REPORTE POR ID */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT 
        rv.Id_Reporte,
        rv.Fecha_Reporte,
        u.Nombre AS Usuario,
        p.Nombre AS Producto,
        rv.Id_Venta
      FROM Reporte_ventas rv
      JOIN Usuarios u ON rv.Id_Usuarios = u.Id_Usuarios
      JOIN Productos p ON rv.Id_Productos = p.Id_Productos
      WHERE rv.Id_Reporte = ?
    `, [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Reporte no encontrado" });

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo el reporte" });
  }
});


/* 🟩 3. CREAR UN REPORTE */
router.post("/", async (req, res) => {
  const { Id_Usuarios, Id_Productos, Id_Venta, Fecha_Reporte } = req.body;

  try {
    await pool.query(
      `INSERT INTO Reporte_ventas 
      (Id_Usuarios, Id_Productos, Id_Venta, Fecha_Reporte) 
      VALUES (?, ?, ?, ?)`,
      [Id_Usuarios, Id_Productos, Id_Venta, Fecha_Reporte]
    );

    res.json({ message: "Reporte creado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error creando el reporte" });
  }
});


/* 🟩 4. EDITAR UN REPORTE */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { Id_Usuarios, Id_Productos, Id_Venta, Fecha_Reporte } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Reporte_ventas 
       SET Id_Usuarios=?, Id_Productos=?, Id_Venta=?, Fecha_Reporte=?
       WHERE Id_Reporte=?`,
      [Id_Usuarios, Id_Productos, Id_Venta, Fecha_Reporte, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Reporte no encontrado" });

    res.json({ message: "Reporte actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error actualizando el reporte" });
  }
});


/* 🟩 5. ELIMINAR UN REPORTE */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM Reporte_ventas WHERE Id_Reporte=?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Reporte no encontrado" });

    res.json({ message: "Reporte eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error eliminando el reporte" });
  }
});

export default router;
