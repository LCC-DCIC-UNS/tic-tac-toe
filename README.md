# Tic tac toe en React + Prolog

Implementación de un tic-tac-toe interactivo, usando React del lado del cliente, y Prolog del lado del servidor.


Necesitás tener una versión reciente de [Node.js](https://nodejs.org/en/) instalada.

## Para correr el proyecto

### Setup y ejecución del servidor Pengines
- [Descargar](https://www.swi-prolog.org/Download.html) e instalar el SWI-Prolog

- Descargar la implementación del servidor Pengines (pengines-master.zip) provisto en la materia. La carpeta `pengines-master/apps/proylcc` contiene el código prolog del tic tac toe.

- Levantar el servidor ejecutando `pengines-master/run.pl` en SWI-Prolog (e.g. `swipl run.pl` o doble click sobre el `run.pl`). El servidor escuchará en http://localhost:3030.

### Setup y ejecución de la aplicación React

En el directorio del proyecto, correr
### `npm start`

Corre la app en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación en el browser.

La página se refresca automáticamente cuando cambia el código.\

### `npm run build`

Compila la app para producción en la carpeta `build` (optimizada para una mejor performance).\

Ver esta [documentación](https://facebook.github.io/create-react-app/docs/deployment) para más información.