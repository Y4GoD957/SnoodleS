from fastapi import APIRouter
from app.services import db_services

router = APIRouter()

@router.get("/monthly_goals")
def list_monthly_goals():
    return db_services.get_monthly_goals()

@router.post("/monthly_goals")
def create_monthly_goal(goal: dict):
    return db_services.add_monthly_goal(goal)

@router.get("/profiles")
def list_profiles():
    return db_services.get_profiles()

@router.post("/profiles")
def create_profile(profile: dict):
    return db_services.add_profile(profile)

@router.get("/projects")
def list_projects():
    return db_services.get_projects()

@router.post("/projects")
def create_project(project: dict):
    return db_services.add_project(project)
