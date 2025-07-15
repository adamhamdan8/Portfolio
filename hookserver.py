from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess

PORT = 5005

class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/payload":
            # Read and discard the request body (important to avoid hanging)
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)

            # Respond quickly to GitHub
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'OK')

            # Run git pull
            try:
                subprocess.run(["git", "-C", "/home/adam/Portfolio", "pull"], check=True)
                print("Git pull executed.")
            except subprocess.CalledProcessError as e:
                print("Git pull failed:", e)
        else:
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        # Optionally: return 405 Method Not Allowed
        self.send_response(405)
        self.end_headers()

if __name__ == "__main__":
    server_address = ('0.0.0.0', PORT)
    httpd = HTTPServer(server_address, WebhookHandler)
    print(f"Listening for GitHub webhook on port {PORT}")
    httpd.serve_forever()
