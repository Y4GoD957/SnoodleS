# main.py
from fastapi import FastAPI
from app.routes import auth
from app.routes import generate
from app.middlewares.cors_middleware import add_cors_middleware
import os
from dotenv import load_dotenv
import uvicorn

# Carregar variáveis de ambiente
load_dotenv()

app = FastAPI(title="SnoodleS Backend")

# Configurar CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
add_cors_middleware(app, FRONTEND_URL)

# Incluir rotas
app.include_router(auth.router)
app.include_router(generate.router)

# Ponto de entrada para executar o servidor via 'python main.py'
if __name__ == "__main__":
    uvicorn.run(
        "main:app",       # módulo:app
        host="127.0.0.1", # localhost
        port=8000,        # porta do backend
        reload=True       # habilita recarga automática ao alterar código
    )