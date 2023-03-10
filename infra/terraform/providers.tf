# This is preconfigured for the Docker/Localstack environment, you should not need to change this.

provider "aws" {
  version = "2.67"
  region = "us-east-1"
  access_key = "none"
  secret_key = "none"
  skip_credentials_validation = true
  skip_requesting_account_id = true
  skip_metadata_api_check = true
  s3_force_path_style = true
  endpoints {
    s3 = "http://localstack:4566"
    iam = "http://localstack:4566"
  }
}