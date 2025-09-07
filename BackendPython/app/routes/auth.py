from fastapi import APIRouter, HTTPException
from app.models.auth import LoginDTO
from app.services.supabase_client import supabase

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(body: LoginDTO):
    # Buscar usuário na tabela profiles pelo email
    response = supabase.table("profiles").select("*").eq("email", body.email).execute()
    user = response.data[0] if response.data else None

    if user and user["password"] == body.password:
        return {"token": "fake-jwt-token", "user": user}

    raise HTTPException(status_code=401, detail="Credenciais inválidas")
