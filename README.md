# Tic tac toe en React + Prolog

Implementación de un tic-tac-toe interactivo, usando React del lado del cliente, y Prolog del lado del servidor.

## Para correr el proyecto

### Setup y ejecución del servidor Pengines
- [Descargar](https://www.swi-prolog.org/Download.html) e instalar el SWI-Prolog.

- Levantar el servidor: 
  `npm run pengines`
  
  La primera vez que se ejecute el run.pl se pedirá definir un *username* y un *password* para acceder a la consola web admin del servidor, elegir cualquiera (por ejemplo, username: 'lcc' y password: 'lccdcic'), pero **no dejar vacíos**.

- El servidor escuchará en http://localhost:3030

- Ir a http://localhost:3030/admin/server.html para ver la consola web admin (Opcional).

- La carpeta `pengines_server/apps/proylcc` contiene el código prolog del tic tac toe. Cada vez que se modifica este código es necesario bajar y volver a levantar el servidor para que se reflejen los cambios.

### Setup y ejecución de la aplicación React

- Descargar una versión reciente de [Node.js](https://nodejs.org/en/).

- Instalar las dependencias. Desde la raiz del proyecto, ejecutar:

  `npm install`

- Correr la aplicación en modo desarrollo. Desde la raíz del proyecto, ejecutar

    `npm run dev`    

- Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación en el browser.

- La página se refresca automáticamente cuando cambia el código.