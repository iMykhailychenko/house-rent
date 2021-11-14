from pydantic import BaseModel


class AuthVerifyBody(BaseModel):
    email: str
    token: str
    first_name: str
    last_name: str
    user_agent: str
