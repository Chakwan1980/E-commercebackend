import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false, // Considera configurarlo según tu entorno
});

const createProductTable = async () => {
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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/products/category", async (req, res) => {
    const { category } = req.query;
    
    if (!category) {
        return res.status(400).json({ error: "Se requiere una categoría" });
    }

    try {
        const result = await pool.query("SELECT * FROM products WHERE category = $1", [category]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos en esta categoría" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo productos por categoría: ", error);
        res.status(500).json({ error: "Error obteniendo productos por categoría" });
    }
});

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const { product_name, product_description, product_code, price, image_url, category } = req.body;

    // Validación de campos requeridos
    if (!product_name || !product_description || !product_code || !price || !image_url || !category) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `UPDATE products
             SET product_name = $1, product_description = $2, product_code = $3, price = $4, image_url = $5, category = $6
             WHERE id = $7 RETURNING *`,
            [product_name, product_description, product_code, price, image_url, category, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado", product: result.rows[0] });
    } catch (error) {
        console.error("Error actualizando el producto: ", error);
        res.status(500).json({ error: "Error actualizando el producto" });
    }
});

app.delete("/api/products/code/:product_code", async (req, res) => {
    const { product_code } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM products WHERE product_code = $1 RETURNING *",
            [product_code]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado" });
    } catch (error) {
        console.error("Error eliminando el producto: ", error);
        res.status(500).json({ error: "Error eliminando el producto" });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo productos: ", error);
        res.status(500).json({ error: "Error obteniendo productos" });
    }
});

app.post("/api/products", async (req, res) => {
    const { product_name, product_description, product_code, price, rating, image_url, category } = req.body;

    // Validación de campos requeridos
    if (!product_name || !product_code || !price || !category) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO products (product_name, product_description, product_code, price, rating, image_url, category)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [product_name, product_description, product_code, price, rating, image_url, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error agregando producto: ", error);
        res.status(500).json({ error: "Error agregando producto" });
    }
});

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    await createProductTable();
});
