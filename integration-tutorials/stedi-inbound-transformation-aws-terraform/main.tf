# I. Terraform specific
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 3.48.0"
    }
    random = { # This gives us random strings, it's useful below.
      source  = "hashicorp/random"
      version = "= 3.1.0"
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region = var.aws_region
}

# II. Lambda

# Create a role for lambda
resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

# Attaches a policy that allows writing to CW Logs, for the role
resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Ataches a policy that allows read/write to S3, for the role
resource "aws_iam_role_policy_attachment" "lambda_s3_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

# The CW Log group itself
resource "aws_cloudwatch_log_group" "stedi_lambda" {
  name = "/aws/lambda/${aws_lambda_function.stedi_lambda.function_name}"
}

# Another permission so the S3 bucket can trigger the Lambda.
resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.stedi_lambda.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.bucket.arn
}

# MAIN LAMBDA - Resources defines lambda using source code uploaded to S3 in .zip.
resource "aws_lambda_function" "stedi_lambda" {
  function_name = "StediLambda"

  runtime = "nodejs12.x"
  handler = "index.handler"

  # Where the setup.sh puts the Lambda file .zip
  filename = "/tmp/index.zip"

  # This auto-trigger Lambda updates whenever we change the code!
  source_code_hash = filebase64sha256("/tmp/index.zip")

  timeout = 30 # lambda timeout to 30 seconds.

  # Important environment variables for calling Stedi APIs
  environment {
    variables = {
      stedi_api_key = var.stedi_api_key,
      stedi_mapping_id = var.stedi_mapping_id
    }
  }

  role = aws_iam_role.iam_for_lambda.arn
}

# III. S3
resource "random_pet" "random_bucket_name" {
  prefix = var.project_name
  length = 3
}

resource "aws_s3_bucket" "bucket" {
  bucket = random_pet.random_bucket_name.id

  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.stedi_lambda.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "inbound/"
    filter_suffix       = ".edi"
  }

  depends_on = [aws_lambda_permission.allow_bucket]
}