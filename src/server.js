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

// Start the product table function 
const startServer = async () => {
    try {
        await createProductTable(); // Esperar a que la tabla se cree antes de iniciar el servidor
        console.log("Products table created or already exists."); // Mensaje de éxito
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server: ", error); // Captura y muestra cualquier error en la creación de la tabla
    }
};

startServer(); 
