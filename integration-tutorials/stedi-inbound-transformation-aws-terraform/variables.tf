variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "project_name" {
  default     = "panda"
  description = "Common prefix for all Terraform created resources"
}

variable "stedi_api_key" {
  type = string
  description = "Your stedi api key from terminal.stedi.com. It will look like xxxxxxx.yyyyyyyyyyyy"
  sensitive = true # This ensure the API key won't be printed in CLI
}

variable "stedi_mapping_id" {
  type = string
  description = "The ID for the mapping you must create"
}