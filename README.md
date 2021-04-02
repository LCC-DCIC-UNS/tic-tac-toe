# Tic tac toe en React + Prolog

Implementación de un tic-tac-toe interactivo, usando React del lado del cliente, y Prolog del lado del servidor.

## Para correr el proyecto

### Setup y ejecución del servidor Pengines
- [Descargar](https://www.swi-prolog.org/Download.html) e instalar el SWI-Prolog.

- Descargar la implementación del servidor Pengines (pengines-master.zip) provista en la materia. La carpeta `pengines-master/apps/proylcc` contiene el código prolog del tic tac toe.

- Levantar el servidor ejecutando `pengines-master/run.pl` en SWI-Prolog: correr `swipl run.pl` o doble click sobre el `run.pl`.\
El servidor escuchará en http://localhost:3030.

### Setup y ejecución de la aplicación React

- Descargar una versión reciente de [Node.js](https://nodejs.org/en/).

- En el directorio del proyecto, correr

    `npm start`

    para correr la app en modo desarrollo.\
Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación en el browser.\
    La página se refresca automáticamente cuando cambia el código.