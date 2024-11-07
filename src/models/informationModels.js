import pool from '../config/db.js';

export const createInformationTable = async () => {
    try {
        await pool.query(`SELECT NOW()`);
        console.log("Conexión a la base de datos exitosa");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS information (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                telefono VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                mensaje TEXT NOT NULL
            );
        `);
        console.log("Tabla de información creada exitosamente");
    } catch (error) {
        console.error("Error creando la tabla de información:", error);
    }
};
