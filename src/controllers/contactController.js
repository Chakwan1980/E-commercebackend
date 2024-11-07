import pool from '../config/db.js';

export const getAllContacts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contacts");
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo contactos:", error);
        res.status(500).json({ error: "Error obteniendo contactos" });
    }
};

export const createContact = async (req, res) => {
    const { name, last_name, phone, email, address, message } = req.body;

    if (!name || !last_name || !phone || !email || !message) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO contacts (name, last_name, phone, email, address, message)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, last_name, phone, email, address, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error agregando contacto:", error);
        if (error.code === '23505') { // Error de restricción única (duplicado)
            res.status(400).json({ error: "El email ya está registrado" });
        } else {
            res.status(500).json({ error: "Error agregando contacto" });
        }
    }
};


export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, last_name, phone, email, address, message } = req.body;

    if (!name || !last_name || !phone || !email || !message) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `UPDATE contacts
             SET name = $1, last_name = $2, phone = $3, email = $4, address = $5, message = $6
             WHERE id = $7 RETURNING *`,
            [name, last_name, phone, email, address, message, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Contacto no encontrado" });
        }

        res.json({ message: "Contacto actualizado", contact: result.rows[0] });
    } catch (error) {
        console.error("Error actualizando el contacto:", error);
        res.status(500).json({ error: "Error actualizando el contacto" });
    }
};


export const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM contacts WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Contacto no encontrado" });
        }

        res.json({ message: "Contacto eliminado", contact: result.rows[0] });
    } catch (error) {
        console.error("Error eliminando el contacto:", error);
        res.status(500).json({ error: "Error eliminando el contacto" });
    }
};
