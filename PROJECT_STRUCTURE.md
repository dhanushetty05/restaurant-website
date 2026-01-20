# Restaurant Website - Project Structure

## 📁 Clean Project Structure

```
restaurant-website/
├── 📁 backend/                 # Node.js API Server
│   ├── 📁 node_modules/        # Dependencies (ignored by git)
│   ├── 📄 .env                 # Environment variables (ignored by git)
│   ├── 📄 .gitignore           # Backend git ignore rules
│   ├── 📄 package.json         # Backend dependencies
│   ├── 📄 package-lock.json    # Dependency lock file
│   └── 📄 server.js            # Main server file
│
├── 📁 frontend/                # React Frontend Application
│   ├── 📁 build/               # Production build (ignored by git)
│   ├── 📁 node_modules/        # Dependencies (ignored by git)
│   ├── 📁 plugins/             # Custom webpack plugins
│   ├── 📁 public/              # Static assets
│   ├── 📁 src/                 # Source code
│   │   ├── 📁 components/      # React components
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 lib/             # Utility functions
│   │   └── 📁 pages/           # Page components
│   ├── 📄 .env                 # Frontend environment (ignored by git)
│   ├── 📄 .gitignore           # Frontend git ignore rules
│   ├── 📄 components.json      # Shadcn/ui configuration
│   ├── 📄 craco.config.js      # Build configuration
│   ├── 📄 jsconfig.json        # JavaScript configuration
│   ├── 📄 package.json         # Frontend dependencies
│   ├── 📄 package-lock.json    # Dependency lock file
│   ├── 📄 postcss.config.js    # PostCSS configuration
│   └── 📄 tailwind.config.js   # Tailwind CSS configuration
│
├── 📄 .gitignore               # Root git ignore rules
├── 📄 design_guidelines.json   # Design system documentation
├── 📄 GOOGLE_SHEETS_SETUP.md   # Google Sheets integration guide
└── 📄 README.md                # Project documentation
```

## 🗑️ Removed Files/Folders

The following unnecessary files were removed to keep the project clean:

- ❌ `.emergent/` - Development environment specific
- ❌ `.dist/` - Empty build directory
- ❌ `default-development/` - Development cache files
- ❌ `tests/` - Empty Python test directory
- ❌ `test_result.md` - Testing protocol file
- ❌ `PRODUCT_LISTING.md` - Marketplace documentation
- ❌ `yarn.lock` files - Using npm instead
- ❌ `frontend/README.md` - Generic React readme

## 🔒 Git Ignore Configuration

### Root `.gitignore`
- Node modules and dependencies
- Environment files (.env)
- Build directories
- System files
- Development tools
- Credentials and tokens

### Backend `.gitignore`
- Environment variables
- Google Sheets credentials
- Database files
- Logs and runtime data

### Frontend `.gitignore`
- Build output
- Dependencies
- Environment files
- Testing coverage

## 🚀 Running the Project

### Start Backend:
```bash
cd backend
npm start
# Runs on http://localhost:8000
```

### Start Frontend:
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

## 📋 Essential Files Only

This cleaned structure contains only the files necessary for:
- ✅ Running the restaurant website
- ✅ Google Sheets integration
- ✅ Development and production builds
- ✅ Proper git version control
- ✅ Documentation and setup guides

The project is now optimized, clean, and ready for production deployment!