Parse Server con Typescript y Webpack 5
===
Este es un proyecto starter para iniciar un servidor de [Parse Server](https://parseplatform.org), también puede guardar los archivos en un AWS S3, habilitar Caché en REDIS para esto debe descomentar las lineas que corresponda en ```src/index.ts```

## Requisitos
- NodeJS
- MongoDB

## Primeros pasos
- Renombrar 
```
.env_sample -> .env
```
- Definir los atributos del archivo .env

- Instalar las dependencias con 
```
npm install
```
- Ejecutar el servidor en modo desarrollo
```
npm run dev
````
Por defecto esta activo el live reload si hace algun cambio en los archivos (.ts), webpack compilará y nodemon reiniciará el servidor aplicando los cambios.

- Para compilar a Producción ejecute:
``` 
npm run build
````
los arhivos generados en la carpeta build los puede copiar a su servidor en produccción, una vez copiado a su servidor debe hacer un ```npm install``` y en el servidor NODEJS debe  ejecutar el archivo index.js por ejem: ```node index.js```
(Se recomienda usar PM2)

[Artículo en Medium con el tutorial Completo](https://rolando-dev.medium.com/instalación-de-parse-server-typescript-webpack-5-b4f51f7dfd08)