@echo off
pdflatex article -shell-escape
biber article -q 
pdflatex article -shell-escape
pdflatex article -shell-escape
