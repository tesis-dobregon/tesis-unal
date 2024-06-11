docker build --no-cache -t smart-city-unal -f deploy/backend/Dockerfile . --platform="linux/amd64"
docker tag smart-city-unal:latest us.gcr.io/smart-city-unal/smart-city-unal:0.2.0
docker push us.gcr.io/smart-city-unal/smart-city-unal:0.2.0

# Create secret in k8s
kubectl create secret tls self-signed-tls --key ./certs/self-signed-tls.key --cert ./certs/self-signed-tls.crt

# Deploy nginx ingress controller in k8s
kubectl apply -f ./deploy/backend/k8s/ingress-controller.yaml

# Workaround to get rid of error
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

# Deploy backend in k8s
kubectl apply -f ./deploy/backend/k8s/deployment.yaml
