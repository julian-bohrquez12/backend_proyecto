import { pool } from "../db.js";

// ==========================
//   OBTENER PERFIL
// ==========================
export const getPerfil = async (req, res) => {
    try {
        const { usuario } = req.params;

        const [rows] = await pool.query(
            "SELECT * FROM Perfil WHERE Usuario = ?",
            [usuario]
        );

        if (rows.length === 0)
            return res.status(404).json({ message: "Perfil no encontrado" });

        res.json(rows[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// ==========================
//   ACTUALIZAR PERFIL
// ==========================
export const updatePerfil = async (req, res) => {
    try {
        const { usuario } = req.params;
        const { nombre, apellido, correo } = req.body;

        await pool.query(
            "UPDATE Perfil SET Nombre=?, Apellido=?, Correo=? WHERE Usuario=?",
            [nombre, apellido, correo, usuario]
        );

        res.json({ message: "Perfil actualizado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el perfil" });
    }
};

// ==========================
//   ELIMINAR PERFIL
// ==========================
export const deletePerfil = async (req, res) => {
    try {
        const { usuario } = req.params;

        await pool.query("DELETE FROM Perfil WHERE Usuario=?", [usuario]);

        res.json({ message: "Cuenta eliminada correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la cuenta" });
    }
};
