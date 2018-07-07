## Infrastructure
To build:
  - A bucket for the terraform state is required (private, with encryption is a good idea).
    See terraform backend in `main.tf`.
  - A route53 hosted zone with correctly configured nameservers in the domain registar. See
    `aws_route53_zone.primary`.
  - A `TF_VAR_storage_secret` set up in circle project (can be whatever).
