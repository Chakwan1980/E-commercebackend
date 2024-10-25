import AWS from 'aws-sdk'; // Importar AWS SDK
import fs from 'fs'; // Importar fs
import path from 'path'; // Importar path

// Configurar la región
AWS.config.update({ region: "eu-central-1" });

// Crear objeto de servicio S3
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Configurar los parámetros de carga
const uploadParams = { 
    Bucket: "rosa-test-bucket-23102024", // Nombre de tu bucket
    Key: "", // Nombre del archivo en S3
    Body: "", // Cuerpo del archivo
};

// Ruta del archivo a cargar
const filePath = "C:\Abschlussprojekt\E-commerce\e-commerce-backend\aws-test-bucket\images\mantel.png"; // Asegúrate de que este archivo existe

// Configurar el stream de archivo y los parámetros de carga
const fileStream = fs.createReadStream(filePath);
fileStream.on("error", function (err) {
    console.log("File Error", err);
});
uploadParams.Body = fileStream;
uploadParams.Key = path.basename(filePath); // Asignar el nombre del archivo

// Llamar a S3 para cargar el archivo en el bucket
s3.upload(uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    }
    if (data) {
        console.log("Upload Success", data.Location);
    }
});
