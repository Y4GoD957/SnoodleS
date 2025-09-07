from pydantic import BaseModel, EmailStr

class LoginDTO(BaseModel):
    email: EmailStr
    password: str

class RegisterDTO(BaseModel):
    name: str
    email: EmailStr
    password: str
