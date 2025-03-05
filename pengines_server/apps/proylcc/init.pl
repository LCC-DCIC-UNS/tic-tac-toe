:- module(init, [ init/2 ]).

/**
 * init(-Grid, -NumOfColumns).
 * 
 * Predicado especificando la grilla inicial, que será mostrada al comienzo del juego, donde
 * Grid es una lista con los números que conforman la grilla, y NumOfColumns es la cantidad de columnas, 
 * determinando las dimensiones de la misma.
 */

% init([
% 	64,4,64,32,16,
% 	16,8,16,2,32,
% 	2,4,64,8,2,
% 	4,2,32,-,4,
% 	16,-,-,-,16,
% 	-,-,-,-,8,
% 	-,-,-,-,4	
% ], 5).

init([
	4,2,8,64,32,
	2,-,-,4,16,
	-,-,-,-,2,
	-,-,-,-,16,
	-,-,-,-,2,
	-,-,-,-,-,
	-,-,-,-,-
], 5).