@echo off
REM ============================================
REM Script para iniciar o backend FastAPI
REM ============================================

REM Mostra o diretório onde o script está
echo Iniciando o backend FastAPI...
cd /d %~dp0

REM Ativa o ambiente virtual
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
) else (
    echo ERRO: Ambiente virtual nao encontrado! Execute "python -m venv .venv" primeiro.
    pause
    exit /b
)

REM Inicia o servidor FastAPI na porta 8000
echo Rodando FastAPI na porta 8000...
uvicorn main:app --reload --port 8000

REM Mantem o terminal aberto após o servidor parar
pause