% Main file to run the pengines demo. 
% Loads the demo and starts a server
% on the default port: 3030

:- use_module(library(settings)).
:- use_module(library(pengines)).
:- use_module(library(http/http_cors)).

% Enable cors for all domains.
:- set_setting(http:cors,[*]).

:- [load].

:- server(3030).
