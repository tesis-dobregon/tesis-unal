#!/bin/bash

# Variables
IMAGE_NAME="nano2766/smart-city-unal"
# IMAGE_NAME="us.gcr.io/smart-city-unal/smart-city-unal"
# Read the version from package.json
VERSION=$(grep '"version":' package.json | sed -E 's/.*"([^"]+)".*/\1/')
FULL_IMAGE_NAME="$IMAGE_NAME:$VERSION"

docker tag smart-city-unal:latest $FULL_IMAGE_NAME

# Build the Docker image
docker build --progress=plain --no-cache -t $FULL_IMAGE_NAME -f deploy/backend/Dockerfile . --platform="linux/amd64"

# Push the image to the container registry
docker push $FULL_IMAGE_NAME

# Output the full image name
echo "Built and pushed Docker image: $FULL_IMAGE_NAME"
