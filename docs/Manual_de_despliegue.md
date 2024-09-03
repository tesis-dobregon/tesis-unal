# Manual de despliegue

Este documento describe los pasos necesarios para desplegar la aplicación en un entorno de producción. La aplicación se compone de varios servicios y componentes, por lo que es importante seguir las instrucciones detalladamente para garantizar un despliegue exitoso.

## Requisitos previos

Antes de comenzar con el despliegue, asegúrese de tener instalado lo siguiente en su sistema:

- [Node.js](https://nodejs.org/es/download/): La aplicación está desarrollada en JavaScript y requiere Node.js para ejecutarse. Se recomienda instalar la versión LTS más reciente.
- [Docker](https://docs.docker.com/get-docker/): La aplicación utiliza contenedores Docker para facilitar el despliegue y la gestión de los servicios.
- [Kubernetes](https://kubernetes.io/docs/setup/): Kubernetes es una plataforma de código abierto para automatizar la implementación, el escalado y la administración de aplicaciones en contenedores. Se utiliza para orquestar los servicios de la aplicación en un entorno de producción.
- [Vercel](https://vercel.com/): Vercel es una plataforma de desarrollo web que permite implementar aplicaciones web de forma sencilla y rápida. Se utiliza para desplegar el frontend de la aplicación.

## Pasos de despliegue

Siga los pasos a continuación para desplegar la aplicación en un entorno de producción:

1. **Clonar el repositorio**: Descargue una copia del repositorio en su máquina local utilizando Git:

   ```bash
   git clone
   ```

## Desplegar backend

2. **Configurar cluster de Kubernetes**: Para configurar el cluster de Kubernetes, y ejecute el siguiente comando:

   ```bash
   export KUBECONFIG=/Users/howdy/Documents/civo-k8s-smart-city-unal-kubeconfig                                                          ─╯
   ```

   Este comando configurará el clúster de Kubernetes en su entorno local para que pueda desplegar los servicios en él.

3. **Ejecute el siguiente comando para desplegar los microservicios en Kubernetes**:

   ```bash
   npm run backend:deploy
   ```

   Este comando ejecutará un script que creará los servicios y desplegará los microservicios en Kubernetes. Asegúrese de que el clúster de Kubernetes esté configurado correctamente y tenga los recursos necesarios para ejecutar los servicios.
   Este comando también construirá las imágenes de Docker necesarias para los microservicios y las subirá al registro de contenedores.

   Si quiere construir las imágenes de Docker manualmente, puede ejecutar el siguiente comando:

   ```bash
   npm run backend:build
   ```

## Desplegar frontend

4. **Ejecutar el siguiente comando para desplegar el frontend en Vercel**:

   ```bash
   npm run frontend:deploy
   ```

   Este comando ejecutará un script que desplegará el frontend en Vercel. Asegúrese de tener una cuenta en Vercel y haber configurado el proyecto en la plataforma.

   Si quiere construir el frontend manualmente, puede ejecutar el siguiente comando:

   ```bash
   npm run frontend:build
   ```

5. **Verificar el estado del frontend**: Puede ir a la dirección [https://smart-city-unal-3kgxc8jjx-davids-projects-effc7146.vercel.app/login?from=/](https://smart-city-unal-3kgxc8jjx-davids-projects-effc7146.vercel.app/login?from=/) en su navegador para verificar que el frontend esté funcionando correctamente.

## Despliegue del gateway

5. **Ejecute el siguiente comando para desplegar el API Gateway en Docker**:

   ```bash
   npm run gateway:start
   ```

   Este comando correrá el gateway en un contenedor docker. Asegúrese de tener Docker instalado en su sistema.
