# Tesis de Maestría Universidad Nacional

Este repositorio contiene el código fuente y los diagramas correspondientes al proyecto de trabajo de grado para la Maestría en Ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia. El proyecto se enmarca en el desarrollo de una solución IoT orientada al monitoreo de la calidad del aire, aplicando múltiples tecnologías y arquitecturas modernas. A continuación, se describen brevemente los componentes principales de la solución:

![Diagrama de arquitectura de la aplicación](.diagrams/poc/Arquitectura concreta.png)

- **Capa Física**: Se encarga de la recolección de datos de sensores, los cuales miden contaminantes atmosféricos como CO, CO2, PM2.5, PM5, PM10, así como otros parámetros ambientales como la Humedad Relativa y la Temperatura. Esta capa es simulada por un módulo de software que genera datos similares a los recolectados por los sensores de calidad del aire de la ciudad de Duitama, Boyacá.

- **Capa de Transporte**: Un gateway IoT actúa como intermediario entre los sensores y el sistema central. Los datos son recibidos mediante un broker MQTT y se transmiten de forma segura a la capa de procesamiento a través del protocolo HTTPS.

- **Capa de Procesamiento**: Esta capa está compuesta por un conjunto de microservicios que se encargan de:

  - La creación y gestión de usuarios dentro de la aplicación.
  - La creación y gestión de sensores, permitiendo registrar nuevos dispositivos de monitoreo.
  - La configuración y gestión de alertas basadas en umbrales de contaminantes, enviando notificaciones automáticas por correo electrónico a los responsables de la toma de decisiones.
  - El almacenamiento y procesamiento de los datos recogidos por los sensores en bases de datos.
  - El cálculo del Índice de Calidad del Aire (AQI), realizado por contaminante y siguiendo las recomendaciones del IDEAM. Este cálculo se efectúa de manera automatizada cada hora, ofreciendo información precisa y actualizada sobre la calidad del aire en la ciudad.
  - Un servicio para el envío de correos electrónicos, que es clave en la notificación de alertas.

- **Capa de Seguridad**: Implementa un servidor de autenticación que utiliza el protocolo OAuth2, garantizando la seguridad y el control de acceso a los diferentes servicios de la aplicación.

- **Capa de Gestión**: Incluye un API Gateway que facilita la comunicación entre los microservicios y los clientes, como el frontend. Gracias al uso de MoleculerJS, se habilita la comunicación basada en eventos entre microservicios, proporcionando balanceo de carga, gestión de fallos, descubrimiento y registro de servicios, además de ofrecer logging, observabilidad y métricas detalladas.

- **Capa de Aplicación**: Desarrollada con ReactJS, esta capa proporciona una interfaz intuitiva y funcional para que los administradores de la ciudad puedan gestionar los sensores, visualizar los datos recolectados, administrar alertas y consultar el índice de calidad del aire por cada contaminante en tiempo real. Incluye operaciones CRUD completas para sensores y alertas.

En resumen, este proyecto combina simulación de sensores, comunicación IoT, procesamiento distribuido, seguridad avanzada y una interfaz de usuario amigable, todo orientado a mejorar la toma de decisiones en la gestión de la calidad del aire.

# Documentos importantes

- [Manual de instalación](./docs/Manual_de_instalacion.md)
- [Manual de despliegue](./docs/Manual_de_despliegue.md)
- [Documentación de los servicios REST](./docs/Documentacion_de_servicios_REST.md)
- Diagramas: Los diagramas de la aplicación se encuentran en la carpeta [diagrams](./diagrams/readme.md)
