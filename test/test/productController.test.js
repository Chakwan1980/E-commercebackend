// __tests__/productController.test.js
import request from 'supertest';
import express from 'express';
import productRoutes from '../server/src/routes/productsRoutes.js';
import { pool } from '../server/src/db.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde .env
dotenv.config();

// Configuración de la aplicación de Express para pruebas
const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

// Conexión a la base de datos (asegúrate de que tu base de datos esté corriendo)
beforeAll(async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            product_name VARCHAR(255) NOT NULL,
            product_description TEXT NOT NULL,
            product_code VARCHAR(50) NOT NULL UNIQUE,
            price DECIMAL(10, 2) NOT NULL,
            rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5) DEFAULT 0,
            image_url VARCHAR(255),
            category VARCHAR(100) NOT NULL
        )`);
        console.log('Tabla products creada o ya existe.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
});

afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS products'); // Limpiar después de las pruebas
    await pool.end();
});

describe('Product API', () => {
    it('should create a product', async () => {
        const product = {
            product_name: 'Test Product',
            product_description: 'This is a test product',
            product_code: 'TP001',
            price: 19.99,
            rating: 4.5,
            image_url: 'http://example.com/image.jpg',
            category: 'Test Category',
        };

        const response = await request(app)
            .post('/api/products')
            .send(product)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.product_name).toBe(product.product_name);
    });

    // Otras pruebas...
});
