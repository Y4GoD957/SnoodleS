# app/routes/monthly_goals.py
from fastapi import APIRouter
from app.services import db_services

router = APIRouter(prefix="/monthly_goals", tags=["monthly_goals"])

@router.get("/")
def list_monthly_goals():
    return db_services.get_monthly_goals()

@router.post("/")
def create_monthly_goal(goal: dict):
    return db_services.add_monthly_goal(goal)
