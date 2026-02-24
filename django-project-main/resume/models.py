from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Resume(models.Model):
    TEMPLATE_CHOICES = [
        ('1', 'Clean Classic'),
        ('2', 'Modern'),
        ('3', 'Professional'),
        ('4', 'Creative'),
        ('5', 'Minimal'),
        ('6', 'One-Page'),
    ]
    
    # User relationship
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    
    # Template selection
    template = models.CharField(max_length=1, choices=TEMPLATE_CHOICES, default='1')
    
    # Contact Information
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    
    # Professional Summary
    summary = models.TextField(blank=True)
    
    # Experience
    experience = models.TextField(blank=True)
    
    # Education Details
    college_name = models.CharField(max_length=200, blank=True)
    degree = models.CharField(max_length=200, blank=True)
    graduation_year = models.CharField(max_length=4, blank=True)
    gpa = models.CharField(max_length=10, blank=True)
    
    # Skills
    skills = models.TextField(blank=True)
    
    # Projects
    projects = models.TextField(blank=True)
    
    # Certifications
    certifications = models.TextField(blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.name}'s Resume ({self.get_template_display()})"
