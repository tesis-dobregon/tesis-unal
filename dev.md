## Dev Notes

### Despliegue y Destroy

Configurar kubeconfig:

```sh
export KUBECONFIG=/Users/howdy/Documents/civo-k8s-smart-city-unal-kubeconfig                                                          ─╯
```

Construir imagen de backend:

```sh
$ npm run backend:docker:build
```

Desplegar todo usando el comando:

```sh
$ npm run backend:deploy
```

Destruir todo (antes de terminar cada sesión de desarrollo para evitar sobrecostos):

```sh
$ npm run backend:destroy
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

## Listado de microservicios

### Users

Servicio de usuarios. Permite la creación de usuarios y la autenticación de los mismos.

#### Creación de usuario

- Creación en moleculer:

```
call users.create --user.username "john" --user.password "securePassword" --user.email "
```

- Creación en API:

```
curl -X POST http://0.0.0.0:3000/api/users -H "Content-Type: application/json" -d '{"user":{"username":"john","password":"securePassword","email":"john@example.com"}}'
```

- Ejemplo de respuesta:

```json
{
  "user": {
    "_id": "j2fNKvrjiUY50nix",
    "username": "john2",
    "email": "john2@example.com",
    "bio": "",
    "image": "",
    "token": "<token>"
  }
}
```

#### Obtener usuario

- Obtener en moleculer:

```
call users.get --id "j2fNKvrjiUY50nix"

```

- Obtener en API:

```
curl -X GET http://0.0.0.0:3000/api/users/j2fNKvrjiUY50nix

