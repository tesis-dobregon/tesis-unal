VERSION=$(grep '"version":' package.json | sed -E 's/.*"([^"]+)".*/\1/')
IMAGE_NAME="us.gcr.io/smart-city-unal/smart-city-unal"
FULL_IMAGE_NAME="$IMAGE_NAME:$VERSION"

# Call the build script
npm run docker:build

# Update the kustomization.yaml with the new image tag
sed -i '' -e "s/newTag: .*/newTag: $VERSION/" ./deploy/backend/k8s/app/kustomization.yaml

# Create secret in k8s
kubectl create secret tls self-signed-tls --key ./certs/self-signed-tls.key --cert ./certs/self-signed-tls.crt

# Deploy nginx ingress controller in k8s
kubectl apply -f ./deploy/backend/k8s/nginx/ingress-controller.yaml

# Workaround to get rid of error
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

# Deploy backend in k8s using kustomize to append the new image tag
kubectl apply -k ./deploy/backend/k8s/app --validate=false
