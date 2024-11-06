import pool from '../config/db.js';

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo productos: ", error);
        res.status(500).json({ error: "Error obteniendo productos" });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    const { category } = req.query;
    if (!category) return res.status(400).json({ error: "Se requiere una categoría" });

    try {
        const result = await pool.query("SELECT * FROM products WHERE LOWER(category) LIKE LOWER($1)", [`%${category}%`]);
        if (result.rows.length === 0) return res.status(404).json({ message: "No se encontraron productos en esta categoría" });

        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo productos por categoría: ", error);
        res.status(500).json({ error: "Error obteniendo productos por categoría" });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    const { product_name, product_description, product_code, price, image_url, category } = req.body;

    // Validación de campos requeridos
    if (!product_name || !product_code || !price || !category) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO products (product_name, product_description, product_code, price, image_url, category)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [product_name, product_description, product_code, price, image_url, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error agregando producto: ", error);
        res.status(500).json({ error: "Error agregando producto" });
    }
};

// Update an existing product by ID
export const updateProduct = async (req, res) => {
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
};

// Delete a product by product code
export const deleteProductByCode = async (req, res) => {
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
};
