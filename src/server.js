import app from './app.js';
import { createProductTable } from './models/productModel.js';
import { createContactTable } from './models/contactModel.js';
import { createInformationTable } from './models/informationModels.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    try {
        await createProductTable();
        console.log("Tabla de productos creada correctamente");
    } catch (error) {
        console.error("Error creando la tabla de productos:", error);
    }

    try {
        await createContactTable();
        console.log("Tabla de contactos creada correctamente");
    } catch (error) {
        console.error("Error creando la tabla de contactos:", error);
    }

    try {
        await createInformationTable();
        console.log("Tabla de información creada correctamente");
    } catch (error) {
        console.error("Error creando la tabla de información:", error);
    }
});
