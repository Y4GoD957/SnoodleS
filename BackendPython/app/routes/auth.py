from fastapi import APIRouter, HTTPException
from app.models.auth import LoginDTO
from app.services.supabase_client import supabase

router = APIRouter()


@router.post("/auth/login")
def login(body: LoginDTO):
    # Exemplo: validar usuário no Supabase
    response = supabase.auth.admin.get_user_by_email(body.email)

    if response.user and body.password == "123":  # aqui você pode verificar senha real
        return {"token": "fake-jwt-token", "user": {"email": body.email}}

    raise HTTPException(status_code=401, detail="Credenciais inválidas")