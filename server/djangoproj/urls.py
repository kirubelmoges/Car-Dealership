"""djangoproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Frontend Routes - React Single Page App
    path('', TemplateView.as_view(template_name="index.html"), name='home'),
    path('register/', TemplateView.as_view(template_name="index.html"), name='register'),
    path('login/', TemplateView.as_view(template_name="index.html"), name='login'),
    path('home1/', TemplateView.as_view(template_name="index.html"), name='home1'),
    path('about/', TemplateView.as_view(template_name="index.html"), name='about'),
    path('contact/', TemplateView.as_view(template_name="index.html"), name='contact'),
    path('dealers/', TemplateView.as_view(template_name="index.html"), name='dealers'),
    path('dealer/<int:dealer_id>/', TemplateView.as_view(template_name="index.html"), name='dealer_detail'),
    path('postreview/<int:dealer_id>/', TemplateView.as_view(template_name="index.html"), name='post_review'),
    
    # API Routes - DjangoApp URLs
    path('djangoapp/', include('djangoapp.urls')),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)