import pool from '../config/db.js';

// Get all contacts
export const getAllContacts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contacts");
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo contactos: ", error);
        res.status(500).json({ error: "Error obteniendo contactos" });
    }
};

// Create a new contact
export const createContact = async (req, res) => {
    const { name, last_name, phone, email, address } = req.body;

    // Validación de campos requeridos
    if (!name || !last_name || !phone || !email) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO contacts (name, last_name, phone, email, address)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, last_name, phone, email, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error agregando contacto: ", error);
        res.status(500).json({ error: "Error agregando contacto" });
    }
};

// Update an existing contact by ID
export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, last_name, phone, email, address } = req.body;

    if (!name || !last_name || !phone || !email) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `UPDATE contacts
             SET name = $1, last_name = $2, phone = $3, email = $4, address = $5
             WHERE id = $6 RETURNING *`,
            [name, last_name, phone, email, address, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Contacto no encontrado" });
        }

        res.json({ message: "Contacto actualizado", contact: result.rows[0] });
    } catch (error) {
        console.error("Error actualizando el contacto: ", error);
        res.status(500).json({ error: "Error actualizando el contacto" });
    }
};

// Delete a contact by ID
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

        res.json({ message: "Contacto eliminado" });
    } catch (error) {
        console.error("Error eliminando el contacto: ", error);
        res.status(500).json({ error: "Error eliminando el contacto" });
    }
};
