# 🚀 Resume Builder - Installation & Setup Guide

## Complete Setup Commands for Any Device

### Prerequisites
- Python 3.8 or higher
- Git (optional, for cloning)

---

## 📦 Option 1: Fresh Installation (Recommended)

### Step 1: Navigate to Project Directory
```bash
cd /path/to/django-project
```

### Step 2: Create Virtual Environment
```bash
python3 -m venv venv
```

### Step 3: Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Run Migrations
```bash
python manage.py migrate
```

### Step 6: Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### Step 7: Run the Server
```bash
python manage.py runserver
```

### Step 8: Open in Browser
```
http://127.0.0.1:8000/
```

---

## 🔄 Quick Start (If Already Set Up)

```bash
# Navigate to project
cd /path/to/django-project

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Run server
python manage.py runserver
```

---

## 📋 Complete Command List (Copy & Paste)

### For macOS/Linux:
```bash
# 1. Navigate to project
cd project path

# 2. Create virtual environment
python3 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run migrations
python manage.py migrate

# 6. Run server
python manage.py runserver
```

### For Windows:
```bash
# 1. Navigate to project
cd C:\path\to\django-project

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run migrations
python manage.py migrate

# 6. Run server
python manage.py runserver
```

---

## 🌐 Sharing Project to Other Devices

### Method 1: Using Git (Recommended)

**On your current device:**
```bash
# Initialize git repository (if not already)
cd project path
git init
git add .
git commit -m "Initial commit - Resume Builder"

# Push to GitHub/GitLab
git remote add origin https://github.com/yourusername/resume-builder.git
git push -u origin main
```

**On the new device:**
```bash
# Clone the repository
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Run server
python manage.py runserver
```

### Method 2: Using ZIP File

**On your current device:**
```bash
# Create a zip file (exclude venv and cache)
cd /Users/anuragnarsingoju/Projects
zip -r resume-builder.zip django-project -x "*/venv/*" "*/__pycache__/*" "*.pyc" "*/.DS_Store"
```

**On the new device:**
```bash
# Extract the zip file
unzip resume-builder.zip
cd django-project

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Run server
python manage.py runserver
```

---

## 📝 requirements.txt

The project includes a `requirements.txt` file with all dependencies:
```
asgiref==3.11.1
Django==6.0.2
sqlparse==0.5.5
```

---

## 🔧 Troubleshooting

### Issue: "python3: command not found"
**Solution:**
```bash
# Try using 'python' instead
python --version
python -m venv venv
```

### Issue: "Permission denied"
**Solution:**
```bash
# On macOS/Linux, use sudo
sudo python3 -m venv venv
```

### Issue: "Port 8000 already in use"
**Solution:**
```bash
# Use a different port
python manage.py runserver 8080
```

### Issue: "No module named 'django'"
**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Then install dependencies
pip install -r requirements.txt
```

### Issue: "Database is locked"
**Solution:**
```bash
# Stop the server (Ctrl+C) and restart
python manage.py runserver
```

---

## 🌍 Running on Network (Access from Other Devices on Same Network)

```bash
# Find your local IP address
# macOS/Linux:
ifconfig | grep "inet "
# Windows:
ipconfig

# Run server on all interfaces
python manage.py runserver 0.0.0.0:8000

# Access from other devices:
# http://YOUR_LOCAL_IP:8000/
# Example: http://192.168.1.100:8000/
```

**Important:** Update `settings.py`:
```python
ALLOWED_HOSTS = ['*']  # For development only
```

---

## 📦 What's Included

```
django-project/
├── manage.py                      # Django management script
├── requirements.txt               # Python dependencies
├── db.sqlite3                     # SQLite database
├── HOW_TO_RUN.md                 # This file
├── DJANGO_INTEGRATION_GUIDE.md   # Integration guide
├── TEMPLATE_VISUAL_GUIDE.md      # Template designs
├── CHANGES_SUMMARY.md            # Recent changes
├── resumebuilder/                # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── ...
└── resume/                       # Main app
    ├── models.py                 # Database models
    ├── views.py                  # Views
    ├── urls.py                   # URL routing
    ├── migrations/               # Database migrations
    └── templates/                # HTML templates
        ├── index.html
        ├── dashboard.html
        ├── builder.html
        ├── preview.html
        ├── script.js
        └── static/
            └── style.css
```

---

## ✅ Verification Steps

After installation, verify everything works:

1. **Check Python version:**
   ```bash
   python --version  # Should be 3.8+
   ```

2. **Check Django installation:**
   ```bash
   python -c "import django; print(django.get_version())"
   ```

3. **Check migrations:**
   ```bash
   python manage.py showmigrations
   ```

4. **Run server:**
   ```bash
   python manage.py runserver
   ```

5. **Open browser:**
   ```
   http://127.0.0.1:8000/
   ```

---

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `python3 -m venv venv` | Create virtual environment |
| `source venv/bin/activate` | Activate venv (macOS/Linux) |
| `venv\Scripts\activate` | Activate venv (Windows) |
| `pip install -r requirements.txt` | Install dependencies |
| `python manage.py migrate` | Apply database migrations |
| `python manage.py runserver` | Start development server |
| `python manage.py createsuperuser` | Create admin user |
| `deactivate` | Deactivate virtual environment |
| `Ctrl + C` | Stop the server |

---

## 🚀 Production Deployment (Optional)

For production deployment, consider:
- **Heroku**: Easy deployment with Git
- **PythonAnywhere**: Free tier available
- **DigitalOcean**: Full control with droplets
- **AWS/GCP**: Scalable cloud solutions

See Django deployment documentation for details.

---

## 📞 Support

If you encounter issues:
1. Check `DJANGO_INTEGRATION_GUIDE.md` for detailed integration steps
2. Check `TEMPLATE_VISUAL_GUIDE.md` for template information
3. Check `CHANGES_SUMMARY.md` for recent updates

---

**Happy Resume Building! 🎉**
