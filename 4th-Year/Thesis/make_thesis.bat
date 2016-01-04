@echo off
pdflatex thesis -quiet
biber thesis -q
pdflatex thesis -quiet
pdflatex thesis -quiet