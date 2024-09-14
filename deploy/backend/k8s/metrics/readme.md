Agregar los repositorios de Helm para Prometheus y Grafana:

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

Instalar Prometheus:

```
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

Instalar Grafana:

```
helm install grafana grafana/grafana --namespace monitoring --create-namespace
```

Para ver la contraseña de Grafana:

```
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
