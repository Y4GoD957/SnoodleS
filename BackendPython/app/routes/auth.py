from fastapi import APIRouter, HTTPException
from app.models.auth import RegisterDTO, LoginDTO
from app.services.supabase_client import supabase
import bcrypt

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(body: RegisterDTO):
    # Verifica se já existe
    existing = supabase.table("profiles").select("*").eq("email", body.email).execute().data
    if existing:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    
    # Registra no Supabase Auth
    try:
        response = supabase.auth.sign_up({
            "email": body.email,
            "password": body.password
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao registrar: {str(e)}")

    user = response.get("user")
    if user is None:
        raise HTTPException(status_code=400, detail="Não foi possível criar o usuário")

    # Cria profile na tabela profiles
    profile_data = {
        "id": user["id"],
        "name": body.name,
        "email": body.email,
        "password": bcrypt.hashpw(body.password.encode("utf-8"), bcrypt.gensalt()).decode()
    }
    supabase.table("profiles").insert(profile_data).execute()

    return {"message": "Usuário registrado com sucesso!", "user_id": user["id"]}

@router.post("/login")
def login(body: LoginDTO):
    # Busca usuário na tabela profiles pelo email
    user_data = supabase.table("profiles").select("*").eq("email", body.email).execute().data
    if not user_data:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    user = user_data[0]
    
    # Verifica senha
    if not bcrypt.checkpw(body.password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    return {"token": "fake-jwt-token", "user": user}
