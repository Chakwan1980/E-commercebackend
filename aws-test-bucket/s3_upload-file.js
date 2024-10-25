// Importa los módulos necesarios usando la sintaxis ES6
import AWS from 'aws-sdk'; 
import fs from 'fs';
import path from 'path';

// Configurar la región
AWS.config.update({ region: "eu-central-1" });

// Crear objeto de servicio S3
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Función para subir un archivo
const uploadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        // Lee el archivo como un flujo
        const fileStream = fs.createReadStream(filePath);
        
        const uploadParams = {
            Bucket: "rosa-test-bucket-23102024", // Asegúrate de que el nombre sea el correcto
            Key: path.basename(filePath), // Nombre del archivo en S3
            Body: fileStream, // Aquí es donde pasas el flujo del archivo
            ContentType: 'image/png', // Asegúrate de establecer el tipo de contenido
        };

        // Llamar a S3 para cargar el archivo en el bucket especificado
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                console.log("Error", err);
                reject(err); // Rechaza la promesa si hay un error
            } else {
                console.log("Upload Success", data.Location);
                resolve(data.Location); // Resuelve la promesa con la URL de la imagen
            }
        });
    });
};

// Función para subir múltiples archivos
const uploadMultipleFiles = async (filePaths) => {
    try {
        for (const filePath of filePaths) {
            await uploadFile(filePath);
        }
        console.log("Todos los archivos se han subido exitosamente.");
    } catch (error) {
        console.error("Error al subir archivos: ", error);
    }
};

// Aquí especificas las rutas de los archivos que deseas subir
const filesToUpload = [
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\fotoportada.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\mantelblanco.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\posavasos.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\servilletasdecolores.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\servilletasycuchara.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\sevilletasazules.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\toallascocina.png",
  "C:\\Abschlussprojekt\\E-commerce\\e-commerce-backend\\aws-test-bucket\\images\\vestido.png"
];

// Llama a la función para subir múltiples archivos
uploadMultipleFiles(filesToUpload);
