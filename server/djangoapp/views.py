# Uncomment the required imports before adding the code

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from datetime import datetime
from .restapis import get_request, analyze_review_sentiments, post_review

from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .population import initiate

from .models import CarMake, CarModel

def get_cars(request):
    count = CarMake.objects.filter().count()
    print(count)
    if(count == 0):
        print("Initiating car data...")
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
        cars.append({"CarModel": car_model.name, "CarMake": car_model.car_make.name})
    return JsonResponse({"CarModels":cars})


# Get an instance of a logger
logger = logging.getLogger(__name__)


# Create your views here.

# Create a `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    # Handle OPTIONS request
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    
    # Handle GET request
    if request.method == 'GET':
        return JsonResponse({"error": "Please use POST method to login"}, status=405)
    
    # Handle POST request
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('userName')
            password = data.get('password')
            
            if not username or not password:
                return JsonResponse({"error": "Username and password are required"}, status=400)
            
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                response = JsonResponse({"userName": username, "status": "Authenticated"})
                response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                return response
            else:
                return JsonResponse({"userName": username, "status": "Failed"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            return JsonResponse({"error": "Server error"}, status=500)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def logout_request(request):
    """Handle user logout"""
    if request.method == 'GET':
        username = request.user.username if request.user.is_authenticated else None
        logout(request)
        return JsonResponse({"userName": "", "status": "Logged out"})
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def registration(request):
    # Handle OPTIONS request (for CORS preflight)
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    
    # Handle GET request
    if request.method == 'GET':
        return JsonResponse({
            "error": "Please use POST method to register",
            "message": "Send a POST request with userName, password, firstName, lastName, email"
        }, status=405)
    
    # Handle POST request
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('userName')
            password = data.get('password')
            first_name = data.get('firstName', '')
            last_name = data.get('lastName', '')
            email = data.get('email', '')
            
            # Validate required fields
            if not username:
                return JsonResponse({"error": "Username is required"}, status=400)
            if not password:
                return JsonResponse({"error": "Password is required"}, status=400)
            if not email:
                return JsonResponse({"error": "Email is required"}, status=400)
            
            # Check if user already exists
            username_exist = User.objects.filter(username=username).exists()
            
            if username_exist:
                response = JsonResponse({
                    "userName": username,
                    "error": "Already Registered"
                }, status=400)
                response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                return response
            
            # Create new user
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email
            )
            
            # Login the user after registration
            login(request, user)
            
            response = JsonResponse({
                "userName": username,
                "status": "Authenticated"
            })
            response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            return response
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {str(e)}")
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)


def get_dealerships(request, state="All"):
    """Get dealerships, optionally filtered by state"""
    if request.method == 'GET':
        try:
            if(state == "All"):
                endpoint = "/fetchDealers"
            else:
                endpoint = "/fetchDealers/"+state
            dealerships = get_request(endpoint)
            return JsonResponse({"status": 200, "dealers": dealerships})
        except Exception as e:
            logger.error(f"Error fetching dealerships: {str(e)}")
            return JsonResponse({"status": 500, "error": str(e)}, status=500)
    return JsonResponse({"error": "Method not allowed"}, status=405)


def get_dealer_reviews(request, dealer_id):
    """Get reviews for a specific dealer"""
    if request.method == 'GET':
        if dealer_id:
            try:
                endpoint = "/fetchReviews/dealer/"+str(dealer_id)
                reviews = get_request(endpoint)
                for review_detail in reviews:
                    response = analyze_review_sentiments(review_detail['review'])
                    print(response)
                    review_detail['sentiment'] = response['sentiment']
                return JsonResponse({"status": 200, "reviews": reviews})
            except Exception as e:
                logger.error(f"Error fetching reviews: {str(e)}")
                return JsonResponse({"status": 500, "error": str(e)}, status=500)
        else:
            return JsonResponse({"status": 400, "message": "Bad Request - dealer_id required"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)


def get_dealer_details(request, dealer_id):
    """Get details for a specific dealer"""
    if request.method == 'GET':
        if dealer_id:
            try:
                endpoint = "/fetchDealer/"+str(dealer_id)
                dealership = get_request(endpoint)
                return JsonResponse({"status": 200, "dealer": dealership})
            except Exception as e:
                logger.error(f"Error fetching dealer details: {str(e)}")
                return JsonResponse({"status": 500, "error": str(e)}, status=500)
        else:
            return JsonResponse({"status": 400, "message": "Bad Request - dealer_id required"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def add_review(request):
    """Add a review for a dealer"""
    if request.method == 'POST':
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return JsonResponse({"status": 403, "message": "Unauthorized - Please login first"}, status=403)
        
        try:
            data = json.loads(request.body)
            response = post_review(data)
            return JsonResponse({"status": 200, "message": "Review posted successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"status": 400, "message": "Invalid JSON data"}, status=400)
        except Exception as e:
            logger.error(f"Error posting review: {str(e)}")
            return JsonResponse({"status": 500, "message": f"Error in posting review: {str(e)}"}, status=500)
    
    return JsonResponse({"status": 405, "message": "Method not allowed - Use POST"}, status=405)

