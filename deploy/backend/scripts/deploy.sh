VERSION=$(grep '"version":' package.json | sed -E 's/.*"([^"]+)".*/\1/')

# Set the KUBECONFIG environment variable
export KUBECONFIG=/Users/howdy/Documents/civo-k8s-smart-city-unal-kubeconfig

# Call the build script
npm run backend:docker:build

# Update the kustomization.yaml with the new image tag
sed -i '' -e "s/newTag: .*/newTag: $VERSION/" ./deploy/backend/k8s/app/kustomization.yaml

# Create secret to store sensitive data
kubectl apply -f ./deploy/backend/k8s/app/secret.yaml

# Deploy backend in k8s using kustomize to append the new image tag
kubectl apply -k ./deploy/backend/k8s/app --validate=false

# Now let's configure the ingress and TLS certificate
kubectl apply -f ./deploy/backend/k8s/app/clusterissuer.yaml

# Run some checks
kubectl get all -n kube-system | grep traefik
kubectl get pods -n cert-manager

# Apply certificate
kubectl apply -f ./deploy/backend/k8s/app/certificate.yaml

# Apply ingress
kubectl apply -f ./deploy/backend/k8s/app/ingress.yaml
