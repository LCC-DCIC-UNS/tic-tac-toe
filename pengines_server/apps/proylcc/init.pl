:- module(init, [ init/3 ]).

/**
 * init(-Grid, -NumOfColumns, -Goals).
 * 
 * Predicado especificando la grilla inicial, que será mostrada al comienzo del juego, donde:
 * - Grid es una lista plana con las celdas que conforman la grilla
 * - NumOfColumns es la cantidad de columnas (determina las dimensiones)
 * - Goals es una lista con los objetivos del juego, por ejemplo, [[r, 10], [v, 7], [p, 15], [~, 21]] (recolectar 10 rojos, 7 verdes, etc).
 * 
 * Representación de contenido de una celda:
 * r = rojo
 * c = celeste
 * p = púrpura
 * a = amarillo
 * v = verde
 * - = obstáculo (celda no jugable)
 * ~ = agua
 */

init([
	% Fila 0 (índices 0-7)
	[-], [r], [c], [p], [-], [-], [-], [-],
	% Fila 1 (índices 8-15)
	[c], [a], [v], [p], [r], [-], [-], [-],
	% Fila 2 (índices 16-23)
	[r], [r], [v], [a], [r], [v], [-], [-],
	% Fila 3 (índices 24-31)
	[a], [c], [-], [a], [c], [v], [v], [-],
	% Fila 4 (índices 32-39)
	[a, ~], [c, ~], [-], [v], [c, ~], [a, ~], [c, ~], [c],
	% Fila 5 (índices 40-47)
	[c, ~], [c, ~], [-], [v, ~], [c, ~], [a, ~], [c, ~], [-],
	% Fila 6 (índices 48-55)
	[c, ~], [a, ~], [v, ~], [v, ~], [c, ~], [c, ~], [-], [-],
	% Fila 7 (índices 56-63)
	[c, ~], [a, ~], [a, ~], [a, ~], [a, ~], [-], [-], [-],
	% Fila 8 (índices 64-71)
	[-], [a, ~], [a, ~], [a], [-], [-], [-], [-]
], 8, [[r, 10], [v, 10], [p, 15], [~, 21]]).