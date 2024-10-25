import AWS from 'aws-sdk'; // Cambiar a import

// Configurar la región
AWS.config.update({ region: "eu-central-1" });

// Crear objeto de servicio S3
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Crear parámetros para S3.deleteBucket
const bucketParams = {
    Bucket: "rosa-test-bucket-23102024",
};

// Llamar a S3 para eliminar el bucket
s3.deleteBucket(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});
