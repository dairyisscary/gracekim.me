provider "aws" {
  region  = "us-east-1"
  version = "~> 1.10"
}

terraform {
  backend "s3" {
    bucket = "dairyisscary-terraform-state"
    key    = "gracekim.me/terraform.tfstate"
    region = "us-east-1"
  }
}

variable "storage_secret" {
  type        = "string"
  description = "a secret user-agent that is sent to all requests from CF to S3"
}

variable "main_domain" {
  type    = "string"
  default = "gracekim.me"
}

data "aws_acm_certificate" "main_cert" {
  domain   = "www.gracekim.me"
  statuses = ["ISSUED"]
}

output "main_bucket" {
  value = "${aws_s3_bucket.main_website_bucket.bucket}"
}

resource "aws_s3_bucket" "main_website_bucket" {
  bucket = "${var.main_domain}"

  lifecycle {
    prevent_destroy = true
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true

    noncurrent_version_expiration {
      days = "15"
    }
  }

  policy = <<POLICY
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:UserAgent": "${var.storage_secret}"
                }
            },
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Resource": "arn:aws:s3:::gracekim.me/*",
            "Sid": "PublicReadAccess"
        }
    ],
    "Version": "2012-10-17"
}
POLICY
}

resource "aws_s3_bucket" "www_website_bucket" {
  bucket = "www.${var.main_domain}"

  lifecycle {
    prevent_destroy = true
  }

  website {
    redirect_all_requests_to = "https://${var.main_domain}"
  }

  policy = <<POLICY
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:UserAgent": "${var.storage_secret}"
                }
            },
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Resource": "arn:aws:s3:::www.gracekim.me/*",
            "Sid": "PublicReadAccess"
        }
    ],
    "Version": "2012-10-17"
}
POLICY
}

output "main_distribution_id" {
  value = "${aws_cloudfront_distribution.main_website_cdn.id}"
}

resource "aws_cloudfront_distribution" "main_website_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"
  http_version    = "http2"

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.main_website_bucket.id}"
    domain_name = "${aws_s3_bucket.main_website_bucket.website_endpoint}"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    custom_header {
      name  = "User-Agent"
      value = "${var.storage_secret}"
    }
  }

  default_cache_behavior {
    min_ttl                = "0"
    default_ttl            = "3600"
    max_ttl                = "3600"
    target_origin_id       = "origin-bucket-${aws_s3_bucket.main_website_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    forwarded_values {
      query_string = "false"

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "${data.aws_acm_certificate.main_cert.arn}"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  aliases = [
    "${var.main_domain}",
  ]
}

resource "aws_cloudfront_distribution" "www_website_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"
  http_version    = "http2"

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.www_website_bucket.id}"
    domain_name = "${aws_s3_bucket.www_website_bucket.website_endpoint}"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    custom_header {
      name  = "User-Agent"
      value = "${var.storage_secret}"
    }
  }

  default_cache_behavior {
    min_ttl                = "0"
    default_ttl            = "3600"
    max_ttl                = "3600"
    target_origin_id       = "origin-bucket-${aws_s3_bucket.www_website_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    forwarded_values {
      query_string = "false"

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "${data.aws_acm_certificate.main_cert.arn}"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  aliases = [
    "www.${var.main_domain}",
  ]
}

data "aws_route53_zone" "primary" {
  name         = "${var.main_domain}."
  private_zone = false
}

resource "aws_route53_record" "cdn_alias_a_main_domain" {
  zone_id = "${data.aws_route53_zone.primary.zone_id}"
  name    = "${var.main_domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.main_website_cdn.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.main_website_cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cdn_alias_aaaa_main_domain" {
  zone_id = "${data.aws_route53_zone.primary.zone_id}"
  name    = "${var.main_domain}"
  type    = "AAAA"

  alias {
    name                   = "${aws_cloudfront_distribution.main_website_cdn.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.main_website_cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}
