# This is preconfigured for the Docker/Localstack environment, you should not need to change this.

terraform {
  backend "local" {
    path = ".terraform/terraform.tfstate"
  }
}