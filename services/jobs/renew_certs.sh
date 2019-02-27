#!/usr/bin/sh
sudo /usr/bin/python /alidata/server/httpd/ssl_key/acme_tiny.py --account-key /alidata/server/httpd/ssl_key/account.key --csr /alidata/server/httpd/ssl_key/domain.csr --acme-dir /var/www/challenges/ > /etc/pki/tls/certs/certificate.crt || exit
