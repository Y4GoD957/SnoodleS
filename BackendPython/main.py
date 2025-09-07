from fastapi import FastAPI
from app.routes import auth, profiles, monthly_goals, projects
from app.middlewares.cors_middleware import add_cors_middleware
import os
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI(title="SnoodleS Backend")

# Configurar CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
add_cors_middleware(app, FRONTEND_URL)

# Incluir rotas
app.include_router(auth.router)
app.include_router(profiles.router)
app.include_router(monthly_goals.router)
app.include_router(projects.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
