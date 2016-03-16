openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -subj "/C=US/ST=NY/L=New York/O=Fiscal/CN=fiscal.dev" -keyout fiscal.key.pem -out fiscal.csr.pem
