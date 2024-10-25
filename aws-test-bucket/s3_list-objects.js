import AWS from 'aws-sdk'; // Cambiar a import

// Configurar la región
AWS.config.update({ region: "eu-central-1" });

// Crear objeto de servicio S3
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Crear los parámetros para llamar a listObjects
const bucketParams = {
    Bucket: "rosa-test-bucket-23102024",
};

// Llamar a S3 para obtener una lista de los objetos en el bucket
s3.listObjects(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});