```

- Ejemplo de respuesta:

```json
{
  "_id": "j2fNKvrjiUY50nix",
  "username": "john2",
  "email": "john2@example.com",
  "bio": "",
  "image": null
}
```

#### Listar usuarios

- Listar en moleculer:

```
call users.list
```

- Listar en API:

```
curl -X GET http://0.0.0.0:3000/api/users
```

- Ejemplo de respuesta:

```json
{
  "rows": [
    {
      "_id": "j2fNKvrjiUY50nix",
      "username": "john2",
      "email": "john2@example.com",
      "bio": "",
      "image": null
    },
    {
      "_id": "uKPR6i2cFZRjpft4",
      "username": "john",
      "email": "john@example.com",
      "bio": "",
      "image": null
    }
  ],
  "total": 2,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

#### Borrar usuario

- Borrar en moleculer:

```
call users.remove --id "NiTfawzEOeV2C8tw"
```

- Borrar en API:

```
curl -X DELETE http://0.0.0.0:3000/api/users/NiTfawzEOeV2C8tw
```

#### Login

- Login en moleculer:

```
call users.login --email "john" --password "securePassword"
```

- Login en API:

```
curl -X POST http://0.0.0.0:3000/api/users/login -H "Content-Type: application/json" -d '{"email":"john@example.com", "password":"securePassword"}'
```

- Ejemplo de respuesta:

```json
{
  "user": {
    "username": "john",
    "email": "john@example.com",
    "bio": "",
    "image": "",
    "createdAt": "2024-07-19T00:19:03.120Z",
    "_id": "uKPR6i2cFZRjpft4",
    "token": "<token>"
  }
}
```

### Sensors

#### Registrar un nuevo sensor

- Registro en moleculer:

```
call sensors.register --name "sensor1" --customId "bcd123" --type "temperature" --measurementFrequency 120 --location.lat 0 --location.lon 0
```

- Registro en API:

```
 curl -X POST http://0.0.0.0:3000/api/sensors -H "Content-Type: application/json" -d '{"name":"sensor1","customId":"sensor_id_123","type":"temperature","measurementFrequency":120,"location":{"lat":0,"lon":0}}'
```

- Ejemplo de respuesta:

```json
{
  "_id": "66a852b0f29cefa0f952eac7",
  "customId": "sensor_id_123",
  "name": "sensor1",
  "type": "temperature",
  "status": "waiting",
  "location": {
    "lat": 0,
    "lon": 0
  },
  "measurementFrequency": 120,
  "createdAt": "2024-07-30T02:40:48.120Z"
}
```

#### Obtener un sensor por customId

- Obtener en moleculer:

```
call sensors.findByCustomId --customId "sensor_id_123"
```

- Obtener en API:

```
curl -X GET http://0.0.0.0:3000/api/sensors/sensor_id_123
```

- Ejemplo de respuesta:

```json
{
  "_id": "66bdfd1ed4e9fb3bfa5c2858",
  "customId": "AQ01",
  "name": "AirQualityUnit01",
  "type": "air_quality_standard",
  "status": "active",
  "location": {
    "lat": 0,
    "lon": 0
  },
  "measurementFrequency": 120,
  "createdAt": "2024-08-15T13:05:34.890Z"
}
```

#### Listar sensores

- Listar en moleculer:

```
call sensors.list
```

- Listar en API:

```
curl -X GET http://0.0.0.0:3000/api/sensors
```

- Ejemplo de respuesta:

```json
{
  "rows": [
    {
      "_id": "66a852b0f29cefa0f952eac7",
      "customId": "sensor_id_123",
      "name": "sensor1",
      "type": "temperature",
      "status": "waiting",
      "location": {
        "lat": 0,
        "lon": 0
      },
      "measurementFrequency": 120,
      "createdAt": "2024-07-30T02:40:48.120Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

#### Borrar sensor

- Borrar en moleculer:

```
call sensors.remove --id "66a85170f29cefa0f952eac6"
```

- Borrar en API:

```
curl -X DELETE http://0.0.0.0:3000/api/sensors/66a85170f29cefa0f952eac6
```

- Ejemplo de respuesta:

```json
{
  "_id": "66a85170f29cefa0f952eac6",
  "customId": "cde123",
  "name": "sensor1",
  "type": "temperature",
  "status": "waiting",
  "location": {
    "lat": 0,
    "lon": 0
  },
  "measurementFrequency": 120,
  "createdAt": "2024-07-30T02:35:28.617Z"
}
```

Cuando no se encuentra el sensor:

```json
{
  "name": "EntityNotFoundError",
  "message": "Entity not found",
  "code": 404,
  "type": null,
  "data": {
    "id": "66a85170f29cefa0f952eac6"
  }
}
```

### Ingestion

Este servicio se encarga de recibir los datos de los sensores y almacenarlos en la base de datos.

#### Enviar datos de un sensor

- Envío en moleculer:

```
call ingestion.recordSensorData --sensorId "AQ01" --data.date '2024-08-15T13:06:06.209Z' --data.uid 'AQ02' --data.name  'AirQualityUnit02' --data.description 'Air quality station in Duitama 2' --data.lat 5.814812360355247 --data.lng -73.0494939446564 --data.co 26 --data.co2 517 --data.pm10 21 --data.pm2_5 -2 --data.pm5 --data.hr 66.3 --data.temperature 17.45 --data.metadata.type 'air_quality_standard'
```

- Envio en API:

```
curl -X POST http://0.0.0.0:3000/api/ingestion/AQ01/data -H "Content-Type: application/json" -d '{"sensorId":"AQ01","data":{"date":"2024-08-15T13:06:06.209Z","uid":"AQ02","name":"AirQualityUnit02","description":"Air quality station in Duitama 2","lat":5.814812360355247,"lng":-73.0494939446564,"co":26,"co2":517,"pm10":21,"pm2_5":-2,"pm5":null,"hr":66.3,"temperature":17.45,"metadata":{"type":"air_quality_standard"}}}'
```

- Ejemplo de respuesta:

```json
{
  "sensorId": "AQ01",
  "data": {
    "date": "2024-08-15T13:06:06.209Z",
    "uid": "AQ02",
    "name": "AirQualityUnit02",
    "description": "Air quality station in Duitama 2",
    "lat": 5.814812360355247,
    "lng": -73.0494939446564,
    "co": 26,
    "co2": 517,
    "pm10": 21,
    "pm2_5": -2,
    "pm5": null,
    "hr": 66.3,
    "temperature": 17.45,
    "metadata": {
      "type": "air_quality_standard"
    }
  }
}
```

#### Listar datos de un sensor

- Listar por sensor en moleculer:

```
call ingestion.listSensorData --sensorId 'AQ00'
```

- Listar por rango de fechas en moleculer:

```
call ingestion.listSensorData --sensorId 'AQ00' --startDate '2024-08-16T03:14:56.522Z' --endDate '2024-08-16T03:14:58.522Z'
```

- Listar en API:

```
curl -X GET http://0.0.0.0:3000/api/ingestion\?startDate\=2024-08-16T03:14:56.522Z\&endDate\=2024-08-16T03:14:58.522Z\&sensorId\=AQ00
```

- Ejemplo de respuesta:

```json
[
  {
    "_id": "66bec430b72882526df3c740",
    "date": "2024-08-16T03:14:56.404Z",
    "uid": "AQ00",
    "name": "AirQualityUnit00",
    "description": "Air quality station in Duitama 0",
    "lat": 5.839508346114031,
    "lng": -73.01633260874388,
    "metadata": {
      "type": "air_quality_standard"
    },
    "co": 21,
    "co2": 443,
    "pm10": 47,
    "pm5": 29,
    "pm2_5": -22,
    "hr": 66.32,
    "temperature": 18.02,
    "createdAt": "2024-08-16T03:14:56.522Z"
  }
]
```

### Alerts

Este servicio es usado para crear alertas y notificar a los usuarios. Las alertas son creadas para cada
contaminante, con base en un valor umbral. Cuando el indice de calidad del aire supera el valor umbral, se
generate una alerta con base en la acción definida.

#### Crear alerta

- Crear en moleculer:

```
call alerts.create --contaminant 'pm2_5' --lowerThreshold 70 --upperThreshold 75 --action 'email' --metadata.email 'nano2766@gmail.com' --message 'El contaminante pm2_5 presenta valores dañinos para la salud'
```

- Crear en API:

```
curl -X POST http://0.0.0.0:3000/api/alerts -H "Content-Type: application/json" -d '{"contaminant":"pm10","lowerThreshold":70,"upperThreshold":75,"action":"email","metadata":{"email":"dobregon@unal.edu.co" } ,"message":"El contaminante pm10 presenta valores dañinos para la salud"}'
```

- Ejemplo de respuesta:

```json
{
  "contaminant": "pm10",
  "lowerThreshold": 70,
  "upperThreshold": 75,
  "action": "email",
  "metadata": {
    "email": "dobregon@unal.edu.co"
  },
  "message": "El contaminante pm10 presenta valores dañinos para la salud",
  "createdAt": "2024-08-19T00:58:01.579Z",
  "_id": "66c29899816e2a13518471c3"
}
```

#### Actualizar alerta

- Actualizar en moleculer:

```
call alerts.update --id "66c29899816e2a13518471c3" --contaminant 'pm10' --lowerThreshold 71
```

- Actualizar en API:

```
curl -X PUT http://0.0.0.0:3000/api/alerts/66c29899816e2a13518471c3 -H "Content-Type: application/json" -d '{"contaminant":"pm10","lowerThreshold":71,"upperThreshold":75}'
```

- Ejemplo de respuesta:

```json
{
  "_id": "66c29899816e2a13518471c3",
  "contaminant": "pm10",
  "lowerThreshold": 71,
  "upperThreshold": 75,
  "action": "email",
  "metadata": {
    "email": "dobregon@unal.edu.co"
  },
  "message": "El contaminante pm10 presenta valores dañinos para la salud",
  "createdAt": "2024-08-19T00:58:01.579Z",
  "id": "66c29899816e2a13518471c3"
}
```

#### Listar alertas

- Listar en moleculer:

```
call alerts.list
```

- Listar en API:

```
curl -X GET http://0.0.0.0:3000/api/alerts
```

- Ejemplo de respuesta:

```json
{
  "rows": [
    {
      "_id": "66c2854938ddbd6f33669202",
      "contaminant": "pm2_5",
      "lowerThreshold": 71,
      "upperThreshold": 75,
      "action": "email",
      "metadata": {
        "email": "nano2766@gmail.com"
      },
      "message": "El contaminante pm2_5 presenta valores dañinos para la salud",
      "createdAt": "2024-08-18T23:35:37.694Z"
    },
    {
      "_id": "66c29899816e2a13518471c3",
      "contaminant": "pm10",
      "lowerThreshold": 71,
      "upperThreshold": 75,
      "action": "email",
      "metadata": {
        "email": "dobregon@unal.edu.co"
      },
      "message": "El contaminante pm10 presenta valores dañinos para la salud",
      "createdAt": "2024-08-19T00:58:01.579Z"
    }
  ],
  "total": 2,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

#### Borrar alerta

- Borrar en moleculer:

```
call alerts.remove --id "66c2854938ddbd6f33669202"
```

- Borrar en API:

```
curl -X DELETE http://0.0.0.0:3000/api/alerts/66c2854938ddbd6f33669202
```

- Ejemplo de respuesta:

```json
{
  "_id": "66c29899816e2a13518471c3",
  "contaminant": "pm10",
  "lowerThreshold": 71,
  "upperThreshold": 75,
  "action": "email",
  "metadata": {
    "email": "dobregon@unal.edu.co"
  },
  "message": "El contaminante pm10 presenta valores dañinos para la salud",
  "createdAt": "2024-08-19T00:58:01.579Z"
}
```

### AQI (Indice de calidad del aire)

#### Obtener AQI:

- Obtener en moleculer:

```
call aqi.list
```

- Obtener en API:

```
curl -X GET http://0.0.0.0:3000/api/aqi\?sort\='-createdAt'
```

- Ejemplo de respuesta:

```json
{
  "rows": [
    {
      "_id": "66c3a2246326e039319531d1",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:51:00.060Z"
    },
    {
      "_id": "66c3a1e86326e039319531d0",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:50:00.050Z"
    },
    {
      "_id": "66c3a1ac6326e039319531cf",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:49:00.048Z"
    },
    {
      "_id": "66c3a1706326e039319531ce",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:48:00.068Z"
    },
    {
      "_id": "66c3a1346326e039319531cd",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:47:00.173Z"
    },
    {
      "_id": "66c3a0f86326e039319531cc",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:46:00.152Z"
    },
    {
      "_id": "66c3a0bc6326e039319531cb",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:45:00.061Z"
    },
    {
      "_id": "66c3a0806326e039319531ca",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:44:00.140Z"
    },
    {
      "_id": "66c3a0446326e039319531c9",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:43:00.079Z"
    },
    {
      "_id": "66c3a0086326e039319531c8",
      "pm2_5": 72.80046296296297,
      "pm10": 24.094650205761315,
      "co": 191.73946360153258,
      "createdAt": "2024-08-19T19:42:00.093Z"
    }
  ],
  "total": 273,
  "page": 1,
  "pageSize": 10,
  "totalPages": 28
}
```

### Email

Este servicio es usado para enviar correos electrónicos.
Actualmente no tiene rutas de API publicas, solo se puede usar desde el broker de mensajes.

TODO:

- Remove all console.logs
- Enable circuit breaker

- Necesito:
- Crear un MQTT broker posiblemente deployarlo en un contenedor no necesita ser kubernetes
- Un subscriber que se conecte al broker y reciba los datos de los sensores
- Un published (mock device) que envie datos al broker
- Un servicio que reciba los datos y los almacene en una base de datos
- El subscriber solo necesita recibir los datos y consumir el servicio REST para almacenarlos
- El subscriber NO necesariamente necesita ser un microservicio. Puede ser un script que se ejecute en un contenedor. Leer articulos de esto.

Probar frontend y backend unidos (tanto apuntando a local como al desplegado)
Implementar login
Desplegar frontend en algo

IP usada para conectar mqtt desde el celu:
ifconfig
inet 192.168.1.5 netmask 0xffffff00
