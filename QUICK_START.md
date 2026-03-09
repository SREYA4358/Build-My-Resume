# 🚀 QUICK START - Copy & Paste Commands

## For macOS/Linux (Current Device)

### One-Time Setup:
```bash
cd /Users/anuragnarsingoju/Projects/django-project
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Daily Use (After Setup):
```bash
cd /Users/anuragnarsingoju/Projects/django-project
source venv/bin/activate
python manage.py runserver
```

---

## For Other Devices (macOS/Linux)

### Automated Setup:
```bash
cd /path/to/django-project
chmod +x setup.sh
./setup.sh
```

### Manual Setup:
```bash
cd /path/to/django-project
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## For Windows

### Automated Setup:
```bash
cd C:\path\to\django-project
setup.bat
```

### Manual Setup:
```bash
cd C:\path\to\django-project
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🌐 Access the Application

After running the server, open your browser:
```
http://127.0.0.1:8000/
```

---

## 🛑 Stop the Server

Press: **Ctrl + C**

---

## 📦 Share Project to Other Devices

### Method 1: Using Git
```bash
# On current device (first time only)
cd /Users/anuragnarsingoju/Projects/django-project
git init
git add .
git commit -m "Resume Builder Project"
git remote add origin https://github.com/yourusername/resume-builder.git
git push -u origin main

# On new device
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
./setup.sh  # macOS/Linux
# OR
setup.bat   # Windows
```

### Method 2: Using ZIP
```bash
# On current device
cd /Users/anuragnarsingoju/Projects
zip -r resume-builder.zip django-project -x "*/venv/*" "*/__pycache__/*" "*.pyc"

# Transfer resume-builder.zip to new device

# On new device
unzip resume-builder.zip
cd django-project
./setup.sh  # macOS/Linux
# OR
setup.bat   # Windows
```

---

## 🔑 Essential Commands

| Command | Purpose |
|---------|---------|
| `python3 -m venv venv` | Create virtual environment |
| `source venv/bin/activate` | Activate (macOS/Linux) |
| `venv\Scripts\activate` | Activate (Windows) |
| `pip install -r requirements.txt` | Install all dependencies |
| `python manage.py migrate` | Setup database |
| `python manage.py runserver` | Start server |
| `python manage.py createsuperuser` | Create admin user |
| `deactivate` | Exit virtual environment |

---

## 📁 Files Needed for Transfer

When sharing the project, include:
- ✅ All `.py` files
- ✅ All `.html`, `.css`, `.js` files
- ✅ `requirements.txt`
- ✅ `manage.py`
- ✅ All documentation (`.md` files)
- ✅ `setup.sh` and `setup.bat`
- ❌ `venv/` folder (will be recreated)
- ❌ `__pycache__/` folders
- ❌ `.pyc` files
- ⚠️ `db.sqlite3` (optional - include if you want to keep data)

---

## 🎯 What You Get

After setup:
- ✅ 6 unique resume templates
- ✅ Live preview as you type
- ✅ Save multiple resumes
- ✅ Download as HTML
- ✅ Print-ready format
- ✅ Responsive design

---

## 📞 Need Help?

Check these files:
- `README.md` - Project overview
- `INSTALLATION_GUIDE.md` - Detailed setup
- `DJANGO_INTEGRATION_GUIDE.md` - Database integration
- `TEMPLATE_VISUAL_GUIDE.md` - Template designs

---

**That's it! You're ready to build amazing resumes! 🎉**
