:- module(proylcc,
	[  
		connect/4
	]).

:-use_module(library(lists)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% connect(+Grid, +NumOfColumns, +Path, -Effects)
%
% donde Effects es una lista de effect(ResultingGrid, AuxiliaryInfo) 
% donde AuxiliaryInfo es una lista de información adicional que se quiera devolver 
% para la UI (por ejemplo, los objetivos restantes, o qué celdas se vieron afectadas, etc).

connect(
	[
		[-], [r], [c], [p], [-], [-], [-], [-],	
		[c], [y], [g], [p], [r], [-], [-], [-],	
		[r], [r], [g], [y], [r], [g], [-], [-],	
		[y], [c], [-], [y], [c], [g], [g], [-],	
		[y, ~], [c, ~], [-], [g], [c, ~], [y, ~], [c, ~], [c],	
		[c, ~], [c, ~], [-], [g, ~], [c, ~], [y, ~], [c, ~], [-],	
		[c, ~], [y, ~], [g, ~], [g, ~], [c, ~], [c, ~], [-], [-],	
		[c, ~], [y, ~], [y, ~], [y, ~], [y, ~], [-], [-], [-],	
		[-], [y, ~], [y, ~], [y], [-], [-], [-], [-]
	], 8, [21, 29, 30],
	[
		effect([
			[-], [r], [c], [p], [-], [-], [-], [-],	
			[c], [y], [g], [p], [r], [-], [-], [-],	
			[r], [r], [g], [y], [r], [~], [-], [-],	
			[y], [c], [-], [y], [c], [~], [~], [-],	
			[y, ~], [c, ~], [-], [g], [c, ~], [y, ~], [c, ~], [c],	
			[c, ~], [c, ~], [-], [g, ~], [c, ~], [y, ~], [c, ~], [-],	
			[c, ~], [y, ~], [g, ~], [g, ~], [c, ~], [c, ~], [-], [-],	
			[c, ~], [y, ~], [y, ~], [y, ~], [y, ~], [-], [-], [-],	
			[-], [y, ~], [y, ~], [y], [-], [-], [-], [-]
		], [			
			achieved([[g, 3], [~, 3]])
			% o dejar libre qué info auxiliar para la UI se devuelve.			
		]),
		effect([
			[-], [r], [c], [p], [-], [-], [-], [-],	
			[c], [y], [g], [p], [r], [-], [-], [-],	
			[r], [r], [g], [y], [r], [r, ~], [-], [-],	
			[y], [c], [-], [y], [c], [c, ~], [r, ~], [-],	
			[y, ~], [c, ~], [-], [g], [c, ~], [y, ~], [c, ~], [c],	
			[c, ~], [c, ~], [-], [g, ~], [c, ~], [y, ~], [c, ~], [-],	
			[c, ~], [y, ~], [g, ~], [g, ~], [c, ~], [c, ~], [-], [-],	
			[c, ~], [y, ~], [y, ~], [y, ~], [y, ~], [-], [-], [-],	
			[-], [y, ~], [y, ~], [y], [-], [-], [-], [-]
		], [gravity])
	]
).