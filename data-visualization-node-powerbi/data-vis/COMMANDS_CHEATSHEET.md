# Commands Cheat Sheet

Quick reference for all build and run commands.

---

## 🎯 Essential Commands

### First Time Setup
```bash
npm run setup
```

### Run Application (2 Terminals Required)

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

---

## 📦 Installation Commands

### Backend Dependencies
```bash
npm install
```

### Frontend Dependencies
```bash
cd client
npm install
```

### Install Everything
```bash
npm run setup
```

---

## 🚀 Backend Commands

| Command | Description | Port |
|---------|-------------|------|
| `npm start` | Start production server | 3001 |
| `npm run dev` | Start with auto-reload (nodemon) | 3001 |
| `npm install` | Install dependencies | - |

**Working Directory:** `data-vis/` (root)

---

## 💻 Frontend Commands

| Command | Description | Output |
|---------|-------------|--------|
| `npm start` | Start development server | http://localhost:3000 |
| `npm run build` | Build for production | `build/` folder |
| `npm test` | Run tests | Test results |
| `npm install` | Install dependencies | - |

**Working Directory:** `data-vis/client/`

---

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React Dashboard |
| Backend | http://localhost:3001 | Express API Server |
| Data API | http://localhost:3001/api/data | Get paginated data |
| Checks API | http://localhost:3001/api/checks | Get data checks |
| Filters API | http://localhost:3001/api/filters | Get filter options |
| Chart API | http://localhost:3001/api/data/chart | Get chart data |

---

## 🔄 Common Workflows

### Start Fresh Development
```bash
# Terminal 1
npm start

# Terminal 2 (new terminal)
cd client && npm start
```

### Production Build
```bash
cd client
npm run build
cd ..
npm start
```

### Clean Install
```bash
# Backend
rm -rf node_modules package-lock.json && npm install

# Frontend
cd client
rm -rf node_modules package-lock.json && npm install
```

---

## 🗑️ Cleanup Commands

### Remove Backend Dependencies
```bash
rm -rf node_modules package-lock.json
```

### Remove Frontend Dependencies
```bash
cd client
rm -rf node_modules package-lock.json
```

### Remove Frontend Build
```bash
cd client
rm -rf build
```

### Reset Database
```bash
rm data.db      # Linux/Mac
del data.db     # Windows
```

---

## 🛑 Stop Commands

### Stop Servers
```
Ctrl + C (in each terminal)
```

### Kill Port Process

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

---

## 🔍 Diagnostic Commands

### Check Node/npm Versions
```bash
node --version
npm --version
```

### Check Outdated Packages
```bash
npm outdated              # Backend
cd client && npm outdated # Frontend
```

### Check Running Processes
```bash
# Windows
netstat -ano | findstr :3001
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3001
lsof -i :3000
```

---

## 📊 Testing Commands

### Run Frontend Tests
```bash
cd client
npm test
```

### Run ESLint (if configured)
```bash
cd client
npm run lint
```

### Build Verification
```bash
cd client
npm run build
# Check for "Compiled successfully!"
```

---

## 🚢 Deployment Commands

### Build Production Frontend
```bash
cd client
npm run build
```

### Serve Production Build
```bash
cd client
npm install -g serve
serve -s build
```

### Start Production Backend
```bash
NODE_ENV=production npm start
```

---

## 📝 Git Commands (Bonus)

### Initial Commit
```bash
git add .
git commit -m "Initial commit"
```

### Ignore Files
```bash
# Add to .gitignore:
node_modules/
client/node_modules/
client/build/
data.db
.env
```

---

## 🔧 Update Commands

### Update Backend Packages
```bash
npm update
```

### Update Frontend Packages
```bash
cd client
npm update
```

### Update npm
```bash
npm install -g npm@latest
```

---

## ⚡ One-Liner Commands

### Complete Setup
```bash
npm run setup && npm start
```

### Clean and Reinstall
```bash
rm -rf node_modules package-lock.json && npm install && cd client && rm -rf node_modules package-lock.json && npm install
```

### Kill All Node Processes (Use with caution!)
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

---

## 📱 Platform-Specific Commands

### Windows (PowerShell)
```powershell
# Remove directories
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Kill process
Stop-Process -Id <PID> -Force
```

### Windows (Command Prompt)
```cmd
# Remove directories
rmdir /s /q node_modules
del package-lock.json

# Kill process
taskkill /PID <PID> /F
```

### Linux/Mac
```bash
# Remove directories
rm -rf node_modules package-lock.json

# Kill process
kill -9 <PID>
```

---

## 🎯 Most Used Commands (Quick Copy)

```bash
# Setup (one time)
npm run setup

# Run backend (Terminal 1)
npm start

# Run frontend (Terminal 2)
cd client && npm start

# Build production
cd client && npm run build

# Clean install
rm -rf node_modules package-lock.json && npm install
```

---

## 📞 Emergency Commands

### Nothing Works?
```bash
# Nuclear option - complete reset
rm -rf node_modules package-lock.json data.db
cd client && rm -rf node_modules package-lock.json build && cd ..
npm install
cd client && npm install && cd ..
npm start
# In new terminal:
cd client && npm start
```

### Database Corrupted?
```bash
rm data.db && npm start
```

### Port Issues?
```bash
# Change backend port in server.js:
const PORT = 3002;  // or any available port

# Update client proxy in client/package.json:
"proxy": "http://localhost:3002"
```

---

**💡 Tip:** Bookmark this page for quick reference during development!