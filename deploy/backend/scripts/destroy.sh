# Delete all deployments
kubectl delete deployments --all

# Delete all stateful sets
kubectl delete statefulsets --all

# Delete all services
kubectl delete services --all

# Delete all config maps
kubectl delete configmaps --all

# Delete all persistent volume claims
kubectl delete pvc --all

# Verify that all resources are deleted
kubectl get all

# Delete ingress
kubectl delete ingress --all

# Delete secrets
kubectl delete secrets --all
