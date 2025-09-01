# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["http://localhost:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginDTO(BaseModel):
    email: str
    password: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/auth/login")
def login(body: LoginDTO):
    if body.email == "admin@snoodles.com" and body.password == "123":
        return {"token": "fake-jwt-token", "user": {"email": body.email}}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

