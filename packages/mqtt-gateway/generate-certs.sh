#!/bin/bash

# Create the certificates directory
mkdir -p certs
cd certs

# Generate CA private key with encryption
openssl genpkey -algorithm RSA -out ca.key -aes256 -pass pass:yourpassword

# Generate CA self-signed certificate
openssl req -new -x509 -days 365 -key ca.key -passin pass:yourpassword -out ca.crt -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=RootCA"

# Generate server private key with encryption
openssl genpkey -algorithm RSA -out server.key -aes256 -pass pass:yourpassword

# Generate server CSR
openssl req -new -key server.key -passin pass:yourpassword -out server.csr -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=your.server.com"

# Sign server certificate with CA certificate
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -passin pass:yourpassword

# Optional: Remove passphrase from server private key
openssl rsa -in server.key -passin pass:yourpassword -out server.key
