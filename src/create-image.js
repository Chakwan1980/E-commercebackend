// Function to create a new product
const createProduct = async (productData, filePath) => {
    try {
        // Subir la imagen y obtener la URL
        const imageUrl = await uploadImageToS3(filePath);

        // Agregar la URL de la imagen a los datos del producto
        const { product_name, product_description, product_code, price, rating } = productData;
        
        // Insertar el producto en la base de datos
        await pool.query(`
            INSERT INTO products (product_name, product_description, product_code, price, rating, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [product_name, product_description, product_code, price, rating, imageUrl]);

        console.log('Producto creado con éxito:', product_name);
    } catch (error) {
        console.error('Error creando producto: ', error);
    }
};

// Ejemplo de uso
const productData = {
    product_name: 'Nombre del Producto',
    product_description: 'Descripción del producto',
    product_code: 'CODIGO123',
    price: 19.99,
    rating: 4.5,
};

const filePath = 'ruta/a/la/imagen.jpg'; // Asegúrate de que este archivo existe
createProduct(productData, filePath);
