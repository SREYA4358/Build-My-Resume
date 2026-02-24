# 🚀 How to Run the Resume Builder Project

## Quick Start Guide

### Step 1: Check Python Installation

```bash
python3 --version
# Should show Python 3.8 or higher
```

### Step 2: Create Virtual Environment (if not exists)

```bash
# Navigate to project directory
cd /Users/anuragnarsingoju/Projects/django-project

# Create virtual environment
python3 -m venv venv
```

### Step 3: Activate Virtual Environment

```bash
# Activate the virtual environment
source venv/bin/activate

# Your terminal should now show (venv) at the beginning
```

### Step 4: Install Django (if not installed)

```bash
# Install Django and dependencies
pip install django
```

### Step 5: Run Migrations

```bash
# Create migration files for the updated Resume model
python manage.py makemigrations

# Apply migrations to create database tables
python manage.py migrate
```

### Step 6: Create Superuser (Optional - for admin access)

```bash
# Create an admin user
python manage.py createsuperuser

# Follow the prompts to set username, email, and password
```

### Step 7: Run the Development Server

```bash
# Start the Django development server
python manage.py runserver

# Server will start at: http://127.0.0.1:8000/
```

### Step 8: Open in Browser

Open your browser and go to:
- **Main App**: http://127.0.0.1:8000/
- **Admin Panel**: http://127.0.0.1:8000/admin/ (if you created superuser)

---

## Troubleshooting

### Issue: "No module named 'django'"
**Solution**: Make sure virtual environment is activated and Django is installed
```bash
source venv/bin/activate
pip install django
```

### Issue: "Port already in use"
**Solution**: Use a different port
```bash
python manage.py runserver 8080
```

### Issue: "Migrations not applied"
**Solution**: Run migrations
```bash
python manage.py migrate
```

### Issue: "CSRF token missing"
**Solution**: Make sure you're using Django's built-in authentication, not the localStorage version

---

## Current Status

⚠️ **Important**: The project currently uses localStorage for authentication (from the standalone version). To use Django's database:

1. You need to update `views.py` to use Django authentication
2. Update `urls.py` with proper routes
3. Update `script.js` to call Django APIs instead of localStorage

See `DJANGO_INTEGRATION_GUIDE.md` for complete integration steps.

---

## Quick Commands Reference

```bash
# Activate virtual environment
source venv/bin/activate

# Run server
python manage.py runserver

# Stop server
Ctrl + C

# Deactivate virtual environment
deactivate

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Open Django shell
python manage.py shell
```

---

## What You'll See

When you run the server and open http://127.0.0.1:8000/, you should see:
1. Landing page with Login/Signup forms
2. After signup/login → Dashboard with templates
3. Click "Use Template" → Resume builder with live preview
4. Fill in details → See live preview update
5. Click "Preview & Download" → Full preview page
6. Save resume → Returns to dashboard with saved resume

---

## Next Steps After Running

Once the server is running:
1. Test the current localStorage version
2. Follow `DJANGO_INTEGRATION_GUIDE.md` to integrate with Django database
3. Test all 6 templates to see their distinct designs
