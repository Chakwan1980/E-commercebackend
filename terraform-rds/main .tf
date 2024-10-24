provider "aws" {
  region = "us-east-1"  
}

resource "aws_s3_bucket" "my_bucket" {
  bucket = "ecommerce-bucket-name-12345"  # Cambia esto a un nombre único para tu bucket
  acl    = "public-read"  # Cambia el ACL según tus necesidades

  tags = {
    Name        = "MyBucket"
    Environment = "Dev"
  }
}

# Opción para habilitar el versionado en el bucket
resource "aws_s3_bucket_versioning" "my_bucket_versioning" {
  bucket = aws_s3_bucket.my_bucket.id

  versioning_enabled = true
}

output "bucket_name" {
  value = aws_s3_bucket.my_bucket.bucket
}
