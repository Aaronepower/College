@echo off
pdflatex article -quiet
biber article -q 
pdflatex article -quiet
pdflatex article