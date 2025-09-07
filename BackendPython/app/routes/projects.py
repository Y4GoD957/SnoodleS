from fastapi import APIRouter
from app.services import db_services

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/")
def list_projects():
    return db_services.get_projects()

@router.post("/")
def create_project(project: dict):
    return db_services.add_project(project)
