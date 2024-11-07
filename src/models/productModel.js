import pool from '../config/db.js';

export const createProductTable = async () => {
    try {
        await pool.query(`SELECT NOW()`);
        console.log("Conexión a la base de datos exitosa");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                product_description TEXT NOT NULL,
                product_code VARCHAR(50) NOT NULL UNIQUE,
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(255),
                category VARCHAR(100) NOT NULL
            );
        `);
        console.log("Tabla de productos creada exitosamente");
    } catch (error) {
        console.error("Error creando la tabla de productos: ", error);
    }
};