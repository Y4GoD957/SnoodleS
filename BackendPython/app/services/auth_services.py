from app.services.supabase_client import supabase
import bcrypt

def get_profiles():
    return supabase.table("profiles").select("*").execute().data

def add_profile(data: dict):
    return supabase.table("profiles").insert(data).execute().data

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
