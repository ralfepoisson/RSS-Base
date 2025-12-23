terraform {
  backend "s3" {
    bucket         = "rss-base-tfstate"
    key            = "prod/terraform.tfstate"
    region         = var.aws_region
  }
}