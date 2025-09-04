@echo off
cd %~dp0
.venv\Scripts\activate
uvicorn main:app --reload
pause
