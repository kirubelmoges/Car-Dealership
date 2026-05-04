from django.urls import path
from . import views

urlpatterns = [
    # Car API endpoints
    path('get_cars/', views.get_cars, name='get_cars'),
    
    # Authentication endpoints
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_request, name='logout'),
    path('register/', views.registration, name='register'),  # Note: 'registration' not 'register'
    
    # Dealership endpoints
    path('get_dealers/', views.get_dealerships, name='get_dealers'),
    path('get_dealers/<str:state>/', views.get_dealerships, name='get_dealers_by_state'),
    
    # Dealer details
    path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    
    # Reviews endpoints
    path('reviews/dealer/<int:dealer_id>/', views.get_dealer_reviews, name='dealer_reviews'),
    path('add_review/', views.add_review, name='add_review'),
]