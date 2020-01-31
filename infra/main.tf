terraform {
  backend "s3" {
    bucket = "dairyisscary-terraform-state"
    key    = "gracekim.me/terraform.tfstate"
    region = "us-east-1"
  }
}

locals {
  main_domain = "gracekim.me"
}

provider "aws" {
  region  = "us-east-1"
  version = "~> 2.46"
}

resource "aws_acm_certificate" "main_cert" {
  domain_name               = local.main_domain
  validation_method         = "DNS"
  subject_alternative_names = ["www.${local.main_domain}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "main_cert" {
  certificate_arn = aws_acm_certificate.main_cert.arn
  validation_record_fqdns = [
    aws_route53_record.main_cert_base_validation.fqdn,
    aws_route53_record.main_cert_www_validation.fqdn
  ]

  lifecycle {
    create_before_destroy = true
  }
}

output "main_bucket" {
  value = aws_s3_bucket.main_website_bucket.bucket
}

resource "aws_s3_bucket" "main_website_bucket" {
  bucket = local.main_domain

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
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "arn:aws:s3:::${local.main_domain}/*",
            "Sid": "PublicReadAccess"
        }
    ],
    "Version": "2012-10-17"
}
POLICY
}

resource "aws_s3_bucket" "www_website_bucket" {
  bucket = "www.${local.main_domain}"

  lifecycle {
    prevent_destroy = true
  }

  website {
    redirect_all_requests_to = "https://${local.main_domain}"
  }

  policy = <<POLICY
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject"
            ],
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "arn:aws:s3:::www.${local.main_domain}/*",
            "Sid": "PublicReadAccess"
        }
    ],
    "Version": "2012-10-17"
}
POLICY
}

output "main_distribution_id" {
  value = aws_cloudfront_distribution.main_website_cdn.id
}

resource "aws_cloudfront_distribution" "main_website_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"
  http_version    = "http2"

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.main_website_bucket.id}"
    domain_name = aws_s3_bucket.main_website_bucket.website_endpoint

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    min_ttl                = "0"
    default_ttl            = "86400"    # one day
    max_ttl                = "31536000" # one year
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
    acm_certificate_arn      = aws_acm_certificate_validation.main_cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  aliases = [
    local.main_domain,
  ]
}

resource "aws_cloudfront_distribution" "www_website_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"
  http_version    = "http2"

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.www_website_bucket.id}"
    domain_name = aws_s3_bucket.www_website_bucket.website_endpoint

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    min_ttl                = "0"
    default_ttl            = "86400"    # one day
    max_ttl                = "31536000" # one year
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
    acm_certificate_arn      = aws_acm_certificate_validation.main_cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  aliases = [
    "www.${local.main_domain}",
  ]
}

data "aws_route53_zone" "primary" {
  name         = "${local.main_domain}."
  private_zone = false
}

resource "aws_route53_record" "cdn_alias_a_main_domain" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = local.main_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.main_website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.main_website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cdn_alias_aaaa_main_domain" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = local.main_domain
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.main_website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.main_website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "main_cert_base_validation" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = aws_acm_certificate.main_cert.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.main_cert.domain_validation_options.0.resource_record_type
  records = [aws_acm_certificate.main_cert.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_route53_record" "main_cert_www_validation" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = aws_acm_certificate.main_cert.domain_validation_options.1.resource_record_name
  type    = aws_acm_certificate.main_cert.domain_validation_options.1.resource_record_type
  records = [aws_acm_certificate.main_cert.domain_validation_options.1.resource_record_value]
  ttl     = 60
}
