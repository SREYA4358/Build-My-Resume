# BUILD MY RESUME - Django Integration Guide

## 📋 Overview

This guide explains how to integrate the resume builder with Django database and implement 6 visually distinct templates.

## 🗄️ Database Setup

### 1. Model Updates (COMPLETED ✅)

The `Resume` model in `project path/resume/models.py` has been updated with:

- Template selection (6 choices)
- All resume fields (name, email, phone, summary, experience, etc.)
- Education details (college_name, degree, graduation_year, gpa)
- Projects and certifications
- Timestamps (created_at, updated_at)

### 2. Run Migrations

```bash
# Activate your virtual environment first
source venv/bin/activate  # or your venv path

# Create migrations
python manage.py makemigrations resume

# Apply migrations
python manage.py migrate
```

## 🎨 6 Distinct Resume Templates

Each template has a unique visual design:

### Template 1: Clean Classic (Experienced)
- **Layout**: Traditional single-column
- **Font**: Georgia (serif)
- **Colors**: Navy blue headers (#1e40af)
- **Style**: Professional, timeless
- **Best for**: Executives, senior professionals

### Template 2: Modern (Experienced)
- **Layout**: Two-column with sidebar
- **Font**: Trebuchet MS (sans-serif)
- **Colors**: Teal accent (#14b8a6)
- **Style**: Contemporary, bold
- **Best for**: Creative professionals, designers

### Template 3: Professional (Experienced)
- **Layout**: Single-column with boxed sections
- **Font**: Arial (sans-serif)
- **Colors**: Dark gray (#374151)
- **Style**: Corporate, structured
- **Best for**: Technical roles, corporate positions

### Template 4: Creative (Fresher)
- **Layout**: Asymmetric with colored sidebar
- **Font**: Poppins (modern sans-serif)
- **Colors**: Purple gradient (#8b5cf6 to #ec4899)
- **Style**: Eye-catching, artistic
- **Best for**: Designers, creative fields

### Template 5: Minimal (Fresher)
- **Layout**: Clean single-column, lots of whitespace
- **Font**: Inter (clean sans-serif)
- **Colors**: Subtle blue (#3b82f6)
- **Style**: Simple, content-focused
- **Best for**: Recent graduates, freshers

### Template 6: One-Page (All Levels)
- **Layout**: Compact, efficient spacing
- **Font**: Roboto (condensed)
- **Colors**: Green accent (#10b981)
- **Style**: Condensed, information-dense
- **Best for**: Quick applications, job fairs

## 📁 Files to Keep vs Remove

### ✅ KEEP (Django Project Files)

```
django-project/
├── manage.py
├── db.sqlite3
├── resumebuilder/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── resume/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py          # ✅ UPDATED
    ├── views.py           # ⚠️ NEEDS UPDATE
    ├── urls.py
    ├── migrations/
    └── templates/
        ├── index.html     # ✅ UPDATED
        ├── dashboard.html # ✅ UPDATED
        ├── builder.html   # ✅ UPDATED
        ├── preview.html   # ✅ UPDATED
        ├── script.js      # ✅ UPDATED
        └── static/
            └── style.css  # ✅ UPDATED
```

### ❌ REMOVE (Unnecessary Files)

```
django-project/
└── standalone-resume-builder/  # ❌ DELETE ENTIRE FOLDER
    ├── index.html
    ├── dashboard.html
    ├── builder.html
    ├── preview.html
    ├── script.js
    ├── style.css
    ├── README.md
    └── PROJECT_STATUS.md
```

### 🗑️ Clean Up Old Template Files

```
resume/templates/
└── resume/              # ❌ DELETE if exists (old structure)
    ├── resume_list.html
    ├── resume_create.html
    └── resume_detail.html
```

## 🔄 Next Steps

### Step 1: Update Views (views.py)

Replace localStorage logic with Django ORM:

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import Resume
import json

def index(request):
    """Landing page with login/signup"""
    return render(request, 'index.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    return redirect('index')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('email')  # or username
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('dashboard')
    return redirect('index')

@login_required
def dashboard(request):
    """Dashboard with saved resumes and templates"""
    resumes = Resume.objects.filter(user=request.user)
    return render(request, 'dashboard.html', {'resumes': resumes})

@login_required
def builder(request, resume_id=None):
    """Resume builder/editor"""
    resume = None
    if resume_id:
        resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    template_id = request.GET.get('template', '1')
    
    return render(request, 'builder.html', {
        'resume': resume,
        'template_id': template_id
    })

@login_required
def save_resume(request):
    """Save resume to database"""
    if request.method == 'POST':
        data = json.loads(request.body)
        resume_id = data.get('id')
        
        if resume_id:
            # Update existing
            resume = get_object_or_404(Resume, id=resume_id, user=request.user)
        else:
            # Create new
            resume = Resume(user=request.user)
        
        # Update fields
        resume.name = data.get('name')
        resume.email = data.get('email')
        resume.phone = data.get('phone', '')
        resume.summary = data.get('summary', '')
        resume.experience = data.get('experience', '')
        resume.college_name = data.get('collegeName', '')
        resume.degree = data.get('degree', '')
        resume.graduation_year = data.get('graduationYear', '')
        resume.gpa = data.get('gpa', '')
        resume.skills = data.get('skills', '')
        resume.projects = data.get('projects', '')
        resume.certifications = data.get('certifications', '')
        resume.template = data.get('template', '1')
        
        resume.save()
        
        return JsonResponse({'success': True, 'id': resume.id})
    
    return JsonResponse({'success': False})

@login_required
def delete_resume(request, resume_id):
    """Delete a resume"""
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    resume.delete()
    return redirect('dashboard')

@login_required
def preview(request):
    """Preview page"""
    return render(request, 'preview.html')
```

### Step 2: Update URLs (urls.py)

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('builder/', views.builder, name='builder'),
    path('builder/<int:resume_id>/', views.builder, name='builder_edit'),
    path('save/', views.save_resume, name='save_resume'),
    path('delete/<int:resume_id>/', views.delete_resume, name='delete_resume'),
    path('preview/', views.preview, name='preview'),
]
```

### Step 3: Update JavaScript (script.js)

Replace localStorage calls with Django API calls:

```javascript
// Instead of:
localStorage.setItem('rb_users', JSON.stringify(users));

// Use:
fetch('/signup/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify(userData)
})

// Instead of:
const resumes = JSON.parse(localStorage.getItem(`resumes_${session}`) || "[]");

// Use:
fetch('/api/resumes/')
    .then(response => response.json())
    .then(resumes => {
        // Update UI
    });
```

### Step 4: Add Template Styles to CSS

Add distinct styles for each template in `style.css`:

```css
/* Template 1: Clean Classic */
.resume.template-1 {
  font-family: 'Georgia', serif;
  color: #1e3a8a;
}

.resume.template-1 h2 {
  color: #1e40af;
  border-bottom: 2px solid #1e40af;
}

/* Template 2: Modern with Teal */
.resume.template-2 {
  font-family: 'Trebuchet MS', sans-serif;
  border-left: 4px solid #14b8a6;
}

.resume.template-2 h2 {
  color: #14b8a6;
  background: #f0fdfa;
  padding: 0.5rem;
}

/* Template 3: Professional Gray */
.resume.template-3 {
  font-family: 'Arial', sans-serif;
}

.resume.template-3 .r-section {
  background: #f9fafb;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

/* Template 4: Creative Purple Gradient */
.resume.template-4 {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to right, #faf5ff 0%, #ffffff 30%);
}

.resume.template-4 h2 {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Template 5: Minimal Clean */
.resume.template-5 {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
}

.resume.template-5 h2 {
  font-weight: 300;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #3b82f6;
  border-bottom: 1px solid #e5e7eb;
}

/* Template 6: One-Page Compact */
.resume.template-6 {
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  line-height: 1.4;
}

.resume.template-6 .r-section {
  margin-bottom: 0.8rem;
}

.resume.template-6 h2 {
  font-size: 0.95rem;
  color: #10b981;
  margin-bottom: 0.4rem;
}
```

## 🧹 Cleanup Commands

Run these commands to remove unnecessary files:

```bash
cd project path

# Remove standalone folder
rm -rf standalone-resume-builder/

# Remove old resume templates if they exist
rm -rf resume/templates/resume/
```

## ✅ Final Checklist

- [ ] Run migrations: `python manage.py makemigrations && python manage.py migrate`
- [ ] Update views.py with Django ORM logic
- [ ] Update urls.py with new routes
- [ ] Update script.js to use Django APIs instead of localStorage
- [ ] Add template-specific CSS styles
- [ ] Delete standalone-resume-builder folder
- [ ] Test signup/login flow
- [ ] Test resume creation with each template
- [ ] Test save/edit/delete functionality
- [ ] Verify all 6 templates look visually distinct

## 🎯 Expected Result

After completion:
- ✅ All data stored in SQLite database
- ✅ 6 visually distinct resume templates
- ✅ Django authentication (no localStorage)
- ✅ Clean project structure
- ✅ No unnecessary files
