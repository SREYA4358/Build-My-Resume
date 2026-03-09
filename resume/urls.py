from django.urls import path
from . import views

urlpatterns = [
    # New resume builder pages
    path('', views.index, name='index'),
    path('index.html', views.index, name='index_html'),  # For direct HTML access
    path('dashboard/', views.dashboard, name='dashboard'),
    path('dashboard.html', views.dashboard, name='dashboard_html'),  # For JS navigation
    path('builder/', views.builder, name='builder'),
    path('builder.html', views.builder, name='builder_html'),  # For JS navigation
    path('preview/', views.preview, name='preview'),
    path('preview.html', views.preview, name='preview_html'),  # For JS navigation
    
    # Old routes (keep for compatibility)
    path('resumes/', views.resume_list, name='resume_list'),
    path('resumes/create/', views.resume_create, name='resume_create'),
    path('resumes/<int:resume_id>/', views.resume_detail, name='resume_detail'),
]
