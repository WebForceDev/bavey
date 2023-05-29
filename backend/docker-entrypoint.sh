#!/bin/bash

# Collect static files
if [ "$MODE" == "production" ]; then
    echo "Collect static files"
    python manage.py collectstatic --noinput
fi

# Apply database migrations
# echo "Apply database migrations"
# python manage.py migrate

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8080
#daphne -b 0.0.0.0 -p 8080 bavey.asgi:application
