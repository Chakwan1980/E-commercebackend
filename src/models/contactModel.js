import pool from '../config/db.js';

export const createContactTable = async () => {
    try {
        await pool.query(`SELECT NOW()`);
        console.log("Conexión a la base de datos exitosa");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                address TEXT,
                message TEXT
            );
        `);
        console.log("Tabla de contactos creada exitosamente");
    } catch (error) {
        console.error("Error creando la tabla de contactos: ", error);
    }
};
