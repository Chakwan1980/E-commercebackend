import express from 'express';
import cors from 'cors';
import { createProductTable } from './db.js';
import productRoutes from './routes/backendRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Start the  product table function 
createProductTable();

// definition of port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
