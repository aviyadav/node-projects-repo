# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies (One-Time Setup)
```bash
npm run setup
```

### Step 2: Start Backend Server
**Terminal 1:**
```bash
npm start
```
Wait for: `Server running on port 3001`

### Step 3: Start Frontend Client
**Terminal 2:**
```bash
cd client
npm start
```
Browser opens automatically at: http://localhost:3000

---

## ✅ That's It!

Your application is now running:
- **Frontend:** http://localhost:3000 (Dashboard UI)
- **Backend:** http://localhost:3001 (API Server)

---

## 📝 Daily Usage

Every time you want to run the app:

**Terminal 1:**
```bash
npm start
```

**Terminal 2:**
```bash
cd client
npm start
```

---

## 🛑 Stopping the Application

In each terminal, press: `Ctrl + C`

---

## 🔧 Common Commands

### Backend (from root directory)
```bash
npm install          # Install dependencies
npm start           # Start server (production)
npm run dev         # Start with auto-restart (development)
```

### Frontend (from client directory)
```bash
cd client
npm install          # Install dependencies
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
```

---

## 🐛 Quick Troubleshooting

### Port 3001 already in use?
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Port 3000 already in use?
React will ask if you want to use port 3001 instead. Type `Y` and press Enter.

### Not working? Try a fresh install:
```bash
# Backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### Reset Database:
```bash
# Stop server, then:
rm data.db          # Linux/Mac
del data.db         # Windows
# Restart server - DB recreates with sample data
```

---

## 📚 Need More Details?

- **Full Guide:** See `BUILD_AND_RUN.md`
- **Bug Fixes:** See `FIXES_SUMMARY.md`
- **Features:** See `README.md`

---

## 🎉 Success!

If you see:
- ✅ "Compiled successfully!" in Terminal 2
- ✅ Dashboard with charts and data table in browser
- ✅ No errors in browser console (F12)

**You're all set!** Start exploring the application.