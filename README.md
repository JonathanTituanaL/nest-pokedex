<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nest/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

6. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

7. llenar las variables de entorno definidas em el __.env__

8. Ejecutar la aplicación en dev 
```
npm run start:dev
```
9. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

# Stack usado
* MongoDB
* Nest
# nest-pokedex
