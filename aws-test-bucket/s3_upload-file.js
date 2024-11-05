// Importa los módulos necesarios usando la sintaxis ES6
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

// Configurar la región
AWS.config.update({ region: "eu-central-1" });

// Crear objeto de servicio S3
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath);
      const extname = path.extname(filePath).toLowerCase();

      // Establecer ContentType según la extensión
      let contentType;
      if (extname === '.png') {
          contentType = 'image/png';
      } else if (extname === '.jpg' || extname === '.jpeg') {
          contentType = 'image/jpeg';
      } else if (extname === '.gif') {
          contentType = 'image/gif';
      } else {
          console.log(`Formato no soportado: ${extname}`);
          reject(new Error(`Formato no soportado: ${extname}`));
          return;
      }

      const uploadParams = {
          Bucket: "rosa-test-bucket-05112024",
          Key: path.basename(filePath),
          Body: fileStream,
          ContentType: contentType, // Asegúrate de que el ContentType es correcto
      };

      s3.upload(uploadParams, (err, data) => {
          if (err) {
              console.log("Error", err);
              reject(err);
          } else {
              console.log("Upload Success", data.Location);
              resolve(data.Location);
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
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//fotoportada.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//mantelblanco.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//posavasos.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//servilletasdecolores.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//servilletasycuchara.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//sevilletasazules.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//toallascocina.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-backend//aws-test-bucket//images//vestido.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//Bordando.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//bosaregalo.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//camisetaGallo.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//camisetasbordadas.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//camisetasvariadas.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//cart.jpg",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//ChaquetaBeige.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//cojines.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//Gorra.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//icono.gif",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//VestidoNegro.png",
  "C://Abschlussprojekt//E-commerce//e-commerce-frontend//src//fotos//vestidonina.png",

];

// Llama a la función para subir múltiples archivos
uploadMultipleFiles(filesToUpload);
