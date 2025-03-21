#!/bin/bash
# This script tests the API

echo "Testing API endpoints..."
echo "GET /api/posts"
curl -s http://localhost:5000/api/posts | jq

echo "GET /api/categories"
curl -s http://localhost:5000/api/categories | jq

echo "GET /api/posts/featured"
curl -s http://localhost:5000/api/posts/featured | jq