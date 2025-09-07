from app.services.supabase_client import supabase

def get_profiles():
    return supabase.table("profiles").select("*").execute().data

def add_profile(data: dict):
    return supabase.table("profiles").insert(data).execute().data

def get_monthly_goals():
    return supabase.table("monthly_goals").select("*").execute().data

def add_monthly_goal(data: dict):
    return supabase.table("monthly_goals").insert(data).execute().data

def get_projects():
    return supabase.table("projects").select("*").execute().data

def add_project(data: dict):
    return supabase.table("projects").insert(data).execute().data
