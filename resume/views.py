from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Resume

def index(request):
    """Landing page with login/signup"""
    return render(request, 'index.html')

def dashboard(request):
    """Dashboard with saved resumes and templates"""
    # For now, works without login (using localStorage)
    return render(request, 'dashboard.html')

def builder(request):
    """Resume builder/editor"""
    return render(request, 'builder.html')

def preview(request):
    """Preview and download page"""
    return render(request, 'preview.html')

# Old views (keep for compatibility)
@login_required
def resume_list(request):
    resumes = Resume.objects.filter(user=request.user)
    return render(request, 'resume/resume_list.html', {'resumes': resumes})

@login_required
def resume_create(request):
    if request.method == 'POST':
        Resume.objects.create(
            user=request.user,
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            summary=request.POST.get('summary'),
            experience=request.POST.get('experience'),
            college_name=request.POST.get('college_name'),
            degree=request.POST.get('degree'),
            graduation_year=request.POST.get('graduation_year'),
            gpa=request.POST.get('gpa'),
            skills=request.POST.get('skills'),
            projects=request.POST.get('projects'),
            certifications=request.POST.get('certifications'),
            template=request.POST.get('template', '1')
        )
        return redirect('resume_list')
    return render(request, 'resume/resume_create.html')

@login_required
def resume_detail(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id)
    return render(request, 'resume/resume_detail.html', {'resume': resume})


