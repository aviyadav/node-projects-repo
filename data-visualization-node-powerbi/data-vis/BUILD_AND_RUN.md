# Build and Run Guide

Complete guide for building and running the Data Visualization project (both server and client).

---

## 🚀 Quick Start (Recommended)

### One-Time Setup
```bash
# Install all dependencies (backend + frontend)
npm run setup
```

### Running the Application

**Option 1: Using Two Terminals (Recommended for Development)**

Terminal 1 - Backend Server:
```bash
npm start
```

Terminal 2 - Frontend Client:
```bash
cd client
npm start
```

---

## 📦 Detailed Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

Check your versions:
```bash
node --version
npm --version
```

---

## 🔧 Backend (Server) Commands

### Install Backend Dependencies
```bash
npm install
```

### Run Backend Server

**Production Mode:**
```bash
npm start
```
- Runs on: http://localhost:3001
- Uses: `node server.js`

**Development Mode (with auto-restart):**
```bash
npm run dev
```
- Requires: nodemon installed globally or as dev dependency
- Auto-restarts server on file changes

### Backend Environment
- **Port:** 3001 (default)
- **Database:** SQLite (data.db - auto-created)
- **API Base:** http://localhost:3001/api

---

## 💻 Frontend (Client) Commands

### Navigate to Client Directory
```bash
cd client
```

### Install Frontend Dependencies
```bash
npm install
```

### Run Frontend Development Server
```bash
npm start
```
- Runs on: http://localhost:3000
- Opens browser automatically
- Hot-reload enabled (changes reflect instantly)
- Proxies API requests to backend (port 3001)

### Build Frontend for Production
```bash
npm run build
```
- Creates optimized production build
- Output: `client/build/` directory
- Minified and optimized assets
- Ready for deployment

### Serve Production Build (Testing)
```bash
# Install serve globally (one-time)
npm install -g serve

# Serve the production build
serve -s build
```
- Serves static build on http://localhost:3000 (or next available port)

### Run Frontend Tests
```bash
npm test
```
- Runs test suite in watch mode
- Interactive test runner

---

## 📋 Complete Command Reference

### Initial Setup (First Time Only)

```bash
# Clone or download the project
cd data-vis

# Install all dependencies (backend + frontend)
npm run setup

# Alternative: Manual installation
npm install              # Install backend deps
cd client
npm install              # Install frontend deps
cd ..
```

### Daily Development Workflow

**Terminal 1 - Backend:**
```bash
cd data-vis
npm start
# or for auto-restart:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd data-vis/client
npm start
```

### Production Build

**Build Frontend:**
```bash
cd data-vis/client
npm run build
```

**Run Backend in Production:**
```bash
cd data-vis
NODE_ENV=production npm start
```

---

## 🌐 Access URLs

After running both servers:

- **Frontend Application:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Endpoints:**
  - http://localhost:3001/api/data
  - http://localhost:3001/api/checks
  - http://localhost:3001/api/filters
  - http://localhost:3001/api/data/chart

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (Port 3001):**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

**Frontend (Port 3000):**
- React will automatically prompt to use a different port (e.g., 3001)
- Or manually kill the process using commands above

### Clear Node Modules and Reinstall

**Backend:**
```bash
cd data-vis
rm -rf node_modules package-lock.json
npm install
```

**Frontend:**
```bash
cd data-vis/client
rm -rf node_modules package-lock.json
npm install
```

**Windows (PowerShell):**
```powershell
# Backend
cd data-vis
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Frontend
cd client
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Database Reset

```bash
# Stop the server
# Delete the database file
rm data.db        # Linux/Mac
del data.db       # Windows

# Restart the server - database will be recreated with sample data
npm start
```

### Clear Build Cache (Frontend)

```bash
cd client
rm -rf build
npm run build
```

---

## 📊 Verification Checklist

After running the application, verify:

✅ **Backend Server:**
- [ ] Terminal shows: "Server running on port 3001"
- [ ] Terminal shows: "Database initialized"
- [ ] Can access http://localhost:3001/api/checks (returns JSON)

✅ **Frontend Client:**
- [ ] Terminal shows: "Compiled successfully!"
- [ ] Browser opens automatically to http://localhost:3000
- [ ] No errors in browser console (F12)
- [ ] Can see dashboard with charts and table
- [ ] Data loads in the table

✅ **Integration:**
- [ ] Clicking on "Data Checks" filters update the display
- [ ] Charts show data points
- [ ] Table shows paginated records
- [ ] Filters work (Category, Region, Sales Range)

---

## 🔄 Common Workflows

### Starting Fresh Development Session

```bash
# Terminal 1
cd data-vis
npm start

# Terminal 2 (new terminal)
cd data-vis/client
npm start
```

### Making Changes

**Backend Changes (server.js):**
- Save file
- If using `npm run dev`: Auto-restarts
- If using `npm start`: Manually stop (Ctrl+C) and restart

**Frontend Changes (React components):**
- Save file
- Hot-reload applies changes automatically
- No need to restart server

### Testing Production Build

```bash
# Build frontend
cd data-vis/client
npm run build

# Start backend
cd ..
npm start

# Serve frontend build (in new terminal)
cd client
npx serve -s build -l 3000
```

---

## 🚢 Deployment Preparation

### Frontend Production Build
```bash
cd client
npm run build
```
- Output: `client/build/` folder
- Deploy this folder to: Netlify, Vercel, AWS S3, etc.

### Backend Deployment
- Deploy `server.js` and dependencies to: Heroku, AWS, DigitalOcean, etc.
- Ensure `data.db` is in `.gitignore` for version control
- Use environment variables for production configuration

---

## 📝 Environment Variables (Optional)

Create `.env` files for configuration:

**Backend (.env in root):**
```
PORT=3001
NODE_ENV=development
DB_PATH=./data.db
```

**Frontend (.env in client/):**
```
REACT_APP_API_URL=http://localhost:3001
```

---

## 🛠️ Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- SQLite Viewer

### Useful Commands

**Check for outdated packages:**
```bash
npm outdated              # Backend
cd client && npm outdated # Frontend
```

**Update packages:**
```bash
npm update              # Backend
cd client && npm update # Frontend
```

**Run ESLint:**
```bash
cd client
npm run lint
```

---

## 📞 Support

If you encounter issues:

1. Check that both servers are running
2. Verify ports 3000 and 3001 are available
3. Check browser console for errors (F12)
4. Check terminal outputs for error messages
5. Try clearing node_modules and reinstalling
6. Review the FIXES_SUMMARY.md for known issues

---

## ✨ Summary

**Simplest way to run everything:**

```bash
# One-time setup
npm run setup

# Then always run these two commands in separate terminals:
# Terminal 1:
npm start

# Terminal 2:
cd client && npm start
```

**Access the app at:** http://localhost:3000

**That's it! Happy coding! 🎉**