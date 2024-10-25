// backendController.js
import { pool } from '../db.js'; // Importa el pool desde db.js


// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { product_name, product_description, product_code, price, rating } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO products (product_name, product_description, product_code, price, rating)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [product_name, product_description, product_code, price, rating]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};