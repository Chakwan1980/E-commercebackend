
import dotenv from 'dotenv'; // Importa dotenv

import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl:false
});

// Function to create the product table
const createProductTable = async () => {
    try {
        await pool.query(`SELECT NOW()`); // connection test
        console.log('Conexión a la base de datos exitosa'); // success message
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                product_description TEXT NOT NULL,
                product_code VARCHAR(50) NOT NULL UNIQUE,
                price DECIMAL(10, 2) NOT NULL,
                rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5) DEFAULT 0
            );
        `);
        console.log('Products table created successfully');
    } catch (error) {
        console.error('Error creating products table: ', error);
    }
}

// Export the pool and the createProductTable function
export { pool, createProductTable };
