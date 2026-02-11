import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

// const PORT = 3000;
const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);


const server = http.createServer(async (req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');

    // console.log(req.url);
    // console.log(req.method);


    try {     // Simulate an error for demonstration
        if (req.method === 'GET') {
            let filePath;
            if (req.url === '/') {
                // res.writeHead(200, { 'Content-Type': 'text/html' });
                // res.end('<H1>Homepage</H1>\n');
                filePath = path.join(__dirname, 'public', 'index.html');
            } else if (req.url === '/about') {
                // res.writeHead(200, { 'Content-Type': 'text/html' });
                // res.end('<H1>About Page</H1>\n');
                filePath = path.join(__dirname, 'public', 'about.html');
            } else {
                // res.writeHead(404, { 'Content-Type': 'text/html' });
                // res.end('<H1>404 Not Found</H1>\n');
                throw new Error('File Not Found');
            }

            const data = await fs.readFile(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        } else {
            throw new Error('Unsupported HTTP method');
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
    }

    
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});