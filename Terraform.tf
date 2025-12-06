#placeholder
provider "aws" {
  region = "us-east-1"  # update as needed
}

resource "aws_vpc" "raise_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "raise-vpc"
  }
}

resource "aws_subnet" "raise_subnet" {
  vpc_id            = aws_vpc.raise_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  tags = {
    Name = "raise-subnet"
  }
}

resource "aws_internet_gateway" "raise_igw" {
  vpc_id = aws_vpc.raise_vpc.id
  tags = {
    Name = "raise-igw"
  }
}

resource "aws_route_table" "raise_route_table" {
  vpc_id = aws_vpc.raise_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.raise_igw.id
  }
  tags = {
    Name = "raise-route-table"
  }
}

resource "aws_route_table_association" "raise_route_assoc" {
  subnet_id      = aws_subnet.raise_subnet.id
  route_table_id = aws_route_table.raise_route_table.id
}

resource "aws_security_group" "raise_sg" {
  name        = "raise-sg"
  description = "Allow SSH and HTTP"
  vpc_id      = aws_vpc.raise_vpc.id

  ingress {
    description      = "SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "HTTP"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "raise-sg"
  }
}

resource "aws_instance" "ansible_controller" {
  ami           = "ami-0c55b159cbfafe1f0" # example: Amazon Linux 2 AMI, update as needed
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.raise_subnet.id
  vpc_security_group_ids = [aws_security_group.raise_sg.id]
  key_name      = "your-key-pair" # specify your SSH key
  tags = {
    Name = "AnsibleController"
  }
}

resource "aws_instance" "jenkins_master" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.raise_subnet.id
  vpc_security_group_ids = [aws_security_group.raise_sg.id]
  key_name      = "your-key-pair"
  tags = {
    Name = "JenkinsMaster"
  }
}

resource "aws_instance" "jenkins_agent" {
  count         = 2  # number of Jenkins agent instances
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.raise_subnet.id
  vpc_security_group_ids = [aws_security_group.raise_sg.id]
  key_name      = "your-key-pair"
  tags = {
    Name = "JenkinsAgent-${count.index}"
  }
}

