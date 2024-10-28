provider "aws" {
  region = "eu-central-1"
}

# VPC
resource "aws_vpc" "e-commerce_vpc_prod" {
    cidr_block = "10.0.0.0/16"

    tags = {
        Name = "e-commerce-prod-vpc"
    }
}

# Internet Gateway
resource "aws_internet_gateway" "e-commerce_igw_prod" {
    vpc_id = aws_vpc.e-commerce_vpc_prod.id

    tags = {
        Name = "e-commerce-prod-igw"
    }
  
}

# Public subnet
resource "aws_subnet" "e-commerce_public_subnet_a_prod" {
    vpc_id = aws_vpc.e-commerce_vpc_prod.id
    cidr_block = "10.0.0.0/20"
    availability_zone = "eu-central-1a"
    map_public_ip_on_launch = true

    tags = {
        Name = "e-commerce-prod-public-subnet-a"
    }
  
}

# Private subnet
resource "aws_subnet" "e-commerce_private_subnet_a_prod" {
    vpc_id = aws_vpc.e-commerce_vpc_prod.id
    cidr_block = "10.0.128.0/20"
    availability_zone = "eu-central-1a"

    tags = {
        Name = "e-commerce-prod-private-subnet-a"
    }
  
}

# Public Route Table
resource "aws_route_table" "public_rtb_prod" {
    vpc_id = aws_vpc.e-commerce_vpc_prod.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.e-commerce_igw_prod.id
    }

    tags = {
        Name = "e-commerce-prod-vpc-public-route-table"
    }
  
}

# Public Subnet to Public Route Table Association
resource "aws_route_table_association" "public_rtb_subnet_assoc_prod" {
    subnet_id = aws_subnet.e-commerce_public_subnet_a_prod.id
    route_table_id = aws_route_table.public_rtb_prod.id
}

# Security Group
resource "aws_security_group" "e-commerce-app-sg-port3030-ssh" {
    vpc_id = aws_vpc.e-commerce_vpc_prod.id

    ingress {
        from_port = 3030
        to_port = 3030
        protocol = "tcp"
        cidr_blocks = [ "0.0.0.0/0" ]
    }

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = [ "0.0.0.0/0" ]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = [ "0.0.0.0/0" ]
    }

    tags = {
        Name = "e-commerce-app-sg-port3030-ssh"
    }
  
}

# EC2 Instance - e-commerceApp Server and Database
resource "aws_instance" "e-commerce_app_server" {
    ami = "ami-077e7b988e15f909f"
    instance_type = "t4g.nano"
    subnet_id = aws_subnet.e-commerce_public_subnet_a_prod.id
    vpc_security_group_ids = [ aws_security_group.e-commerce-app-sg-port3030-ssh.id]

    user_data = file("../scripts/userdata.sh")

    tags = {
        Name = "e-coomerce-app-server"
    }
  
}

# Outputs

output "instance_public_ip" {
    description = "The public IP of the EC2 instance"
    value = aws_instance.e-commerce_app_server.public_ip
}