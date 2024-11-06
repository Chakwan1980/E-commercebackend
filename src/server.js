import app from './app.js';
import { createProductTable } from './models/productModel.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    await createProductTable();
});
