#!/bin/bash

echo "🚀 Starting deployment..."

# Load environment variables
set -a
source .env.prod
set +a

# Build and start containers
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

# Create superuser (optional)
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser

echo "✅ Deployment complete!"

# Show container status
docker-compose -f docker-compose.prod.yml ps