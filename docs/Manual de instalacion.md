# Manual de instalación

Este documento describe los pasos necesarios para instalar y configurar la aplicación en un entorno local. La aplicación se compone de varios servicios y componentes, por lo que es importante seguir las instrucciones detalladamente para garantizar un despliegue exitoso.

## Requisitos previos

Antes de comenzar con la instalación, asegúrese de tener instalado lo siguiente en su sistema:

- [Node.js](https://nodejs.org/es/download/): La aplicación está desarrollada en JavaScript y requiere Node.js para ejecutarse. Se recomienda instalar la versión LTS más reciente.
- [Docker](https://docs.docker.com/get-docker/): La aplicación utiliza contenedores Docker para facilitar el despliegue y la gestión de los servicios.
- [Docker Compose](https://docs.docker.com/compose/install/): Docker Compose es una herramienta que permite definir y ejecutar aplicaciones Docker de múltiples contenedores. Se utiliza para orquestar los servicios de la aplicación.

## Pasos de instalación

Siga los pasos a continuación para instalar la aplicación en su entorno local:

1. **Clonar el repositorio**: Descargue una copia del repositorio en su máquina local utilizando Git:

   ```bash
   git clone git@github.com:tesis-dobregon/tesis-unal.git
   ```

2. **Configurar variables de entorno**: Copie el archivo `.env.example` a `.env` y modifique las variables de entorno según sea necesario. Este archivo contiene la configuración de la base de datos, el servidor de autenticación y otros servicios.

   ```bash
   cp .env.example .env
   ```

3. **Iniciar frontend**: Para iniciar el frontend de la aplicación, ejecute el siguiente comando:

   ```bash
   npm run frontend:serve
   ```

4. **Verificar el estado del frontend**: Puede ir a la dirección [http://localhost:4200/](http://localhost:4200/) en su navegador para verificar que el frontend esté funcionando correctamente.

5. **Iniciar el backend (microservicios) y las bases de datos**: Para iniciar los microservicios de la aplicación y las bases de datos, ejecute el siguiente comando:

   ```bash
   npm run backend:dev
   ```

6. **Verificar el estado de los microservicios**: Puede acceder a la dirección [http://0.0.0.0:3000/api](http://0.0.0.0:3000/api) en su navegador para verificar que los microservicios estén funcionando correctamente.

7. **Iniciar el gateway usando docker y docker-compose**: Para iniciar el API Gateway de la aplicación, ejecute el siguiente comando:

   ```bash
   npm run gateway:start
   ```

8. **Verificar el estado del API Gateway**: Puede verificar en la consola que el API Gateway esté funcionando correctamente.

9. **Iniciar el simulador de sensores**: Para iniciar el simulador de sensores, ejecute el siguiente comando:

   ```bash
   npm run simulator:start
   ```

Puede configurar el número de sensores y la frecuencia de envío de datos modificando las variables `NUMBER_OF_SIMULATED_SENSORS`
`FREQUENCY_TO_PUBLISH_SIMULATED_DATA` en el archivo `.env` en el archivo `services/simulator/simulator.service.js`.

10. **Verificar el estado del simulador de sensores**: Puede verificar en la consola que el simulador de sensores esté funcionando correctamente.

11. **Acceder a la aplicación**: Puede ir a la dirección [http://localhost:4200/](http://localhost:4200/) en su navegador para acceder a la aplicación y comenzar a utilizarla.
