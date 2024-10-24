// Importar pool y la función para crear la tabla de productos desde tu archivo de configuración de base de datos
const { pool, createProductTable } = require('../src/db'); 
import 'regenerator-runtime/runtime'; // Para manejar async/await en Jest

// Ejecutar antes de todas las pruebas para crear la tabla de productos
beforeAll(async () => {
    await createProductTable();
});

// Limpiar la base de datos después de cada prueba
afterEach(async () => {
    await pool.query('TRUNCATE TABLE products RESTART IDENTITY');
});

// Cerrar la conexión a la base de datos después de todas las pruebas
afterAll(async () => {
    await pool.end();
});

describe('Product Table Tests', () => {
    test('Should create a new product', async () => {
        // Insertar un producto en la tabla
        const result = await pool.query(`
            INSERT INTO products (product_name, product_description, product_code, price, rating) 
            VALUES ('Laptop', 'A high-end laptop', 'LAP123', 1200.00, 4.5) 
            RETURNING *;
        `);

        // Obtener el producto insertado
        const product = result.rows[0];

        // Verificaciones de las propiedades del producto
        expect(product).toHaveProperty('id');
        expect(product.product_name).toBe('Laptop');
        expect(product.product_description).toBe('A high-end laptop');
        expect(product.product_code).toBe('LAP123');
        expect(parseFloat(product.price)).toBe(1200.00);  // Convertir a número
        expect(parseFloat(product.rating)).toBe(4.5);     // Convertir a número
    });

    test('Should fetch all products', async () => {
        // Insertar un producto de ejemplo
        await pool.query(`
            INSERT INTO products (product_name, product_description, product_code, price, rating)
            VALUES ('Smartphone', 'Latest model', 'SM123', 800.00, 4.0);
        `);

        // Consultar todos los productos
        const result = await pool.query('SELECT * FROM products');
        expect(result.rows.length).toBeGreaterThan(0);
    });

    test('Should update a product rating', async () => {
        // Insertar un producto y obtener su id
        const insertResult = await pool.query(`
            INSERT INTO products (product_name, product_description, product_code, price, rating)
            VALUES ('Tablet', 'A new tablet', 'TAB123', 600.00, 3.0) 
            RETURNING *;
        `);

        const product = insertResult.rows[0];

        // Actualizar la calificación del producto
        const updateResult = await pool.query(`
            UPDATE products 
            SET rating = 4.8 
            WHERE id = $1 
            RETURNING *;
        `, [product.id]);

        const updatedProduct = updateResult.rows[0];
        expect(parseFloat(updatedProduct.rating)).toBe(4.8); // Convertir a número
    });

    test('Should delete a product', async () => {
        // Insertar un producto y obtener su id
        const insertResult = await pool.query(`
            INSERT INTO products (product_name, product_description, product_code, price, rating)
            VALUES ('Headphones', 'Noise-cancelling', 'HEAD123', 300.00, 4.0) 
            RETURNING *;
        `);

        const product = insertResult.rows[0];

        // Eliminar el producto
        const deleteResult = await pool.query(`
            DELETE FROM products WHERE id = $1 RETURNING *;
        `, [product.id]);

        // Verificar que el producto fue eliminado
        expect(deleteResult.rowCount).toBe(1);
    });
});
