import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import informationRoutes from './routes/informationRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/information', informationRoutes);

export default app;

