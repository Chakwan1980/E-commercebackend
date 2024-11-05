import AWS from 'aws-sdk'; // Cambiar a import

// Configurar la región
AWS.config.update({ region: "eu-central-1" });

// Crear objeto de servicio S3
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Crear los parámetros para llamar a createBucket
const bucketParams = {
    Bucket: "rosa-test-bucket-05112024",
};

// Llamar a S3 para crear el bucket
s3.createBucket(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Location);
    }
});
