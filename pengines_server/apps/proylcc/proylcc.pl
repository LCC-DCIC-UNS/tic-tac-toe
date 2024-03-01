:- module(proylcc,
	[  
		put/4,
		gameStatus/2
	]).

:-use_module(library(lists)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% replace(?X, +XIndex, +Y, +Xs, -XsY)
%

replace(X, 0, Y, [X|Xs], [Y|Xs]).

replace(X, XIndex, Y, [Xi|Xs], [Xi|XsY]):-
    XIndex > 0,
    XIndexS is XIndex - 1,
    replace(X, XIndexS, Y, Xs, XsY).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% put(+Player, +Position, +Board, -ResBoard)
%

put(Player, Pos, Board, ResBoard):-
	replace("-", Pos, Player, Board, ResBoard).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% gameStatus(+Board, +Status)
%

gameStatus(Board, Winner):-
	Lines = [
    	[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
  	],
  	member([C1, C2, C3], Lines),
	nth0(C1, Board, Winner),
	Winner \= "-",
	nth0(C2, Board, Winner),
	nth0(C3, Board, Winner),
	!.  

gameStatus(Board, "?"):-
	member("-", Board),
	!.

gameStatus(_Board, "T").