VERSION=$(grep '"version":' package.json | sed -E 's/.*"([^"]+)".*/\1/')

# Set the KUBECONFIG environment variable
export KUBECONFIG=/Users/howdy/Documents/civo-k8s-smart-city-unal-kubeconfig

# Call the build script
# npm run backend:docker:build

# Update the kustomization.yaml with the new image tag
sed -i '' -e "s/newTag: .*/newTag: $VERSION/" ./deploy/backend/k8s/app/kustomization.yaml

# Create secret in k8s
kubectl create secret tls self-signed-tls --key ./certs/self-signed-tls.key --cert ./certs/self-signed-tls.crt

# Deploy nginx ingress controller in k8s
kubectl apply -f ./deploy/backend/k8s/nginx/ingress-controller.yaml

# Workaround to get rid of error
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

# Create secret to store sensitive data
kubectl apply -f ./deploy/backend/k8s/app/secret.yaml

# Deploy backend in k8s using kustomize to append the new image tag
kubectl apply -k ./deploy/backend/k8s/app --validate=false
