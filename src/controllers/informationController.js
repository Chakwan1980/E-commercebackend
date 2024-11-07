import pool from '../config/db.js';


export const getAllInformation = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM information");
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo la información:", error);
        res.status(500).json({ error: "Error obteniendo la información" });
    }
};


export const createInformation = async (req, res) => {
    const { name, telefono, email, mensaje } = req.body;


    if (!name || !telefono || !email || !mensaje) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO information (name, telefono, email, mensaje)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, telefono, email, mensaje]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error agregando información:", error);
        if (error.code === '23505') {
            res.status(400).json({ error: "El email ya está registrado" });
        } else {
            res.status(500).json({ error: "Error agregando información" });
        }
    }
};


export const updateInformation = async (req, res) => {
    const { id } = req.params;
    const { name, telefono, email, mensaje } = req.body;

    if (!name || !telefono || !email || !mensaje) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `UPDATE information
             SET name = $1, telefono = $2, email = $3, mensaje = $4
             WHERE id = $5 RETURNING *`,
            [name, telefono, email, mensaje, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Información no encontrada" });
        }

        res.json({ message: "Información actualizada", information: result.rows[0] });
    } catch (error) {
        console.error("Error actualizando la información:", error);
        res.status(500).json({ error: "Error actualizando la información" });
    }
};

export const deleteInformationById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM information WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Información no encontrada" });
        }

        res.json({ message: "Información eliminada", information: result.rows[0] });
    } catch (error) {
        console.error("Error eliminando la información:", error);
        res.status(500).json({ error: "Error eliminando la información" });
    }
};
