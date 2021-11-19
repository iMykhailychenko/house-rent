from pydantic import BaseModel


class AuthVerifyBody(BaseModel):
    email: str
    token: str
    first_name: str
    last_name: str


class ChangeEmailBody(AuthVerifyBody):
    old_email: str
    recover_token: str
