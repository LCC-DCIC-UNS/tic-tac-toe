% Main file to run the pengines demo. 
% Loads the demo and starts a server
% on the default port: 3030

:- use_module(library(settings)).
:- use_module(library(pengines)).
:- set_setting(http:cors,[*]).	% mauro: enable cors for all domains.

:- [load].

:- server(3030).
