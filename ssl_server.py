#!/usr/bin/env python3

import http.server
import ssl
import os

# Change this to the directory where your website files are
web_dir = os.path.join(os.path.dirname(__file__))
os.chdir(web_dir)

server_address = ('0.0.0.0', 443)

httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# Path to your certs from Let's Encrypt
cert_file = "/etc/letsencrypt/live/adamhamdan.me/fullchain.pem"
key_file = "/etc/letsencrypt/live/adamhamdan.me/privkey.pem"

httpd.socket = ssl.wrap_socket(httpd.socket,
                               certfile=cert_file,
                               keyfile=key_file,
                               server_side=True)

print("Serving HTTPS on port 443...")
httpd.serve_forever()
