docker build --no-cache -t smart-city-unal . --platform="linux/amd64"
docker tag smart-city-unal:latest us.gcr.io/smart-city-unal/smart-city-unal:0.2.0
docker push us.gcr.io/smart-city-unal/smart-city-unal:0.2.0

kubectl apply -f ./deploy/backend/k8s/deployment.yaml
