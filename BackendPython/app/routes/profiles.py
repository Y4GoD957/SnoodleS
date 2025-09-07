from fastapi import APIRouter
from app.services import db_services

router = APIRouter(prefix="/profiles", tags=["profiles"])

@router.get("/")
def list_profiles():
    return db_services.get_profiles()

@router.post("/")
def create_profile(profile: dict):
    return db_services.add_profile(profile)
