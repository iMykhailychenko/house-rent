from pydantic import BaseModel


class ConfirmEmailBody(BaseModel):
    email: str
    token: str
    first_name: str
    last_name: str


class ChangeEmailBody(BaseModel):
    email: str
    token: str
    old_email: str
    recover_token: str


class ChangePasswordBody(BaseModel):
    email: str
    token: str
