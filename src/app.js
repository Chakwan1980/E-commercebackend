import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes); 

export default app;
