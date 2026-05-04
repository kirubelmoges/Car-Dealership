#!/bin/sh

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser if needed (optional)
echo "from django.contrib.auth.models import User; User.objects.filter(email='admin@example.com').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')" | python manage.py shell

# Start server
python manage.py runserver 0.0.0.0:8000
