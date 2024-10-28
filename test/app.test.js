// __tests__/productController.test.js
import request from 'supertest';
import express from 'express';
import productRoutes from '../server/src/routes/productsRoutes.js';
import { pool } from '../server/src/db.js'
import dotenv from 'dotenv';

// Cargar las variables de entorno desde .env
dotenv.config();

// Configuración de la aplicación de Express para pruebas
const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

// Conexión a la base de datos (asegúrate de que tu base de datos esté corriendo)
beforeAll(async () => {
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

    it('should get all products', async () => {
        const response = await request(app)
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a product by ID', async () => {
        const product = {
            product_name: 'Test Product',
            product_description: 'This is a test product',
            product_code: 'TP002',
            price: 29.99,
            rating: 4.0,
            image_url: 'http://example.com/image2.jpg',
            category: 'Test Category',
        };

        const createResponse = await request(app)
            .post('/api/products')
            .send(product);

        const productId = createResponse.body.id;

        const response = await request(app)
            .get(`/api/products/${productId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('id', productId);
    });

    it('should update a product', async () => {
        const product = {
            product_name: 'Update Test Product',
            product_description: 'This is an updated test product',
            product_code: 'TP003',
            price: 39.99,
            rating: 5.0,
            image_url: 'http://example.com/image3.jpg',
            category: 'Updated Category',
        };

        const createResponse = await request(app)
            .post('/api/products')
            .send(product);

        const productId = createResponse.body.id;

        const updatedProduct = {
            product_name: 'Updated Product Name',
            product_description: 'Updated description',
            product_code: 'TP003',
            price: 49.99,
            rating: 5.0,
            image_url: 'http://example.com/updated-image.jpg',
            category: 'Updated Category',
        };

        const response = await request(app)
            .put(`/api/products/${productId}`)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.product_name).toBe(updatedProduct.product_name);
    });

    it('should delete a product', async () => {
        const product = {
            product_name: 'Delete Test Product',
            product_description: 'This is a product to delete',
            product_code: 'TP004',
            price: 9.99,
            rating: 3.5,
            image_url: 'http://example.com/image4.jpg',
            category: 'Delete Category',
        };

        const createResponse = await request(app)
            .post('/api/products')
            .send(product);

        const productId = createResponse.body.id;

        await request(app)
            .delete(`/api/products/${productId}`)
            .expect(204);
        
        // Intentar obtener el producto eliminado
        await request(app)
            .get(`/api/products/${productId}`)
            .expect(404);
    });
});
