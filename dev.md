## Dev Notes

### Despliegue y Destroy

Desplegar todo usando el comando:

```sh
$ yarn deploy:backend
```

Destruir todo (antes de terminar cada sesión de desarrollo para evitar sobrecostos):

```sh
$ yarn destroy:backend
```

### Ingress K8S

- Instrucciones utilizadas para generar agregar TLS al ingress de K8S [aqui](https://medium.com/@muppedaanvesh/%EF%B8%8F-kubernetes-ingress-transitioning-to-https-with-self-signed-certificates-0c7ab0231e76)

Comando usado para generar el self-signed certificate (generados en la carpeta `certs`):

```sh
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -out self-signed-tls.crt -keyout self-signed-tls.key \
    -subj "/CN=smart-city-unal.com" \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /etc/ssl/openssl.cnf \
        <(printf "[SAN]\nsubjectAltName=DNS:smart-city-unal.com,DNS:*.smart-city-unal.com"))
```

Probar conexión segura https:

```sh
$ curl -v https://34.42.148.211 -H 'Host: smart-city-unal.com' -k                                                                                        ─╯
```

Probar conexión http (un 308 Permanent Redirect es esperado si https está habilitado):

```sh
$ curl http://34.42.148.211 -H 'Host: smart-city-unal.com' -k
```

Crear secret (necesario antes de todo):

```sh
$ kubectl create secret tls self-signed-tls --key ./certs/self-signed-tls.key --cert ./certs/self-signed-tls.crt
```

Workaround para solucionar error "Error from server (InternalError): error when creating "./deploy/backend/k8s/deployment.yaml": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": failed to call webhook: Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": tls: failed to verify certificate: x509: certificate signed by unknown authority":

```sh
$ kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```
