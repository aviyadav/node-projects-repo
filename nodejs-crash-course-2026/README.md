# Node.js Crash Course 2026

A comprehensive Node.js project demonstrating core Node.js concepts including HTTP server creation, file system operations, ES6 modules, and RESTful API patterns.

## 📺 Tutorial Reference
[YouTube Tutorial](https://www.youtube.com/watch?v=32M1al-Y6Ag) - Time: 1:04:52

## 📋 Project Overview

This project showcases:
- HTTP server creation using native Node.js `http` module
- File system operations with `fs/promises`
- ES6 module imports/exports
- Environment variables configuration
- RESTful API endpoints
- Hot reload development with nodemon
- Static file serving

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:
```
PORT=3000
```

## 📦 Available Commands

### Development Mode
```bash
npm run dev
```
Starts the server with nodemon for hot reloading. Automatically restarts when files change.

### Production Mode
```bash
npm start
```
Starts the server in production mode using Node.js.

### Run Tests
```bash
npm test
```
Currently configured as a placeholder.

## 🛠️ Project Structure

```
├── server.js           # Main HTTP server with routing
├── index.js            # Module usage examples
├── postController.js   # Post data controller with exports
├── utils.js            # Utility functions
├── tests.http          # HTTP request tests (REST Client)
├── package.json        # Project configuration
└── README.md          # Project documentation
```

## 🌐 API Endpoints

### GET Requests
- `GET /` - Homepage
- `GET /about` - About page

### Testing Endpoints
Use the `tests.http` file with REST Client extension in VS Code:
```http
# GET request
GET http://localhost:3000/api/users HTTP/1.1

###

# POST request
POST http://localhost:3000 HTTP/1.1
Content-Type: application/json

{
  "title": "Sample Post",
  "body": "This is a test post"
}
```

## 🔧 Key Features

### ES6 Modules
The project uses ES6 module syntax (`import`/`export`) enabled by setting `"type": "module"` in package.json.

### Environment Variables
Environment variables are loaded using the `--env-file=.env` flag (Node.js v20.6.0+).

### Hot Reload Development
Nodemon watches for file changes and automatically restarts the server during development.

## 📝 License

MIT

## 👤 Author

Avinash