# Proyecto: <span style="color:#e6538a">M2 Blocks</span>
*Lógica para Cs. de la Computación - 2025*

## El juego
El *M2 Blocks* (o *Merge 2 Blocks*) es un juego de puzzle y estrategia cuyo objetivo es lanzar y combinar bloques numerados para crear bloques de mayor valor y ganar puntos. Se encuentra disponible para Android y iOS: [m2blocks.fungame.studio](https://m2blocks.fungame.studio)

![Captura del juego M2 Blocks](/docs/images/m2blocks-game-screenshot.png)

## Requerimientos
### Funcionalidad
Se debe implementar una aplicación web que permita jugar al *M2 Blocks*, con una interfaz del estilo de las apps para Android y iOS. 

Principales funcionalidades a ser contempladas:

- <span style="color:#fc7f40">📌 **Generación aleatoria del bloque a disparar.**</span> Tener en cuenta que el número a disparar debe ser elegido aleatoriamente dentro de un rango permitido. Este rango permitido va variando a medida que evoluciona el juego y se van consiguiendo bloques más grandes:

  | **Máximo de la Grilla** | **Rango**       | **Observación**          |
  |-------------------------|-----------------|--------------------------|
  | 2, 4, 8                 | 2 a 4           |                          |
  | 16                      | 2 a 8           |                          |
  | 32                      | 2 a 16          |                          |
  | 64                      | 2 a 32          |                          |
  | 128, 256, 512           | 2 a 64          |                          |
  | 1024                    | 4 a 128         | Se retira el 2           |
  | 2048                    | 8 a 256         | Se retira el 4           |
  | 4096, 8192              | 16 a 512        | Se retira el 8           |
  | 16k                     | 32 a 1024       | Se retira el 16          |
  | …                       | …               | …                        |

- <span style="color:#fc7f40">📌  **Efecto del disparo de un bloque.**</span> Involucra la ubicación del bloque en la columna del disparo, posiblemente seguido de una serie de efectos en cadena alternando la mezcla de bloques adyacentes iguales, generando nuevos bloques, y “caídas” de bloques (pensándolo como gravedad invertida) para ocupar espacios que se originaron de las mezclas. La interfaz debe mostrar cada uno de estos efectos en cadena progresivamente, uno luego del otro, estilo animación. **Importante**: se debe imitar fielmente el comportamiento de la aplicación. Ante cualquier duda acerca de algún comportamiento específico, consultar con el docente asignado.
- <span style="color:#fc7f40">📌  **Avisos “*Combo x N*”.**</span> Por ejemplo: “Combo x 3” significa que se produjeron 3 mezclas de bloques como consecuencia del mismo disparo.
- <span style="color:#fc7f40">📌  **Avisos de nuevo bloque máximo logrado.**</span> Al menos a partir del 512. Cuando corresponda, por ej. al lograr el 1024, también avisos de bloque agregado al rango de disparo (“New block added”) y bloque “retirado” del rango de disparo (“Eliminated Block”).
- <span style="color:#fc7f40">📌  **Limpieza de bloques retirados.**</span> Esto es, que ya no se generan más. Cuando se logra un nuevo bloque máximo, y si esto implica que deja de generarse un determinado bloque (extremo inferior del rango actual), las apariciones de ese bloque, ahora “retirado”, deben eliminarse. Esta limpieza puede pensarse como un efecto más de la movida que causó el retiro del bloque.
- <span style="color:#fc7f40">📌  **Booster *Hint jugada*.**</span> Al activarlo muestra, para cada columna, una pista (por ejemplo, flotando sobre la propia columna, semi-transparente) del resultado que se va a conseguir con esa jugada, por ejemplo: *bloque X*, *combo x N*, etc. Puede activarse en cualquier momento, cuantas veces se quiera, y muestra las pistas solo para la jugada actual.
- <span style="color:#fc7f40">📌  **Booster *Bloque siguiente*.**</span> Al activarlo se muestra el bloque del disparo siguiente, además del actual. Puede activarse en cualquier momento, cuantas veces se quiera, y dura por un tiempo limitado.

### Implementación
Debe extenderse la implementación molde (React + Prolog) en este repositorio para cumplir con los requerimientos de funcionalidad mencionados anteriormente.

El archivo [`init.pl`](./pengines_server/apps/proylcc/init.pl) (módulo Prolog) permite especificar la configuración de la grilla inicial del juego, que será mostrada por la interfaz. Es **importante** que no se altere este esquema, y que se **conserve la representación** de la grilla propuesta en el código molde, dado que para la corrección del proyecto vamos a testear la implementación reemplazando la grilla actual en [`init.pl`](./pengines_server/apps/proylcc/init.pl) con diferentes grillas (casos de test).

El archivo [`proylcc.pl`](./pengines_server/apps/proylcc/proylcc.pl) contiene implementaciones molde de los predicados `randomBlock/2` y `shoot/5`, consultados desde la UI en React. Esto determina claramente qué parte de la resolución del juego queremos que se realice en Prolog, y qué parte en JS / React. En caso de necesitar modificar la interfaz de estos predicados, o exportar predicados adicionales, consultarlo con el docente asignado.

### Documentación
Se deberá realizar un informe que explique claramente la **implementación en Prolog** realizada, así cómo los **aspectos destacados de la implementación en React**.
Además, deberá incluirse una sección con **casos de test** significativos (capturas de pantalla).	

El informe debe ser:
- <span style="color:#0083bb">✅ **Claro:**</span> información bien estructurada y presentada
- <span style="color:#0083bb">✅ **Completo:**</span> explicando cómo resolvieron cada requerimiento funcional (a nivel de estrategia, no a nivel de código), funcionalidades extra implementadas (si es que alguna), aspectos positivos de la resolución, desafíos que encontraron y cómo los enfrentaron, casos de test (capturas de pantalla). 
- <span style="color:#0083bb">✅ **Sintético y relevante:**</span> no repetir información que está en el enunciado, como reglas del juego, no documentar funcionalidad de muy bajo nivel o auxiliar, que no contribuya al entendimiento de la estrategia principal.

**Consejo:** darle algunas pasadas (lectura y modificaciones) hasta conseguir todo esto.

El informe debe escribirse en [`INFORME.md`](/docs/INFORME.md).

### Comisiones y Entrega
1. Las comisiones deben estar conformadas por hasta **3 integrantes**, y ser previamente **registradas** en la página de la materia (Google sheet) y en la asignación de GH Classroom, lo que creará un repositorio GH privado accesible para los integrantes de la comisión y docentes (seguir indicaciones en la página de la materia).
1. A cada comisión se le **asignará un docente** de la práctica, quien hará el seguimiento y corregirá el proyecto de la comisión.
1. La **entrega** del proyecto se realiza mediante un **commit + push** de la versión final en el repositorio GH de la comisión.
1. La **fecha límite de entrega** del proyecto se encuentra publicada en la página de la materia. Los proyectos entregados fuera de término recibirán una penalización en su calificación, la cual será proporcional al retraso incurrido.

<hr style="border-top:5px solid #0083bb; border-bottom: 0; margin: 40px 0;"/>

## Implementación molde en React + Prolog

Implementación molde a usar como punto de partida para la resolución del proyecto de la materia, usando React del lado del cliente para la UI, y Prolog del lado del servidor para la lógica del juego.

### Setup y ejecución del servidor Pengines
- [Descargar](https://www.swi-prolog.org/Download.html) e instalar el SWI-Prolog.

- Levantar el servidor ejecutando en SWI-Prolog el `run.pl` en la carpeta `pengines_server`: 

  `cd pengines_server`\
  `swipl run.pl`
  
  o haciendo doble click sobre el `run.pl`.

  Aclaración: no hacer `swipl pengines_server/run.pl` porque algunas referencias luego no funcionan.

  La primera vez que se ejecute el run.pl se pedirá definir un username y un password para acceder a la consola web admin del servidor, elegir cualquiera (por ejemplo, username: 'lcc' y password: 'lccdcic'), pero no dejar vacíos.

- El servidor escuchará en http://localhost:3030

- Ir a http://localhost:3030/admin/server.html para ver la consola web admin.

- La carpeta `pengines-master/apps/proylcc` contiene el código prolog del tic tac toe. Cada vez que se modifica este código es necesario bajar y volver a levantar el servidor para que se reflejen los cambios.

### Setup y ejecución de la aplicación React

- Descargar una versión reciente de [Node.js](https://nodejs.org/en/).

- Ejecutar 

  `npm install` 

  en el directorio del proyecto (`tic-tac-toe`) para instalar las dependencias (librerías)
localmente, en la carpeta `node_modules`.

- Ejecutar

    `npm start`

    en el directorio del proyecto para correr la app en modo desarrollo.

- Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación en el browser.

- La página se refresca automáticamente cuando cambia el código.