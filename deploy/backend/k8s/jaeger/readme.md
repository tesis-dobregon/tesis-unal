## Install Jaeger Operator

```sh
helm install jaeger-operator jaegertracing/jaeger-operator --namespace observability --create-namespace
helm repo update
kubectl apply -f ./deploy/backend/k8s/jaeger/simplest.yaml
```

Troubleshooting:

```sh
kubectl delete mutatingwebhookconfiguration jaeger-operator-mutating-webhook-configuration
```
